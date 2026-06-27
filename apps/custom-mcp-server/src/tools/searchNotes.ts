import { z } from "zod";
import { prisma } from "../lib/prisma";

export const searchNotesSchema = z.object({
  query: z.string().min(1, "Search query is required").max(200, "Query too long"),
});

export type SearchNotesInput = z.infer<typeof searchNotesSchema>;

export async function searchNotes(input: SearchNotesInput) {
  const parsed = searchNotesSchema.parse(input);

  const notes = await prisma.note.findMany({
    where: {
      OR: [
        { title: { contains: parsed.query } },
        { content: { contains: parsed.query } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,
    notes,
  };
}