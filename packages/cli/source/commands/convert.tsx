import { useEffect, useState, useReducer } from 'react';
import { option } from 'pastel';
import { Box, Spacer, Text } from 'ink';
import zod from 'zod';
import { Address, getAddress, parseUnits } from 'viem';
import {
	TokenConverter,
} from '@venusprotocol/token-converter-bot';
import {
	stringifyBigInt,
	getConverterConfigs,
	getConverterConfigId,
} from '../utils/index.js';
import {
	Options,
	Title,
	BorderBox,
} from '../components/index.js';
import { reducer, defaultState } from '../state/convert.js';
import FullScreenBox from '../components/fullScreenBox.js';

const address = zod
	.custom<Address>(val => {
		try {
			getAddress(val as string);
			return true;
		} catch (e) {
			return val === undefined;
		}
	})
	.transform(val => val.toLowerCase() as Address);

export const options = zod.object({
	converter: zod.array(address).describe(option({
		description: 'TokenConverter',
		alias: 'c',
	})).optional(),
	profitable: zod
		.boolean()
		.describe(option({
			description: 'Require trade be profitable',
			alias: 'p',
		}))
		.optional()
		.default(true),
	assetIn: address.describe(option({
		description: 'Asset In',
		alias: 'in',
	})).optional(),
	assetOut: address.describe(option({
		description: 'Asset Out',
		alias: 'out',
	})).optional(),
	simulate: zod
		.boolean()
		.describe(option({
			description: 'Simulate transactions',
			alias: 's',
		}))
		.optional()
		.default(false),
	debug: zod.boolean().describe(option({
		description: 'Add debug logging',
		alias: 'd',
	})).optional().default(false),
	minTradeUsd: zod
		.number()
		.describe(option({
			description: 'Minimum value of tokens to try and convert',
			alias: 'min',
		}))
		.optional()
		.default(500),
	maxTradeUsd: zod
		.number()
		.describe(option({
			description: 'Maximum value of tokens to try and convert',
			alias: 'max',
		}))
		.optional()
		.default(5000),
	loop: zod.boolean().describe(option({
		description: 'Loop',
		alias: 'l',
	})).optional().default(false),
});

interface Props {
	options: zod.infer<typeof options>;
}

