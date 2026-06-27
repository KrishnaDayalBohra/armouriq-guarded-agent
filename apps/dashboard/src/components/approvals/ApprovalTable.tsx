"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Approval } from "@/types/approval";

interface Props {
  approvals: Approval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ApprovalTable({
  approvals,
  onApprove,
  onReject,
}: Props) {
  if (!approvals.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        No pending approvals.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Tool</TableHead>

            <TableHead>Server</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Date</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {approvals.map((approval) => (

            <TableRow key={approval.id}>

              <TableCell className="font-medium">
                {approval.toolName}
              </TableCell>

              <TableCell>
                {approval.serverId}
              </TableCell>

              <TableCell>

                <Badge
                  variant={
                    approval.status === "approved"
                      ? "default"
                      : approval.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {approval.status}
                </Badge>

              </TableCell>

              <TableCell>
                {new Date(
                  approval.createdAt
                ).toLocaleString()}
              </TableCell>

              <TableCell>

                <div className="flex justify-end gap-2">

                  {approval.status === "pending" && (
                    <>
                      <Button
                        onClick={() =>
                          onApprove(approval.id)
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() =>
                          onReject(approval.id)
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}

                </div>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}