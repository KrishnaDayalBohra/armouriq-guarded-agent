import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MCP_SERVERS } from "./servers";
import { DiscoveredTool } from "./types";

export async function discoverToolsFromAllServers(): Promise<DiscoveredTool[]> {
  const allTools: DiscoveredTool[] = [];

  for (const serverConfig of MCP_SERVERS) {
    const transport = new StdioClientTransport({
      command: serverConfig.command,
      args: serverConfig.args,
    });

    const client = new Client({
      name: "armoriq-agent-client",
      version: "1.0.0",
    });

    try {
      await client.connect(transport);

      const result = await client.listTools();

      const tools = result.tools.map((tool) => ({
        serverId: serverConfig.id,
        toolName: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      }));

      allTools.push(...tools);
    } finally {
      await transport.close();
    }
  }

  return allTools;
}