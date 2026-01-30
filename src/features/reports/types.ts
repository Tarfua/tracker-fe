export interface ReportEntry {
  id: string;
  date: string;
  projectId: string;
  projectName: string;
  durationHours: number;
  description: string;
}

export interface ReportFilters {
  date: string;
  projectId: string;
}
