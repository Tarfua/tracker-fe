"use client";

import { useMemo } from "react";
import {
  MONTH_NAMES_SHORT,
  dayMonthToIso,
  getDaysInMonth,
  isoToDayMonth,
  resolveYearForMonth,
} from "../utils/date";

interface TrackingDateFieldProps {
  value: string;
  onChange: (isoDate: string) => void;
  disabled?: boolean;
}

const selectClasses =
  "min-h-[44px] w-full rounded-lg border border-border bg-input-bg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-transparent appearance-none cursor-pointer text-base";

export function TrackingDateField({
  value,
  onChange,
  disabled,
}: TrackingDateFieldProps) {
  const { day, monthIndex } = isoToDayMonth(value);
  const resolvedYear = useMemo(() => resolveYearForMonth(monthIndex), [monthIndex]);
  const maxDay = useMemo(
    () => getDaysInMonth(monthIndex, resolvedYear),
    [monthIndex, resolvedYear]
  );
  const dayOptions = useMemo(
    () => Array.from({ length: maxDay }, (_, i) => i + 1),
    [maxDay]
  );
  const safeDay = Math.min(Math.max(1, day), maxDay);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const d = Number(e.target.value);
    onChange(dayMonthToIso(d, monthIndex));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const m = Number(e.target.value);
    const yearForMonth = resolveYearForMonth(m);
    const clampedDay = Math.min(day, getDaysInMonth(m, yearForMonth));
    onChange(dayMonthToIso(clampedDay, m));
  };

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Дата
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <select
            id="tracking-day"
            aria-label="День"
            value={safeDay}
            onChange={handleDayChange}
            disabled={disabled}
            className={selectClasses}
          >
            {dayOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-0">
          <select
            id="tracking-month"
            aria-label="Місяць"
            value={monthIndex}
            onChange={handleMonthChange}
            disabled={disabled}
            className={selectClasses}
          >
            {MONTH_NAMES_SHORT.map((name, i) => (
              <option key={i} value={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
