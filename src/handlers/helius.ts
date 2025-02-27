import { Helius } from "helius-sdk";
import { GetBalanceInput, GetBalanceOutput } from "./helius.types.js";
import { GetBlockHeightInput, GetBlockHeightOutput } from "./helius.types.js";
import { PublicKey } from "@solana/web3.js";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export const getBalanceHandler = async (input: GetBalanceInput): Promise<GetBalanceOutput> => {
  const publicKey = new PublicKey(input.publicKey);
  const balance = await helius.connection.getBalance(publicKey, input.commitment);
  return { balance };
}

export const getBlockHeightHandler = async (input: GetBlockHeightInput): Promise<GetBlockHeightOutput> => {
  const blockHeight = await helius.connection.getBlockHeight(input.commitment);
  return { blockHeight };
}
