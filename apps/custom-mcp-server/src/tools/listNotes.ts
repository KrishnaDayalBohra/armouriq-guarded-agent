import { prisma } from "../lib/prisma";

export async function listNotes() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,
    notes,
  };
}