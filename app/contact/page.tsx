import Image from "next/image";
import type { Metadata, Viewport } from "next";

import BgBackground2 from "@/public/SVGs/backgrounds/above-gallery-bg-line.svg";

import Calendly from "@/components/calendly";
import { ContactForm } from "@/components/forms/ContactForm";
import GoogleMap from "./GoogleMap";
import StandardHero from "@/components/heros/StandardHero";
import { siteConfig } from "@/data/siteConfig";
import HeroCallToAction from "@/components/heros/HeroCallToAction";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Contact Primo Painters | Calgary Interior Painters",

  description:
    "Contact Primo Painters to schedule your free interior painting estimate. Serving Calgary homeowners with professional interior painting, honest pricing, and meticulous workmanship.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Primo Painters | Calgary Interior Painters",

    description:
      "Get in touch with Primo Painters to schedule your free interior painting estimate.",

    url: "/contact",

    siteName: siteConfig.business.name,

    locale: "en_CA",

    type: "website",

    images: [
      {
        url: siteConfig.branding.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.business.name} - Contact`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact Primo Painters | Calgary Interior Painters",

    description:
      "Get in touch with Primo Painters to schedule your free interior painting estimate.",

    images: [siteConfig.branding.ogImage],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero  */}
      {/* Heights are minimums, not fixed, and the content sits in normal flow.
          It was a fixed height section with the content in an absolutely
          positioned inset-0 box, so anything taller than the box overflowed it
          both ways, justify-center split the overflow, and the top half slid
          under the sticky header. Measured at 20px of the h1 hidden. Same bug
          and same fix as AboutHero. */}
      <section className="relative flex min-h-[30rem] min-[22rem]:min-h-[28rem] min-[25rem]:min-h-[24rem] lg:min-h-[28rem]">
        <Image
          src={siteConfig.branding.ogImage}
          alt={"primo Painters Og-Image"}
          fill
          className="object-cover brightness-50 w-full h-auto "
          priority
          // sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/65"></div>
        {/* here center the content */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 px-3 py-14 text-center min-[22rem]:px-6 md:px-12">
          <div>
            <h1 className="  text-3xl min-[25rem]:text-4xl  md:text-5xl lg:text-6xl font-bold text-white ">
              Contact
              <span className="bg-reveal ml-2">Primo Painters</span>{" "}
            </h1>
            <p className="block mt-3  text-white   font-medium   min-[25rem]:text-lg ">
              Have questions or ready to get started? We'd love to hear about
              your interior painting project.
            </p>
          </div>
          {/* No HeroHomeButtons here, unlike the home and about heroes.
              This page embeds Calendly twice below, carries a contact form and
              a map, and the header shows the phone number on every page. The
              hero would have been a fourth route to the same outcome.

              That is the same reasoning recorded at the top of
              components/heros/HeroHomeButtons.tsx, which already dropped the
              form link from the hero for this page for this reason. */}
        </div>
      </section>
      {/* Decorative Background */}
      <div className="relative translate-y-20">
        <div className="absolute -z-10">
          <img
            src={BgBackground2.src}
            width={BgBackground2.width}
            height={BgBackground2.height}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
      {/* ContactOptions  */}
      <section className="py-12 px-4 bg-background">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            We'd Love to Hear From You
          </h2>

          <p className="mt-5 text-lg text-gray-700 leading-8 max-w-3xl mx-auto">
            Ready to book your free interior painting estimate? Schedule a
            convenient time below. If you have questions about your project,
            simply scroll down and send us a message.
          </p>
        </div>
      </section>

      {/* Online Booking */}
      <Calendly />

      {/* ContactForm*/}
      <section className="relative pt-20 pb-8 px-4 w-full">
        {/* Decorative Background */}
        <div className="absolute inset-x-0 top-0 -z-10">
          <img
            src={BgBackground2.src}
            width={BgBackground2.width}
            height={BgBackground2.height}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="container max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.25em] text-[#0D378D] font-semibold">
            Prefer Email?
          </p>

          <h2 className="text-3xl lg:text-5xl font-bold mt-3 text-black">
            Send Us a Message
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-8">
            Whether you're planning a single room or your entire home, we're
            happy to answer your questions and help you get started.
          </p>
        </div>
        {/* Contact Form */}
        <ContactForm />
      </section>
      {/* Google Map */}
      <div className="relative">
        {/* Decorative Background */}
        <div className="absolute inset-x-0 top-0 -z-10">
          <img
            src={BgBackground2.src}
            width={BgBackground2.width}
            height={BgBackground2.height}
            alt=""
            aria-hidden="true"
          />
        </div>
        <GoogleMap />
      </div>
    </>
  );
}
