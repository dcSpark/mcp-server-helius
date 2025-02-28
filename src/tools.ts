// import { printEnvironmentHandler } from "./handlers/environment.js";
import { 
  getBalanceHandler, 
  getBlockHeightHandler, 
  getTokenAccountsByOwnerHandler, 
  getTokenSupplyHandler,
  getLatestBlockhashHandler,
  getTokenAccountBalanceHandler,
  getSlotHandler,
  getTransactionHandler,
  getAccountInfoHandler,
  getProgramAccountsHandler,
  getSignaturesForAddressHandler,
  getMinimumBalanceForRentExemptionHandler,
  getMultipleAccountsHandler,
  getFeeForMessageHandler,
  getInflationRewardHandler,
  getEpochInfoHandler,
  getEpochScheduleHandler,
  getLeaderScheduleHandler,
  getRecentPerformanceSamplesHandler,
  getVersionHandler,
  getHealthHandler
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
    }
  },
  // New tools
  {
    name: "helius_get_account_info",
    description: "Get account information for a Solana address",
    inputSchema: {
      type: "object",
      properties: {
        publicKey: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["publicKey"]
    }
  },
  {
    name: "helius_get_program_accounts",
    description: "Get all accounts owned by a program",
    inputSchema: {
      type: "object",
      properties: {
        programId: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["programId"]
    }
  },
  {
    name: "helius_get_signatures_for_address",
    description: "Get transaction signatures for a Solana address",
    inputSchema: {
      type: "object",
      properties: {
        address: { type: "string" },
        limit: { type: "number" },
        before: { type: "string" },
        until: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["address"]
    }
  },
  {
    name: "helius_get_minimum_balance_for_rent_exemption",
    description: "Get the minimum balance required for rent exemption",
    inputSchema: {
      type: "object",
      properties: {
        dataSize: { type: "number" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["dataSize"]
    }
  },
  {
    name: "helius_get_multiple_accounts",
    description: "Get information about multiple Solana accounts",
    inputSchema: {
      type: "object",
      properties: {
        publicKeys: { 
          type: "array",
          items: { type: "string" }
        },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["publicKeys"]
    }
  },
  {
    name: "helius_get_fee_for_message",
    description: "Get the fee for a message",
    inputSchema: {
      type: "object",
      properties: {
        message: { type: "string" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["message"]
    }
  },
  {
    name: "helius_get_inflation_reward",
    description: "Get inflation rewards for a list of addresses",
    inputSchema: {
      type: "object",
      properties: {
        addresses: { 
          type: "array",
          items: { type: "string" }
        },
        epoch: { type: "number" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: ["addresses"]
    }
  },
  {
    name: "helius_get_epoch_info",
    description: "Get information about the current epoch",
    inputSchema: {
      type: "object",
      properties: {
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: []
    }
  },
  {
    name: "helius_get_epoch_schedule",
    description: "Get the epoch schedule",
    inputSchema: {
      type: "object",
      properties: {
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: []
    }
  },
  {
    name: "helius_get_leader_schedule",
    description: "Get the leader schedule for an epoch",
    inputSchema: {
      type: "object",
      properties: {
        slot: { type: "number" },
        commitment: { type: "string", enum: ["confirmed", "finalized", "processed"] }
      },
      required: []
    }
  },
  {
    name: "helius_get_recent_performance_samples",
    description: "Get recent performance samples",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" }
      },
      required: []
    }
  },
  {
    name: "helius_get_version",
    description: "Get the version of the Solana node",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "helius_get_health",
    description: "Get the health of the Solana node",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
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
  "helius_get_transaction": getTransactionHandler,
  // New handlers
  "helius_get_account_info": getAccountInfoHandler,
  "helius_get_program_accounts": getProgramAccountsHandler,
  "helius_get_signatures_for_address": getSignaturesForAddressHandler,
  "helius_get_minimum_balance_for_rent_exemption": getMinimumBalanceForRentExemptionHandler,
  "helius_get_multiple_accounts": getMultipleAccountsHandler,
  "helius_get_fee_for_message": getFeeForMessageHandler,
  "helius_get_inflation_reward": getInflationRewardHandler,
  "helius_get_epoch_info": getEpochInfoHandler,
  "helius_get_epoch_schedule": getEpochScheduleHandler,
  "helius_get_leader_schedule": getLeaderScheduleHandler,
  "helius_get_recent_performance_samples": getRecentPerformanceSamplesHandler,
  "helius_get_version": getVersionHandler,
  "helius_get_health": getHealthHandler
  // "print_environment": printEnvironmentHandler,
}