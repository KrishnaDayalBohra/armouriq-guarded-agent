"use client";

import { useLogs } from "@/hooks/useLogs";
import LogTable from "@/components/logs/LogTable";

export default function LogsPage() {
  const { logs, loading } = useLogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Audit Logs
        </h1>

        <p className="mt-2 text-slate-500">
          Every tool execution is recorded here.
        </p>
      </div>

      <LogTable logs={logs} />
    </div>
  );
}