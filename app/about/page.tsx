import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/siteConfig";
import Image from "next/image";
import AboutHero from "@/components/AboutUs/AboutHero";
import BgBackground2 from "@/public/SVGs/backgrounds/above-gallery-bg-line.svg";
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

    siteName: siteConfig.business.name,

    locale: "en_CA",

    type: "website",

    images: [
      {
        url: siteConfig.branding.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.business.name} - About`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "About Primo Painters | Calgary Interior Painting Company",

    description:
      "Learn about Primo Painters and why Calgary homeowners trust us for professional interior painting.",

    images: [siteConfig.branding.ogImage],
  },
};

export default function page() {
  return (
    <>
      <AboutHero />
      {/* Decorative Background. Outside OurStory on purpose: that section is a
          container max-w-7xl, so a line placed inside it stops reaching the
          page edges above 1280 and reads as a centred graphic. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-0">
          <img
            src={BgBackground2.src}
            width={BgBackground2.width}
            height={BgBackground2.height}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10">
          <OurStory />
        </div>
      </div>
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
          className="pointer-events-none object-cover opacity-30"
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
