import type { Metadata, Viewport } from "next";
import Image from "next/image";
import AboutHero from "@/components/AboutUs/AboutHero";
import OurStory from "@/components/AboutUs/OurStoy";
import OurProcess from "@/components/AboutUs/OurProcess";
import OurPromise from "@/components/AboutUs/OurPromise";
import ServingCalgary from "@/components/AboutUs/ServingCalgary";
import ServiceBanner from "@/components/ServiceBanner/service-banner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "About Primo Painters | Calgary Interior Painting Company",

  description:
    "Learn about Primo Painters, a locally owned Calgary interior painting company dedicated to meticulous workmanship, honest pricing, and exceptional customer service.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Primo Painters | Calgary Interior Painting Company",

    description:
      "Learn about Primo Painters and why Calgary homeowners trust us for professional interior painting.",

    url: "/about",
  },

  twitter: {
    title: "About Primo Painters | Calgary Interior Painting Company",

    description:
      "Learn about Primo Painters and why Calgary homeowners trust us for professional interior painting.",
  },
};

export default function page() {
  return (
    <>
      <AboutHero />
      <OurStory />
      {/* Process and Promise share one container, one background image and one
          gradient, rather than each carrying its own. Two sections with their
          own image and their own ground showed a seam where they met, however
          closely the colours were matched.

          Both sections' grounds are the identical translucent gradient, so the
          picture runs continuously underneath the pair and the join disappears.

          The image is decorative: empty alt, hidden from assistive tech. It
          adds nothing to the text a search engine reads. */}
      <div className="relative overflow-hidden">
        <Image
          src="/interior-painting/long-wall-after-painted.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-15"
        />
        <div className="relative">
          <OurProcess />
          <OurPromise />
        </div>
      </div>
      <ServingCalgary />
      {/* The ticker now runs from the layout, top and bottom, on every page.
          This page level copy would have made three on /about. */}
      {/* Removed from the page on 2026-09-14 at Frank's request: ServingCalgary
          above already makes this point, so the two were saying the same thing
          back to back.

          ⚠ This is a content removal on a ranking page, not a design change.
          It takes "Ready to Transform Your Interior Space?" off /about, which
          the live site has at scripts/seo-baseline/about.txt line 147 as an h3,
          with its prose at line 228. The SEO gate will report both as removed.
          Uncomment to put it back. */}
      {/* <div className="pb-8">
        <ServiceBanner />
      </div> */}
    </>
  );
}
