import { z } from "zod";
import { prisma } from "../lib/prisma";

export const deleteNoteSchema = z.object({
  id: z.string().min(1, "Note id is required"),
});

export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;

export async function deleteNote(input: DeleteNoteInput) {
  const parsed = deleteNoteSchema.parse(input);

  const existing = await prisma.note.findUnique({
    where: { id: parsed.id },
  });

  if (!existing) {
    return {
      success: false,
      error: "Note not found",
    };
  }

  await prisma.note.delete({
    where: { id: parsed.id },
  });

  return {
    success: true,
    deletedId: parsed.id,
  };
}