import {
  EvaluateToolCallInput,
  PolicyDecision,
  PolicyRecord,
} from "./types";

function matchesTool(policy: PolicyRecord, toolName: string, serverId: string) {
  const toolMatches = !policy.toolName || policy.toolName === toolName;
  const serverMatches = !policy.serverId || policy.serverId === serverId;

  return toolMatches && serverMatches;
}

export function evaluateToolCall(
  input: EvaluateToolCallInput
): PolicyDecision {
  const { toolName, serverId, args, policies, toolCallCountInConversation = 0 } =
    input;

  const activePolicies = policies.filter((policy) => policy.enabled);

  // 1) Block tool rules
  for (const policy of activePolicies.filter((p) => p.type === "block_tool")) {
    if (matchesTool(policy, toolName, serverId)) {
      return {
        status: "block",
        reason: `Tool ${toolName} is blocked by policy "${policy.name}"`,
      };
    }
  }

  // 2) Require approval rules
  for (const policy of activePolicies.filter(
    (p) => p.type === "require_approval"
  )) {
    if (matchesTool(policy, toolName, serverId)) {
      return {
        status: "approval_required",
        reason: `Tool ${toolName} requires approval by policy "${policy.name}"`,
      };
    }
  }

  // 3) Argument constraint rules
  for (const policy of activePolicies.filter((p) => p.type === "arg_constraint")) {
    if (!matchesTool(policy, toolName, serverId)) continue;

    try {
      const config = JSON.parse(policy.configJson) as {
        field: string;
        operator: "max_length" | "min_length" | "equals";
        value: string | number;
      };

      const fieldValue = args[config.field];

      if (typeof fieldValue === "undefined") continue;

      if (
        config.operator === "max_length" &&
        typeof fieldValue === "string" &&
        typeof config.value === "number" &&
        fieldValue.length > config.value
      ) {
        return {
          status: "block",
          reason: `Argument "${config.field}" exceeded max length for policy "${policy.name}"`,
        };
      }

      if (
        config.operator === "min_length" &&
        typeof fieldValue === "string" &&
        typeof config.value === "number" &&
        fieldValue.length < config.value
      ) {
        return {
          status: "block",
          reason: `Argument "${config.field}" did not meet min length for policy "${policy.name}"`,
        };
      }

      if (config.operator === "equals" && fieldValue !== config.value) {
        return {
          status: "block",
          reason: `Argument "${config.field}" failed equals check for policy "${policy.name}"`,
        };
      }
    } catch {
      return {
        status: "block",
        reason: `Invalid arg constraint policy config in "${policy.name}"`,
      };
    }
  }

  // 4) Conversation budget rules
  for (const policy of activePolicies.filter(
    (p) => p.type === "conversation_budget"
  )) {
    try {
      const config = JSON.parse(policy.configJson) as {
        maxToolCalls?: number;
      };

      if (
        typeof config.maxToolCalls === "number" &&
        toolCallCountInConversation >= config.maxToolCalls
      ) {
        return {
          status: "block",
          reason: `Conversation exceeded tool-call budget from policy "${policy.name}"`,
        };
      }
    } catch {
      return {
        status: "block",
        reason: `Invalid conversation budget config in "${policy.name}"`,
      };
    }
  }

  return { status: "allow" };
}