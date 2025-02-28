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
    getLatestBlockhash: (commitment?: Commitment) => Promise<{ blockhash: string, lastValidBlockHeight: number }>;
    getTokenAccountBalance: (tokenAddress: PublicKey, commitment?: Commitment) => Promise<{ value: any }>;
    getSlot: (commitment?: Commitment) => Promise<number>;
    getTransaction: (signature: string, options: { maxSupportedTransactionVersion: number, commitment?: Commitment }) => Promise<any>;
    
    // New methods
    getAccountInfo: (publicKey: PublicKey, commitment?: Commitment) => Promise<any>;
    getProgramAccounts: (programId: PublicKey, commitment?: Commitment) => Promise<any>;
    getSignaturesForAddress: (address: PublicKey, options?: { limit?: number, before?: string, until?: string, commitment?: Commitment }) => Promise<any>;
    getMinimumBalanceForRentExemption: (dataSize: number, commitment?: Commitment) => Promise<number>;
    getMultipleAccounts: (publicKeys: PublicKey[], commitment?: Commitment) => Promise<any>;
    getFeeForMessage: (message: string, commitment?: Commitment) => Promise<any>;
    getInflationReward: (addresses: PublicKey[], epoch?: number, commitment?: Commitment) => Promise<any>;
    getEpochInfo: (commitment?: Commitment) => Promise<any>;
    getEpochSchedule: (commitment?: Commitment) => Promise<any>;
    getLeaderSchedule: (slot?: number, commitment?: Commitment) => Promise<any>;
    getRecentPerformanceSamples: (limit?: number) => Promise<any>;
    getVersion: () => Promise<any>;
    getHealth: () => Promise<string>;
  };
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
    
    // New mock implementations
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
    }
  };
} 