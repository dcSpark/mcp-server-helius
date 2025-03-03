import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PublicKey } from '@solana/web3.js';

// Set environment variables for testing
process.env.HELIUS_API_KEY = 'test-api-key';
process.env.TEST_MODE = 'true';

// Import the handlers
import { 
  pollTransactionConfirmationHandler,
  sendJitoBundleHandler,
  getBundleStatusesHandler,
  executeJupiterSwapHandler,
  getPriorityFeeEstimateHandler,
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
} from '../build/handlers/helius.js';
// Valid test values
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_ASSET_ID = 'AssetR1cUu5tNubCzitKAoEKLCKmRjWxWZTp32JzNrNsA';
const VALID_TRANSACTION = 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEDAQZzb2xhbmEBAgEEAQICAQwCAAAAAODjOwAAAAAA';
const VALID_INSTRUCTION = 'AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQMBBnNvbGFuYQECBQECAgEMAgAAAADg4zsAAAAAAA==';

describe('Helius RPC Handlers Success Tests', () => {
  // DAS Methods Tests
  describe('getAssetHandler', () => {
    test('should return asset details', async () => {
      const result = await getAssetHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Asset details: ', ''));
      assert.ok(content.id);
      assert.ok(content.content);
    });
  });

  describe('getRwaAssetHandler', () => {
    test('should return RWA asset details', async () => {
      const result = await getRwaAssetHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('RWA Asset details: ', ''));
      assert.ok(content.id);
    });
  });

  describe('getAssetBatchHandler', () => {
    test('should return asset batch details', async () => {
      const result = await getAssetBatchHandler({ ids: [VALID_ASSET_ID, VALID_ASSET_ID] });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Asset batch details: ', ''));
      assert.ok(Array.isArray(content));
      assert.ok(content.length > 0);
    });
  });

  describe('getAssetProofHandler', () => {
    test('should return asset proof', async () => {
      const result = await getAssetProofHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Asset proof: ', ''));
      assert.ok(content.root);
      assert.ok(content.proof);
    });
  });

  describe('getAssetsByGroupHandler', () => {
    test('should return assets by group', async () => {
      const result = await getAssetsByGroupHandler({ 
        groupKey: 'collection', 
        groupValue: 'VALID_COLLECTION_ID' 
      });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Assets by group: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('getAssetsByOwnerHandler', () => {
    test('should return assets by owner', async () => {
      const result = await getAssetsByOwnerHandler({ owner: VALID_PUBLIC_KEY });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Assets by owner: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('getAssetsByCreatorHandler', () => {
    test('should return assets by creator', async () => {
      const result = await getAssetsByCreatorHandler({ creator: VALID_PUBLIC_KEY });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Assets by creator: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('getAssetsByAuthorityHandler', () => {
    test('should return assets by authority', async () => {
      const result = await getAssetsByAuthorityHandler({ authority: VALID_PUBLIC_KEY });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Assets by authority: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('searchAssetsHandler', () => {
    test('should return search results', async () => {
      const result = await searchAssetsHandler({ query: 'test query' });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Search results: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('getSignaturesForAssetHandler', () => {
    test('should return signatures for asset', async () => {
      const result = await getSignaturesForAssetHandler({ id: VALID_ASSET_ID });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Signatures for asset: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('getNftEditionsHandler', () => {
    test('should return NFT editions', async () => {
      const result = await getNftEditionsHandler({ masterEditionId: VALID_ASSET_ID });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('NFT editions: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  describe('getTokenAccountsHandler', () => {
    test('should return token accounts by mint', async () => {
      const result = await getTokenAccountsHandler({ mint: VALID_PUBLIC_KEY });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Token accounts: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });

    test('should return token accounts by owner', async () => {
      const result = await getTokenAccountsHandler({ owner: VALID_PUBLIC_KEY });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Token accounts: ', ''));
      assert.ok(content.items);
      assert.ok(Array.isArray(content.items));
    });
  });

  // Transaction and Fee Methods Tests
  describe('getPriorityFeeEstimateHandler', () => {
    test('should return priority fee estimate', async () => {
      const result = await getPriorityFeeEstimateHandler({ 
        accountKeys: [VALID_PUBLIC_KEY],
        options: { priorityLevel: 'high' }
      });
      assert.strictEqual(result.isError, false);
      const content = result.content[0].text;
      const [priorityFeeEstimate, priorityFeeLevels] = content.split('priorityFeeLevels:');
      const priorityFeeEstimateObject = JSON.parse(priorityFeeEstimate.replace('Priority fee estimate: ', ''));
      const priorityFeeLevelsObject = JSON.parse(priorityFeeLevels);
      assert.ok(priorityFeeEstimateObject !== undefined);
      assert.ok(priorityFeeLevelsObject !== undefined);
    });
  });

  describe('pollTransactionConfirmationHandler', () => {
    test('should return transaction status', async () => {
      const result = await pollTransactionConfirmationHandler({ 
        signature: 'valid-signature',
        timeout: 5000,
        interval: 1000
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Transaction status:'));
    });
  });

  describe('sendJitoBundleHandler', () => {
    test('should send Jito bundle', async () => {
      const result = await sendJitoBundleHandler({ 
        serializedTransactions: [VALID_TRANSACTION],
        jitoApiUrl: 'https://jito-api.example.com'
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Jito bundle sent:'));
    });
  });

  describe('getBundleStatusesHandler', () => {
    test('should get bundle statuses', async () => {
      const result = await getBundleStatusesHandler({ 
        bundleIds: ['bundle-id-1', 'bundle-id-2'],
        jitoApiUrl: 'https://jito-api.example.com'
      });
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Bundle statuses: ', ''));
      assert.ok(Array.isArray(content));
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
      assert.strictEqual(result.isError, false);
      
      const content = JSON.parse(result.content[0].text.replace('Jupiter swap executed: ', ''));
      assert.ok(content);
      // Check for expected properties in the swap result
      assert.ok(content.txid || content.signature || content.transactionId, "Should have a transaction identifier");
      assert.ok(content.inputAmount !== undefined || content.inAmount !== undefined, "Should have input amount information");
      assert.ok(content.outputAmount !== undefined || content.outAmount !== undefined, "Should have output amount information");
    });
  });
}); 