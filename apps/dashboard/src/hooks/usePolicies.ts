"use client";
import { Policy } from "@/types/policy";
import { useEffect, useState } from "react";
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
} from "@/services/policies";

export function usePolicies() {
 

const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPolicies() {
    try {
      const data = await getPolicies();
      setPolicies(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPolicies();
  }, []);

  async function addPolicy(policy: Policy) {
    await createPolicy(policy);
    await loadPolicies();
  }

  async function editPolicy(id: string, policy: Policy) {
    await updatePolicy(id, policy);
    await loadPolicies();
  }

  async function removePolicy(id: string) {
    await deletePolicy(id);
    await loadPolicies();
  }

  return {
    policies,
    loading,
    addPolicy,
    editPolicy,
    removePolicy,
    refresh: loadPolicies,
  };
}