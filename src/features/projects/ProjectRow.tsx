"use client";

import { useState, useRef, useEffect } from "react";
import { useConfirm } from "@/components/ui/confirm";
import type { Project } from "./types";
import { PROJECT_NAME_MAX_LENGTH } from "./constants";

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

interface ProjectRowProps {
  project: Project;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectRow({ project, onRename, onDelete }: ProjectRowProps) {
  const { confirm } = useConfirm();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editName.trim().slice(0, PROJECT_NAME_MAX_LENGTH);
    if (trimmed && trimmed !== project.name) {
      onRename(project.id, trimmed);
    } else {
      setEditName(project.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditName(project.name);
      setIsEditing(false);
    }
  };

  const nameCellClasses =
    "flex-1 min-w-0 min-h-[44px] rounded-lg border px-3 py-2.5 text-left text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-inset";

  return (
    <li className="flex min-h-[44px] items-center gap-2 border-b border-border py-2 last:border-b-0">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value.slice(0, PROJECT_NAME_MAX_LENGTH))}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          maxLength={PROJECT_NAME_MAX_LENGTH}
          className={`${nameCellClasses} border-border bg-input-bg`}
          aria-label="Нова назва"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setEditName(project.name);
            setIsEditing(true);
          }}
          className={`${nameCellClasses} border-transparent bg-transparent hover:text-foreground-muted`}
        >
          {project.name}
        </button>
      )}
      <button
        type="button"
        onClick={async () => {
          const ok = await confirm({
            message: `Видалити проєкт «${project.name}»?`,
            confirmLabel: "Видалити",
            cancelLabel: "Скасувати",
            variant: "danger",
          });
          if (ok) onDelete(project.id);
        }}
        className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-border focus:outline-none focus:ring-2 focus:ring-focus-ring"
        aria-label={`Видалити ${project.name}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
}
