"use client";

import { useEffect, useRef, useState } from "react";
import { InlineWidget } from "react-calendly";
import { siteConfig } from "@/data/siteConfig";

// How far ahead of the viewport the widget starts loading, in px. Roughly a
// screen and a half, so someone scrolling quickly still arrives to a calendar
// that began loading while they were a couple of sections above it.
const PRELOAD_MARGIN = 1200;

export default function Calendly() {
  const holder = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  // The widget used to mount on arrival, so the iframe was requested about
  // 350ms into every page load on home, about, contact and booking, including
  // for everyone who read the hero and left. That cost bought nothing: Chrome
  // throttles work in offscreen iframes, so it was still mid-open when a
  // scroller reached it. Loading on approach keeps the readiness and drops the
  // cost for visitors who never get this far.
  useEffect(() => {
    const node = holder.current;
    if (!node) return;

    let done = false;
    let observer: IntersectionObserver | undefined;

    const arm = () => {
      if (done) return;
      done = true;
      setShouldMount(true);
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    // Backstop. IntersectionObserver is the right tool and is what normally
    // fires, but if it is ever unavailable or silently inert, the failure mode
    // is a visitor staring at the spinner with no calendar behind it. A
    // measured scroll position cannot fail quietly, and this listener costs
    // nothing once either path has armed.
    const onScroll = () => {
      const el = holder.current;
      if (!el) return;
      if (el.getBoundingClientRect().top - window.innerHeight <= PRELOAD_MARGIN)
        arm();
    };

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) arm();
        },
        { rootMargin: `${PRELOAD_MARGIN}px` },
      );
      observer.observe(node);
    }

    // Covers a deep link or a refresh that lands already scrolled down.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={holder} className="calendly-widget relative h-[calc(100vh-4rem)]">
      {/* Sits behind the widget rather than being swapped out, so it also
          covers the gap between the iframe arriving and Calendly finishing
          its own boot inside it. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div
          className="mb-4 text-3xl motion-safe:animate-spin"
          aria-hidden="true"
        >
          ⏳
        </div>
        <p className="text-lg font-medium">Loading calendar, please wait…</p>
      </div>
      <div className="relative z-2 h-full">
        {shouldMount && (
          <InlineWidget
            url={siteConfig.booking.calendlyUrl}
            styles={{ minWidth: "320px", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
}
