import dotenv from "dotenv";
dotenv.config();
console.log("DATABASE_URL =", process.env.DATABASE_URL);
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { createNote } from "./tools/createNote";
import { listNotes } from "./tools/listNotes";
import { getNote } from "./tools/getNote";
import { deleteNote } from "./tools/deleteNote";
import { searchNotes } from "./tools/searchNotes";

const server = new McpServer({
  name: "notes-mcp-server",
  version: "1.0.0",
});

server.tool(
  "create_note",
  "Create a new note with a title and content",
  {
    title: z.string().min(1).max(100).describe("Title of the note"),
    content: z.string().min(1).describe("Content of the note"),
  },
  async ({ title, content }) => {
    const result = await createNote({ title, content });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "list_notes",
  "List all notes",
  {},
  async () => {
    const result = await listNotes();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "get_note",
  "Get a note by id",
  {
    id: z.string().describe("ID of the note"),
  },
  async ({ id }) => {
    const result = await getNote({ id });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "delete_note",
  "Delete a note by id",
  {
    id: z.string().describe("ID of the note to delete"),
  },
  async ({ id }) => {
    const result = await deleteNote({ id });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "search_notes",
  "Search notes by title or content",
  {
    query: z.string().min(1).max(200).describe("Search query"),
  },
  async ({ query }) => {
    const result = await searchNotes({ query });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Notes MCP server running over stdio...");
}

main().catch((error) => {
  console.error("Failed to start Notes MCP server:", error);
  process.exit(1);
});