"use client";

import { ChatMessage } from "@/types/chat";

import {
  Bot,
  User,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function MessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  const user = message.role === "user";

  return (
    <div
      className={`flex gap-4 ${
        user ? "justify-end" : "justify-start"
      }`}
    >
      {!user && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-2xl rounded-3xl px-6 py-5 shadow-sm ${
          user
            ? "bg-blue-600 text-white"
            : "bg-white"
        }`}
      >
        <p className="whitespace-pre-wrap leading-7">
          {message.content}
        </p>

        {message.toolExecuted && (

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">

            <CheckCircle2 size={18} />

            Tool Executed Successfully

          </div>

        )}

        {message.blocked && (

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-600">

            <ShieldAlert size={18} />

            {message.reason}

          </div>

        )}

        {message.approvalRequired && (

          <div className="mt-5 rounded-xl bg-orange-50 p-4 text-orange-600">

            Approval Required

          </div>

        )}

      </div>

      {user && (

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">

          <User size={20} />

        </div>

      )}

    </div>
  );
}