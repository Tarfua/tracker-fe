"use client";

import { Select } from "@/components/ui/select";
import type { ProjectOption } from "../types";

interface ProjectSelectProps {
  value: string;
  onChange: (projectId: string) => void;
  projects: ProjectOption[];
  disabled?: boolean;
}

export function ProjectSelect({
  value,
  onChange,
  projects,
  disabled,
}: ProjectSelectProps) {
  const options = projects.map((p) => ({ value: p.id, label: p.name }));
  return (
    <Select
      label="Проєкт"
      options={options}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
}
