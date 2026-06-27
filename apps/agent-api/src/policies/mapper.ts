import { PolicyRecord } from "@armoriq/policy-engine";

export function toPolicyRecord(policy: any): PolicyRecord {
  return {
    id: policy.id,
    name: policy.name,
    type: policy.type as PolicyRecord["type"],
    toolName: policy.toolName ?? undefined,
    serverId: policy.serverId ?? undefined,
    enabled: policy.enabled,
    configJson: policy.configJson,
  };
}