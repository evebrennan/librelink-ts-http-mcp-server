import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LibreLinkUpClient } from '@diakem/libre-link-up-api-client';

export const mcpServerCreate = () => {
  const mcpServer = new McpServer({
    name: "MCP-Server",
    version: "1.0.0"
  });

  // Initialize LibreLinkUp client
  // Configuration should be provided via environment variables
  const { read } = LibreLinkUpClient({
    username: process.env.LIBRE_USERNAME || '',
    password: process.env.LIBRE_PASSWORD || '',
    clientVersion: '4.9.0'
  });

  mcpServer.registerTool("read_glucose",
    {
      title: "Read Glucose Readings",
      description: "Fetch previous 12 hours of blood glucose sensor data from LibreLinkUp",
      inputSchema: {}
    },
    async () => {
      const data = await read();
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    }
  );

  return mcpServer
};

