/**
 * The single source for the site's navigation links.
 *
 * Consumed by the desktop nav, the mobile menu and the footer, so a link can
 * only ever be wrong in one place. Before this file the same list was
 * hardcoded four times and they had drifted apart, which is how `/gallery`
 * ended up linked from two places while returning a 404.
 *
 * Shape matches `the-latam-painters/lib/data/navigationItemsData.ts` so the
 * nested `items` form can be added later without a rewrite, which is what the
 * six service pages will need:
 *
 *   { title: "Services", items: [{ title, href, description }, ...] }
 *
 * `/booking` is deliberately NOT listed here. It still exists and stays in the
 * sitemap, but it is a landing page for traffic arriving from Google Business
 * Profile and shared links, not a section of the site. Leaving it out of the
 * navigation means every visit to it is provably external, which makes it
 * readable as an attribution signal.
 *
 * Nothing is lost in search by omitting it: the page's only unique content is
 * its title and one h1, because the booking interface is a Calendly iframe and
 * Google cannot read inside an iframe. If that page is ever meant to rank, it
 * needs real copy above the embed first.
 *
 * Booking on the site is handled by the "Book Now" buttons, which open the
 * Calendly popup rather than navigating anywhere.
 */

/**
 * `icon` is a name, not a component, so this file stays plain data with no
 * React imports. The mobile menu maps these names to lucide icons. Adding a
 * name here that has no mapping is a type error, not a blank space at runtime.
 */
export type NavigationIcon = "home" | "about" | "contact" | "projects";

/**
 * A sub-item in a dropdown. `description` is the line of copy shown under the
 * title in the desktop menu.
 */
export type NavigationSubItem = {
  title: string;
  href: string;
  description?: string;
};

/**
 * `items` is optional, and that is the whole point: an entry with no `items`
 * renders as a plain link, an entry with them renders as a dropdown. Nothing
 * currently uses it, so the nav is still flat, but the shape is now here for
 * the six service pages when they arrive.
 */
export type NavigationItem = {
  title: string;
  href: string;
  icon: NavigationIcon;
  items?: NavigationSubItem[];
};

export const navigationItemsData: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "home",
  },
  {
    title: "About",
    href: "/about",
    icon: "about",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: "projects",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: "contact",
  },
];
