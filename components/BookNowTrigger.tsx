"use client";

import type { ReactNode } from "react";
import { useCalendly } from "./calendly-provider";

/**
 * A booking button with no styling of its own.
 *
 * Each place on the site that offers booking has its own look, so this only
 * changes behaviour: a real <button> that opens the shared Calendly modal
 * instead of an <a> that navigates to /booking and loses the visitor's place
 * on the page.
 *
 * It renders a single element. The previous ButtonBlue nested a <button>
 * inside a <Link>, which is invalid HTML and gives screen readers two
 * interactive controls where there is one thing to press.
 */
export default function BookNowTrigger({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const openCalendly = useCalendly();

  return (
    <button
      type="button"
      onClick={openCalendly}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
