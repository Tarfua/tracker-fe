"use client";

import { useMemo } from "react";
import {
  MONTH_NAMES_SHORT,
  fullDateToIso,
  getDaysInMonth,
  getTodayISO,
  isoToFullDate,
} from "@/features/time-track/utils/date";
import { REPORT_YEAR_MAX_OFFSET, REPORT_YEAR_MIN_OFFSET } from "./constants";

interface DateFilterProps {
  value: string;
  onChange: (isoDate: string) => void;
  disabled?: boolean;
}

const selectClasses =
  "min-h-[44px] w-full rounded-lg border border-border bg-input-bg px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-transparent appearance-none cursor-pointer text-base";

export function DateFilter({ value, onChange, disabled }: DateFilterProps) {
  const { day, monthIndex, year } = isoToFullDate(value);
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    const min = currentYear - REPORT_YEAR_MIN_OFFSET;
    const max = currentYear + REPORT_YEAR_MAX_OFFSET;
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }, [currentYear]);
  const maxDay = useMemo(
    () => getDaysInMonth(monthIndex, year),
    [monthIndex, year]
  );
  const dayOptions = useMemo(
    () => Array.from({ length: maxDay }, (_, i) => i + 1),
    [maxDay]
  );
  const safeDay = Math.min(Math.max(1, day), maxDay);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(fullDateToIso(Number(e.target.value), monthIndex, year));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mi = Number(e.target.value);
    const maxD = getDaysInMonth(mi, year);
    const clampedDay = Math.min(day, maxD);
    onChange(fullDateToIso(clampedDay, mi, year));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const y = Number(e.target.value);
    const maxD = getDaysInMonth(monthIndex, y);
    const clampedDay = Math.min(day, maxD);
    onChange(fullDateToIso(clampedDay, monthIndex, y));
  };

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Дата
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex-[1_1_4rem] min-w-0">
          <select
            id="report-day"
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
        <div className="flex-[1_1_5rem] min-w-0">
          <select
            id="report-month"
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
        <div className="flex-[1_1_5rem] min-w-0">
          <select
            id="report-year"
            aria-label="Рік"
            value={year}
            onChange={handleYearChange}
            disabled={disabled}
            className={selectClasses}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
