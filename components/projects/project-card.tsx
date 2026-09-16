import Link from "next/link";
import { Plus } from "lucide-react";
import { GalleryImage } from "./gallery-image";
import { ProjectCardOpenButton } from "./project-card-open-button";
import type { Project } from "@/data/projectsData";

const cardClassName =
  "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-shadow hover:shadow-lg min-[970px]:flex-row min-[970px]:items-stretch";

type ProjectCardProps = {
  project: Project;
  /** Opens the dialog directly in place — used for the homepage teaser grid. */
  onOpen?: (project: Project) => void;
  /** Links to the project's real static page instead — used on /gallery. */
  href?: string;
  /**
   * Which heading tag the card title uses. The cards sit under a section h2
   * on the home page, so h3 is right there. On /projects they sit directly
   * under the page h1 with nothing between, so h3 skips a level.
   *
   * No visual difference: globals.css only sets a font family on headings and
   * Tailwind preflight resets their size to inherit.
   */
  headingLevel?: "h2" | "h3";
};

function ProjectCardBody({
  project,
  headingLevel: Heading = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <>
      <div className="relative aspect-square w-full overflow-hidden min-[970px]:w-1/2">
        <GalleryImage
          src={project.thumbnail}
          alt={project.title}
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover overlay: blur + plus icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-md">
            <Plus className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="sr-only">Show more</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1 p-4">
        <Heading className="font-medium text-foreground">{project.title}</Heading>
        <p className="text-sm text-muted-foreground">
          {project.images.length} photos
        </p>
      </div>
    </>
  );
}

export function ProjectCard({
  project,
  onOpen,
  href,
  headingLevel,
}: ProjectCardProps) {
  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        <ProjectCardBody project={project} headingLevel={headingLevel} />
      </Link>
    );
  }

  return (
    <ProjectCardOpenButton
      project={project}
      onOpen={onOpen}
      className={cardClassName}
    >
      <ProjectCardBody project={project} headingLevel={headingLevel} />
    </ProjectCardOpenButton>
  );
}
