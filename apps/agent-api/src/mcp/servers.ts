import path from "path";
import { McpServerConfig } from "./types";

const customServerEntry = path.resolve(
  process.cwd(),
  "../custom-mcp-server/src/index.ts"
);

export const MCP_SERVERS: McpServerConfig[] = [
  {
    id: "notes-mcp",
    transport: "stdio",
    command: "npx",
    args: ["tsx", customServerEntry],
  },
  {
    id: "everything-mcp",
    transport: "stdio",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-everything"],
  },
];