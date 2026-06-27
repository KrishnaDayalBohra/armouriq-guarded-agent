"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: Props) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  }

  return (
    <div className="border-t bg-white p-6">

      <div className="mx-auto flex max-w-4xl gap-4">

        <textarea
          rows={2}
          value={text}
          placeholder="Ask ArmoriQ to execute a tool..."
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();

              submit();
            }
          }}
          className="flex-1 resize-none rounded-2xl border p-4 outline-none"
        />

        <button
          disabled={loading}
          onClick={submit}
          className="rounded-2xl bg-blue-600 px-8 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <SendHorizonal size={22} />
        </button>

      </div>

    </div>
  );
}