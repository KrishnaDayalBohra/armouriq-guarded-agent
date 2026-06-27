import api from "./api";

export interface ChatResponse {
  success: boolean;
  reply: string;
  toolExecuted?: boolean;
  blocked?: boolean;
  approvalRequired?: boolean;
  approvalId?: string;
  reason?: string;
}

export async function sendMessage(message: string) {
  const { data } = await api.post<ChatResponse>("/chat", {
    message,
  });

  return data;
}