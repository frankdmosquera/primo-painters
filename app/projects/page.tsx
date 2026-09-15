import type { Metadata } from "next";
import { ProjectGalleryGrid } from "@/components/projects/project-gallery-grid";
import { getProjects } from "@/data/projectsData";

// ⚠ PLACEHOLDER CONTENT. MUST NOT REACH MAIN.
//
// Every project this page lists is invented, and so is every project page
// generated from it. See the warning at the top of data/projectsData.ts.
//
// This route is a bigger problem than the home page gallery, not a smaller
// one: the gallery showed four fabricated projects at a time inside a real
// page, whereas this creates a new indexable URL per project. With the current
// data that is one listing page plus forty project pages of work that was
// never done, on a site that ranks in Calgary.
//
// Note also that a gallery was deliberately removed from this site: it is the
// first item on the approved-changes list in scripts/README.md, "Gallery
// removed, it 404'd and was linked from every page". This brings that section
// of the site back under a new URL.
//
// Before this branch goes near main: real projects and real photos, or delete
// this route and its [slug] child.

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

      <ProjectGalleryGrid projects={projects} cardMode="link" />
    </main>
  );
}
