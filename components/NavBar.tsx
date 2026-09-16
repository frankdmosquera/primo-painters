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

function NavBar() {
  const currentPath = usePathname();

  // Labelled because the page has three nav landmarks. The word "navigation"
  // is deliberately not in the label: screen readers already announce the role,
  // so "Main navigation" is read aloud as "main navigation navigation".
  // See W3C APG, Landmark Regions.
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenuList>
        {navigationItemsData.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className="text-lg"
              render={
                <Link
                  href={item.href ?? "/"}
                  aria-current={currentPath === item.href ? "page" : undefined}
                >
                  {item.title}
                </Link>
              }
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
