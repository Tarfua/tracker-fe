"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from "./ProjectsContext";
import { ProjectRow } from "./ProjectRow";
import { PROJECT_NAME_MAX_LENGTH } from "./constants";

export function ProjectsPageContent() {
  const { projects, addProject, removeProject, renameProject } = useProjects();
  const [newName, setNewName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newName.trim().slice(0, PROJECT_NAME_MAX_LENGTH));
    setNewName("");
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
      <form
        onSubmit={handleAdd}
        className="flex gap-2"
      >
        <Input
          type="text"
          placeholder="Назва проєкту"
          value={newName}
          onChange={(e) => setNewName(e.target.value.slice(0, PROJECT_NAME_MAX_LENGTH))}
          maxLength={PROJECT_NAME_MAX_LENGTH}
          className="min-h-[44px] flex-1"
          aria-label="Назва нового проєкту"
        />
        <Button
          type="submit"
          variant="primary"
          className="min-h-[44px] shrink-0"
          disabled={!newName.trim()}
        >
          Додати
        </Button>
      </form>

      <ul className="flex flex-col" aria-label="Список проєктів">
        {projects.length === 0 ? (
          <li className="py-6 text-center text-sm text-foreground-muted">
            Немає проєктів. Додайте перший вище.
          </li>
        ) : (
          projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onRename={renameProject}
              onDelete={removeProject}
            />
          ))
        )}
      </ul>
    </div>
  );
}
