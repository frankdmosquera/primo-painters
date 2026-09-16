"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItemsData } from "@/data/navigationData";
import { logoImg } from "@/data/images";
import { siteConfig } from "@/data/siteConfig";
import { useCalendly } from "./calendly-provider";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  // Matches the desktop nav, which already marks the current page. No visual
  // difference either way: aria-current is announced, not styled.
  const currentPath = usePathname();
  const openCalendly = useCalendly();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/*
        Primo's own mark, not lucide's Menu. The pill and the short third bar
        are the distinctive part, so they are kept; the colour comes from the
        theme rather than the hardcoded #0D378D the old markup carried.

        shadcn's Button still does the work underneath - focus ring, press
        state, disabled handling - per the stack rule. Only the shape is ours.
      */}
      <SheetTrigger
        render={
          <Button
            aria-label="Open menu"
            // The press state is ours because shadcn's is written as
            // active:not-aria-[haspopup]:translate-y-px, which switches itself
            // off for anything opening a popup - and this button opens a
            // sheet, so it carries aria-haspopup="dialog". Hover never fires
            // on a phone either, so without this the only control in the
            // mobile header gives no feedback at all when tapped.
            className="bg-primary text-primary-foreground hover:bg-primary-dark active:bg-primary-dark h-12 w-[3.8rem] rounded-full p-0 shadow-sm transition-[background-color,transform,box-shadow] duration-150 active:scale-[0.94] active:shadow-none"
          />
        }
      >
        {/*
          Inline width and height, not Tailwind. shadcn's Button carries
          [&_svg:not([class*='size-'])]:size-4, which forces any bare svg to
          16x16 and squashes a 3:2 mark into a square. An inline style is the
          one thing that rule cannot override.
        */}
        <svg
          style={{ width: 27, height: 18 }}
          viewBox="0 0 24 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1.5 2 H22.5" />
          <path d="M1.5 8 H22.5" />
          <path d="M12 14 H22.5" />
        </svg>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col gap-0 overflow-hidden p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-sm"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

        <SheetHeader className="relative flex-row items-center justify-between border-b px-5 py-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <Image
              src={logoImg.src}
              alt={logoImg.alt}
              title={siteConfig.business.name}
              width={71}
              height={50}
              className="h-9 w-auto"
            />
          </Link>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse pages for {siteConfig.business.name}
          </SheetDescription>
        </SheetHeader>

        <nav
          className="relative flex-1 overflow-y-auto px-3 py-4"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {navigationItemsData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={currentPath === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="hover:text-primary-dark flex items-center justify-between rounded-lg px-2 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        <SheetFooter className="gap-3 border-t px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+4rem)]">
          <a
            href={`tel:${siteConfig.business.phone}`}
            aria-label={`Call ${siteConfig.business.name} at ${siteConfig.business.phoneDisplay}`}
            className="text-primary-dark flex items-center justify-center gap-2 font-semibold"
          >
            <PhoneIcon
              className="text-primary-light size-4"
              fill="var(--primary)"
            />
            {siteConfig.business.phoneDisplay}
          </a>
          <SheetClose
            render={
              <Button
                size="lg"
                onClick={openCalendly}
                className="bg-accent text-accent-foreground hover:bg-accent/85 w-full text-base font-semibold"
              />
            }
          >
            Book Now
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
