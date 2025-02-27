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
