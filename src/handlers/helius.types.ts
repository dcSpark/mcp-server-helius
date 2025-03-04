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

export type GetTokenLargestAccountsInput = {
  tokenAddress: string;
  commitment?: "confirmed" | "finalized" | "processed";
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

// Additional RPC Methods
export type AirdropInput = {
  publicKey: string;
  lamports: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetCurrentTPSInput = {}

export type GetStakeAccountsInput = {
  wallet: string;
}

export type GetTokenHoldersInput = {
  mintAddress: string;
}

// DAS Methods
export type GetAssetInput = {
  id: string;
}

export type GetRwaAssetInput = {
  id: string;
}

export type GetAssetBatchInput = {
  ids: string[];
}

export type GetAssetProofInput = {
  id: string;
}

export type GetAssetsByGroupInput = {
  groupKey: string;
  groupValue: string;
  page?: number;
  limit?: number;
}

export type GetAssetsByOwnerInput = {
  owner: string;
  page?: number;
  limit?: number;
}

export type GetAssetsByCreatorInput = {
  creator: string;
  page?: number;
  limit?: number;
}

export type GetAssetsByAuthorityInput = {
  authority: string;
  page?: number;
  limit?: number;
}

export type SearchAssetsInput = {
  query: string;
  page?: number;
  limit?: number;
}

export type GetSignaturesForAssetInput = {
  id: string;
  page?: number;
  limit?: number;
}

export type GetNftEditionsInput = {
  masterEditionId: string;
  page?: number;
  limit?: number;
}

export type GetTokenAccountsInput = {
  mint?: string;
  owner?: string;
  page?: number;
  limit?: number;
}

// Transaction and Fee Methods
export type GetPriorityFeeEstimateInput = {
  accountKeys?: string[];
  options?: {
    priorityLevel?: "default" | "high" | "max";
    includeAllPriorityFeeLevels?: boolean;
  };
}

export type PollTransactionConfirmationInput = {
  signature: string;
  timeout?: number;
  interval?: number;
}

export type SendJitoBundleInput = {
  serializedTransactions: string[];
  jitoApiUrl: string;
}

export type GetBundleStatusesInput = {
  bundleIds: string[];
  jitoApiUrl: string;
}

export type GetFeeForMessageInput = {
  message: string; // Base64 encoded message string
  commitment?: "confirmed" | "finalized" | "processed";
}

export type ExecuteJupiterSwapInput = {
  inputMint: string;
  outputMint: string;
  amount: number;
  maxDynamicSlippageBps?: number;
  signer: string;
}

export type GetBlockTimeInput = {
  slot: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBlockTimeOutput = {
  timestamp: number | null;
}

export type GetBlockCommitmentInput = {
  block: number;
}

export type GetClusterNodesInput = {}

export type GetIdentityInput = {}

export type GetSlotLeaderInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetGenesisHashInput = {}

export type GetStakeMinimumDelegationInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetVoteAccountsInput = {
  commitment?: "confirmed" | "finalized" | "processed";
  votePubkey?: string;
  keepUnstakedDelinquents?: boolean;
}

export type GetInflationGovernorInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type MinimumLedgerSlotInput = {}

export type RequestAirdropInput = {
  publicKey: string;
  lamports: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetTokenAccountsByDelegateInput = {
  delegateAddress: string;
  programId: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBlocksWithLimitInput = {
  startSlot: number;
  limit: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetBlocksInput = {
  startSlot: number;
  endSlot: number;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetFirstAvailableBlockInput = {}

export type GetSlotLeadersInput = {
  startSlot: number;
  limit: number;
}

export type GetInflationRateInput = {}

export type GetSignatureStatusesInput = {
  signatures: string[];
  searchTransactionHistory?: boolean;
}

export type IsBlockhashValidInput = {
  blockhash: string;
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetRecentPrioritizationFeesInput = {
  addresses?: string[];
}

export type GetBlockInput = {
  slot: number;
  commitment?: "confirmed" | "finalized" | "processed";
  transactionDetails?: "full" | "signatures" | "none";
  rewards?: boolean;
  maxSupportedTransactionVersion?: number;
}

export type GetHealthInput = {}

export type GetBlockProductionInput = {
  commitment?: "confirmed" | "finalized" | "processed";
  range?: {
    firstSlot: number;
    lastSlot: number;
  };
  identity?: string;
}

export type GetSupplyInput = {
  commitment?: "confirmed" | "finalized" | "processed";
  excludeNonCirculatingAccountsList?: boolean;
}

export type GetTransactionCountInput = {
  commitment?: "confirmed" | "finalized" | "processed";
}

export type GetHighestSnapshotSlotInput = {}

