import { prisma } from "../lib/prisma";

export async function createApprovalRequest(input: {
  conversationId?: string;
  toolName: string;
  serverId: string;
  argsJson: string;
}) {
  return prisma.approvalRequest.create({
    data: {
      conversationId: input.conversationId ?? "manual-exec",
      toolName: input.toolName,
      serverId: input.serverId,
      argsJson: input.argsJson,
      status: "pending",
    },
  });
}

export async function listApprovalRequests() {
  return prisma.approvalRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateApprovalStatus(
  id: string,
  status: "approved" | "rejected"
) {
  return prisma.approvalRequest.update({
    where: { id },
    data: {
      status,
    },
  });
}