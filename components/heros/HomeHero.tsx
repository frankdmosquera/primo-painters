import TrustBadges from "../trust-badges";
import Image from "next/image";

import { HeroHomeImg } from "@/data/images";
import { HeroHomeButtons } from "./HeroHomeButtons";

const HomeHero = () => {
  // Height: one clamp instead of six breakpoint heights, and svh rather than
  // vh so mobile browser chrome cannot push the content off screen. Capped so
  // it never becomes a void on a tall monitor, and short enough that the next
  // section always peeks, which is what tells people there is more below.
  return (
    <section className="relative isolate overflow-hidden">
      {/* fill makes this absolute, so it contributes nothing to layout and
          simply stretches to whatever height the content below produces. */}
      <Image
        src={HeroHomeImg.src}
        alt={HeroHomeImg.alt}
        fill
        className="-z-20 object-cover"
        priority
        sizes="100vw"
      />

      {/* A single scrim. This was brightness-70 on the image AND a flat
          bg-black/30 on top, two ways of doing the same job stacked, which is
          why the photo read muddy. A gradient keeps the middle of the image
          alive while holding contrast where the text actually sits. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />

      {/* This padding is the hero's height. No h-, no min-h, no calc tied to
          the header. Add a line of copy and the section grows with it. */}
      {/* gap-12 between the three groups, gap-3 inside the heading block, so
          the headline and its line of copy read as one thing and the calendar
          reads as a separate invitation rather than being crowded against it */}
      <div className="flex w-full flex-col items-center gap-12 px-4 py-20 text-center md:py-24 lg:py-28">
        <div className="flex flex-col items-center gap-3">
          {/* CALGARY'S is its own line by structure rather than by hoping the
              text wraps there, so the highlighted phrase stays intact. The
              explicit space matters for screen readers: without it the text
              content reads as one run, "CALGARY'SINTERIOR". */}
          <h1 className="mx-auto max-w-[22ch] text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.3] font-bold text-white">
            <span className="block">CALGARY'S </span>
            <span className="bg-reveal">INTERIOR HOUSE PAINTERS</span>
          </h1>
          <p className="max-w-[46ch] font-medium text-white/90 tn:text-lg xsm:text-xl">
            Clean workmanship, premium finishes, and attention to every detail.
          </p>
        </div>
        <HeroHomeButtons />
        <TrustBadges />
      </div>
    </section>
  );
};

export default HomeHero;
