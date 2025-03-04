import { PublicKey, Commitment } from "@solana/web3.js";

// Define types to match Helius SDK
export type GetBalanceConfig = {
  commitment?: Commitment;
};

// Interface for Helius client to allow for mocking
export interface HeliusClient {
  connection: {
    getBalance: (publicKey: PublicKey, commitmentOrConfig?: Commitment | GetBalanceConfig) => Promise<number>;
    getBlockHeight: (commitment?: Commitment) => Promise<number>;
    getTokenAccountsByOwner: (owner: PublicKey, filter: { programId: PublicKey }) => Promise<{ context: { slot: number }, value: Array<{ pubkey: { toString: () => string } }> }>;
    getTokenSupply: (tokenAddress: PublicKey) => Promise<any>;
    getTokenLargestAccounts: (tokenAddress: PublicKey, commitment?: Commitment) => Promise<{ context: { slot: number }, value: Array<{ address: string, amount: string, decimals: number, uiAmount: number, uiAmountString: string }> }>;
    getLatestBlockhash: (commitment?: Commitment) => Promise<{ blockhash: string, lastValidBlockHeight: number }>;
    getTokenAccountBalance: (tokenAddress: PublicKey, commitment?: Commitment) => Promise<{ value: any }>;
    getSlot: (commitment?: Commitment) => Promise<number>;
    getTransaction: (signature: string, options: { maxSupportedTransactionVersion: number, commitment?: Commitment }) => Promise<any>;
    
    // Core Solana RPC methods
    getAccountInfo: (publicKey: PublicKey, commitment?: Commitment) => Promise<any>;
    getProgramAccounts: (programId: PublicKey, commitment?: Commitment) => Promise<any>;
    getSignaturesForAddress: (address: PublicKey, options?: { limit?: number, before?: string, until?: string, commitment?: Commitment }) => Promise<any>;
    getMinimumBalanceForRentExemption: (dataSize: number, commitment?: Commitment) => Promise<number>;
    getMultipleAccounts: (publicKeys: PublicKey[], commitment?: Commitment) => Promise<any>;
    getMultipleAccountsInfo: (publicKeys: PublicKey[], commitment?: Commitment) => Promise<any>;
    getFeeForMessage: (message: string, commitment?: Commitment) => Promise<any>;
    getInflationReward: (addresses: PublicKey[], epoch?: number, commitment?: Commitment) => Promise<any>;
    getEpochInfo: (commitment?: Commitment) => Promise<any>;
    getEpochSchedule: (commitment?: Commitment) => Promise<any>;
    getLeaderSchedule: (slot?: number, commitment?: Commitment) => Promise<any>;
    getRecentPerformanceSamples: (limit?: number) => Promise<any>;
    getVersion: () => Promise<any>;
    getHealth: () => Promise<string>;
    
    // Additional RPC methods
    airdrop: (publicKey: PublicKey, lamports: number, commitment?: Commitment) => Promise<any>;
    getCurrentTPS: () => Promise<number>;
    getStakeAccounts: (wallet: string) => Promise<any>;
    getTokenHolders: (mintAddress: string) => Promise<any>;
  };
  
