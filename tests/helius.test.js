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
  getTransactionHandler,
  getAccountInfoHandler,
  getProgramAccountsHandler,
  getSignaturesForAddressHandler,
  getMinimumBalanceForRentExemptionHandler,
  getMultipleAccountsHandler,
  getFeeForMessageHandler,
  getInflationRewardHandler,
  getEpochInfoHandler,
  getEpochScheduleHandler,
  getLeaderScheduleHandler,
  getRecentPerformanceSamplesHandler,
  getVersionHandler,
} from '../build/handlers/helius.js';

// Valid Solana addresses for testing
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_TOKEN_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC
const VALID_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'; // Token Program
const VALID_SIGNATURE = '5UfDuX94A1QfqkQvg5WBvM7V13qZXY4WGhTBNfJNZHJGHyQM5RzXYfnMKRqQ9NJ5BwJv2ZqY3C9KYQTnDr4QJwV1';
const VALID_MESSAGE = 'AQABAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAA';

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

  // New tests for additional Helius RPC methods
  describe('getAccountInfoHandler', () => {
    test('should return account info for valid public key', async () => {
      const result = await getAccountInfoHandler({ publicKey: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Account info:'), true);
    });

    test('should return error for invalid public key', async () => {
      const result = await getAccountInfoHandler({ publicKey: 'invalid-public-key' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getProgramAccountsHandler', () => {
    test('should return program accounts for valid program ID', async () => {
      const result = await getProgramAccountsHandler({ programId: VALID_PROGRAM_ID });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Program accounts:'), true);
    });

    test('should return error for invalid program ID', async () => {
      const result = await getProgramAccountsHandler({ programId: 'invalid-program-id' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getSignaturesForAddressHandler', () => {
    test('should return signatures for valid address', async () => {
      const result = await getSignaturesForAddressHandler({ address: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Signatures:'), true);
    });

    test('should return error for invalid address', async () => {
      const result = await getSignaturesForAddressHandler({ address: 'invalid-public-key' });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getMinimumBalanceForRentExemptionHandler', () => {
    test('should return minimum balance for rent exemption', async () => {
      const result = await getMinimumBalanceForRentExemptionHandler({ dataSize: 100 });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Minimum balance for rent exemption:'), true);
    });
  });

  describe('getMultipleAccountsHandler', () => {
    test('should return multiple accounts for valid public keys', async () => {
      const result = await getMultipleAccountsHandler({ publicKeys: [VALID_PUBLIC_KEY, VALID_PUBLIC_KEY] });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Multiple accounts:'), true);
    });

    test('should return error for invalid public keys', async () => {
      const result = await getMultipleAccountsHandler({ publicKeys: [VALID_PUBLIC_KEY, 'invalid-public-key'] });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getFeeForMessageHandler', () => {
    test('should return fee for message', async () => {
      const result = await getFeeForMessageHandler({ message: VALID_MESSAGE });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Fee for message:'), true);
    });
  });

  describe('getInflationRewardHandler', () => {
    test('should return inflation rewards for valid addresses', async () => {
      const result = await getInflationRewardHandler({ addresses: [VALID_PUBLIC_KEY] });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Inflation rewards:'), true);
    });

    test('should return error for invalid addresses', async () => {
      const result = await getInflationRewardHandler({ addresses: ['invalid-public-key'] });
      assert.strictEqual(result.isError, true);
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.content[0].text.includes('Invalid public key'), true);
    });
  });

  describe('getEpochInfoHandler', () => {
    test('should return epoch info', async () => {
      const result = await getEpochInfoHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Epoch info:'), true);
    });
  });

  describe('getEpochScheduleHandler', () => {
    test('should return epoch schedule', async () => {
      const result = await getEpochScheduleHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Epoch schedule:'), true);
    });
  });

  describe('getLeaderScheduleHandler', () => {
    test('should return leader schedule', async () => {
      const result = await getLeaderScheduleHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Leader schedule:'), true);
    });
  });

  describe('getRecentPerformanceSamplesHandler', () => {
    test('should return recent performance samples', async () => {
      const result = await getRecentPerformanceSamplesHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Recent performance samples:'), true);
    });
  });

  describe('getVersionHandler', () => {
    test('should return version', async () => {
      const result = await getVersionHandler({});
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Version:'), true);
    });
  });
}); 