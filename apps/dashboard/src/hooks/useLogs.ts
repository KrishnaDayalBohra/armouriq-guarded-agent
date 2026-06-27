"use client";

import { useEffect, useState } from "react";
import { getLogs } from "@/services/logs";
import { ToolLog } from "@/types/log";

export function useLogs() {
  const [logs, setLogs] = useState<ToolLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLogs() {
    try {
      const data = await getLogs();
      setLogs(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return {
    logs,
    loading,
    refresh: loadLogs,
  };
}