"use client";

import { useState } from "react";
import { sendMessage } from "@/services/chat";
import { ChatMessage } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hello Krishna 👋\n\nI can safely execute MCP tools protected by ArmoriQ.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const result = await sendMessage(text);

      const assistant: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          result.reply ??
          result.reason ??
          "No response from backend.",

        toolExecuted: result.toolExecuted,
        blocked: result.blocked,
        approvalRequired: result.approvalRequired,
        approvalId: result.approvalId,
        reason: result.reason,
      };

      setMessages((prev) => [...prev, assistant]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Failed to connect to backend.",
        },
      ]);
    }

    setLoading(false);
  }

  return {
    messages,
    loading,
    send,
  };
}