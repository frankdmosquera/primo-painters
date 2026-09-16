"use client";

import type { ReactNode } from "react";
import type { Project } from "@/data/projectsData";

export function ProjectCardOpenButton({
  project,
  onOpen,
  className,
  children,
}: {
  project: Project;
  onOpen?: (project: Project) => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={() => onOpen?.(project)} className={className}>
      {children}
    </button>
  );
}
