"use client";

import { Textarea } from "@/components/ui/textarea";
import { DESCRIPTION_MAX_LENGTH } from "../constants";

interface DescriptionFieldProps {
  value: string;
  onChange: (description: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DescriptionField({
  value,
  onChange,
  placeholder = "Що зроблено (опційно)",
  disabled,
}: DescriptionFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value.slice(0, DESCRIPTION_MAX_LENGTH));
  };

  return (
    <div className="w-full">
      <Textarea
        label="Опис"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={DESCRIPTION_MAX_LENGTH}
        aria-describedby="description-count"
      />
      <p
        id="description-count"
        className="mt-1 text-right text-xs text-foreground-muted"
        aria-live="polite"
      >
        {value.length}/{DESCRIPTION_MAX_LENGTH}
      </p>
    </div>
  );
}
