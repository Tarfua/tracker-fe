import type { ReportEntry } from "./types";

const now = new Date();
const today = now.toISOString().slice(0, 10);
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().slice(0, 10);

export const MOCK_REPORT_ENTRIES: ReportEntry[] = [
  {
    id: "1",
    date: today,
    projectId: "1",
    projectName: "Проєкт A",
    durationHours: 1.5,
    description: "Розробка API для трекера",
  },
  {
    id: "2",
    date: today,
    projectId: "2",
    projectName: "Проєкт B",
    durationHours: 1,
    description: "Код-ревʼю та рефакторинг",
  },
  {
    id: "3",
    date: today,
    projectId: "1",
    projectName: "Проєкт A",
    durationHours: 0.5,
    description: "Документація ендпоінтів",
  },
  {
    id: "4",
    date: yesterdayStr,
    projectId: "2",
    projectName: "Проєкт B",
    durationHours: 2,
    description: "Налаштування CI/CD",
  },
  {
    id: "5",
    date: yesterdayStr,
    projectId: "3",
    projectName: "Проєкт C",
    durationHours: 1,
    description: "",
  },
];

export const REPORT_YEAR_MIN_OFFSET = 1;
export const REPORT_YEAR_MAX_OFFSET = 1;
