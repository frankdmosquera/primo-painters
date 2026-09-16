// The gallery's data, built from the six real services.
//
// Each card is one service: its title, its description and its photos, all of
// which already exist and are already live. The card carries the description;
// the photos inside carry only their own alt text.
//
// This replaced 40 invented projects with picsum.photos images on 2026-09-15.
// That generator is kept at the bottom of this file, commented out, because it
// is still useful for designing against fake content. It must never be the
// thing that ships: the grid is server rendered, so whatever is here lands in
// the HTML Google reads, on a site that ranks in Calgary.
//
// The source of truth is data/serviceData.ts, which itself pulls the image
// arrays from data/images.ts. Nothing is duplicated here.

import { services } from "./serviceData";
import {
  bearspawBuiltInsImages,
  darkKitchenCabinetsImages,
  garageDrywallImages,
} from "./images";

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

/**
 * Slug from the service title rather than from its `type`.
 *
 * `type` reads "trim & doors", which cannot be a URL segment. The title reads
 * "Trim & Doors Painting", which slugs cleanly and carries the search terms:
 * /projects/trim-doors-painting rather than /projects/project-4.
 */
function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const serviceProjects: Project[] = services.map((service) => ({
  slug: toSlug(service.title),
  title: service.title,
  description: service.description,
  // The first photo of the service's own gallery. No separate cover image
  // exists, and inventing one would mean a file nobody has shot.
  thumbnail: service.images[0].src,
  images: service.images,
}));

/**
 * Real jobs, written out rather than derived, because a job is not a service.
 *
 * Each one was picked out of the raw job folders by opening the photos: the
 * folders are working records, full of prep shots, detail macros and half-done
 * rooms, so only the frames that show finished work were brought across.
 *
 * ⚠ The descriptions below are drafts and have not been approved. They are
 * copy on a page that ranks, so they need Frank's eye before this merges.
 */
const jobProjects: Project[] = [
  {
    slug: "dark-kitchen-cabinets-painted-white",
    title: "Dark Kitchen Cabinets Painted White",
    description:
      "A full kitchen cabinet repaint, taking dark espresso-stained cabinets to a clean white finish. The granite and the backsplash stayed exactly as they were, so the whole change is in the cabinets.",
    thumbnail: darkKitchenCabinetsImages[0].src,
    images: darkKitchenCabinetsImages,
  },
  {
    slug: "built-ins-and-panelling-bearspaw",
    title: "Built-Ins and Panelling, Bearspaw",
    description:
      "Built-in cabinetry, hallway panelling and interior doors painted white, carried through to the sunroom doors and window frames.",
    thumbnail: bearspawBuiltInsImages[0].src,
    images: bearspawBuiltInsImages,
  },
  {
    slug: "garage-drywall-painted-white",
    title: "Garage Drywall Painted White",
    description:
      "A garage taken from bare taped and mudded drywall to a finished white interior, walls and ceiling.",
    thumbnail: garageDrywallImages[0].src,
    images: garageDrywallImages,
  },
];

export const projects: Project[] = [...serviceProjects, ...jobProjects];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// The old placeholder generator. Kept for designing against fake content, and
// commented out rather than deleted at Frank's request on 2026-09-15.
//
// To use it: uncomment, and point `projects` at it instead of the map above.
// Never commit with it live. Every title below is invented, every description
// claims work that was never done, and every image is a random photo from
// picsum.photos of somebody else's house.
// ---------------------------------------------------------------------------

// const PROJECT_TITLES = [
//   "Modern Farmhouse Exterior",
//   "Downtown Loft Interior",
//   "Coastal Bungalow Refresh",
//   "Victorian Restoration",
//   "Minimalist Condo",
//   "Craftsman Bungalow",
//   "Suburban Family Home",
//   "Industrial Warehouse Conversion",
//   "Lakeside Cottage",
//   "Mid-Century Modern Remodel",
//   "Colonial Revival",
//   "Ranch House Update",
//   "Contemporary New Build",
//   "Historic Brownstone",
//   "Mountain Cabin Retreat",
//   "Urban Rowhouse",
//   "Tudor Style Home",
//   "Desert Modern",
//   "Scandinavian-Inspired Interior",
//   "Classic Cape Cod",
//   "Georgian Townhouse",
//   "Split-Level Refresh",
//   "Waterfront Estate",
//   "Modern Farmhouse Interior",
//   "Bohemian Loft",
//   "Prairie Style Home",
//   "Shaker-Inspired Kitchen Repaint",
//   "High-Rise Condo Refresh",
//   "Vintage Duplex Restoration",
//   "A-Frame Cabin",
//   "Spanish Revival Villa",
//   "Row of Townhomes",
//   "Converted Barn Home",
//   "Rooftop Terrace Suite",
//   "New Construction Spec Home",
//   "Mid-Rise Apartment Common Areas",
//   "Historic Church Conversion",
//   "Lakefront Duplex",
//   "Ski Chalet Retreat",
//   "Modern Courtyard House",
// ];
//
// function makeProject(index: number): Project {
//   const slug = `project-${index + 1}`;
//   const title = PROJECT_TITLES[index];
//
//   const images = Array.from({ length: 20 }, (_, i) => ({
//     src: `https://picsum.photos/seed/${slug}-${i + 1}/1200/900`,
//     alt: `${title} - photo ${i + 1}`,
//   }));
//
//   return {
//     slug,
//     title,
//     description: `A full interior repaint for a ${title.toLowerCase()}, including surface prep, colour consultation, and a two-coat finish built to hold up year-round.`,
//     thumbnail: `https://picsum.photos/seed/${slug}-thumb/600/600`,
//     images,
//   };
// }
//
// export const placeholderProjects: Project[] = Array.from(
//   { length: 40 },
//   (_, i) => makeProject(i),
// );
