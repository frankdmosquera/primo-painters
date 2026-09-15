import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/data/projectsData";
import { ProjectDetailView } from "@/components/projects/project-detail-view";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-builds a static page for every project in data/projectsData.ts at build
 * time, which is what CLAUDE.md asks for on dynamic routes: generateStaticParams,
 * prerendered at build.
 */
export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Back to projects
      </Link>

      <h1 className="mt-4 text-3xl font-semibold text-foreground">
        {project.title}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-8">
        <ProjectDetailView project={project} />
      </div>
    </main>
  );
}
