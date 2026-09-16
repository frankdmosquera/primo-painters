import TrustBadges from "../trust-badges";
import Image from "next/image";

import { HeroHomeImg } from "@/data/images/general-images";
import { HeroHomeButtons } from "./HeroHomeButtons";

const HomeHero = () => {
  return (
    /*
      A fragment, not a <section>, and that is load-bearing rather than
      sloppy. A sticky element can only travel inside its own parent, so
      wrapping these two in anything hero-sized gives the image nowhere to
      pin and it just scrolls away. Its parent has to be the page. This is
      why the-latam-painters' hero is also a bare fragment.

      No overflow-hidden anywhere above this either: overflow-hidden on an
      ancestor makes that ancestor the scroll container, and the sticky then
      silently never pins. The old version of this file had it.
    */
    <>
      {/*
        The pinned image. Ported from the-latam-painters, where it is h-160
        matched by -mt-160 on the content. Ours is 100svh instead, because
        Primo's hero carries TrustBadges too and a fixed 640px would crop it.

        The two numbers still have to match, so they are written as the same
        value: h-[calc(100svh-var(--header-h))] here, -mt-[calc(100svh-var(--header-h))] below. Change one and change the other.
      */}
      <div className="sticky top-0 -z-10 h-[calc(100svh-var(--header-h))]">
        <Image
          src={HeroHomeImg.src}
          alt={HeroHomeImg.alt}
          fill
          // LATAM's exact treatment, filter for filter. The warm desaturated
          // wash is a large part of why their hero reads as art-directed
          // rather than as a stock photo behind text.
          className="object-cover brightness-[.7] grayscale-50 sepia-20 hue-rotate-[-10deg]"
          priority
          sizes="100vw"
        />

        {/* LATAM's second pass, on top of the brightness above. Noted once so
            it is a known choice rather than an accident: this is two ways of
            darkening stacked, and it is what an earlier pass here removed for
            making the photo read muddy. Kept because the brief is to match
            their look. */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Pulled back up over the pinned image, then scrolls away normally
          while the photo stays put. min-h-[calc(100svh-var(--header-h))] matches the box above; the
          padding drives any height beyond that, so adding a line of copy still
          grows the hero rather than overflowing it. */}
      {/* max-w-[var(--site-max)] so the hero shares the header's edge. Without
          it this ran 1905px wide at 1920 while the header sat at 1280, which
          is two different pages stacked. Padding scales with the viewport for
          the same reason - 16px of gutter on a 1920 monitor is a phone value
          that nobody updated. */}
      <div className="-mt-[calc(100svh-var(--header-h))] mx-auto flex min-h-[calc(100svh-var(--header-h))] w-full max-w-[var(--site-max)] flex-col items-center justify-center gap-12 px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="flex flex-col items-center gap-3">
          {/* CALGARY'S is its own line by structure rather than by hoping the
              text wraps there, so the highlighted phrase stays intact. The
              explicit space matters for screen readers: without it the text
              content reads as one run, "CALGARY'SINTERIOR". */}
          {/* The cap was 3.25rem, which held the headline at 52px on a 1920
              monitor - small enough that the hero read as a phone layout
              stretched wide. 3.875rem lets it reach 62px, settled
              on 2026-09-16 after 4.5rem/72px read as too much. The floor and the vw
              term are unchanged, so nothing below desktop moves. */}
          <h1 className="mx-auto max-w-[22ch] text-[clamp(1.75rem,4.4vw,3.875rem)] leading-[1.3] font-bold text-white">
            <span className="block">CALGARY'S </span>
            <span className="bg-reveal">INTERIOR HOUSE PAINTERS</span>
          </h1>
          <p className="max-w-[46ch] font-medium text-white/90 min-[22rem]:text-lg min-[25rem]:text-xl">
            Clean workmanship, premium finishes, and attention to every detail.
          </p>
        </div>
        <HeroHomeButtons />
        <TrustBadges />
      </div>
    </>
  );
};

export default HomeHero;
