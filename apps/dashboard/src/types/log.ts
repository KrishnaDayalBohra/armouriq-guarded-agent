export interface ToolLog {
  id: string;
  conversationId: string | null;
  toolName: string;
  serverId: string;
  decision: "allowed" | "blocked" | "approval_required" | "failed";
  reason?: string | null;
  argsJson?: string | null;
  resultJson?: string | null;
  error?: string | null;
  createdAt: string;
}