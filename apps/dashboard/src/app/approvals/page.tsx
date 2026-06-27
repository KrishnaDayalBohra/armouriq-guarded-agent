"use client";

import ApprovalTable from "@/components/approvals/ApprovalTable";
import { useApprovals } from "@/hooks/useApprovals";

export default function ApprovalsPage() {
  const {
    approvals,
    loading,
    approveRequest,
    rejectRequest,
  } = useApprovals();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Approval Requests
        </h1>

        <p className="mt-2 text-slate-500">
          Review pending tool executions.
        </p>

      </div>

      <ApprovalTable
        approvals={approvals}
        onApprove={approveRequest}
        onReject={rejectRequest}
      />

    </div>
  );
}