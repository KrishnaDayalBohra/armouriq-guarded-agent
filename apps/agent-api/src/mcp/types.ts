export type DiscoveredTool = {
  serverId: string;
  toolName: string;
  description?: string;
  inputSchema?: unknown;
};

export type McpServerConfig = {
  id: string;
  transport: "stdio";
  command: string;
  args: string[];
};