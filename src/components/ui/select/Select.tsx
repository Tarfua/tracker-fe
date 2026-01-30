import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  options: SelectOption[];
  /** When options already include value "", no extra empty option is added. Otherwise this label is used for the empty option. */
  placeholder?: string;
}

export function Select({
  label,
  id,
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  const selectClasses =
    "w-full rounded-lg border border-border bg-input-bg px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:border-transparent appearance-none cursor-pointer";
  const hasEmptyOption = options[0]?.value === "";
  const emptyLabel =
    placeholder ?? (label ? `Оберіть ${label.toLowerCase()}` : "—");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <select id={selectId} className={`${selectClasses} ${className}`} {...props}>
        {!hasEmptyOption && (
          <option value="">{emptyLabel}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
