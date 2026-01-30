export const DURATION_STEP_MINUTES = 15;
export const MAX_DURATION_HOURS = 12;
export const DESCRIPTION_MAX_LENGTH = 500;

export const DURATION_HOURS_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export const DURATION_MINUTES_OPTIONS = [0, 15, 30, 45] as const;

export type DurationHours = (typeof DURATION_HOURS_OPTIONS)[number];
export type DurationMinutes = (typeof DURATION_MINUTES_OPTIONS)[number];

export function durationToParts(totalHours: number): { hours: number; minutes: number } {
  const hours = Math.min(MAX_DURATION_HOURS, Math.floor(totalHours));
  const remainder = totalHours - hours;
  const minutes = Math.round((remainder * 60) / DURATION_STEP_MINUTES) * DURATION_STEP_MINUTES;
  if (minutes >= 60) {
    return { hours: Math.min(MAX_DURATION_HOURS, hours + 1), minutes: 0 };
  }
  return { hours, minutes };
}

export function partsToDuration(hours: number, minutes: number): number {
  return hours + minutes / 60;
}
