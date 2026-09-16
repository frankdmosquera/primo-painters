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
      className="bg-accent text-accent-foreground hover:bg-accent/85 cursor-pointer border font-semibold"
    >
      Book Now
    </Button>
  );
}
