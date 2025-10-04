import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { LibreLinkUpClient } from '@diakem/libre-link-up-api-client';

export const mcpServerCreate = () => {
  const mcpServer = new McpServer({
    name: "MCP-Server",
    version: "1.0.0"
  });

  mcpServer.registerTool("add",
    {
      title: "Addition Tool",
      description: "Add two numbers",
      inputSchema: { a: z.number(), b: z.number() }
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(a + b) }]
    })
  );

  mcpServer.registerTool("subtract",
    {
      title: "Subtraction Tool",
      description: "Subtracts two numbers",
      inputSchema: { a: z.number(), b: z.number() }
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(a - b) }]
    })
  );

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

  mcpServer.registerPrompt(
    "greeting-prompt",
    {
      title: "Greeting Prompt",
      description: "Prompt stored on MCP Server",
      argsSchema: { name: z.string() }
    },
    ({ name }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `Hello ${name}!`
        }
      }]
    })
  );

  return mcpServer
};

