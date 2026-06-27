import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MCP_SERVERS } from "./servers";

export async function executeToolOnServer(params: {
  serverId: string;
  toolName: string;
  args: Record<string, unknown>;
}) {
  const serverConfig = MCP_SERVERS.find(
    (server) => server.id === params.serverId
  );

  if (!serverConfig) {
    throw new Error(`Unknown MCP server: ${params.serverId}`);
  }

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

    const result = await client.callTool({
      name: params.toolName,
      arguments: params.args,
    });

    return result;
  } finally {
    await transport.close();
  }
}