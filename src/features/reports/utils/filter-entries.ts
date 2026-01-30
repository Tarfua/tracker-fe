import type { ReportEntry } from "../types";

export function filterEntriesByDateAndProject(
  entries: ReportEntry[],
  date: string,
  projectId: string
): ReportEntry[] {
  return entries.filter((e) => {
    if (e.date !== date) return false;
    if (projectId !== "" && e.projectId !== projectId) return false;
    return true;
  });
}

export function getDescriptionsForDay(entries: ReportEntry[]): string[] {
  return entries
    .map((e) => e.description.trim())
    .filter((d) => d.length > 0);
}

export function totalDurationHours(entries: ReportEntry[]): number {
  return entries.reduce((sum, e) => sum + e.durationHours, 0);
}
