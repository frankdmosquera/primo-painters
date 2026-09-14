import { faqJsonLd } from "@/data/faqJsonLd";
import type { Metadata, Viewport } from "next";
import HomeHero from "@/components/heros/HomeHero";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Calgary Interior House Painters | Primo Painters",

  description:
    "Primo Painters provides professional interior house painting in Calgary, specializing in walls, ceilings, trim, doors, garages, and more. Free estimates.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Calgary Interior House Painters | Primo Painters",

    description:
      "Professional interior house painting in Calgary for walls, ceilings, trim, doors, garages, and more.",

    url: "/",
  },

  twitter: {
    title: "Calgary Interior House Painters | Primo Painters",

    description:
      "Professional interior house painting in Calgary for walls, ceilings, trim, doors, garages, and more.",
  },
};

export default async function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <HomeHero />
      {/* Kept so there is something to scroll past while the hero image pins.
          Remove it once the next real section lands. */}
      <div className="h-400">Test H1</div>
      {/* <OurServices /> */}
      {/* <WhyChooseUs /> */}
      {/* <div className="flex flex-col "> */}
      {/* <Reviews /> */}
      {/* <div className="relative top-[100px]">
          <BgLines />
        </div> */}
      {/* <ServiceBanner /> */}
      {/* <CalgaryPainting /> */}

      {/* <FaqSection /> */}
      {/* <div className="relative ">
          <BgLines />
        </div> */}
      {/* <ContactFormSection /> */}
      {/* <FinalCTA /> */}
      {/* </div> */}
    </>
  );
}
