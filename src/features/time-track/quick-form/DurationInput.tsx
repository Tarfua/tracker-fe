"use client";

import {
  DURATION_HOURS_OPTIONS,
  DURATION_MINUTES_OPTIONS,
  durationToParts,
  partsToDuration,
} from "../constants";

interface DurationInputProps {
  value: number;
  onChange: (durationHours: number) => void;
  disabled?: boolean;
}

const selectClasses =
  "min-h-[44px] w-full rounded-lg border border-border bg-input-bg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-transparent appearance-none cursor-pointer text-base";

export function DurationInput({
  value,
  onChange,
  disabled,
}: DurationInputProps) {
  const { hours, minutes } = durationToParts(value);

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const h = Number(e.target.value);
    onChange(partsToDuration(h, minutes));
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const m = Number(e.target.value);
    onChange(partsToDuration(hours, m));
  };

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Час
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <select
            id="duration-hours"
            aria-label="Години"
            value={hours}
            onChange={handleHoursChange}
            disabled={disabled}
            className={selectClasses}
          >
            {DURATION_HOURS_OPTIONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <span className="shrink-0 text-sm text-foreground-muted" aria-hidden>
          год
        </span>
        <div className="flex-1 min-w-0">
          <select
            id="duration-minutes"
            aria-label="Хвилини"
            value={minutes}
            onChange={handleMinutesChange}
            disabled={disabled}
            className={selectClasses}
          >
            {DURATION_MINUTES_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <span className="shrink-0 text-sm text-foreground-muted" aria-hidden>
          хв
        </span>
      </div>
    </div>
  );
}
