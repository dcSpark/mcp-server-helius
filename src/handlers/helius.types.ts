type HeliusApiKey = { apiKey: string };

export type GetBalanceInput = HeliusApiKey & {
  publicKey: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBalanceOutput = {
  balance: number;
}

export type GetBlockHeightInput = HeliusApiKey & {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBlockHeightOutput = {
  blockHeight: number;
}

export type GetTokenSupplyInput = HeliusApiKey & {
  tokenAddress: string;
}

export type GetTokenSupplyOutput = {
  tokenSupply: number;
}

export type GetTokenAccountsByOwnerInput = HeliusApiKey & {
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

export type GetLatestBlockhashInput = HeliusApiKey & {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetLatestBlockhashOutput = {
  blockhash: string;
  lastValidBlockHeight: number;
}

export type GetTokenAccountBalanceInput = HeliusApiKey & {
  tokenAddress: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetTokenAccountBalanceOutput = {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
}

export type GetSlotInput = HeliusApiKey & {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetSlotOutput = {
  slot: number;
}

export type GetTransactionInput = HeliusApiKey & {
  signature: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetTransactionOutput = {
  transaction: any; // Using any for simplicity, but in a real implementation this would be properly typed
}

