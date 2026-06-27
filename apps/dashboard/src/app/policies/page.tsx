"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import PolicyTable from "@/components/policies/PolicyTable";
import PolicyForm from "@/components/policies/PolicyForm";
import DeletePolicyDialog from "@/components/policies/DeletePolicyDialog";

import { usePolicies } from "@/hooks/usePolicies";

export default function PoliciesPage() {
  const {
    policies,
    loading,
    addPolicy,
    editPolicy,
    removePolicy,
  } = usePolicies();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedPolicy, setSelectedPolicy] =
    useState<any>(null);

  function handleCreate() {
    setSelectedPolicy(null);
    setFormOpen(true);
  }

  function handleEdit(policy: any) {
    setSelectedPolicy(policy);
    setFormOpen(true);
  }

  function handleDelete(policy: any) {
    setSelectedPolicy(policy);
    setDeleteOpen(true);
  }

  async function handleSubmit(policy: any) {
    if (selectedPolicy) {
      await editPolicy(selectedPolicy.id, policy);
    } else {
      await addPolicy(policy);
    }
  }

  async function confirmDelete() {
    if (!selectedPolicy) return;

    await removePolicy(selectedPolicy.id);
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Policies
          </h1>

          <p className="mt-2 text-slate-500">
            Manage AI security policies.
          </p>

        </div>

        <Button onClick={handleCreate}>
          New Policy
        </Button>

      </div>

      <PolicyTable
        policies={policies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PolicyForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedPolicy}
      />

      <DeletePolicyDialog
        open={deleteOpen}
        policy={selectedPolicy}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}