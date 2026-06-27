export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;

  toolExecuted?: boolean;
  blocked?: boolean;
  approvalRequired?: boolean;

  reason?: string;
  approvalId?: string;
}