"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationItemsData } from "@/data/navigationData";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function NavBar() {
  const currentPath = usePathname();

  // Labelled because the page has three nav landmarks. The word "navigation"
  // is deliberately not in the label: screen readers already announce the role,
  // so "Main navigation" is read aloud as "main navigation navigation".
  // See W3C APG, Landmark Regions.
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenuList className="gap-2">
        {navigationItemsData.map((item) => {
          const isActive = currentPath === item.href;

          return (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                // The link default carries hover:bg-muted, a grey pill behind
                // the text. The underline below is the hover now, so that is
                // turned off. focus-visible:ring is left alone: it is the
                // keyboard outline, not decoration.
                className="text-lg hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent"
                render={
                  <Link
                    href={item.href ?? "/"}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* The underline is its own span rather than a border or an
                        ::after, so it can transform without touching the link's
                        layout. origin-left plus scale-x wipes it in from the
                        left instead of fading, and only the transform animates,
                        so it runs on the compositor.

                        NavigationMenuIndicator is deliberately not used. Base UI
                        only activates that for items which open a popup, and
                        these are plain links, so it would never appear.

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
                }
              />
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
