"use client";

import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProjectCard } from "./project-card";
import { ProjectGalleryDialog } from "./project-gallery-dialog";
import { getPaginationRange, ELLIPSIS } from "@/lib/pagination";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projectsData";

const PAGE_SIZE = 4;

type ProjectGalleryGridProps = {
  projects: Project[];
  /**
   * "dialog" (default) opens the lightbox directly in place — used for the
   * homepage teaser grid. "link" routes each card to its real static page
   * at /gallery/[slug] instead — used on the /gallery listing page, so
   * each project is a real, crawlable, indexable URL.
   */
  cardMode?: "dialog" | "link";
};

export function ProjectGalleryGrid({
  projects,
  cardMode = "dialog",
}: ProjectGalleryGridProps) {
  const [page, setPage] = useState(1);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const pageCount = Math.ceil(projects.length / PAGE_SIZE);

  const visibleProjects = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return projects.slice(start, start + PAGE_SIZE);
  }, [projects, page]);

  const paginationRange = useMemo(
    () => getPaginationRange(page, pageCount, 1),
    [page, pageCount],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={cardMode === "dialog" ? setActiveProject : undefined}
            href={cardMode === "link" ? `/projects/${project.slug}` : undefined}
          />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="relative mx-auto w-fit overflow-hidden rounded-full border border-white/10 bg-linear-to-br from-neutral-950 via-neutral-900 to-primary-light/70 px-2.5 py-2 shadow-lg shadow-black/30">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-primary-light/30 blur-2xl"
          />

          <Pagination className="relative">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                  aria-disabled={page === 1}
                  className={cn(
                    "text-white/80 hover:bg-white/10 hover:text-white",
                    page === 1 && "pointer-events-none opacity-40",
                  )}
                />
              </PaginationItem>

              {paginationRange.map((item, index) =>
                item === ELLIPSIS ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis className="text-white/40" />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(item);
                      }}
                      className={
                        item === page
                          ? "border-transparent bg-primary-light text-white shadow-[0_0_0_3px_rgba(255,255,255,0.08)] hover:bg-primary-light"
                          : "text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                      }
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(pageCount, p + 1));
                  }}
                  aria-disabled={page === pageCount}
                  className={cn(
                    "text-white/80 hover:bg-white/10 hover:text-white",
                    page === pageCount && "pointer-events-none opacity-40",
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <ProjectGalleryDialog
        project={activeProject}
        open={activeProject !== null}
        onOpenChange={(open) => {
          if (!open) setActiveProject(null);
        }}
      />
    </div>
  );
}
