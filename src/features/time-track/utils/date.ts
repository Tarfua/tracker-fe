/** Short month names (no year) for display */
export const MONTH_NAMES_SHORT = [
  "січ", "лют", "бер", "кві", "тра", "чер",
  "лип", "сер", "вер", "жов", "лис", "гру",
] as const;

/** Months into the past → previous year */
export const PAST_MONTHS_USE_PREV_YEAR = 4;
/** Current + months ahead within this → current year; beyond → next year */
export const FUTURE_MONTHS_USE_CURRENT_YEAR = 8;

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getTodayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function isoToDayMonth(iso: string): { day: number; monthIndex: number } {
  const parts = iso.split("-").map(Number);
  const day = parts[2] ?? 1;
  const monthIndex = Math.max(0, Math.min(11, (parts[1] ?? 1) - 1));
  return { day, monthIndex };
}

/**
 * Resolves year for a selected (day, month) relative to today.
 * Past 4 months → previous year; current + next 7 months → current year; 8–11 months ahead → next year.
 */
export function resolveYearForMonth(monthIndex: number, today?: Date): number {
  const now = today ?? new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const selectedMonth = Math.max(0, Math.min(11, monthIndex));

  const monthsBehind = (currentMonth - selectedMonth + 12) % 12;
  const monthsAhead = (selectedMonth - currentMonth + 12) % 12;

  if (monthsBehind >= 1 && monthsBehind <= PAST_MONTHS_USE_PREV_YEAR) {
    return currentYear - 1;
  }
  if (monthsAhead >= 1 && monthsAhead <= FUTURE_MONTHS_USE_CURRENT_YEAR - 1) {
    return currentYear;
  }
  if (monthsAhead >= FUTURE_MONTHS_USE_CURRENT_YEAR && monthsAhead <= 11) {
    return currentYear + 1;
  }
  return currentYear;
}

export function getDaysInMonth(monthIndex: number, year?: number): number {
  const y = year ?? new Date().getFullYear();
  const mi = Math.max(0, Math.min(11, monthIndex));
  if (mi === 1) return new Date(y, 2, 0).getDate();
  return DAYS_IN_MONTH[mi] ?? 31;
}

export function dayMonthToIso(day: number, monthIndex: number, today?: Date): string {
  const year = resolveYearForMonth(monthIndex, today);
  const clampedMonth = Math.max(0, Math.min(11, monthIndex));
  const maxDay = getDaysInMonth(clampedMonth, year);
  const clampedDay = Math.max(1, Math.min(maxDay, day));
  const month = clampedMonth + 1;
  const m = String(month).padStart(2, "0");
  const d = String(clampedDay).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function isoToFullDate(iso: string): { day: number; monthIndex: number; year: number } {
  const parts = iso.split("-").map(Number);
  const year = parts[0] ?? new Date().getFullYear();
  const monthIndex = Math.max(0, Math.min(11, (parts[1] ?? 1) - 1));
  const day = parts[2] ?? 1;
  return { day, monthIndex, year };
}

export function fullDateToIso(day: number, monthIndex: number, year: number): string {
  const clampedMonth = Math.max(0, Math.min(11, monthIndex));
  const maxDay = getDaysInMonth(clampedMonth, year);
  const clampedDay = Math.max(1, Math.min(maxDay, day));
  const m = String(clampedMonth + 1).padStart(2, "0");
  const d = String(clampedDay).padStart(2, "0");
  return `${year}-${m}-${d}`;
}
