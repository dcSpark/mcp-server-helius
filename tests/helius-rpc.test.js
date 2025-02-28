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

// Import the handlers after setting up the mocks
import { 
  // DAS Methods
  getAssetHandler,
  getRwaAssetHandler,
  getAssetBatchHandler,
  getAssetProofHandler,
  getAssetsByGroupHandler,
  getAssetsByOwnerHandler,
  getAssetsByCreatorHandler,
  getAssetsByAuthorityHandler,
  searchAssetsHandler,
  getSignaturesForAssetHandler,
  getNftEditionsHandler,
  getTokenAccountsHandler,
  
  // Transaction and Fee Methods
  getPriorityFeeEstimateHandler,
  getComputeUnitsHandler,
  pollTransactionConfirmationHandler,
  createSmartTransactionHandler,
  sendSmartTransactionHandler,
  addTipInstructionHandler,
  createSmartTransactionWithTipHandler,
  sendJitoBundleHandler,
  getBundleStatusesHandler,
  sendSmartTransactionWithTipHandler,
  sendTransactionHandler,
  executeJupiterSwapHandler
} from '../build/handlers/helius.js';

// Valid test values
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_ASSET_ID = 'AssetR1cUu5tNubCzitKAoEKLCKmRjWxWZTp32JzNrNsA';
const VALID_TRANSACTION = 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEDAQZzb2xhbmEBAgEEAQICAQwCAAAAAODjOwAAAAAA';
const VALID_INSTRUCTION = 'AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQMBBnNvbGFuYQECBQECAgEMAgAAAADg4zsAAAAAAA==';

