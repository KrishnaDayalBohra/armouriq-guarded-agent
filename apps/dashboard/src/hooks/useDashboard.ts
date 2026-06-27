"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard";

export function useDashboard() {
  const [stats, setStats] = useState({
    policies: 0,
    allowed: 0,
    blocked: 0,
    pending: 0,
    tools: 0,
    executions: 0,
    recentLogs: [],
  });

  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    stats,
    loading,
    refresh: load,
  };
}