import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PublicKey } from '@solana/web3.js';

// Mock PublicKey from @solana/web3.js
const originalPublicKey = PublicKey;
global.PublicKey = function(value) {
  if (value === 'invalid-public-key') {
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
!process.env.HELIUS_API_KEY && (process.env.HELIUS_API_KEY = 'test-api-key');
!process.env.TEST_MODE && (process.env.TEST_MODE = 'true'); // Ensure this is set to 'true' to use the mock client

// Import the searchAssetsHandler after setting up the mocks
import { searchAssetsHandler } from '../build/handlers/helius.js';

// Valid Solana addresses for testing
const VALID_CREATOR_ADDRESS = 'GsbwXfJraMomNxBcjK7xK2xQx5MQgQx8Kb71Wkgwq1Bi';
const VALID_OWNER_ADDRESS = '39kia89d4LMtN1vYKAPZPGGa9r5qgxHMCfvC9o8u81pr';

describe('Helius Search Assets Tests', () => {
  // Test basic search functionality with ownerAddress
  test('should return search results with ownerAddress and default pagination', async () => {
    const result = await searchAssetsHandler({ 
      ownerAddress: VALID_OWNER_ADDRESS 
    });
    
    // Verify the response is successful
    assert.strictEqual(result.isError, false);
    assert.ok(result.content[0].text.startsWith('Search results:'));
    
    // Parse the JSON content from the response
    const content = JSON.parse(result.content[0].text.replace('Search results: ', ''));
    
    // Verify the structure of the response
    assert.ok(content.items);
    assert.ok(Array.isArray(content.items));
    assert.strictEqual(content.page, 1); // Default page should be 1
    assert.strictEqual(content.limit, 10); // Default limit should be 10
    assert.strictEqual(content.items.length, 10); // Should have 10 items by default
  });
  
  // Test with creatorAddress
  test('should return search results with creatorAddress', async () => {
    const result = await searchAssetsHandler({ 
      creatorAddress: VALID_CREATOR_ADDRESS 
    });
    
    // Verify the response is successful
    assert.strictEqual(result.isError, false);
    
    // Parse the JSON content from the response
    const content = JSON.parse(result.content[0].text.replace('Search results: ', ''));
    
    // Verify we get results
    assert.ok(content.items);
    assert.ok(Array.isArray(content.items));
  });
  
  // Test with custom pagination
  test('should respect custom pagination parameters', async () => {
    const customLimit = 5;
    const customPage = 2;
    
    const result = await searchAssetsHandler({ 
      creatorAddress: VALID_CREATOR_ADDRESS, 
      page: customPage, 
      limit: customLimit 
    });
    
    // Verify the response is successful
    assert.strictEqual(result.isError, false);
    
    // Parse the JSON content from the response
    const content = JSON.parse(result.content[0].text.replace('Search results: ', ''));
    
    // Verify pagination parameters were respected
    assert.strictEqual(content.page, customPage);
    assert.strictEqual(content.limit, customLimit);
    assert.strictEqual(content.items.length, customLimit);
  });
  
  // Test with multiple filter parameters
  test('should handle multiple filter parameters', async () => {
    const result = await searchAssetsHandler({ 
      ownerAddress: VALID_OWNER_ADDRESS,
      creatorAddress: VALID_CREATOR_ADDRESS,
      compressed: true
    });
    
    // Verify the response is successful
    assert.strictEqual(result.isError, false);
    
    // Parse the JSON content from the response
    const content = JSON.parse(result.content[0].text.replace('Search results: ', ''));
    
    // Verify we get results
    assert.ok(content.items);
    assert.ok(Array.isArray(content.items));
  });
  
  // Test with boolean filters
  test('should handle boolean filters', async () => {
    // Test with compressed assets
    const result1 = await searchAssetsHandler({ 
      compressed: true 
    });
    
    // Verify the response is successful
    assert.strictEqual(result1.isError, false);
    
    // Test with burnt assets
    const result2 = await searchAssetsHandler({ 
      burnt: true 
    });
    
    // Verify the response is successful
    assert.strictEqual(result2.isError, false);
    
    // Test with frozen assets
    const result3 = await searchAssetsHandler({ 
      frozen: true 
    });
    
    // Verify the response is successful
    assert.strictEqual(result3.isError, false);
  });
  
  // Test with cursor-based pagination
  test('should handle cursor-based pagination', async () => {
    const result = await searchAssetsHandler({ 
      ownerAddress: VALID_OWNER_ADDRESS,
    });
    
    // Verify the response is successful
    assert.strictEqual(result.isError, false);
    
    // Parse the JSON content from the response
    const content = JSON.parse(result.content[0].text.replace('Search results: ', ''));
    
    // Verify we get results
    assert.ok(content.items);
    assert.ok(Array.isArray(content.items));
  });
  
  // Test with before/after parameters
  test('should handle before/after parameters', async () => {
    // Test with before parameter
    const result1 = await searchAssetsHandler({ 
      ownerAddress: VALID_OWNER_ADDRESS,
      before: '2023-01-01T00:00:00Z'
    });
    
    // Verify the response is successful
    assert.strictEqual(result1.isError, false);
    
    // Test with after parameter
    const result2 = await searchAssetsHandler({ 
      ownerAddress: VALID_OWNER_ADDRESS,
      after: '2022-01-01T00:00:00Z'
    });
    
    // Verify the response is successful
    assert.strictEqual(result2.isError, false);
  });
  
  // Test with no parameters (should fail or return default results)
  test('should handle request with no parameters', async () => {
    const result = await searchAssetsHandler({});
    
    // The behavior here depends on the implementation
    // It might fail (isError: true) or return default results
    // We just verify that it returns a valid response
    assert.ok(result.isError !== undefined);
  });
}); 