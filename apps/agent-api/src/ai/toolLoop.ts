import { discoverToolsFromAllServers } from "../mcp/registry";

export async function buildToolDescriptions() {
  const tools = await discoverToolsFromAllServers();

  return tools.map(tool => ({
    name: tool.toolName,
    description: tool.description ?? "",
    serverId: tool.serverId,
    inputSchema: tool.inputSchema
  }));
}