  rpc: {
    // DAS Methods
    getAsset: (id: string) => Promise<any>;
    getRwaAsset: (params: { id: string }) => Promise<any>;
    getAssetBatch: (params: { ids: string[] }) => Promise<any>;
    getAssetProof: (params: { id: string }) => Promise<any>;
    getAssetsByGroup: (params: { groupKey: string, groupValue: string, page?: number, limit?: number }) => Promise<any>;
    getAssetsByOwner: (params: { ownerAddress: string, page?: number, limit?: number }) => Promise<any>;
    getAssetsByCreator: (params: { creatorAddress: string, page?: number, limit?: number }) => Promise<any>;
    getAssetsByAuthority: (params: { authorityAddress: string, page?: number, limit?: number }) => Promise<any>;
    searchAssets: (params: { 
      page?: number, 
      limit?: number, 
      cursor?: string,
      before?: string,
      after?: string,
      creatorAddress?: string,
      ownerAddress?: string,
      jsonUri?: string,
      grouping?: string[],
      burnt?: boolean,
      frozen?: boolean,
      supplyMint?: string,
      supply?: number,
      delegate?: string,
      compressed?: boolean
    }) => Promise<any>;
    getSignaturesForAsset: (params: { id: string, page?: number, limit?: number }) => Promise<any>;
    getNftEditions: (params: { masterEditionId: string, page?: number, limit?: number }) => Promise<any>;
    getTokenAccounts: (params: { mint?: string, owner?: string, page?: number, limit?: number }) => Promise<any>;
    
    // Transaction and Fee Methods
    getPriorityFeeEstimate: (params: { accountKeys?: string[], options?: { priorityLevel?: string, includeAllPriorityFeeLevels?: boolean } }) => Promise<any>;
    getComputeUnits: (instructions: string[], payer: string, lookupTables?: string[]) => Promise<number | null>;
    pollTransactionConfirmation: (signature: string, options?: { timeout?: number, interval?: number }) => Promise<string>;
    createSmartTransaction: (instructions: string[], signers: string[], lookupTables?: string[], options?: any) => Promise<any>;
    sendSmartTransaction: (instructions: string[], signers: string[], lookupTables?: string[], options?: any) => Promise<string>;
    addTipInstruction: (instructions: string[], feePayer: string, tipAccount: string, tipAmount: number) => void;
    createSmartTransactionWithTip: (instructions: string[], signers: string[], lookupTables?: string[], tipAmount?: number, options?: any) => Promise<any>;
    sendJitoBundle: (serializedTransactions: string[], jitoApiUrl: string) => Promise<string>;
    getBundleStatuses: (bundleIds: string[], jitoApiUrl: string) => Promise<any>;
    sendSmartTransactionWithTip: (instructions: string[], signers: string[], lookupTables?: string[], tipAmount?: number, region?: string, options?: any) => Promise<string>;
    sendTransaction: (transaction: string, options?: { skipPreflight?: boolean, maxRetries?: number }) => Promise<string>;
    executeJupiterSwap: (params: { inputMint: string, outputMint: string, amount: number, maxDynamicSlippageBps?: number }, signer: string) => Promise<any>;
  }
}

