import Image from "next/image";
import type { Metadata, Viewport } from "next";

import blogsBanner from "@/public/banners/blogs-banner.webp";
import BgBackground2 from "@/public/SVGs/above-gallery-bg-line.svg";

import Calendly from "@/components/calendly";
import ContactForm from "./ContactForm";
import GoogleMap from "./GoogleMap";
import StandardHero from "@/components/heros/StandardHero";
import { siteConfig } from "@/data/siteConfig";
import HeroCallToAction from "@/components/heros/HeroCallToAction";
import { HeroHomeButtons } from "@/components/heros/HeroHomeButtons";

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
      <section className="relative h-[30rem] min-[22rem]:h-[28rem] min-[25rem]:h-[24rem] lg:h-[28rem]  ">
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
        <div className=" absolute px-3 min-[22rem]:px-6 md:px-12 gap-20  xl:gap-24  bottom-4 inset-0 flex  flex-col items-center justify-center text-center ">
          <div className="">
            <h1 className="  text-3xl min-[25rem]:text-4xl  md:text-5xl lg:text-6xl font-bold text-white ">
              Contact
              <span className="bg-reveal ml-2">Primo Painters</span>{" "}
            </h1>
            <p className="block mt-3  text-white   font-medium   min-[25rem]:text-lg ">
              Have questions or ready to get started? We'd love to hear about
              your interior painting project.
            </p>
          </div>
          <HeroHomeButtons />
        </div>
      </section>

      {/* ContactOptions  */}
      <section className="py-12 px-4 bg-white">
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

      {/* Decorative Background */}
      <div className="relative">
        <div className="absolute -z-10">
          <Image src={BgBackground2} alt="" aria-hidden="true" />
        </div>
      </div>

      {/* ContactForm*/}
      <section className="pt-20 pb-8 px-4 w-full">
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
        <div className="relative w-full">
          <div className="absolute top-[800px] -z-10">
            <Image src={BgBackground2} alt="" aria-hidden="true" />
          </div>
          {/* <ContactForm showContactInfo={false} /> */}
        </div>
      </section>

      {/* Google Map */}
      <GoogleMap />
    </>
  );
}
