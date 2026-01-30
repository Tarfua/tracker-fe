"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Project } from "./types";
import { INITIAL_PROJECTS, PROJECT_NAME_MAX_LENGTH } from "./constants";

function generateId(): string {
  return crypto.randomUUID?.() ?? String(Date.now());
}

interface ProjectsContextValue {
  projects: Project[];
  addProject: (name: string) => void;
  removeProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  const addProject = useCallback((name: string) => {
    const trimmed = name.trim().slice(0, PROJECT_NAME_MAX_LENGTH);
    if (!trimmed) return;
    setProjects((prev) => [
      ...prev,
      { id: generateId(), name: trimmed },
    ]);
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const renameProject = useCallback((id: string, name: string) => {
    const trimmed = name.trim().slice(0, PROJECT_NAME_MAX_LENGTH);
    if (!trimmed) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: trimmed } : p))
    );
  }, []);

  const value = useMemo(
    () => ({ projects, addProject, removeProject, renameProject }),
    [projects, addProject, removeProject, renameProject]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextValue {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return ctx;
}
