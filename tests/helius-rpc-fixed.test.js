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
process.env.TEST_MODE = 'true';

// Import all handlers using the namespace import
import * as helius from '../build/handlers/helius.js';

// Valid test values
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_ASSET_ID = 'AssetR1cUu5tNubCzitKAoEKLCKmRjWxWZTp32JzNrNsA';
const VALID_TRANSACTION = 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEDAQZzb2xhbmEBAgEEAQICAQwCAAAAAODjOwAAAAAA';
const VALID_INSTRUCTION = 'AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQMBBnNvbGFuYQECBQECAgEMAgAAAADg4zsAAAAAAA==';

describe('Helius RPC Handlers Tests', () => {
  // DAS Methods Tests
  describe('getAssetHandler', () => {
    test('should return mock asset details in test mode', async () => {
      const result = await helius.getAssetHandler({ id: VALID_ASSET_ID });
      console.log('getAssetHandler result', JSON.stringify(result, null, 2));
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Mock Asset'), true);
    });
  });

  describe('getRwaAssetHandler', () => {
    test('should return mock RWA asset details in test mode', async () => {
      const result = await helius.getRwaAssetHandler({ id: VALID_ASSET_ID });
      console.log('getRwaAssetHandler result', JSON.stringify(result, null, 2));
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Mock RWA Asset'), true);
    });
  });

  describe('executeJupiterSwapHandler', () => {
    test('should execute Jupiter swap', async () => {
      const result = await helius.executeJupiterSwapHandler({ 
        inputMint: VALID_PUBLIC_KEY,
        outputMint: VALID_PUBLIC_KEY,
        amount: 1000000,
        maxDynamicSlippageBps: 100,
        signer: VALID_PUBLIC_KEY
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Jupiter swap executed:'), true);
    });

    test('should return error for invalid signer', async () => {
      const result = await helius.executeJupiterSwapHandler({ 
        inputMint: VALID_PUBLIC_KEY,
        outputMint: VALID_PUBLIC_KEY,
        amount: 1000000,
        maxDynamicSlippageBps: 100,
        signer: 'invalid-public-key'
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });
}); 