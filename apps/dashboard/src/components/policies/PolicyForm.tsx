"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (policy: any) => Promise<void>;
  initialData?: any;
}

export default function PolicyForm({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    type: "block",
    toolName: "",
    serverId: "",
    configJson: "{}",
    enabled: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        type: initialData.type ?? "block",
        toolName: initialData.toolName ?? "",
        serverId: initialData.serverId ?? "",
        configJson: initialData.configJson ?? "{}",
        enabled: initialData.enabled ?? true,
      });
    } else {
      setForm({
        name: "",
        type: "block",
        toolName: "",
        serverId: "",
        configJson: "{}",
        enabled: true,
      });
    }
  }, [initialData]);

  async function handleSubmit() {
    await onSubmit(form);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            {initialData ? "Edit Policy" : "Create Policy"}
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Policy Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <select
            className="w-full rounded-lg border p-3"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option value="block">
              Block
            </option>

            <option value="approval_required">
              Approval Required
            </option>

          </select>

          <Input
            placeholder="Tool Name"
            value={form.toolName}
            onChange={(e) =>
              setForm({
                ...form,
                toolName: e.target.value,
              })
            }
          />

          <Input
            placeholder="Server ID"
            value={form.serverId}
            onChange={(e) =>
              setForm({
                ...form,
                serverId: e.target.value,
              })
            }
          />

          <Input
            placeholder='Config JSON (example: {})'
            value={form.configJson}
            onChange={(e) =>
              setForm({
                ...form,
                configJson: e.target.value,
              })
            }
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) =>
                setForm({
                  ...form,
                  enabled: e.target.checked,
                })
              }
            />

            Enabled

          </label>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
            >
              {initialData ? "Update" : "Create"}
            </Button>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}