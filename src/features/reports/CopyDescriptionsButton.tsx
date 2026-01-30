"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ReportEntry } from "./types";
import { getDescriptionsForDay } from "./utils/filter-entries";

function CopyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

interface CopyDescriptionsButtonProps {
  entries: ReportEntry[];
  disabled?: boolean;
  /** Compact: single row with icon + short label, no full width */
  compact?: boolean;
}

export function CopyDescriptionsButton({
  entries,
  disabled,
  compact = false,
}: CopyDescriptionsButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const lines = getDescriptionsForDay(entries);
    const text = lines.join("\n");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const descriptions = getDescriptionsForDay(entries);
  const hasDescriptions = descriptions.length > 0;

  if (compact) {
    return (
      <div className="flex flex-col items-end gap-0.5">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCopy}
          disabled={disabled || !hasDescriptions}
          className="min-h-[36px] shrink-0 gap-1.5 px-3"
          title={hasDescriptions ? "Скопіювати описи за день" : "Немає описів"}
          aria-label={copied ? "Скопійовано" : "Скопіювати описи за день"}
        >
          <CopyIcon />
          <span>{copied ? "Скопійовано" : "Описи"}</span>
        </Button>
        {!hasDescriptions && entries.length > 0 && (
          <span className="text-xs text-foreground-muted">
            Немає записів з описом
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        variant="secondary"
        onClick={handleCopy}
        disabled={disabled || !hasDescriptions}
        className="w-full min-h-[44px]"
      >
        {copied ? "Скопійовано" : "Скопіювати описи за день"}
      </Button>
      {!hasDescriptions && entries.length > 0 && (
        <p className="text-xs text-foreground-muted">
          Немає записів з описом для цього дня
        </p>
      )}
    </div>
  );
}
