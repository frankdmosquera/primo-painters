import { faqJsonLd } from "@/data/faqJsonLd";
import type { Metadata, Viewport } from "next";
import HomeHero from "@/components/heros/HomeHero";
import WhyChooseUs from "@/components/whyChooseUs";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import OurServices from "@/components/our-services";
import GoogleReviews from "@/components/google-reviews";
import { CalgaryPainting } from "@/components/calgary-painting";
import { OurProcessHome } from "@/components/home/OurProcessHome";
import FaqSection from "@/components/Faq";
import { ProjectGalleryGrid } from "@/components/projects/project-gallery-grid";
import { getProjects } from "@/data/projectsData";
import FinalCTA from "@/components/FinalCTA";

// How often this page regenerates, and with it the Google reviews it renders.
// It lives here rather than on the fetch because caching a page and fetching
// data are two different jobs: lib/googleReviews.ts just fetches, and every
// page that renders the section sets its own interval.
//
// 86,400 is a day. Reviews are billed per call on Google's dearest SKU, so this
// number is the difference between about 30 calls a month and a bill.
export const revalidate = 86400;

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
      <OurServices />
      <WhyChooseUs />

      {/*
        The before and after slider, placed where the-latam-painters puts
        theirs: directly after their WhyUs section.

        No background on purpose, so it reads as a continuation of Why Choose
        Us rather than as a separate block. Theirs sits on bg-services-bg with
        floating paint icons behind it; the icons need motion, which is not
        installed.

        Same images FinalCTA uses. When FinalCTA comes back, one of the two
        has to change or the page shows the same kitchen twice.
      */}
      {/* bg-background is not a colour choice, it is opacity. The hero image
          is sticky with the page as its parent, so it sits behind the whole
          document and every section below has to cover it. Leave this
          transparent and the hero photo shows through the slider. */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <BeforeAfterSlider
            beforeImage="/visualisations/kitchen-colour-before-oak.jpg"
            afterImage="/visualisations/kitchen-colour-after-black.png"
            beforeAlt="Kitchen with light oak cabinets before a colour change"
            afterAlt="The same kitchen with the cabinets in black"
            beforeLabel="Before"
            afterLabel="After"
            aspectClassName="aspect-[16/10]"
          />
        </div>
      </section>
      {/* <div className="flex flex-col "> */}
      {/* Real Google reviews, read server side and revalidated daily.
          components/GoogleReviewCarousel3.tsx is still on disk with its 20
          fabricated reviews. It is unlinked from here, not deleted. */}
      <GoogleReviews />
      {/* <div className="relative top-[100px]">
          <BgLines />
        </div> */}
      {/* <ServiceBanner /> */}
      <CalgaryPainting />
      <OurProcessHome />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <ProjectGalleryGrid projects={getProjects()} />
        </div>
      </section>

      <FaqSection />
      {/* <div className="relative ">
          <BgLines />
        </div> */}
      {/* <ContactFormSection /> */}
      <FinalCTA />
      {/* </div> */}
    </>
  );
}
