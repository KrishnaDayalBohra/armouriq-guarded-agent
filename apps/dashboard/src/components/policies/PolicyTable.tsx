"use client";
import { Policy } from "@/types/policy";

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

import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  policies: Policy[];
  onEdit: (policy: Policy) => void;
  onDelete: (policy: Policy) => void;
}

export default function PolicyTable({
  policies,
  onEdit,
  onDelete,
}: Props) {
  if (!policies.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-slate-500">
        No policies found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Name</TableHead>

            <TableHead>Type</TableHead>

            <TableHead>Tool</TableHead>

            <TableHead>Server</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {policies.map((policy) => (

            <TableRow key={policy.id}>

              <TableCell className="font-medium">
                {policy.name}
              </TableCell>

              <TableCell>
                {policy.type}
              </TableCell>

              <TableCell>
                {policy.toolName || "-"}
              </TableCell>

              <TableCell>
                {policy.serverId || "-"}
              </TableCell>

              <TableCell>

                {policy.enabled ? (
                  <Badge>
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Disabled
                  </Badge>
                )}

              </TableCell>

              <TableCell>

                <div className="flex justify-end gap-2">

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(policy)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(policy)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}