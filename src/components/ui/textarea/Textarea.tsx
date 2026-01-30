import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
}

export function Textarea({
  label,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  const textareaClasses =
    "w-full h-[7.5rem] rounded-lg border border-border bg-input-bg px-3 py-2.5 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-transparent resize-none overflow-y-auto box-border";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`${textareaClasses} ${className}`}
        {...props}
      />
    </div>
  );
}
