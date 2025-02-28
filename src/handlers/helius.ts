import { Helius } from "helius-sdk";
import { 
  GetBalanceInput,
  GetTokenAccountsByOwnerInput,
  GetTokenSupplyInput,
  GetBlockHeightInput,
  GetLatestBlockhashInput,
  GetTokenAccountBalanceInput,
  GetSlotInput,
  GetTransactionInput,
  GetAccountInfoInput,
  GetProgramAccountsInput,
  GetSignaturesForAddressInput,
  GetMinimumBalanceForRentExemptionInput,
  GetMultipleAccountsInput,
  GetFeeForMessageInput,
  GetInflationRewardInput,
  GetEpochInfoInput,
  GetEpochScheduleInput,
  GetLeaderScheduleInput,
  GetRecentPerformanceSamplesInput,
  GetVersionInput,
  GetHealthInput
} from "./helius.types.js";
import { PublicKey, Commitment } from "@solana/web3.js";
import { ToolResultSchema } from "../types.js";
import { createErrorResponse, createSuccessResponse, validatePublicKey } from "./utils.js";
import { HeliusClient, MockHeliusClient } from "./helius-mock.js";

// Determine which client to use based on environment variable
let helius: HeliusClient;

if (process.env.TEST_MODE === 'true') {
  helius = new MockHeliusClient();
} else {
  helius = new Helius(process.env.HELIUS_API_KEY as string) as unknown as HeliusClient;
}

