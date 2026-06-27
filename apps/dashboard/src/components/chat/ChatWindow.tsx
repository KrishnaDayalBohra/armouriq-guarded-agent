"use client";

import { useEffect, useRef } from "react";

import { useChat } from "@/hooks/useChat";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const { messages, loading, send } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-sm">

      {/* Header */}

      <div className="border-b bg-slate-50 px-6 py-4">

        <h2 className="font-semibold">
          ArmoriQ Assistant
        </h2>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto bg-slate-50 p-8">

        <div className="mx-auto max-w-4xl space-y-6">

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}

          {loading && (

            <div className="flex">

              <div className="rounded-2xl bg-white px-6 py-4 shadow">

                Thinking...

              </div>

            </div>

          )}

          <div ref={bottomRef} />

        </div>

      </div>

      <ChatInput
        onSend={send}
        loading={loading}
      />

    </div>
  );
}