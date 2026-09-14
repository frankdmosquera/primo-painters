// ⚠ PLACEHOLDER CONTENT. MUST NOT REACH MAIN.
//
// Every project below is invented: the titles, the descriptions and the
// photos. The images are picsum.photos, a random-image service, and the
// descriptions claim work that was never done.
//
// It is here on purpose, at Frank's request on 2026-09-14, so the gallery
// design can be built against realistic-looking content. That is the only
// reason.
//
// The grid is server rendered, so these titles and descriptions are in the
// HTML Google reads, on a site that ranks in Calgary. This is the same class
// of problem as the fabricated reviews in GoogleReviewCarousel3.tsx.
//
// Before this branch goes near main: replace every entry with Primo's real
// projects and real photos, or take the section off the page.
//
// the-latam-painters generates theirs the same way, in lib/projects.ts, and
// carries the same caveat.

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short summary, used on a detail page and in meta description */
  description: string;
  /** Cover image shown on the card, same path convention as ProjectImage.src */
  thumbnail: string;
  images: ProjectImage[];
};

const PROJECT_TITLES = [
  "Modern Farmhouse Exterior",
  "Downtown Loft Interior",
  "Coastal Bungalow Refresh",
  "Victorian Restoration",
  "Minimalist Condo",
  "Craftsman Bungalow",
  "Suburban Family Home",
  "Industrial Warehouse Conversion",
  "Lakeside Cottage",
  "Mid-Century Modern Remodel",
  "Colonial Revival",
  "Ranch House Update",
  "Contemporary New Build",
  "Historic Brownstone",
  "Mountain Cabin Retreat",
  "Urban Rowhouse",
  "Tudor Style Home",
  "Desert Modern",
  "Scandinavian-Inspired Interior",
  "Classic Cape Cod",
  "Georgian Townhouse",
  "Split-Level Refresh",
  "Waterfront Estate",
  "Modern Farmhouse Interior",
  "Bohemian Loft",
  "Prairie Style Home",
  "Shaker-Inspired Kitchen Repaint",
  "High-Rise Condo Refresh",
  "Vintage Duplex Restoration",
  "A-Frame Cabin",
  "Spanish Revival Villa",
  "Row of Townhomes",
  "Converted Barn Home",
  "Rooftop Terrace Suite",
  "New Construction Spec Home",
  "Mid-Rise Apartment Common Areas",
  "Historic Church Conversion",
  "Lakefront Duplex",
  "Ski Chalet Retreat",
  "Modern Courtyard House",
];

function makeProject(index: number): Project {
  const slug = `project-${index + 1}`;
  const title = PROJECT_TITLES[index];

  const images = Array.from({ length: 20 }, (_, i) => ({
    src: `https://picsum.photos/seed/${slug}-${i + 1}/1200/900`,
    alt: `${title} - photo ${i + 1}`,
  }));

  return {
    slug,
    title,
    description: `A full interior repaint for a ${title.toLowerCase()}, including surface prep, colour consultation, and a two-coat finish built to hold up year-round.`,
    thumbnail: `https://picsum.photos/seed/${slug}-thumb/600/600`,
    images,
  };
}

export const projects: Project[] = Array.from({ length: 40 }, (_, i) =>
  makeProject(i),
);

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
