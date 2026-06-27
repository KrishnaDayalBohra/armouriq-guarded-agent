"use client";

import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-130px)] flex-col">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            AI Agent
          </h1>

          <p className="mt-2 text-slate-500">
            Chat with your guarded AI assistant
          </p>

        </div>

        <div className="rounded-xl border bg-white px-5 py-3 shadow-sm">

          <p className="font-semibold text-green-600">
            ● Connected
          </p>

        </div>

      </div>

      <ChatWindow />

    </div>
  );
}