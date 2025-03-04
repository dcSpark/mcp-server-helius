import * as helius from './handlers/helius.js';
// import { printEnvironmentHandler } from "./handlers/environment.js";
import { 
  getBalanceHandler, 
  getBlockHeightHandler, 
  getTokenAccountsByOwnerHandler, 
  getTokenSupplyHandler,
  getTokenLargestAccountsHandler,
  getLatestBlockhashHandler,
  getTokenAccountBalanceHandler,
  getSlotHandler,
  getTransactionHandler,
  getAccountInfoHandler,
  getProgramAccountsHandler,
  getSignaturesForAddressHandler,
  getMinimumBalanceForRentExemptionHandler,
  getMultipleAccountsHandler,
  getInflationRewardHandler,
  getEpochInfoHandler,
  getEpochScheduleHandler,
  getLeaderScheduleHandler,
  getRecentPerformanceSamplesHandler,
  getVersionHandler,
  getPriorityFeeEstimateHandler,
  pollTransactionConfirmationHandler,
  sendJitoBundleHandler,
  getBundleStatusesHandler,
  getFeeForMessageHandler,
  executeJupiterSwapHandler
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
    name: "helius_get_token_largest_accounts",
    description: "Get the largest token accounts for a specific token mint",
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
  // DAS Methods
  {
    name: 'helius_get_asset',
    description: 'Get details of a digital asset by its ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  {
    name: 'helius_get_rwa_asset',
    description: 'Get details of a real-world asset by its ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  {
    name: 'helius_get_asset_batch',
    description: 'Get details of multiple assets by their IDs',
    inputSchema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'string' } }
      },
      required: ['ids']
    }
  },
  {
    name: 'helius_get_asset_proof',
    description: 'Get proof for a digital asset',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  {
    name: 'helius_get_assets_by_group',
    description: 'Get assets by group key and value',
    inputSchema: {
      type: 'object',
      properties: {
        groupKey: { type: 'string' },
        groupValue: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['groupKey', 'groupValue']
    }
  },
  {
    name: 'helius_get_assets_by_owner',
    description: 'Get assets owned by a specific address',
    inputSchema: {
      type: 'object',
      properties: {
        owner: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['owner']
    }
  },
  {
    name: 'helius_get_assets_by_creator',
    description: 'Get assets created by a specific address',
    inputSchema: {
      type: 'object',
      properties: {
        creator: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['creator']
    }
  },
  {
    name: 'helius_get_assets_by_authority',
    description: 'Get assets by authority address',
    inputSchema: {
      type: 'object',
      properties: {
        authority: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['authority']
    }
  },
  {
    name: 'helius_search_assets',
    description: 'Search for assets using various filters',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        limit: { type: 'number' },
        cursor: { type: 'string' },
        before: { type: 'string' },
        after: { type: 'string' },
        creatorAddress: { type: 'string' },
        ownerAddress: { type: 'string' },
        jsonUri: { type: 'string' },
        grouping: { 
          type: 'array',
          items: { type: 'string' }
        },
        burnt: { type: 'boolean' },
        frozen: { type: 'boolean' },
        supplyMint: { type: 'string' },
        supply: { type: 'number' },
        delegate: { type: 'string' },
        compressed: { type: 'boolean' }
      },
      // At least one filter parameter should be provided
      anyOf: [
        { required: ['ownerAddress'] },
        { required: ['creatorAddress'] },
        { required: ['jsonUri'] },
        { required: ['supplyMint'] },
        { required: ['delegate'] },
        { required: ['burnt'] },
        { required: ['frozen'] },
        { required: ['compressed'] }
      ]
    }
  },
  {
    name: 'helius_get_signatures_for_asset',
    description: 'Get signatures associated with an asset',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['id']
    }
  },
  {
    name: 'helius_get_nft_editions',
    description: 'Get NFT editions for a master edition',
    inputSchema: {
      type: 'object',
      properties: {
        masterEditionId: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      },
      required: ['masterEditionId']
    }
  },
  {
    name: 'helius_get_token_accounts',
    description: 'Get token accounts by mint or owner',
    inputSchema: {
      type: 'object',
      properties: {
        mint: { type: 'string' },
        owner: { type: 'string' },
        page: { type: 'number' },
        limit: { type: 'number' }
      }
    }
  },
  // Transaction and Fee Methods
  {
    name: 'helius_get_priority_fee_estimate',
    description: 'Get priority fee estimate for a transaction',
    inputSchema: {
      type: 'object',
      properties: {
        accountKeys: { type: 'array', items: { type: 'string' } },
        options: {
          type: 'object',
          properties: {
            priorityLevel: { type: 'string', enum: ['default', 'high', 'max'] },
            includeAllPriorityFeeLevels: { type: 'boolean' }
          }
        }
      }
    }
  },
  {
    name: 'helius_poll_transaction_confirmation',
    description: 'Poll for transaction confirmation status',
    inputSchema: {
      type: 'object',
      properties: {
        signature: { type: 'string' },
        timeout: { type: 'number' },
        interval: { type: 'number' }
      },
      required: ['signature']
    }
  },
  {
    name: 'helius_send_jito_bundle',
    description: 'Send a bundle of transactions to Jito',
    inputSchema: {
      type: 'object',
      properties: {
        serializedTransactions: { type: 'array', items: { type: 'string' } },
        jitoApiUrl: { type: 'string' }
      },
      required: ['serializedTransactions', 'jitoApiUrl']
    }
  },
  {
    name: 'helius_get_bundle_statuses',
    description: 'Get statuses of Jito bundles',
    inputSchema: {
      type: 'object',
      properties: {
        bundleIds: { type: 'array', items: { type: 'string' } },
        jitoApiUrl: { type: 'string' }
      },
      required: ['bundleIds', 'jitoApiUrl']
    }
  },
  {
    name: 'helius_get_fee_for_message',
    description: 'Get the fee for a serialized message',
    inputSchema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Base64 encoded message string' },
        commitment: { type: 'string', enum: ['confirmed', 'finalized', 'processed'] }
      },
      required: ['message']
    }
  },
  {
    name: 'helius_execute_jupiter_swap',
    description: 'Execute a token swap using Jupiter',
    inputSchema: {
      type: 'object',
      properties: {
        inputMint: { type: 'string', description: 'The mint address of the input token' },
        outputMint: { type: 'string', description: 'The mint address of the output token' },
        amount: { type: 'number', description: 'The amount of input tokens to swap' },
        maxDynamicSlippageBps: { type: 'number', description: 'Maximum slippage in basis points (optional)' },
        signer: { type: 'string', description: 'The signer public key' }
      },
      required: ['inputMint', 'outputMint', 'amount', 'signer']
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
  "helius_get_token_largest_accounts": getTokenLargestAccountsHandler,
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
  "helius_get_inflation_reward": getInflationRewardHandler,
  "helius_get_epoch_info": getEpochInfoHandler,
  "helius_get_epoch_schedule": getEpochScheduleHandler,
  "helius_get_leader_schedule": getLeaderScheduleHandler,
  "helius_get_recent_performance_samples": getRecentPerformanceSamplesHandler,
  "helius_get_version": getVersionHandler,
  // DAS Methods
  "helius_get_asset": helius.getAssetHandler,
  "helius_get_rwa_asset": helius.getRwaAssetHandler,
  "helius_get_asset_batch": helius.getAssetBatchHandler,
  "helius_get_asset_proof": helius.getAssetProofHandler,
  "helius_get_assets_by_group": helius.getAssetsByGroupHandler,
  "helius_get_assets_by_owner": helius.getAssetsByOwnerHandler,
  "helius_get_assets_by_creator": helius.getAssetsByCreatorHandler,
  "helius_get_assets_by_authority": helius.getAssetsByAuthorityHandler,
  "helius_search_assets": helius.searchAssetsHandler,
  "helius_get_signatures_for_asset": helius.getSignaturesForAssetHandler,
  "helius_get_nft_editions": helius.getNftEditionsHandler,
  "helius_get_token_accounts": helius.getTokenAccountsHandler,
  // Transaction and Fee Methods
  "helius_get_priority_fee_estimate": helius.getPriorityFeeEstimateHandler,
  "helius_poll_transaction_confirmation": helius.pollTransactionConfirmationHandler,
  "helius_send_jito_bundle": helius.sendJitoBundleHandler,
  "helius_get_bundle_statuses": helius.getBundleStatusesHandler,
  "helius_get_fee_for_message": getFeeForMessageHandler,
  "helius_execute_jupiter_swap": executeJupiterSwapHandler
  // "print_environment": printEnvironmentHandler,
}