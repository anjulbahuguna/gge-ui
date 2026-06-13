"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { Button } from "./button";

// ConfirmDialog — a controlled modal for destructive/confirm actions (delete a
// rider, end a lease). Backed by radix Dialog (accessible, focus-trapped,
// ESC-to-close). The app owns `open` + the handlers.
export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "destructive" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}
export function ConfirmDialog({
  open, title, description,
  confirmLabel = "Confirm", cancelLabel = "Cancel",
  tone = "destructive", onConfirm, onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card p-6 shadow-lg">
          <Dialog.Title className="font-semibold">{title}</Dialog.Title>
          {description && <Dialog.Description className="mt-1 text-sm text-muted-foreground">{description}</Dialog.Description>}
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onCancel}>{cancelLabel}</Button>
            <Button variant={tone === "destructive" ? "destructive" : "default"} size="sm" onClick={onConfirm}>{confirmLabel}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
