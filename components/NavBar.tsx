"use client";

import { navigationItemsData } from "@/data/navigationData";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Plain nav, ul, li and a rather than Base UI's NavigationMenu. That
// component is for menus with dropdown panels, and it brings its popup and
// positioning code with it. These are four plain links, so none of that ever
// ran, but every phone downloaded it for a menu that is hidden below lg.
// The classes are the ones NavigationMenu rendered, so the result is the
// same markup and the same look. Keyboard use is plain Tab between links,
// which is what the W3C APG recommends for site navigation.
function NavBar() {
  const currentPath = usePathname();

  // Labelled because the page has three nav landmarks. The word "navigation"
  // is deliberately not in the label: screen readers already announce the role,
  // so "Main navigation" is read aloud as "main navigation navigation".
  // See W3C APG, Landmark Regions.
  return (
    <nav
      aria-label="Main"
      className="relative flex max-w-max flex-1 items-center justify-center"
    >
      <ul className="flex flex-1 list-none items-center justify-center gap-2">
        {navigationItemsData.map((item) => {
          const isActive = currentPath === item.href;

          return (
            <li key={item.title} className="relative">
              {/* No hover background: the underline below is the hover.
                  focus-visible:ring is the keyboard outline, not decoration. */}
              <Link
                href={item.href ?? "/"}
                aria-current={isActive ? "page" : undefined}
                className="flex items-center gap-2 rounded-lg p-2 text-lg transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
              >
                {/* The underline is its own span rather than a border or an
                    ::after, so it can transform without touching the link's
                    layout. origin-left plus scale-x wipes it in from the
                    left instead of fading, and only the transform animates,
                    so it runs on the compositor.

                    Nothing here is written per item, so adding a service
                    page to navigationData gets the same underline free. */}
                <span className="group/navlink relative inline-block py-0.5">
                  {item.title}

                  <span
                    aria-hidden="true"
                    className={cn(
                      "bg-primary absolute inset-x-0 -bottom-px h-[2px] rounded-full",
                      "origin-left motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover/navlink:scale-x-100",
                    )}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