export const getBalanceHandler = async (input: GetBalanceInput): Promise<ToolResultSchema<any>> => {
  const publicKeyResult = validatePublicKey(input.publicKey);
  if (!(publicKeyResult instanceof PublicKey)) {
    return publicKeyResult;
  }
  
  try {
    const balance = await helius.connection.getBalance(publicKeyResult, input.commitment);
    return createSuccessResponse(`Balance: ${balance}`);
  } catch (error) {
    return createErrorResponse(`Error getting balance: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getBlockHeightHandler = async (input: GetBlockHeightInput): Promise<ToolResultSchema<any>> => {
  try {
    const blockHeight = await helius.connection.getBlockHeight(input.commitment);
    return createSuccessResponse(`Block height: ${blockHeight}`);
  } catch (error) {
    return createErrorResponse(`Error getting block height: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTokenAccountsByOwnerHandler = async (input: GetTokenAccountsByOwnerInput): Promise<ToolResultSchema<any>> => {
  const ownerPublicKeyResult = validatePublicKey(input.publicKey);
  if (!(ownerPublicKeyResult instanceof PublicKey)) {
    return ownerPublicKeyResult;
  }
  
  const programIdResult = validatePublicKey(input.programId);
  if (!(programIdResult instanceof PublicKey)) {
    return programIdResult;
  }
  
  try {
    const tokenAccounts = await helius.connection.getTokenAccountsByOwner(ownerPublicKeyResult, {
      programId: programIdResult,
    });
    return createSuccessResponse(`
    Context: ${tokenAccounts.context.slot}
    Token accounts: ${tokenAccounts.value.map((tokenAccount) => tokenAccount.pubkey.toString()).join("\n")}`);
  } catch (error) {
    return createErrorResponse(`Error getting token accounts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTokenSupplyHandler = async (input: GetTokenSupplyInput): Promise<ToolResultSchema<any>> => {
  const tokenAddressResult = validatePublicKey(input.tokenAddress);
  if (!(tokenAddressResult instanceof PublicKey)) {
    return tokenAddressResult;
  }
  try {
    const tokenSupply = await helius.connection.getTokenSupply(tokenAddressResult);
    return createSuccessResponse(`Token supply: ${tokenSupply}`);
  } catch (error) {
    return createErrorResponse(`Error getting token supply: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getLatestBlockhashHandler = async (input: GetLatestBlockhashInput): Promise<ToolResultSchema<any>> => {
  try {
    const { blockhash, lastValidBlockHeight } = await helius.connection.getLatestBlockhash(input.commitment);
    return createSuccessResponse(`Latest blockhash: ${blockhash}, Last valid block height: ${lastValidBlockHeight}`);
  } catch (error) {
    return createErrorResponse(`Error getting latest blockhash: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTokenAccountBalanceHandler = async (input: GetTokenAccountBalanceInput): Promise<ToolResultSchema<any>> => {
  const tokenAddressResult = validatePublicKey(input.tokenAddress);
  if (!(tokenAddressResult instanceof PublicKey)) {
    return tokenAddressResult;
  }
  try {
    const tokenBalance = await helius.connection.getTokenAccountBalance(tokenAddressResult, input.commitment);
    return createSuccessResponse(`Token balance: ${JSON.stringify(tokenBalance.value)}`);
  } catch (error) {
    return createErrorResponse(`Error getting token account balance: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getSlotHandler = async (input: GetSlotInput): Promise<ToolResultSchema<any>> => {
  try {
    const slot = await helius.connection.getSlot(input.commitment);
    return createSuccessResponse(`Current slot: ${slot}`);
  } catch (error) {
    return createErrorResponse(`Error getting slot: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTransactionHandler = async (input: GetTransactionInput): Promise<ToolResultSchema<any>> => {
  try {
    // Use the newer signature with explicit config object
    const transaction = await helius.connection.getTransaction(
      input.signature,
      { maxSupportedTransactionVersion: 0, commitment: input.commitment as any }
    );
    
    if (!transaction) {
      return createErrorResponse(`Transaction not found for signature: ${input.signature}`);
    }
    
    return createSuccessResponse(`Transaction details: ${JSON.stringify(transaction, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting transaction: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// New handlers for additional Helius RPC methods

export const getAccountInfoHandler = async (input: GetAccountInfoInput): Promise<ToolResultSchema<any>> => {
  const publicKeyResult = validatePublicKey(input.publicKey);
  if (!(publicKeyResult instanceof PublicKey)) {
    return publicKeyResult;
  }
  
  try {
    const accountInfo = await helius.connection.getAccountInfo(publicKeyResult, input.commitment);
    return createSuccessResponse(`Account info: ${JSON.stringify(accountInfo, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting account info: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getProgramAccountsHandler = async (input: GetProgramAccountsInput): Promise<ToolResultSchema<any>> => {
  const programIdResult = validatePublicKey(input.programId);
  if (!(programIdResult instanceof PublicKey)) {
    return programIdResult;
  }
  
  try {
    const programAccounts = await helius.connection.getProgramAccounts(programIdResult, input.commitment);
    return createSuccessResponse(`Program accounts: ${JSON.stringify(programAccounts, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting program accounts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getSignaturesForAddressHandler = async (input: GetSignaturesForAddressInput): Promise<ToolResultSchema<any>> => {
  const addressResult = validatePublicKey(input.address);
  if (!(addressResult instanceof PublicKey)) {
    return addressResult;
  }
  
  try {
    const options: any = {};
    if (input.limit) options.limit = input.limit;
    if (input.before) options.before = input.before;
    if (input.until) options.until = input.until;
    if (input.commitment) options.commitment = input.commitment;
    
    const signatures = await helius.connection.getSignaturesForAddress(addressResult, options);
    return createSuccessResponse(`Signatures: ${JSON.stringify(signatures, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting signatures: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getMinimumBalanceForRentExemptionHandler = async (input: GetMinimumBalanceForRentExemptionInput): Promise<ToolResultSchema<any>> => {
  try {
    const minBalance = await helius.connection.getMinimumBalanceForRentExemption(input.dataSize, input.commitment);
    return createSuccessResponse(`Minimum balance for rent exemption: ${minBalance}`);
  } catch (error) {
    return createErrorResponse(`Error getting minimum balance: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getMultipleAccountsHandler = async (input: GetMultipleAccountsInput): Promise<ToolResultSchema<any>> => {
  try {
    const publicKeys = [];
    for (const pk of input.publicKeys) {
      const result = validatePublicKey(pk);
      if (!(result instanceof PublicKey)) {
        return result; // Return the error response if any public key is invalid
      }
      publicKeys.push(result);
    }
    
    const accounts = await helius.connection.getMultipleAccounts(publicKeys, input.commitment);
    return createSuccessResponse(`Multiple accounts: ${JSON.stringify(accounts, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting multiple accounts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getFeeForMessageHandler = async (input: GetFeeForMessageInput): Promise<ToolResultSchema<any>> => {
  try {
    const fee = await helius.connection.getFeeForMessage(input.message, input.commitment);
    return createSuccessResponse(`Fee for message: ${JSON.stringify(fee, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting fee for message: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getInflationRewardHandler = async (input: GetInflationRewardInput): Promise<ToolResultSchema<any>> => {
  try {
    const addresses = [];
    for (const addr of input.addresses) {
      const result = validatePublicKey(addr);
      if (!(result instanceof PublicKey)) {
        return result; // Return the error response if any address is invalid
      }
      addresses.push(result);
    }
    
    const rewards = await helius.connection.getInflationReward(addresses, input.epoch, input.commitment);
    return createSuccessResponse(`Inflation rewards: ${JSON.stringify(rewards, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting inflation rewards: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getEpochInfoHandler = async (input: GetEpochInfoInput): Promise<ToolResultSchema<any>> => {
  try {
    const epochInfo = await helius.connection.getEpochInfo(input.commitment);
    return createSuccessResponse(`Epoch info: ${JSON.stringify(epochInfo, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting epoch info: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getEpochScheduleHandler = async (input: GetEpochScheduleInput): Promise<ToolResultSchema<any>> => {
  try {
    const epochSchedule = await helius.connection.getEpochSchedule(input.commitment);
    return createSuccessResponse(`Epoch schedule: ${JSON.stringify(epochSchedule, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting epoch schedule: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getLeaderScheduleHandler = async (input: GetLeaderScheduleInput): Promise<ToolResultSchema<any>> => {
  try {
    const leaderSchedule = await helius.connection.getLeaderSchedule(input.slot, input.commitment);
    return createSuccessResponse(`Leader schedule: ${JSON.stringify(leaderSchedule, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting leader schedule: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getRecentPerformanceSamplesHandler = async (input: GetRecentPerformanceSamplesInput): Promise<ToolResultSchema<any>> => {
  try {
    const samples = await helius.connection.getRecentPerformanceSamples(input.limit);
    return createSuccessResponse(`Recent performance samples: ${JSON.stringify(samples, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting performance samples: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getVersionHandler = async (input: GetVersionInput): Promise<ToolResultSchema<any>> => {
  try {
    const version = await helius.connection.getVersion();
    return createSuccessResponse(`Version: ${JSON.stringify(version, null, 2)}`);
  } catch (error) {
    return createErrorResponse(`Error getting version: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getHealthHandler = async (input: GetHealthInput): Promise<ToolResultSchema<any>> => {
  try {
    const health = await helius.connection.getHealth();
    return createSuccessResponse(`Health: ${health}`);
  } catch (error) {
    return createErrorResponse(`Error getting health: ${error instanceof Error ? error.message : String(error)}`);
  }
}
