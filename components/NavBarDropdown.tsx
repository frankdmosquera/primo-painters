"use client";

// Ported from the-latam-painters components/NavBar.tsx. Desktop navigation
// only - not their Header, not their MobileNav.
//
// NOT WIRED IN. Header.tsx still renders components/NavBar.tsx, which is
// Primo's own flat nav. This sits beside it until Frank switches over. To
// switch: change the NavBar import in Header.tsx to this file.
//
// The difference from ours is dropdowns. An entry in navigationData.ts with no
// `items` renders as a plain link exactly as it does today; an entry with
// `items` renders a trigger and a panel. Nothing in the data has `items` yet,
// so switching to this today would look identical to what is already there.
// It earns its place when the six service pages land.
//
// Two changes from theirs:
//
//   It reads Primo's navigationItemsData rather than their
//   navigationItemsData2. Same shape - navigationData.ts was written to match
//   theirs so this port would not need a rewrite.
//
//   aria-current is kept from our NavBar. Theirs does not mark the active
//   page, and losing that on a swap would be a quiet accessibility regression.
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationItemsData } from "@/data/navigationData";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavBarDropdown() {
  const currentPath = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItemsData.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.items?.length ? (
              <>
                <NavigationMenuTrigger className="text-lg font-normal">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                    {item.items.map((subItem) => (
                      <ListItem
                        key={subItem.title}
                        href={subItem.href}
                        title={subItem.title}
                        className="text-lg"
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                className="text-lg"
                render={
                  <Link
                    href={item.href ?? "/"}
                    aria-current={
                      currentPath === item.href ? "page" : undefined
                    }
                  >
                    {item.title}
                  </Link>
                }
              />
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  className: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        className={className}
        closeOnClick
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1">
              <div className="text-base leading-none font-medium text-secondary-foreground">
                {title}
              </div>
              <div className="line-clamp-2 text-base text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}

export default NavBarDropdown;
