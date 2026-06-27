import { z } from "zod";
import { prisma } from "../lib/prisma";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(1, "Content is required"),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export async function createNote(input: CreateNoteInput) {
  const parsed = createNoteSchema.parse(input);

  const note = await prisma.note.create({
    data: {
      title: parsed.title,
      content: parsed.content,
    },
  });

  return {
    success: true,
    note,
  };
}