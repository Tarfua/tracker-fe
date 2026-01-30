"use client";

import { useEffect, useRef } from "react";
import { Button } from "../button";

interface ConfirmDialogProps {
  title?: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  variant: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant,
  onConfirm,
  onCancel,
  onKeyDown,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={title ? "confirm-title" : undefined}
      aria-describedby="confirm-message"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-foreground/20"
        aria-hidden
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-lg">
        {title && (
          <h2
            id="confirm-title"
            className="mb-2 text-lg font-semibold text-foreground"
          >
            {title}
          </h2>
        )}
        <p id="confirm-message" className="mb-6 text-foreground-muted">
          {message}
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            ref={cancelRef}
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="min-h-[44px] flex-1 sm:flex-initial"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            className="min-h-[44px] flex-1 sm:flex-initial"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
