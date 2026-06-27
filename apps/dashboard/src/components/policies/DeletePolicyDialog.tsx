"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  policy?: any;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeletePolicyDialog({
  open,
  policy,
  onClose,
  onConfirm,
}: Props) {
  async function handleDelete() {
    await onConfirm();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Delete Policy
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>

        </DialogHeader>

        <div className="py-4">

          <p>
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {policy?.name}
            </span>
            ?
          </p>

        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}