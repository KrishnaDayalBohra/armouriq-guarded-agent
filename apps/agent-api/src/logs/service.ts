import { prisma } from "../lib/prisma";

export async function createToolLog(input: {
  conversationId?: string;
  toolName: string;
  serverId: string;
  argsJson: string;
  decision: string;
  reason?: string;
  resultJson?: string;
  error?: string;
  approvalRequestId?: string;
}) {
  return prisma.toolExecutionLog.create({
    data: {
      conversationId: input.conversationId ?? "manual-exec",
      toolName: input.toolName,
      serverId: input.serverId,
      argsJson: input.argsJson,
      decision: input.decision,
      reason: input.reason,
      resultJson: input.resultJson,
      error: input.error,
      approvalRequestId: input.approvalRequestId,
    },
  });
}

export async function listToolLogs() {
  return prisma.toolExecutionLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}