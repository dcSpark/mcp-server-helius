import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PublicKey } from '@solana/web3.js';

// Mock PublicKey from @solana/web3.js
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

// Import the handlers after setting up the mocks
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

describe('Helius Handlers Success Tests', () => {
  describe('getBalanceHandler', () => {
    test('should return the correct balance for a valid public key', async () => {
      const result = await getBalanceHandler({ publicKey: VALID_PUBLIC_KEY });
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      assert.strictEqual(result.content[0].text, 'Balance: 1000000000');
    });
  });

  describe('getBlockHeightHandler', () => {
    test('should return the correct block height', async () => {
      const result = await getBlockHeightHandler({});
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      assert.strictEqual(result.content[0].text, 'Block height: 123456789');
    });
  });

  describe('getTokenAccountsByOwnerHandler', () => {
    test('should return the correct token accounts for a valid owner and program ID', async () => {
      const result = await getTokenAccountsByOwnerHandler({ 
        publicKey: VALID_PUBLIC_KEY, 
        programId: VALID_PROGRAM_ID 
      });
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      assert.strictEqual(result.content[0].text.includes('Context: 123456789'), true);
      assert.strictEqual(result.content[0].text.includes('TokenAccount1'), true);
      assert.strictEqual(result.content[0].text.includes('TokenAccount2'), true);
    });
  });

  describe('getTokenSupplyHandler', () => {
    test('should return the correct token supply for a valid token address', async () => {
      const result = await getTokenSupplyHandler({ tokenAddress: VALID_TOKEN_ADDRESS });
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      assert.strictEqual(result.content[0].text, 'Token supply: 1000000000');
    });
  });

  describe('getLatestBlockhashHandler', () => {
    test('should return the correct latest blockhash', async () => {
      const result = await getLatestBlockhashHandler({});
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      assert.strictEqual(result.content[0].text, 'Latest blockhash: TestBlockhash123, Last valid block height: 123456789');
    });
  });

  describe('getTokenAccountBalanceHandler', () => {
    test('should return the correct token account balance for a valid token address', async () => {
      const result = await getTokenAccountBalanceHandler({ tokenAddress: VALID_TOKEN_ADDRESS });
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      const expectedValue = {
        amount: "1000000000",
        decimals: 6,
        uiAmount: 1000,
        uiAmountString: "1000"
      };
      assert.strictEqual(result.content[0].text, `Token balance: ${JSON.stringify(expectedValue)}`);
    });
  });

  describe('getSlotHandler', () => {
    test('should return the correct current slot', async () => {
      const result = await getSlotHandler({});
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content matches our mock implementation
      assert.strictEqual(result.content[0].text, 'Current slot: 123456789');
    });
  });

  describe('getTransactionHandler', () => {
    test('should return the correct transaction details for a valid signature', async () => {
      const result = await getTransactionHandler({ signature: VALID_SIGNATURE });
      
      // Verify the response structure
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the content includes transaction details from our mock
      assert.strictEqual(result.content[0].text.includes('slot'), true);
      assert.strictEqual(result.content[0].text.includes('123456789'), true);
      assert.strictEqual(result.content[0].text.includes('fee'), true);
      assert.strictEqual(result.content[0].text.includes('5000'), true);
    });

    test('should return error when transaction not found', async () => {
      const result = await getTransactionHandler({ signature: 'non-existent-signature' });
      
      // Verify the response structure
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].type, 'text');
      
      // Verify the error message
      assert.strictEqual(result.content[0].text, 'Transaction not found for signature: non-existent-signature');
    });
  });
}); 