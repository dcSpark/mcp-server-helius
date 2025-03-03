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
process.env.TEST_MODE = 'false'; // Set to false for success tests

// Import the handlers after setting up the mocks
import * as handlers from '../build/handlers/helius.js';

// Valid Solana addresses for testing
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
const VALID_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'; // Token Program
const VALID_SIGNATURE = '5UfDuX94A1QfqkQvg5WBvM7V13qZXY4WGhTBNfJNZHJGHyQM5RzXYfnMKRqQ9NJ5BwJv2ZqY3C9KYQTnDr4QJwV1';
const VALID_MESSAGE = 'AQABAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAA';

describe('Helius Handlers Success Tests', () => {
  describe('getBalanceHandler', () => {
    test('should return the correct balance for a valid public key', async () => {
      const result = await handlers.getBalanceHandler({ publicKey: VALID_PUBLIC_KEY });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Balance:'));
    });
  });

  describe('getBlockHeightHandler', () => {
    test('should return the current block height', async () => {
      const result = await handlers.getBlockHeightHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Block height:'));
    });
  });

  // Add more tests for other handlers as needed
}); 