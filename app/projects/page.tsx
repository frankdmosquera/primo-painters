import type { Metadata } from "next";
import { ProjectGalleryGrid } from "@/components/projects/project-gallery-grid";
import { getProjects } from "@/data/projectsData";

// One page per service, listing that service's own photos. The data comes from
// data/projectsData.ts, which builds it from data/serviceData.ts.
//
// History worth keeping: a gallery was deliberately removed from this site. It
// is the first item on the approved-changes list in scripts/README.md, "Gallery
// removed, it 404'd and was linked from every page". This route brings that
// section back under a new URL. The old one was removed because it was broken,
// not because a gallery is unwanted.

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse our recent painting projects - exteriors, interiors, and full home repaints.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground">
          Recent Projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          A look at some of our recent painting work.
        </p>
      </div>

      <ProjectGalleryGrid projects={projects} cardMode="link" headingLevel="h2" />
    </main>
  );
}