describe('Helius RPC Handlers Tests', () => {
  // DAS Methods Tests
  describe('getAssetHandler', () => {
    test('should return asset details for valid asset ID', async () => {
      const result = await getAssetHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Asset details:'), true);
    });
  });

  describe('getRwaAssetHandler', () => {
    test('should return RWA asset details for valid asset ID', async () => {
      const result = await getRwaAssetHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('RWA Asset details:'), true);
    });
  });

  describe('getAssetBatchHandler', () => {
    test('should return asset batch details for valid asset IDs', async () => {
      const result = await getAssetBatchHandler({ ids: [VALID_ASSET_ID, VALID_ASSET_ID] });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Asset batch details:'), true);
    });
  });

  describe('getAssetProofHandler', () => {
    test('should return asset proof for valid asset ID', async () => {
      const result = await getAssetProofHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Asset proof:'), true);
    });
  });

  describe('getAssetsByGroupHandler', () => {
    test('should return assets by group for valid group key and value', async () => {
      const result = await getAssetsByGroupHandler({ 
        groupKey: 'collection', 
        groupValue: 'VALID_COLLECTION_ID' 
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Assets by group:'), true);
    });
  });

  describe('getAssetsByOwnerHandler', () => {
    test('should return assets by owner for valid owner', async () => {
      const result = await getAssetsByOwnerHandler({ owner: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Assets by owner:'), true);
    });
  });

  describe('getAssetsByCreatorHandler', () => {
    test('should return assets by creator for valid creator', async () => {
      const result = await getAssetsByCreatorHandler({ creator: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Assets by creator:'), true);
    });
  });

  describe('getAssetsByAuthorityHandler', () => {
    test('should return assets by authority for valid authority', async () => {
      const result = await getAssetsByAuthorityHandler({ authority: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Assets by authority:'), true);
    });
  });

  describe('searchAssetsHandler', () => {
    test('should return search results for valid query', async () => {
      const result = await searchAssetsHandler({ query: 'test query' });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Search results:'), true);
    });
  });

  describe('getSignaturesForAssetHandler', () => {
    test('should return signatures for valid asset ID', async () => {
      const result = await getSignaturesForAssetHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Signatures for asset:'), true);
    });
  });

  describe('getNftEditionsHandler', () => {
    test('should return NFT editions for valid master edition ID', async () => {
      const result = await getNftEditionsHandler({ masterEditionId: VALID_ASSET_ID });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('NFT editions:'), true);
    });
  });

  describe('getTokenAccountsHandler', () => {
    test('should return token accounts for valid mint', async () => {
      const result = await getTokenAccountsHandler({ mint: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Token accounts:'), true);
    });

    test('should return token accounts for valid owner', async () => {
      const result = await getTokenAccountsHandler({ owner: VALID_PUBLIC_KEY });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Token accounts:'), true);
    });
  });

  // Transaction and Fee Methods Tests
  describe('getPriorityFeeEstimateHandler', () => {
    test('should return priority fee estimate', async () => {
      const result = await getPriorityFeeEstimateHandler({ 
        accountKeys: [VALID_PUBLIC_KEY],
        options: { priorityLevel: 'high' }
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Priority fee estimate:'), true);
    });
  });

  describe('getComputeUnitsHandler', () => {
    test('should return compute units', async () => {
      const result = await getComputeUnitsHandler({ 
        instructions: [VALID_INSTRUCTION], 
        payer: VALID_PUBLIC_KEY 
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Compute units:'), true);
    });
  });

  describe('pollTransactionConfirmationHandler', () => {
    test('should return transaction status', async () => {
      const result = await pollTransactionConfirmationHandler({ 
        signature: 'valid-signature',
        timeout: 5000,
        interval: 1000
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Transaction status:'), true);
    });
  });

  describe('createSmartTransactionHandler', () => {
    test('should create smart transaction', async () => {
      const result = await createSmartTransactionHandler({ 
        instructions: [VALID_INSTRUCTION],
        signers: [VALID_PUBLIC_KEY]
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Smart transaction created:'), true);
    });
  });

  describe('sendSmartTransactionHandler', () => {
    test('should send smart transaction', async () => {
      const result = await sendSmartTransactionHandler({ 
        instructions: [VALID_INSTRUCTION],
        signers: [VALID_PUBLIC_KEY]
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Smart transaction sent:'), true);
    });
  });

  describe('addTipInstructionHandler', () => {
    test('should add tip instruction', async () => {
      const result = await addTipInstructionHandler({ 
        instructions: [VALID_INSTRUCTION],
        feePayer: VALID_PUBLIC_KEY,
        tipAccount: VALID_PUBLIC_KEY,
        tipAmount: 1000000
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Tip instruction added successfully'), true);
    });
  });

  describe('createSmartTransactionWithTipHandler', () => {
    test('should create smart transaction with tip', async () => {
      const result = await createSmartTransactionWithTipHandler({ 
        instructions: [VALID_INSTRUCTION],
        signers: [VALID_PUBLIC_KEY],
        tipAmount: 1000000
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Smart transaction with tip created:'), true);
    });
  });

  describe('sendJitoBundleHandler', () => {
    test('should send Jito bundle', async () => {
      const result = await sendJitoBundleHandler({ 
        serializedTransactions: [VALID_TRANSACTION],
        jitoApiUrl: 'https://jito-api.example.com'
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Jito bundle sent:'), true);
    });
  });

  describe('getBundleStatusesHandler', () => {
    test('should get bundle statuses', async () => {
      const result = await getBundleStatusesHandler({ 
        bundleIds: ['bundle-id-1', 'bundle-id-2'],
        jitoApiUrl: 'https://jito-api.example.com'
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Bundle statuses:'), true);
    });
  });

  describe('sendSmartTransactionWithTipHandler', () => {
    test('should send smart transaction with tip', async () => {
      const result = await sendSmartTransactionWithTipHandler({ 
        instructions: [VALID_INSTRUCTION],
        signers: [VALID_PUBLIC_KEY],
        tipAmount: 1000000,
        region: 'us-east-1'
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Smart transaction with tip sent:'), true);
    });
  });

  describe('sendTransactionHandler', () => {
    test('should send transaction', async () => {
      const result = await sendTransactionHandler({ 
        transaction: VALID_TRANSACTION,
        options: { skipPreflight: false, maxRetries: 3 }
      });
      assert.strictEqual(result.content[0].type, 'text');
      assert.strictEqual(result.isError, false);
      assert.strictEqual(result.content[0].text.includes('Transaction sent:'), true);
    });
  });

  describe('executeJupiterSwapHandler', () => {
    test('should execute Jupiter swap', async () => {
      const result = await executeJupiterSwapHandler({ 
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
  });
}); 