import { Helius } from "helius-sdk";
import { GetBalanceInput, GetBalanceOutput } from "./helius.types.js";
import { GetBlockHeightInput, GetBlockHeightOutput } from "./helius.types.js";
import { PublicKey } from "@solana/web3.js";
import { ToolResultSchema } from "../types.js";

const helius = new Helius(process.env.HELIUS_API_KEY as string);

export const getBalanceHandler = async (input: GetBalanceInput): Promise<ToolResultSchema<GetBalanceOutput>> => {
  const publicKey = new PublicKey(input.publicKey);
  const balance = await helius.connection.getBalance(publicKey, input.commitment);
  return {
    content: [{
      type: "text",
      text: `Balance: ${balance}`
    }]
  };
}

export const getBlockHeightHandler = async (input: GetBlockHeightInput): Promise<ToolResultSchema<GetBlockHeightOutput>> => {
  const blockHeight = await helius.connection.getBlockHeight(input.commitment);
  return {
    content: [{
      type: "text",
      text: `Block height: ${blockHeight}`
    }]
  };
}
