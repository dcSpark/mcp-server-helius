import { Helius } from "helius-sdk";
import { 
  GetBalanceInput, GetBalanceOutput, 
  GetTokenAccountsByOwnerInput, GetTokenAccountsByOwnerOutput, 
  GetTokenSupplyInput, GetTokenSupplyOutput,
  GetBlockHeightInput, GetBlockHeightOutput,
  GetLatestBlockhashInput, GetLatestBlockhashOutput,
  GetTokenAccountBalanceInput, GetTokenAccountBalanceOutput,
  GetSlotInput, GetSlotOutput,
  GetTransactionInput, GetTransactionOutput
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

export const getBalanceHandler = async (input: GetBalanceInput): Promise<ToolResultSchema<GetBalanceOutput>> => {
  const publicKeyResult = validatePublicKey<GetBalanceOutput>(input.publicKey);
  if (!(publicKeyResult instanceof PublicKey)) {
    return publicKeyResult;
  }
  
  try {
    const balance = await helius.connection.getBalance(publicKeyResult, input.commitment);
    return createSuccessResponse<GetBalanceOutput>(`Balance: ${balance}`);
  } catch (error) {
    return createErrorResponse<GetBalanceOutput>(`Error getting balance: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getBlockHeightHandler = async (input: GetBlockHeightInput): Promise<ToolResultSchema<GetBlockHeightOutput>> => {
  try {
    const blockHeight = await helius.connection.getBlockHeight(input.commitment);
    return createSuccessResponse<GetBlockHeightOutput>(`Block height: ${blockHeight}`);
  } catch (error) {
    return createErrorResponse<GetBlockHeightOutput>(`Error getting block height: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTokenAccountsByOwnerHandler = async (input: GetTokenAccountsByOwnerInput): Promise<ToolResultSchema<GetTokenAccountsByOwnerOutput>> => {
  const ownerPublicKeyResult = validatePublicKey<GetTokenAccountsByOwnerOutput>(input.publicKey);
  if (!(ownerPublicKeyResult instanceof PublicKey)) {
    return ownerPublicKeyResult;
  }
  
  const programIdResult = validatePublicKey<GetTokenAccountsByOwnerOutput>(input.programId);
  if (!(programIdResult instanceof PublicKey)) {
    return programIdResult;
  }
  
  try {
    const tokenAccounts = await helius.connection.getTokenAccountsByOwner(ownerPublicKeyResult, {
      programId: programIdResult,
    });
    return createSuccessResponse<GetTokenAccountsByOwnerOutput>(`
    Context: ${tokenAccounts.context.slot}
    Token accounts: ${tokenAccounts.value.map((tokenAccount) => tokenAccount.pubkey.toString()).join("\n")}`);
  } catch (error) {
    return createErrorResponse<GetTokenAccountsByOwnerOutput>(`Error getting token accounts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTokenSupplyHandler = async (input: GetTokenSupplyInput): Promise<ToolResultSchema<GetTokenSupplyOutput>> => {
  const tokenAddressResult = validatePublicKey<GetTokenSupplyOutput>(input.tokenAddress);
  if (!(tokenAddressResult instanceof PublicKey)) {
    return tokenAddressResult;
  }
  try {
    const tokenSupply = await helius.connection.getTokenSupply(tokenAddressResult);
    return createSuccessResponse<GetTokenSupplyOutput>(`Token supply: ${tokenSupply}`);
  } catch (error) {
    return createErrorResponse<GetTokenSupplyOutput>(`Error getting token supply: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getLatestBlockhashHandler = async (input: GetLatestBlockhashInput): Promise<ToolResultSchema<GetLatestBlockhashOutput>> => {
  try {
    const { blockhash, lastValidBlockHeight } = await helius.connection.getLatestBlockhash(input.commitment);
    return createSuccessResponse<GetLatestBlockhashOutput>(`Latest blockhash: ${blockhash}, Last valid block height: ${lastValidBlockHeight}`);
  } catch (error) {
    return createErrorResponse<GetLatestBlockhashOutput>(`Error getting latest blockhash: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTokenAccountBalanceHandler = async (input: GetTokenAccountBalanceInput): Promise<ToolResultSchema<GetTokenAccountBalanceOutput>> => {
  const tokenAddressResult = validatePublicKey<GetTokenAccountBalanceOutput>(input.tokenAddress);
  if (!(tokenAddressResult instanceof PublicKey)) {
    return tokenAddressResult;
  }
  try {
    const tokenBalance = await helius.connection.getTokenAccountBalance(tokenAddressResult, input.commitment);
    return createSuccessResponse<GetTokenAccountBalanceOutput>(`Token balance: ${JSON.stringify(tokenBalance.value)}`);
  } catch (error) {
    return createErrorResponse<GetTokenAccountBalanceOutput>(`Error getting token account balance: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getSlotHandler = async (input: GetSlotInput): Promise<ToolResultSchema<GetSlotOutput>> => {
  try {
    const slot = await helius.connection.getSlot(input.commitment);
    return createSuccessResponse<GetSlotOutput>(`Current slot: ${slot}`);
  } catch (error) {
    return createErrorResponse<GetSlotOutput>(`Error getting slot: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTransactionHandler = async (input: GetTransactionInput): Promise<ToolResultSchema<GetTransactionOutput>> => {
  try {
    // Use the newer signature with explicit config object
    const transaction = await helius.connection.getTransaction(
      input.signature,
      { maxSupportedTransactionVersion: 0, commitment: input.commitment as any }
    );
    
    if (!transaction) {
      return createErrorResponse<GetTransactionOutput>(`Transaction not found for signature: ${input.signature}`);
    }
    
    return createSuccessResponse<GetTransactionOutput>(`Transaction details: ${JSON.stringify(transaction, null, 2)}`);
  } catch (error) {
    return createErrorResponse<GetTransactionOutput>(`Error getting transaction: ${error instanceof Error ? error.message : String(error)}`);
  }
}
