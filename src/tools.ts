// import { printEnvironmentHandler } from "./handlers/environment.js";
import { getBalanceHandler, getBlockHeightHandler } from "./handlers/helius.js";

export const tools = [
  {
    name: "calculate_sum",
    description: "Add two numbers together",
    inputSchema: {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "number" }
      },
      required: ["a", "b"]
    },
    outputSchema: {
      type: "number"
    }
  },
  {
    name: "helius_get_balance",
    description: "Get the balance of a Solana address",
    inputSchema: {
      type: "object",
      properties: {
        publicKey: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["publicKey"]
    },
    outputSchema: {
      type: "object",
      properties: {
        balance: { type: "number" }
      },
      required: ["balance"]
    }
  },
  {
    name: "helius_get_block_height",
    description: "Get the block height of the Solana blockchain",
    inputSchema: {
      type: "object",
      properties: {
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: []
    },
    outputSchema: {
      type: "object",
      properties: {
        blockHeight: { type: "number" }
      },
      required: ["blockHeight"]
    }
  },
  /*
  {
    name: "print_environment",
    description: "Print the server's environment variables",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" }
      },
      required: []
    },
    outputSchema: { type: "string" }
  }
  */
]

type handlerDictionary = Record<typeof tools[number]["name"], (input: any) => any>;

export const handlers: handlerDictionary = {
  "helius_get_balance": getBalanceHandler,
  "helius_get_block_height": getBlockHeightHandler,
  // "print_environment": printEnvironmentHandler,
}