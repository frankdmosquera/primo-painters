"use client";

import { Button } from "@/components/ui/button";
import { useCalendly } from "./calendly-provider";

/**
 * The CTA is its own client component so the header itself can stay a server
 * component. "Book Now" and the Calendly popup are Primo's content, not
 * LATAM's, so only the styling comes across.
 */
export default function HeaderBookNow() {
  const openCalendly = useCalendly();

  return (
    <Button
      size="default"
      onClick={openCalendly}
      // Amber, not blue. Amber is the action colour and the logo owns the
      // blue, so the CTA does not compete with the brand mark beside it.
      // Dark text on amber, never white: white measures 2.37:1 and fails.
      // h-11 and text-base rather than the size prop: the Button scale tops
      // out at h-9/14px, which left the CTA smaller than the nav links at 18px
      // and the phone at 17px, so the one thing meant to be clicked was the
      // smallest text in the header.
      className="bg-accent text-accent-foreground hover:bg-accent/85 h-11 cursor-pointer border px-6 text-base font-semibold"
    >
      Book Now
    </Button>
  );
}
