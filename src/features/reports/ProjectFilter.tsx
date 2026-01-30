"use client";

import { Select } from "@/components/ui/select";
import { useProjects } from "@/features/projects/ProjectsContext";

interface ProjectFilterProps {
  value: string;
  onChange: (projectId: string) => void;
  disabled?: boolean;
}

export function ProjectFilter({ value, onChange, disabled }: ProjectFilterProps) {
  const { projects } = useProjects();
  const options = [
    { value: "", label: "Усі проєкти" },
    ...projects.map((p) => ({ value: p.id, label: p.name })),
  ];

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
