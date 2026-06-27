import { prisma } from "../lib/prisma";

export async function listPolicies() {
  return prisma.policy.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createPolicy(input: {
  name: string;
  type: string;
  toolName?: string | null;
  serverId?: string | null;
  configJson: string;
  enabled?: boolean;
}) {
  return prisma.policy.create({
    data: {
      name: input.name,
      type: input.type,
      toolName: input.toolName ?? null,
      serverId: input.serverId ?? null,
      configJson: input.configJson,
      enabled: input.enabled ?? true,
    },
  });
}

export async function updatePolicy(
  id: string,
  input: {
    name?: string;
    type?: string;
    toolName?: string | null;
    serverId?: string | null;
    configJson?: string;
    enabled?: boolean;
  }
) {
  return prisma.policy.update({
    where: { id },
    data: input,
  });
}

export async function deletePolicy(id: string) {
  return prisma.policy.delete({
    where: { id },
  });
}