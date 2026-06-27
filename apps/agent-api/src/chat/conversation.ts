import { prisma } from "../lib/prisma";

export async function createConversation() {
  return prisma.conversation.create({
    data: {},
  });
}