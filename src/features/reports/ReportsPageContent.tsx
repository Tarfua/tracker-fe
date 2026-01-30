"use client";

import { useMemo, useState } from "react";
import { getTodayISO } from "@/features/time-track/utils/date";
import { MOCK_REPORT_ENTRIES } from "./constants";
import {
  filterEntriesByDateAndProject,
  totalDurationHours,
} from "./utils/filter-entries";
import { DateFilter } from "./DateFilter";
import { ProjectFilter } from "./ProjectFilter";
import { TotalTimeDisplay } from "./TotalTimeDisplay";
import { ReportEntriesList } from "./ReportEntriesList";
import { CopyDescriptionsButton } from "./CopyDescriptionsButton";

export function ReportsPageContent() {
  const [date, setDate] = useState(getTodayISO);
  const [projectId, setProjectId] = useState("");

  const filteredEntries = useMemo(
    () => filterEntriesByDateAndProject(MOCK_REPORT_ENTRIES, date, projectId),
    [date, projectId]
  );

  const totalHours = useMemo(
    () => totalDurationHours(filteredEntries),
    [filteredEntries]
  );

  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <DateFilter value={date} onChange={setDate} />
        <ProjectFilter value={projectId} onChange={setProjectId} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 gap-y-1">
        <TotalTimeDisplay totalHours={totalHours} />
        <CopyDescriptionsButton entries={filteredEntries} compact />
      </div>

      <ReportEntriesList entries={filteredEntries} />
    </div>
  );
}
