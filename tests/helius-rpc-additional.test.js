import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PublicKey } from '@solana/web3.js';

// Set environment variables for testing
process.env.HELIUS_API_KEY = 'test-api-key';
process.env.TEST_MODE = 'true';

// Import the handlers
import {
  getBlockTimeHandler,
  getBlockCommitmentHandler,
  getClusterNodesHandler,
  getIdentityHandler,
  getSlotLeaderHandler,
  getGenesisHashHandler,
  getStakeMinimumDelegationHandler,
  getVoteAccountsHandler,
  getInflationGovernorHandler,
  minimumLedgerSlotHandler,
  requestAirdropHandler,
  getTokenAccountsByDelegateHandler,
  getBlocksWithLimitHandler,
  getBlocksHandler,
  getFirstAvailableBlockHandler,
  getSlotLeadersHandler,
  getInflationRateHandler,
  getSignatureStatusesHandler,
  isBlockhashValidHandler,
  getRecentPrioritizationFeesHandler,
  getBlockHandler,
  getBlockProductionHandler,
  getSupplyHandler,
  getTransactionCountHandler,
  getHighestSnapshotSlotHandler,
  getMaxRetransmitSlotHandler,
  getMaxShredInsertSlotHandler,
  simulateTransactionHandler
} from '../build/handlers/helius.js';

// Valid test values
const VALID_PUBLIC_KEY = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_SLOT = 123456789;
const VALID_BLOCK = 123456789;
const VALID_BLOCKHASH = 'J7rBdM6AecPDEZp8aPq5iPSNKVkU5Q76F3oAV4eW5wsW';
const VALID_TRANSACTION = 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEDAQZzb2xhbmEBAgEEAQICAQwCAAAAAODjOwAAAAAA';

