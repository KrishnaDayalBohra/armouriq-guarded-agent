"use client";

import { useEffect, useState } from "react";

import {
  getApprovals,
  approve,
  reject,
} from "@/services/approvals";

import { Approval } from "@/types/approval";

export function useApprovals() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getApprovals();
      setApprovals(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function approveRequest(id: string) {
    await approve(id);
    await load();
  }

  async function rejectRequest(id: string) {
    await reject(id);
    await load();
  }

  return {
    approvals,
    loading,
    approveRequest,
    rejectRequest,
  };
}