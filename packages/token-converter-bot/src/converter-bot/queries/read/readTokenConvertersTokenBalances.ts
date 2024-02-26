import "dotenv/config";

import { Abi, Address } from "viem";

import { coreVTokenAbi, protocolShareReserveAbi } from "../../../config/abis/generated";
import addresses, { underlyingToVTokens } from "../../../config/addresses";
import publicClient from "../../../config/clients/publicClient";
import { TokenConverterConfig } from "./readTokenConverterConfigs/formatTokenConverterConfigs";

export interface BalanceResult {
  tokenConverter: Address;
  assetIn: { address: Address; balance: bigint };
  assetOut: { address: Address; balance: bigint };
  assetOutVTokens: {
    core: `0x${string}` | undefined;
    isolated: [`0x${string}`, `0x${string}`][] | undefined;
  };
}

const formatResults = (
  results: (
    | {
        error: Error;
        result?: undefined;
        status: "failure";
      }
    | {
        error?: undefined;
        result: unknown;
        status: "success";
      }
  )[],
  tokenConverterConfigs: TokenConverterConfig[],
): BalanceResult[] => {
  const chunkSize = 2;
  const balances: BalanceResult[] = [];

  for (let i = 0; i < results.length; i += chunkSize) {
    const index = (i + chunkSize) / chunkSize - 1;
    const tokenConverter = tokenConverterConfigs[index].tokenConverter;
    const assetIn = tokenConverterConfigs[index].tokenAddressIn;
    const assetOut = tokenConverterConfigs[index].tokenAddressOut;

    const curr = results.slice(i, i + chunkSize);

    const vToken = underlyingToVTokens[assetOut];
    const balance = {
      assetOutVTokens: vToken,
      tokenConverter,
      assetIn: { address: assetIn, balance: curr[0].result as bigint },
      assetOut: { address: assetOut, balance: curr[1].result as bigint },
    };

    balances.push(balance);
  }
  return balances;
};

export const readTokenConvertersTokenBalances = async (
  pools: [Address, readonly Address[]][],
  tokenConverterConfigs: TokenConverterConfig[],
  releaseFunds?: boolean,
): Promise<{ results: BalanceResult[]; blockNumber: bigint }> => {
  const releaseFundsCalls = releaseFunds
    ? pools.map(pool => ({
        address: addresses.ProtocolShareReserve as Address,
        abi: protocolShareReserveAbi,
        functionName: "releaseFunds",
        args: pool,
      }))
    : [];
  const blockNumber = await publicClient.getBlockNumber();
  const results = await publicClient.multicall({
    blockNumber,
    contracts: [
      ...releaseFundsCalls,
      ...tokenConverterConfigs.reduce((acc, curr) => {
        acc = acc.concat([
          {
            address: curr.tokenAddressIn,
            abi: coreVTokenAbi,
            functionName: "balanceOf",
            args: [curr.tokenConverter],
          },
          {
            address: curr.tokenAddressOut,
            abi: coreVTokenAbi,
            functionName: "balanceOf",
            args: [curr.tokenConverter],
          },
        ]);
        return acc;
      }, [] as { address: Address; abi: Abi; functionName: string; args?: readonly unknown[] | undefined }[]),
    ],
  });
  // Release funds will be empty
  results.splice(0, releaseFundsCalls.length);
  const formattedResults = formatResults(results, tokenConverterConfigs);
  return { results: formattedResults, blockNumber };
};

export default readTokenConvertersTokenBalances;