// Create a mock implementation for testing
export class MockHeliusClient implements HeliusClient {
  connection = {
    getBalance: async (publicKey: PublicKey) => {
      return 1000000000; // 1 SOL in lamports
    },
    
    getBlockHeight: async () => {
      return 123456789;
    },
    
    getTokenAccountsByOwner: async (owner: PublicKey, filter: { programId: PublicKey }) => {
      return {
        context: { slot: 123456789 },
        value: [
          { pubkey: { toString: () => "TokenAccount1" } },
          { pubkey: { toString: () => "TokenAccount2" } }
        ]
      };
    },
    
    getTokenSupply: async (tokenAddress: PublicKey) => {
      return "1000000000";
    },
    
    getTokenLargestAccounts: async (tokenAddress: PublicKey, commitment?: Commitment) => {
      return {
        context: { slot: 123456789 },
        value: [
          {
            address: "TokenAccount1",
            amount: "1000000000",
            decimals: 6,
            uiAmount: 1000,
            uiAmountString: "1000"
          },
          {
            address: "TokenAccount2",
            amount: "500000000",
            decimals: 6,
            uiAmount: 500,
            uiAmountString: "500"
          }
        ]
      };
    },
    
    getLatestBlockhash: async () => {
      return {
        blockhash: "TestBlockhash123",
        lastValidBlockHeight: 123456789
      };
    },
    
    getTokenAccountBalance: async (tokenAddress: PublicKey) => {
      return {
        value: {
          amount: "1000000000",
          decimals: 6,
          uiAmount: 1000,
          uiAmountString: "1000"
        }
      };
    },
    
    getSlot: async () => {
      return 123456789;
    },
    
    getTransaction: async (signature: string) => {
      if (signature === "non-existent-signature") {
        return null;
      }
      return {
        slot: 123456789,
        meta: { fee: 5000 },
        transaction: { signatures: [signature] }
      };
    },
    
    // Core Solana RPC methods
    getAccountInfo: async (publicKey: PublicKey) => {
      return {
        context: { slot: 123456789 },
        value: {
          data: ["base64data", "base64"],
          executable: false,
          lamports: 1000000000,
          owner: "11111111111111111111111111111111",
          rentEpoch: 123
        }
      };
    },
    
    getProgramAccounts: async (programId: PublicKey) => {
      return [
        {
          pubkey: { toString: () => "ProgramAccount1" },
          account: {
            data: ["base64data", "base64"],
            executable: false,
            lamports: 1000000000,
            owner: programId.toString(),
            rentEpoch: 123
          }
        },
        {
          pubkey: { toString: () => "ProgramAccount2" },
          account: {
            data: ["base64data", "base64"],
            executable: false,
            lamports: 2000000000,
            owner: programId.toString(),
            rentEpoch: 123
          }
        }
      ];
    },
    
    getSignaturesForAddress: async (address: PublicKey, options?: { limit?: number }) => {
      const limit = options?.limit || 10;
      return Array(limit).fill(0).map((_, i) => ({
        signature: `MockSignature${i}`,
        slot: 123456789 + i,
        err: null,
        memo: null,
        blockTime: Date.now() / 1000
      }));
    },
    
    getMinimumBalanceForRentExemption: async (dataSize: number) => {
      return dataSize * 1000; // Mock calculation
    },
    
    getMultipleAccounts: async (publicKeys: PublicKey[]) => {
      return {
        context: { slot: 123456789 },
        value: publicKeys.map((pk, i) => ({
          data: ["base64data", "base64"],
          executable: false,
          lamports: 1000000000 + i,
          owner: "11111111111111111111111111111111",
          rentEpoch: 123
        }))
      };
    },
    
    getMultipleAccountsInfo: async (publicKeys: PublicKey[]) => {
      return publicKeys.map((pk, i) => ({
        data: ["base64data", "base64"],
        executable: false,
        lamports: 1000000000 + i,
        owner: "11111111111111111111111111111111",
        rentEpoch: 123
      }));
    },
    
    getFeeForMessage: async (message: string) => {
      return {
        context: { slot: 123456789 },
        value: 5000
      };
    },
    
    getInflationReward: async (addresses: PublicKey[], epoch?: number) => {
      return addresses.map((_, i) => ({
        epoch: epoch || 123,
        effectiveSlot: 123456789,
        amount: 1000000 + i,
        postBalance: 10000000000 + i,
        commission: null
      }));
    },
    
    getEpochInfo: async () => {
      return {
        epoch: 123,
        slotIndex: 456,
        slotsInEpoch: 432000,
        absoluteSlot: 123456789,
        blockHeight: 123456000
      };
    },
    
    getEpochSchedule: async () => {
      return {
        slotsPerEpoch: 432000,
        leaderScheduleSlotOffset: 432000,
        warmup: false,
        firstNormalEpoch: 0,
        firstNormalSlot: 0
      };
    },
    
    getLeaderSchedule: async () => {
      return {
        "ValidatorPubkey1": [0, 1, 2, 3],
        "ValidatorPubkey2": [4, 5, 6, 7]
      };
    },
    
    getRecentPerformanceSamples: async (limit?: number) => {
      const count = limit || 10;
      return Array(count).fill(0).map((_, i) => ({
        slot: 123456789 - i * 100,
        numTransactions: 1000 + i,
        numSlots: 1,
        samplePeriodSecs: 60
      }));
    },
    
    getVersion: async () => {
      return {
        "solana-core": "1.14.0",
        "feature-set": 123456789
      };
    },
    
    getHealth: async () => {
      return "ok";
    },
    
    // Additional RPC methods
    airdrop: async (publicKey: PublicKey, lamports: number) => {
      return {
        signature: "MockAirdropSignature",
        confirmResponse: {
          context: { slot: 123456789 },
          value: { err: null }
        },
        blockhash: "MockBlockhash",
        lastValidBlockHeight: 123456789
      };
    },
    
    getCurrentTPS: async () => {
      return 1500; // Mock TPS value
    },
    
    getStakeAccounts: async (wallet: string) => {
      return {
        "StakeAccount1": {
          stake: 1000000000,
          delegation: {
            activationEpoch: 100,
            deactivationEpoch: 200,
            voter: "ValidatorPubkey1",
            stake: 1000000000
          }
        },
        "StakeAccount2": {
          stake: 2000000000,
          delegation: {
            activationEpoch: 110,
            deactivationEpoch: 210,
            voter: "ValidatorPubkey2",
            stake: 2000000000
          }
        }
      };
    },
    
    getTokenHolders: async (mintAddress: string) => {
      return [
        {
          pubkey: new PublicKey("TokenHolder1"),
          account: {
            data: ["base64data", "base64"],
            executable: false,
            lamports: 1000000,
            owner: "TokenProgramId",
            rentEpoch: 123
          }
        },
        {
          pubkey: new PublicKey("TokenHolder2"),
          account: {
            data: ["base64data", "base64"],
            executable: false,
            lamports: 2000000,
            owner: "TokenProgramId",
            rentEpoch: 123
          }
        }
      ];
    }
  };
  
