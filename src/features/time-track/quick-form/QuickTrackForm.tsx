"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectSelect } from "./ProjectSelect";
import { DurationInput } from "./DurationInput";
import { DescriptionField } from "./DescriptionField";
import { MOCK_PROJECTS } from "./mock-projects";
import { partsToDuration } from "../constants";
import type { QuickTrackFormValues } from "../types";

const initialValues: QuickTrackFormValues = {
  projectId: "",
  durationHours: partsToDuration(0, 30),
  description: "",
};

export function QuickTrackForm() {
  const [values, setValues] = useState<QuickTrackFormValues>(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to API
    console.log("Quick track:", values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <ProjectSelect
        value={values.projectId}
        onChange={(projectId) =>
          setValues((prev) => ({ ...prev, projectId }))
        }
        projects={MOCK_PROJECTS}
      />
      <DurationInput
        value={values.durationHours}
        onChange={(durationHours) =>
          setValues((prev) => ({ ...prev, durationHours }))
        }
      />
      <DescriptionField
        value={values.description}
        onChange={(description) =>
          setValues((prev) => ({ ...prev, description }))
        }
      />
      <Button type="submit" variant="primary" className="mt-2 w-full">
        Затрекати час
      </Button>
    </form>
  );
}
