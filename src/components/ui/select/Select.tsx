import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  options: SelectOption[];
}

export function Select({
  label,
  id,
  options,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  const selectClasses =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:border-transparent appearance-none cursor-pointer";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
        >
          {label}
        </label>
      )}
      <select id={selectId} className={`${selectClasses} ${className}`} {...props}>
        <option value="">{label ? `Оберіть ${label.toLowerCase()}` : "—"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
