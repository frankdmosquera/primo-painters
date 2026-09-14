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

  return (
    <NavigationMenu>
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
