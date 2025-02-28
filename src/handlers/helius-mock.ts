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
    }
  };
} 