export default function Convert({ options }: Props) {
	const {
		minTradeUsd,
		maxTradeUsd,
		simulate,
		assetIn,
		assetOut,
		converter,
		profitable,
		loop,
		debug,
	} = options;

	const [
		{ completed, messages },
		dispatch,
	] = useReducer(reducer, defaultState);
	const [error, setError] = useState('');
	const [_tradeUsdValues, setTradeUsdValues] = useState<
		Record<string, { underlyingPriceUsd: string; underlyingUsdValue: string }>
	>({});

	useEffect(() => {
		const convert = async () => {
			do {
				const tokenConverter = new TokenConverter({
					subscriber: dispatch,
					simulate: !!simulate,
					verbose: debug,
				});

				const tokenConverterConfigs = await getConverterConfigs({
					assetIn,
					assetOut,
					converter,
				});

				const potentialTrades = await tokenConverter.checkForTrades(
					tokenConverterConfigs,
				);
				if (potentialTrades.length === 0) {
					setError('No Potential Trades Found');
				}

				await Promise.allSettled(
					potentialTrades.map(async t => {
						let amountOut = t.assetOut.balance;
						const vTokenAddress =
							t.assetOutVTokens.core ||
							((t.assetOutVTokens.isolated &&
								t.assetOutVTokens.isolated[0] &&
								t.assetOutVTokens.isolated[0][1]) as Address);
						const { underlyingPriceUsd, underlyingUsdValue, underlyingDecimals } =
							await tokenConverter.getUsdValue(
								t.assetOut.address,
								vTokenAddress,
								amountOut,
							);

						setTradeUsdValues(prevState => ({
							...prevState,
							[getConverterConfigId({
								converter: t.tokenConverter,
								tokenToReceiveFromConverter: t.assetOut.address,
								tokenToSendToConverter: t.assetIn,
							})]: { underlyingPriceUsd, underlyingUsdValue },
						}));

						if (+underlyingUsdValue > minTradeUsd) {
							if (+underlyingUsdValue > maxTradeUsd) {
								amountOut = parseUnits(
									(maxTradeUsd / +underlyingPriceUsd.toString()).toString(),
									underlyingDecimals,
								);
							}
							const arbitrageArgs = await tokenConverter.prepareTrade(
								t.tokenConverter,
								t.assetOut.address,
								t.assetIn,
								amountOut,
							);
							const { trade, amount, minIncome } = arbitrageArgs || {
								trade: undefined,
								amount: 0n,
								minIncome: 0n,
							};

							const maxMinIncome = ((amount * 1003n) / 1000n - amount) * -1n;

							if (t.accountBalanceAssetOut < (minIncome * -1n)) {
								dispatch({
									type: 'ExecuteTrade',
									error: 'Insufficient wallet balance to pay min income',
									context: {
										converter: t.tokenConverter,
										tokenToReceiveFromConverter: t.assetOut.address,
										tokenToSendToConverter: t.assetIn,
										amount,
										minIncome,
									},
								});
							} else if (minIncome < maxMinIncome) {
								dispatch({
									type: 'ExecuteTrade',
									error: 'Min income too high',
									context: {
										converter: t.tokenConverter,
										tokenToReceiveFromConverter: t.assetOut.address,
										tokenToSendToConverter: t.assetIn,
										amount,
										minIncome,
									},
								});
							} else if (
								trade &&
								((profitable && minIncome > 0n) || !profitable)
							) {
								dispatch({
									type: 'ExecuteTrade',
									context: {
										converter: t.tokenConverter,
										tokenToReceiveFromConverter: t.assetOut.address,
										tokenToSendToConverter: t.assetIn,
										amount,
										minIncome
									},
								});
							}

							await tokenConverter.arbitrage(
								t.tokenConverter,
								trade,
								amount,
								minIncome,
							);
						}
					}))
			} while (loop);
		}
		convert().catch(e => {
			setError(e.message);
		});
	}, []);

	return (
		<FullScreenBox flexDirection='column'>
			<Title />
			{debug && <Options options={options} />}
			<Box flexDirection="column" flexGrow={1}>
				<Text bold backgroundColor="#3396FF">
					Conversions
				</Text>
				{completed.map((result, idx) => {
					if ('trx' in result) {
						return (
							<BorderBox borderBottom borderStyle="bold" key={idx} flexDirection="column">
								<Text color="green">Trx: {result.trx as string}</Text>
								{result.args && (
									<BorderBox borderTop borderStyle="classic" borderColor="#3396FF">
										<Text>
											{JSON.stringify(result.args || ' ', stringifyBigInt)}
										</Text>
									</BorderBox>
								)}
								<Spacer />
							</BorderBox>
						);
					}
					if ('error' in result) {
						return (
							<BorderBox borderStyle="bold" borderBottom key={idx} flexDirection="column">
								<Text color="red">Error: {result.error as string}</Text>
								{result.args && (
									<BorderBox borderTop borderStyle="classic" borderColor="#3396FF">
										<Text>
											{JSON.stringify(result.args || ' ', stringifyBigInt)}
										</Text>
									</BorderBox>
								)}
							</BorderBox>
						);
					}
					return null;
				})}
				<Spacer />
				<Text bold>Logs</Text>
				{messages.map((msg, idx) => {
					const id =
						msg.type === 'PotentialTrades'
							? idx
							: getConverterConfigId(msg.context);
					return (
						<BorderBox
							key={`${id}-${idx}`}
							flexDirection="row"
							borderStyle="doubleSingle"
							borderColor="#3396FF"
							borderTop
						>
							<Box
								flexGrow={1}
								flexDirection="column"
								marginLeft={1}
								marginRight={1}
								minWidth={60}
							>
								<Text bold>{msg.type}</Text>
								{'blockNumber' in msg && msg.blockNumber !== undefined && (
									<Text bold>Block Number {msg.blockNumber?.toString()}</Text>
								)}
								{'error' in msg && msg.error && (
									<>
										<Text color="red">{msg.error}</Text>
									</>
								)}
								{'pancakeSwapTrade' in msg.context && (
									<Text>
										{JSON.stringify(
											msg.context.pancakeSwapTrade || ' ',
											stringifyBigInt,
										)}
									</Text>
								)}
								{(msg.type === 'Arbitrage' || msg.type === 'ExecuteTrade') && (
									<Text>
										{JSON.stringify(msg.context || ' ', stringifyBigInt)}
									</Text>
								)}
								{msg.type === 'PotentialTrades' ? (
									<Box
										flexGrow={1}
										flexDirection="column"
										minWidth={60}
										marginRight={1}
										marginLeft={1}
									>
										<Text>
											{msg.context.trades.length} Trades found
										</Text>
									</Box>) : null}
							</Box>
						</BorderBox>
					);
				})}
			</Box>
			{error ? <Text color="red">Error - {error}</Text> : null}
		</FullScreenBox>
	);
}
