import { Address, Hex, concat, numberToHex } from "viem";

const ensureAddress = (addressOrNumber: Address | bigint): Address => {
  if (typeof addressOrNumber === "bigint") {
    throw new Error(`Invalid address: ${addressOrNumber}`);
  }
  return addressOrNumber;
};

const ensureNumber = (addressOrNumber: Address | bigint): bigint => {
  if (typeof addressOrNumber !== "bigint") {
    throw new Error(`Invalid number: ${addressOrNumber}`);
  }
  return addressOrNumber;
};

export interface Path {
  readonly start: Address;
  readonly end: Address;
  readonly data: ReadonlyArray<Address | bigint>;
  readonly hex: Hex;
}

export const parsePath = (data: Array<Address | bigint>): Path => {
  const start = ensureAddress(data[0]);
  const end = ensureAddress(data[data.length - 1]);
  let hex: Hex = "0x";
  for (let i = 0; i < data.length; i += 3) {
    const tokenA = ensureAddress(data[i]);
    const fee = numberToHex(ensureNumber(data[i + 1]), { size: 3 });
    const tokenB = ensureAddress(data[i + 2]);
    hex = concat([hex, tokenA, fee, tokenB]);
  }
  return { start, end, data, hex };
};