  rpc = {
    // DAS Methods
    getAsset: async (id: string) => {
      return {
        id,
        content: {
          metadata: {
            name: "Mock Asset",
            symbol: "MOCK",
            description: "A mock asset for testing"
          }
        },
        ownership: {
          owner: "MockOwner",
          delegate: null
        },
        authorities: [
          {
            address: "MockAuthority",
            scopes: ["full"]
          }
        ],
        compression: {
          compressed: true,
          proof: "MockProof"
        }
      };
    },
    
    getRwaAsset: async (params: { id: string }) => {
      return {
        id: params.id,
        content: {
          metadata: {
            name: "Mock RWA Asset",
            symbol: "MRWA",
            description: "A mock RWA asset for testing"
          }
        },
        ownership: {
          owner: "MockOwner",
          delegate: null
        }
      };
    },
    
    getAssetBatch: async (params: { ids: string[] }) => {
      return params.ids.map(id => ({
        id,
        content: {
          metadata: {
            name: `Mock Asset ${id}`,
            symbol: "MOCK",
            description: "A mock asset for testing"
          }
        },
        ownership: {
          owner: "MockOwner",
          delegate: null
        }
      }));
    },
    
    getAssetProof: async (params: { id: string }) => {
      return {
        root: "MockRoot",
        proof: ["MockProof1", "MockProof2"],
        node_index: 123,
        leaf: "MockLeaf",
        tree_id: "MockTreeId"
      };
    },
    
    getAssetsByGroup: async (params: { groupKey: string, groupValue: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          id: `MockAsset${i}`,
          content: {
            metadata: {
              name: `Mock Asset ${i}`,
              symbol: "MOCK",
              description: "A mock asset for testing"
            }
          },
          ownership: {
            owner: "MockOwner",
            delegate: null
          },
          grouping: [
            {
              group_key: params.groupKey,
              group_value: params.groupValue
            }
          ]
        }))
      };
    },
    
    getAssetsByOwner: async (params: { ownerAddress: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          id: `MockAsset${i}`,
          content: {
            metadata: {
              name: `Mock Asset ${i}`,
              symbol: "MOCK",
              description: "A mock asset for testing"
            }
          },
          ownership: {
            owner: params.ownerAddress,
            delegate: null
          }
        }))
      };
    },
    
    getAssetsByCreator: async (params: { creatorAddress: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          id: `MockAsset${i}`,
          content: {
            metadata: {
              name: `Mock Asset ${i}`,
              symbol: "MOCK",
              description: "A mock asset for testing"
            },
            creators: [
              {
                address: params.creatorAddress,
                verified: true,
                share: 100
              }
            ]
          },
          ownership: {
            owner: "MockOwner",
            delegate: null
          }
        }))
      };
    },
    
    getAssetsByAuthority: async (params: { authorityAddress: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          id: `MockAsset${i}`,
          content: {
            metadata: {
              name: `Mock Asset ${i}`,
              symbol: "MOCK",
              description: "A mock asset for testing"
            }
          },
          ownership: {
            owner: "MockOwner",
            delegate: null
          },
          authorities: [
            {
              address: params.authorityAddress,
              scopes: ["full"]
            }
          ]
        }))
      };
    },
    
    searchAssets: async (params: { 
      page?: number, 
      limit?: number, 
      cursor?: string,
      before?: string,
      after?: string,
      creatorAddress?: string,
      ownerAddress?: string,
      jsonUri?: string,
      grouping?: string[],
      burnt?: boolean,
      frozen?: boolean,
      supplyMint?: string,
      supply?: number,
      delegate?: string,
      compressed?: boolean
    }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          id: `MockAsset${i}`,
          content: {
            metadata: {
              name: `Mock Asset ${i}`,
              symbol: "MOCK",
              description: "A mock asset for testing"
            }
          },
          ownership: {
            owner: params.ownerAddress || "MockOwner",
            delegate: params.delegate || null
          },
          compressed: params.compressed || false,
          burnt: params.burnt || false,
          frozen: params.frozen || false
        }))
      };
    },
    
    getSignaturesForAsset: async (params: { id: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          signature: `MockSignature${i}`,
          type: "TRANSFER",
          source: "MARKETPLACE",
          slot: 123456789 + i,
          blockTime: Date.now() / 1000 - i * 3600,
          memo: null,
          err: null
        }))
      };
    },
    
    getNftEditions: async (params: { masterEditionId: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          id: `MockEdition${i}`,
          number: i + 1,
          masterEdition: params.masterEditionId,
          content: {
            metadata: {
              name: `Mock Edition ${i}`,
              symbol: "MOCK",
              description: "A mock edition for testing"
            }
          },
          ownership: {
            owner: `MockOwner${i}`,
            delegate: null
          }
        }))
      };
    },
    
    getTokenAccounts: async (params: { mint?: string, owner?: string, page?: number, limit?: number }) => {
      const limit = params.limit || 10;
      return {
        total: 100,
        limit,
        page: params.page || 1,
        items: Array(limit).fill(0).map((_, i) => ({
          address: `MockTokenAccount${i}`,
          mint: params.mint || `MockMint${i}`,
          owner: params.owner || `MockOwner${i}`,
          amount: 1000000000 + i,
          delegateOption: 0,
          delegate: null,
          state: "initialized",
          isNative: false,
          rentExemptReserve: null,
          closeAuthority: null
        }))
      };
    },
    
    // Transaction and Fee Methods
    getPriorityFeeEstimate: async (params: { accountKeys?: string[], options?: { priorityLevel?: string, includeAllPriorityFeeLevels?: boolean } }) => {
      if (params.options?.includeAllPriorityFeeLevels) {
        return {
          priorityFeeEstimate: 5000,
          priorityFeeLevels: {
            default: 5000,
            high: 10000,
            max: 20000
          }
        };
      }
      return {
        priorityFeeEstimate: 5000
      };
    },
    
    getComputeUnits: async (instructions: string[], payer: string, lookupTables?: string[]) => {
      return 200000; // Mock compute units
    },
    
    pollTransactionConfirmation: async (signature: string, options?: { timeout?: number, interval?: number }) => {
      return signature; // Mock successful confirmation
    },
    
    createSmartTransaction: async (instructions: string[], signers: string[], lookupTables?: string[], options?: any) => {
      return {
        serializedTransaction: "MockSerializedTransaction",
        blockhash: "MockBlockhash",
        lastValidBlockHeight: 123456789,
        slot: 123456789
      };
    },
    
    sendSmartTransaction: async (instructions: string[], signers: string[], lookupTables?: string[], options?: any) => {
      return "MockTransactionSignature";
    },
    
    addTipInstruction: (instructions: string[], feePayer: string, tipAccount: string, tipAmount: number) => {
      // Mock implementation - doesn't need to return anything
    },
    
    createSmartTransactionWithTip: async (instructions: string[], signers: string[], lookupTables?: string[], tipAmount?: number, options?: any) => {
      return {
        serializedTransaction: "MockSerializedTransactionWithTip",
        blockhash: "MockBlockhash",
        lastValidBlockHeight: 123456789,
        slot: 123456789
      };
    },
    
    sendJitoBundle: async (serializedTransactions: string[], jitoApiUrl: string) => {
      return "MockBundleId";
    },
    
    getBundleStatuses: async (bundleIds: string[], jitoApiUrl: string) => {
      return bundleIds.map(id => ({
        id,
        status: "confirmed"
      }));
    },
    
    sendSmartTransactionWithTip: async (instructions: string[], signers: string[], lookupTables?: string[], tipAmount?: number, region?: string, options?: any) => {
      return "MockBundleId";
    },
    
    sendTransaction: async (transaction: string, options?: { skipPreflight?: boolean, maxRetries?: number }) => {
      return "MockTransactionSignature";
    },
    
    executeJupiterSwap: async (params: { inputMint: string, outputMint: string, amount: number, maxDynamicSlippageBps?: number }, signer: string) => {
      return {
        signature: "MockSwapSignature",
        inputAmount: params.amount,
        outputAmount: params.amount * 10, // Mock exchange rate
        inputMint: params.inputMint,
        outputMint: params.outputMint,
        slippage: params.maxDynamicSlippageBps ? params.maxDynamicSlippageBps / 100 : 0.01
      };
    }
  };
} 