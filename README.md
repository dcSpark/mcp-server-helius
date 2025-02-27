# Shinkai MCP Helius

This repository contains a Model Context Protocol (MCP) server that provides Claude with access to Solana blockchain data via the Helius API. The server enables Claude to perform operations like checking wallet balances and getting the current block height on the Solana blockchain.

## Overview

The MCP server exposes several tools to Claude:

- `helius_get_balance`: Get the balance of a Solana wallet address
- `helius_get_block_height`: Get the current block height of the Solana blockchain

## Prerequisites

- Node.js (v16 or higher)
- A Helius API key (get one at [https://dev.helius.xyz/](https://dev.helius.xyz/))
- Claude Desktop application

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/shinkai-mcp-helius.git
   cd shinkai-mcp-helius
   ```

2. Install dependencies:
   ```bash
   npm install
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
    "shinkai-mcp-helius": {
      "command": "node",
      "args": [
        "/path/to/your/shinkai-mcp-helius/build/index.js"
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