describe('Additional Helius RPC Handlers Tests', () => {
  describe('getBlockTimeHandler', () => {
    test('should return block time', async () => {
      const result = await getBlockTimeHandler({ slot: VALID_SLOT });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Block time:'));
    });
  });

  describe('getBlockCommitmentHandler', () => {
    test('should return block commitment', async () => {
      const result = await getBlockCommitmentHandler({ block: VALID_BLOCK });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Block commitment:'));
    });
  });

  describe('getClusterNodesHandler', () => {
    test('should return cluster nodes', async () => {
      const result = await getClusterNodesHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Cluster nodes:'));
    });
  });

  describe('getIdentityHandler', () => {
    test('should return identity', async () => {
      const result = await getIdentityHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Identity:'));
    });
  });

  describe('getSlotLeaderHandler', () => {
    test('should return slot leader', async () => {
      const result = await getSlotLeaderHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Slot leader:'));
    });
  });

  describe('getGenesisHashHandler', () => {
    test('should return genesis hash', async () => {
      const result = await getGenesisHashHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Genesis hash:'));
    });
  });

  describe('getStakeMinimumDelegationHandler', () => {
    test('should return minimum stake delegation', async () => {
      const result = await getStakeMinimumDelegationHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Minimum stake delegation:'));
    });
  });

  describe('getVoteAccountsHandler', () => {
    test('should return vote accounts', async () => {
      const result = await getVoteAccountsHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Vote accounts:'));
    });
  });

  describe('getInflationGovernorHandler', () => {
    test('should return inflation governor', async () => {
      const result = await getInflationGovernorHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Inflation governor:'));
    });
  });

  describe('minimumLedgerSlotHandler', () => {
    test('should return minimum ledger slot', async () => {
      const result = await minimumLedgerSlotHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Minimum ledger slot:'));
    });
  });

  describe('requestAirdropHandler', () => {
    test('should request airdrop', async () => {
      const result = await requestAirdropHandler({ 
        publicKey: VALID_PUBLIC_KEY,
        lamports: 1000000000
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Airdrop requested:'));
    });

    test('should fail with invalid public key', async () => {
      const result = await requestAirdropHandler({ 
        publicKey: 'invalid-key',
        lamports: 1000000000
      });
      assert.strictEqual(result.isError, true);
    });
  });

  describe('getTokenAccountsByDelegateHandler', () => {
    test('should return token accounts by delegate', async () => {
      const result = await getTokenAccountsByDelegateHandler({
        delegateAddress: VALID_PUBLIC_KEY,
        programId: VALID_PUBLIC_KEY
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Token accounts by delegate:'));
    });
  });

  describe('getBlocksWithLimitHandler', () => {
    test('should return blocks with limit', async () => {
      const result = await getBlocksWithLimitHandler({
        startSlot: VALID_SLOT,
        limit: 10
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Blocks:'));
    });
  });

  describe('getBlocksHandler', () => {
    test('should return blocks', async () => {
      const result = await getBlocksHandler({
        startSlot: VALID_SLOT,
        endSlot: VALID_SLOT + 10
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Blocks:'));
    });
  });

  describe('getFirstAvailableBlockHandler', () => {
    test('should return first available block', async () => {
      const result = await getFirstAvailableBlockHandler();
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('First available block:'));
    });
  });

  describe('getSlotLeadersHandler', () => {
    test('should return slot leaders', async () => {
      const result = await getSlotLeadersHandler({
        startSlot: VALID_SLOT,
        limit: 10
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Slot leaders:'));
    });
  });

  describe('getInflationRateHandler', () => {
    test('should return inflation rate', async () => {
      const result = await getInflationRateHandler();
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Inflation rate:'));
    });
  });

  describe('getSignatureStatusesHandler', () => {
    test('should return signature statuses', async () => {
      const result = await getSignatureStatusesHandler({
        signatures: ['signature1', 'signature2']
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Signature statuses:'));
    });
  });

  describe('isBlockhashValidHandler', () => {
    test('should check blockhash validity', async () => {
      const result = await isBlockhashValidHandler({
        blockhash: VALID_BLOCKHASH
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Blockhash validity:'));
    });
  });

  describe('getRecentPrioritizationFeesHandler', () => {
    test('should return recent prioritization fees', async () => {
      const result = await getRecentPrioritizationFeesHandler({
        addresses: [VALID_PUBLIC_KEY]
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Recent prioritization fees:'));
    });
  });

  describe('getBlockHandler', () => {
    test('should return block details', async () => {
      const result = await getBlockHandler({
        slot: VALID_SLOT,
        maxSupportedTransactionVersion: 0
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Block details:'));
    });
  });

  describe('getBlockProductionHandler', () => {
    test('should return block production', async () => {
      const result = await getBlockProductionHandler({
        range: {
          firstSlot: VALID_SLOT,
          lastSlot: VALID_SLOT + 10
        }
      });
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Block production:'));
    });
  });

  describe('getSupplyHandler', () => {
    test('should return supply info', async () => {
      const result = await getSupplyHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Supply info:'));
    });
  });

  describe('getTransactionCountHandler', () => {
    test('should return transaction count', async () => {
      const result = await getTransactionCountHandler({});
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Transaction count:'));
    });
  });

  describe('getHighestSnapshotSlotHandler', () => {
    test('should return highest snapshot slot', async () => {
      const result = await getHighestSnapshotSlotHandler();
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Highest snapshot slot:'));
    });
  });

  describe('getMaxRetransmitSlotHandler', () => {
    test('should return maximum retransmit slot', async () => {
      const result = await getMaxRetransmitSlotHandler();
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Maximum retransmit slot:'));
    });
  });

  describe('getMaxShredInsertSlotHandler', () => {
    test('should return maximum shred insert slot', async () => {
      const result = await getMaxShredInsertSlotHandler();
      assert.strictEqual(result.isError, false);
      assert.ok(result.content[0].text.includes('Maximum shred insert slot:'));
    });
  });

//   describe('simulateTransactionHandler', () => {
//     test('should simulate transaction', async () => {
//       const result = await simulateTransactionHandler({
//         transaction: VALID_TRANSACTION,
//         sigVerify: false,
//         replaceRecentBlockhash: true
//       });
//       assert.strictEqual(result.isError, false);
//       assert.ok(result.content[0].text.includes('Transaction simulation result:'));
//     });
//   });
}); 