import { PublicKey } from "@solana/web3.js";
import { ToolResultSchema } from "../types.js";

/**
 * Utility function to handle PublicKey construction and error handling
 * @param publicKeyString The public key string to convert to a PublicKey object
 * @returns An object containing either the PublicKey or an error message
 */
export const createPublicKey = (publicKeyString: string): { publicKey?: PublicKey; error?: string } => {
  try {
    const publicKey = new PublicKey(publicKeyString);
    return { publicKey };
  } catch (error) {
    return { error: `Invalid public key: ${publicKeyString}` };
  }
};

/**
 * Utility function to create an error response
 * @param message The error message
 * @returns A ToolResultSchema with the error message
 */
export const createErrorResponse = <T>(message: string): ToolResultSchema<T> => {
  return {
    content: [{
      type: "text",
      text: message
    }],
    isError: true
  };
};

/**
 * Utility function to create a success response
 * @param message The success message
 * @returns A ToolResultSchema with the success message
 */
export const createSuccessResponse = <T>(message: string): ToolResultSchema<T> => {
  return {
    content: [{
      type: "text",
      text: message
    }],
    isError: false
  };
};

/**
 * Utility function to validate a public key and return an error response if invalid
 * @param publicKeyString The public key string to validate
 * @returns Either a PublicKey object or a ToolResultSchema with an error message
 */
export const validatePublicKey = <T>(publicKeyString: string): PublicKey | ToolResultSchema<T> => {
  const { publicKey, error } = createPublicKey(publicKeyString);
  if (error) {
    return createErrorResponse<T>(error);
  }
  return publicKey!;
}; 