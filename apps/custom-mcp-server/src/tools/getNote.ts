import { z } from "zod";
import { prisma } from "../lib/prisma";

export const getNoteSchema = z.object({
  id: z.string().min(1, "Note id is required"),
});

export type GetNoteInput = z.infer<typeof getNoteSchema>;

export async function getNote(input: GetNoteInput) {
  const parsed = getNoteSchema.parse(input);

  const note = await prisma.note.findUnique({
    where: { id: parsed.id },
  });

  if (!note) {
    return {
      success: false,
      error: "Note not found",
    };
  }

  return {
    success: true,
    note,
  };
}