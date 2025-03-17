# MCP Helius

This repository contains a Model Context Protocol (MCP) server that provides Claude with access to Solana blockchain data via the Helius API. The server enables Claude to perform operations like checking wallet balances, getting blockchain information, and interacting with tokens and NFTs on the Solana blockchain.

## Overview

The MCP server exposes the following tools to Claude:

### Basic Blockchain Operations
- `helius_get_balance`: Get the balance of a Solana wallet address
- `helius_get_block_height`: Get the current block height of the Solana blockchain
- `helius_get_slot`: Get the current slot of the Solana blockchain
- `helius_get_latest_blockhash`: Get the latest blockhash from the Solana blockchain
- `helius_get_transaction`: Get a transaction by its signature
- `helius_get_account_info`: Get account information for a Solana address
- `helius_get_signatures_for_address`: Get transaction signatures for a Solana address
- `helius_get_multiple_accounts`: Get information about multiple Solana accounts
- `helius_get_program_accounts`: Get all accounts owned by a program

### Token Operations
- `helius_get_token_accounts_by_owner`: Get token accounts owned by a Solana address
- `helius_get_token_supply`: Get the supply of a token
- `helius_get_token_account_balance`: Get the balance of a token account
- `helius_get_token_accounts`: Get token accounts by mint or owner

### NFT and Digital Assets
- `helius_get_asset`: Get details of a digital asset by its ID
- `helius_get_rwa_asset`: Get details of a real-world asset by its ID
- `helius_get_asset_batch`: Get details of multiple assets by their IDs
- `helius_get_asset_proof`: Get proof for a digital asset
- `helius_get_assets_by_group`: Get assets by group key and value
- `helius_get_assets_by_owner`: Get assets owned by a specific address
- `helius_get_assets_by_creator`: Get assets created by a specific address
- `helius_get_assets_by_authority`: Get assets by authority address
- `helius_search_assets`: Search for assets using various filters (ownerAddress, creatorAddress, compressed, etc.)
- `helius_get_signatures_for_asset`: Get signatures associated with an asset
- `helius_get_nft_editions`: Get NFT editions for a master edition

### Blockchain System Information
- `helius_get_minimum_balance_for_rent_exemption`: Get the minimum balance required for rent exemption
- `helius_get_inflation_reward`: Get inflation rewards for a list of addresses
- `helius_get_epoch_info`: Get information about the current epoch
- `helius_get_epoch_schedule`: Get the epoch schedule
- `helius_get_leader_schedule`: Get the leader schedule for an epoch
- `helius_get_recent_performance_samples`: Get recent performance samples
- `helius_get_version`: Get the version of the Solana node

### Transaction and Fee Methods
- `helius_get_priority_fee_estimate`: Get priority fee estimate for a transaction
- `helius_poll_transaction_confirmation`: Poll for transaction confirmation status
- `helius_send_jito_bundle`: Send a bundle of transactions to Jito
- `helius_get_bundle_statuses`: Get statuses of Jito bundles
- `helius_get_fee_for_message`: Get the fee for a serialized message
- `helius_execute_jupiter_swap`: Execute a token swap using Jupiter

## Prerequisites

- Node.js (v16 or higher)
- A Helius API key (get one at [https://dev.helius.xyz/](https://dev.helius.xyz/))
- Claude Desktop application

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/dcSpark/mcp-server-helius.git
   cd mcp-server-helius
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

### Configure Claude Desktop

To configure Claude Desktop to use this MCP server:

1. Open Claude Desktop
2. Navigate to the Claude Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

3. Add the MCP server configuration:

```json
{
  "mcpServers": {
    "mcp-server-helius": {
      "command": "npx",
      "args": [
        "@dcspark/mcp-server-helius"
      ],
      "env": {
        "HELIUS_API_KEY": "your-helius-api-key"
      }
    }
  }
}
```

### Running Locally

```bash
HELIUS_API_KEY=your-helius-api-key node build/index.js
```

You can also run directly using npx:
```bash
HELIUS_API_KEY=your-helius-api-key npx @dcspark/mcp-server-helius
```

## Usage

Once configured, restart Claude Desktop. Claude will now have access to the Solana blockchain tools. You can ask Claude to:

1. Check a wallet balance:
   ```
   What's the balance of the Solana wallet address 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8?
   ```

2. Get the current block height:
   ```
   What's the current block height on Solana?
   ```

3. Get information about NFTs:
   ```
   What NFTs does the wallet address 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8 own?
   ```

Claude will use the MCP server to fetch this information directly from the Solana blockchain via Helius.

## Development

### Adding New Tools

To add new tools to the MCP server:

1. Define the tool in `src/tools.ts`
2. Create a handler function in the appropriate handler file
3. Add the handler to the `handlers` object in `src/tools.ts`

### Building

```bash
npm run build
```

## License

MIT
