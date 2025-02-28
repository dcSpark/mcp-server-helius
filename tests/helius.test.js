import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PublicKey } from '@solana/web3.js';

// Mock PublicKey from @solana/web3.js
// We need to replace the entire PublicKey class, not just modify its prototype
const originalPublicKey = PublicKey;
global.PublicKey = function(value) {
  if (value === 'invalid-public-key' || value === 'invalid-token-address' || value === 'invalid-program-id') {
    throw new Error('Invalid public key');
  }
  this.value = value;
  this.toString = function() {
    return this.value;
  };
  return this;
};
global.PublicKey.prototype = Object.create(originalPublicKey.prototype);
global.PublicKey.prototype.constructor = global.PublicKey;

// Set environment variables for testing
process.env.HELIUS_API_KEY = 'test-api-key';
// TEST_MODE is set by the npm script

// Now import the handlers after setting up the mocks
import { 
  getBalanceHandler, 
  getBlockHeightHandler, 
  getTokenAccountsByOwnerHandler, 
  getTokenSupplyHandler,
  getLatestBlockhashHandler,
  getTokenAccountBalanceHandler,
  getSlotHandler,
  getTransactionHandler
} from '../build/handlers/helius.js';

// Valid Solana addresses for testing
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
const VALID_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'; // Token Program
const VALID_SIGNATURE = '5UfDuX94A1QfqkQvg5WBvM7V13qZXY4WGhTBNfJNZHJGHyQM5RzXYfnMKRqQ9NJ5BwJv2ZqY3C9KYQTnDr4QJwV1';

describe('Helius Handlers Tests', () => {
  describe('getBalanceHandler', () => {
    test('should return balance for valid public key', async () => {
      const result = await getBalanceHandler({ publicKey: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Balance:'), true);
    });

    test('should return error for invalid public key', async () => {
      const result = await getBalanceHandler({ publicKey: 'invalid-public-key' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getBlockHeightHandler', () => {
    test('should return block height', async () => {
      const result = await getBlockHeightHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Block height:'), true);
    });
  });

  describe('getTokenAccountsByOwnerHandler', () => {
    test('should return token accounts for valid owner and program ID', async () => {
      const result = await getTokenAccountsByOwnerHandler({ 
        publicKey: VALID_PUBLIC_KEY, 
        programId: VALID_PROGRAM_ID 
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Token accounts:'), true);
    });

    test('should return error for invalid owner', async () => {
      const result = await getTokenAccountsByOwnerHandler({ 
        publicKey: 'invalid-public-key', 
        programId: VALID_PROGRAM_ID 
      });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });

    test('should return error for invalid program ID', async () => {
      const result = await getTokenAccountsByOwnerHandler({ 
        publicKey: VALID_PUBLIC_KEY, 
        programId: 'invalid-program-id' 
      });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getTokenSupplyHandler', () => {
    test('should return token supply for valid token address', async () => {
      const result = await getTokenSupplyHandler({ tokenAddress: VALID_TOKEN_ADDRESS });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Token supply:'), true);
    });

    test('should return error for invalid token address', async () => {
      const result = await getTokenSupplyHandler({ tokenAddress: 'invalid-token-address' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getLatestBlockhashHandler', () => {
    test('should return latest blockhash', async () => {
      const result = await getLatestBlockhashHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Latest blockhash:'), true);
    });
  });

  describe('getTokenAccountBalanceHandler', () => {
    test('should return token account balance for valid token address', async () => {
      const result = await getTokenAccountBalanceHandler({ tokenAddress: VALID_TOKEN_ADDRESS });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Token balance:'), true);
    });

    test('should return error for invalid token address', async () => {
      const result = await getTokenAccountBalanceHandler({ tokenAddress: 'invalid-token-address' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getSlotHandler', () => {
    test('should return current slot', async () => {
      const result = await getSlotHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Current slot:'), true);
    });
  });

  describe('getTransactionHandler', () => {
    test('should return transaction details for valid signature', async () => {
      const result = await getTransactionHandler({ signature: VALID_SIGNATURE });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Transaction details:'), true);
    });

    test('should return error when transaction not found', async () => {
      const result = await getTransactionHandler({ signature: 'non-existent-signature' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Transaction not found'), true);
    });
  });
}); 