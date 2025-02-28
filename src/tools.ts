// import { printEnvironmentHandler } from "./handlers/environment.js";
import { 
  getBalanceHandler, 
  getBlockHeightHandler, 
  getTokenAccountsByOwnerHandler, 
  getTokenSupplyHandler,
  getLatestBlockhashHandler,
  getTokenAccountBalanceHandler,
  getSlotHandler,
  getTransactionHandler
} from "./handlers/helius.js";

export const tools = [
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
  {
    name: "helius_get_token_accounts_by_owner",
    description: "Get token accounts owned by a Solana address",
    inputSchema: {
      type: "object",
      properties: {
        publicKey: { type: "string" },
        programId: { type: "string" }
      },
      required: ["publicKey", "programId"]
    },
    outputSchema: {
      type: "object",
      properties: {
        tokenAccounts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              address: { type: "string" },
              amount: { type: "number" },
              mint: { type: "string" },
              owner: { type: "string" },
              programId: { type: "string" },
              uiTokenAmount: {
                type: "object",
                properties: {
                  amount: { type: "string" },
                  decimals: { type: "number" },
                  uiAmount: { type: "number" },
                  uiAmountString: { type: "string" }
                }
              }
            }
          }
        }
      },
      required: ["tokenAccounts"]
    }
  },
  {
    name: "helius_get_token_supply",
    description: "Get the supply of a token",
    inputSchema: {
      type: "object",
      properties: {
        tokenAddress: { type: "string" }
      },
      required: ["tokenAddress"]
    },
    outputSchema: {
      type: "object",
      properties: {
        tokenSupply: { type: "number" }
      },
      required: ["tokenSupply"]
    }
  },
  {
    name: "helius_get_latest_blockhash",
    description: "Get the latest blockhash from the Solana blockchain",
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
        blockhash: { type: "string" },
        lastValidBlockHeight: { type: "number" }
      },
      required: ["blockhash", "lastValidBlockHeight"]
    }
  },
  {
    name: "helius_get_token_account_balance",
    description: "Get the balance of a token account",
    inputSchema: {
      type: "object",
      properties: {
        tokenAddress: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["tokenAddress"]
    },
    outputSchema: {
      type: "object",
      properties: {
        amount: { type: "string" },
        decimals: { type: "number" },
        uiAmount: { type: "number" },
        uiAmountString: { type: "string" }
      },
      required: ["amount", "decimals", "uiAmount", "uiAmountString"]
    }
  },
  {
    name: "helius_get_slot",
    description: "Get the current slot of the Solana blockchain",
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
        slot: { type: "number" }
      },
      required: ["slot"]
    }
  },
  {
    name: "helius_get_transaction",
    description: "Get a transaction by its signature",
    inputSchema: {
      type: "object",
      properties: {
        signature: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["signature"]
    },
    outputSchema: {
      type: "object",
      properties: {
        transaction: { type: "object" }
      },
      required: ["transaction"]
    }
  }
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
  "helius_get_token_accounts_by_owner": getTokenAccountsByOwnerHandler,
  "helius_get_token_supply": getTokenSupplyHandler,
  "helius_get_latest_blockhash": getLatestBlockhashHandler,
  "helius_get_token_account_balance": getTokenAccountBalanceHandler,
  "helius_get_slot": getSlotHandler,
  "helius_get_transaction": getTransactionHandler
  // "print_environment": printEnvironmentHandler,
}