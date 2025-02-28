type HeliusApiKey = { apiKey: string };

export type GetBalanceInput = {
  publicKey: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBalanceOutput = {
  balance: number;
}

export type GetBlockHeightInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBlockHeightOutput = {
  blockHeight: number;
}

export type GetTokenSupplyInput = {
  tokenAddress: string;
}

export type GetTokenSupplyOutput = {
  tokenSupply: number;
}

export type GetTokenAccountsByOwnerInput = {
  publicKey: string;
  programId: string;
}

export type GetTokenAccountsByOwnerOutput = {
  tokenAccounts: TokenAccount[];
}

export type TokenAccount = {
  address: string;
  amount: number;
  mint: string;
  owner: string;
  programId: string;
  uiTokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
}

export type GetLatestBlockhashInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetLatestBlockhashOutput = {
  blockhash: string;
  lastValidBlockHeight: number;
}

export type GetTokenAccountBalanceInput = {
  tokenAddress: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetTokenAccountBalanceOutput = {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
}

export type GetSlotInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetSlotOutput = {
  slot: number;
}

export type GetTransactionInput = {
  signature: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetTransactionOutput = {
  transaction: any; // Using any for simplicity, but in a real implementation this would be properly typed
}

// New input types for additional Helius RPC methods

export type GetAccountInfoInput = {
  publicKey: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetProgramAccountsInput = {
  programId: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetSignaturesForAddressInput = {
  address: string;
  limit?: number;
  before?: string;
  until?: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetMinimumBalanceForRentExemptionInput = {
  dataSize: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetMultipleAccountsInput = {
  publicKeys: string[];
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetFeeForMessageInput = {
  message: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetInflationRewardInput = {
  addresses: string[];
  epoch?: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetEpochInfoInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetEpochScheduleInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetLeaderScheduleInput = {
  slot?: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetRecentPerformanceSamplesInput = {
  limit?: number;
}

export type GetVersionInput = {}

export type GetHealthInput = {}

