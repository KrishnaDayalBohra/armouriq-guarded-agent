export interface Approval {
  id: string;
  conversationId: string;
  toolName: string;
  serverId: string;
  argsJson: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}