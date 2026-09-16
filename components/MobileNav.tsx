"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PhoneIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
        // The built-in close is size="icon-sm", 28px with a 16px icon, well
        // under the 44px both Apple and Google ask for. SheetContent is
        // shared with HeroCallToAction, so it is switched off here rather
        // than resized for everything.
        showCloseButton={false}
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
              width={80}
              height={56}
              className="h-14 w-auto"
            />
          </Link>
          <SheetClose
            aria-label="Close menu"
            className="text-foreground/70 hover:text-foreground hover:bg-muted active:bg-muted -mr-2 flex size-11 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <X className="size-6" strokeWidth={2.5} aria-hidden="true" />
          </SheetClose>

          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse pages for {siteConfig.business.name}
          </SheetDescription>
        </SheetHeader>

        <nav
          className="relative flex-1 overflow-y-auto px-3 py-4"
          aria-label="Mobile"
        >
          <div className="flex flex-col">
            {navigationItemsData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={currentPath === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  // justify-between was already here waiting for something on
                  // the right that never arrived, so each row was bare text
                  // with nothing to say it was tappable. The chevron and the
                  // divider are that. py-4 takes the row to 60px, over the
                  // 44px touch minimum.
                  "border-border/60 flex items-center justify-between gap-3 border-b px-2 py-4 text-lg font-semibold transition-colors",
                  "active:bg-muted",
                  currentPath === item.href
                    ? "text-primary-dark"
                    : "text-foreground hover:text-primary-dark",
                )}
              >
                {item.title}

                <ChevronRight
                  className="text-muted-foreground size-5 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* The 4rem below the buttons is comfortable on a normal phone and is
            what clips a link in half on a short one, because the footer is
            mt-auto and every pixel it takes comes off the list above it.
            Under 600px tall it drops to 1.5rem, which hands about 40px back.
            A height query, not a width one: a 320 wide phone that is 700 tall
            has no problem here. The safe area inset is kept at both sizes. */}
        <SheetFooter className="gap-4 border-t px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+4rem)] [@media(max-height:600px)]:pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
          <a
            href={`tel:${siteConfig.business.phone}`}
            aria-label={`Call ${siteConfig.business.name} at ${siteConfig.business.phoneDisplay}`}
            className="border-primary/30 text-primary-dark active:bg-muted flex h-12 items-center justify-center gap-2 rounded-full border text-base font-semibold transition-colors"
          >
            <PhoneIcon
              className="text-primary-light size-5"
              fill="var(--primary)"
            />
            {siteConfig.business.phoneDisplay}
          </a>
          <SheetClose
            render={
              <Button
                size="lg"
                onClick={openCalendly}
                className="bg-accent text-accent-foreground hover:bg-accent/85 h-14 w-full rounded-full text-lg font-semibold"
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
