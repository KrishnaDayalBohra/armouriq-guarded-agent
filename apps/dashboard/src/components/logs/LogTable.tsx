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
import { ToolLog } from "@/types/log";

interface Props {
  logs: ToolLog[];
}

export default function LogTable({ logs }: Props) {
  if (!logs.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        No logs found.
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
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.toolName}</TableCell>

              <TableCell>{log.serverId}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    log.decision === "allowed"
                      ? "default"
                      : log.decision === "blocked"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {log.decision}
                </Badge>
              </TableCell>

              <TableCell>
                {new Date(log.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}