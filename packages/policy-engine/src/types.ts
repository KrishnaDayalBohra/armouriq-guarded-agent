export type PolicyType =
  | "block_tool"
  | "require_approval"
  | "arg_constraint"
  | "conversation_budget";

export type PolicyRecord = {
  id: string;
  name: string;
  type: PolicyType;
  toolName?: string | null;
  serverId?: string | null;
  configJson: string;
  enabled: boolean;
};

export type PolicyDecision =
  | { status: "allow" }
  | { status: "block"; reason: string }
  | { status: "approval_required"; reason: string };

export type EvaluateToolCallInput = {
  conversationId?: string;
  toolName: string;
  serverId: string;
  args: Record<string, unknown>;
  policies: PolicyRecord[];
  toolCallCountInConversation?: number;
};