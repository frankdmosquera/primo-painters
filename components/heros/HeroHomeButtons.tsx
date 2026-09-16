import { PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { HeroCalendarImage } from "./HeroCalendarImage";

// Two actions, both visible. This used to be a "Questions?" toggle that
// revealed Call and Form on tap, which charged a tap for the thing most
// visitors to a trades site arrive wanting to do, behind a label that did not
// promise a phone number. Form went with it: the contact page has one and
// ServiceBanner embeds Calendly on this page already, so the hero was offering
// three routes to the same outcome.
//
// The number is spelled out rather than labelled "Call" because tel: does
// nothing useful on desktop, where people read it and dial from their phone.
// It matches siteConfig.business.phoneDisplay, which is what the header and
// the GBP listing show.
//
// No state left here, so this is a server component now. HeroCalendarImage
// carries its own "use client".
export function HeroHomeButtons() {
  return (
    <div className="flex flex-col items-center gap-6">
      <HeroCalendarImage />

      {/* The anchor IS the button. Previously a div held the padding and the
          icon while a bare <a> wrapped only the word, so tapping the icon or
          anywhere in the padding did nothing. h-11 keeps the whole thing at
          the 44px tap target minimum. */}
      <a
        href={`tel:${siteConfig.business.phone}`}
        className="inline-flex h-11 items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-[3px] focus-visible:ring-white/50 focus-visible:outline-none"
      >
        <PhoneCall className="size-4" aria-hidden="true" />
        <span>{siteConfig.business.phoneDisplay}</span>
      </a>
    </div>
  );
}
