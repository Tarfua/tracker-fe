"use client";

import type { ReportEntry } from "./types";
import { durationToParts } from "@/features/time-track/constants";

interface ReportEntriesListProps {
  entries: ReportEntry[];
  emptyMessage?: string;
}

function formatDuration(hours: number): string {
  const { hours: h, minutes: m } = durationToParts(hours);
  const parts: string[] = [];
  if (h > 0) parts.push(`${h} год`);
  if (m > 0) parts.push(`${m} хв`);
  return parts.length > 0 ? parts.join(" ") : "0 хв";
}

export function ReportEntriesList({
  entries,
  emptyMessage = "Немає записів за обрану дату",
}: ReportEntriesListProps) {
  if (entries.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-foreground-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2" aria-label="Записи за день">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="rounded-lg border border-border bg-input-bg px-3 py-2.5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-foreground">
              {entry.projectName}
            </span>
            <span className="text-xs text-foreground-muted">
              {formatDuration(entry.durationHours)}
            </span>
          </div>
          {entry.description.trim() ? (
            <p className="mt-1.5 text-sm text-foreground-muted whitespace-pre-wrap wrap-break-word">
              {entry.description}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
