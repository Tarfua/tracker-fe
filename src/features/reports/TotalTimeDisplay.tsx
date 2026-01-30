"use client";

import { durationToParts } from "@/features/time-track/constants";

function formatDurationHuman(hours: number): string {
  const { hours: h, minutes: m } = durationToParts(hours);
  const parts: string[] = [];
  if (h > 0) parts.push(`${h} год`);
  if (m > 0) parts.push(`${m} хв`);
  return parts.length > 0 ? parts.join(" ") : "0 хв";
}

interface TotalTimeDisplayProps {
  totalHours: number;
}

export function TotalTimeDisplay({ totalHours }: TotalTimeDisplayProps) {
  return (
    <span className="text-sm font-medium text-foreground">
      Всього: {formatDurationHuman(totalHours)}
    </span>
  );
}
