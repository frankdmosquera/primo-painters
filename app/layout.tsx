import { siteConfig } from "@/data/siteConfig";
import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import { Poppins, Roboto } from "next/font/google";
import { jsonLd } from "@/data/jsonLd";
import ScrollingBannerA from "@/components/scrolling-banner-a";
import { Header } from "@/components/Header";
import { CalendlyProvider } from "@/components/calendly-provider";

// Body text. 500 is here because globals.css sets the body to that weight.
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Headings only, so it needs the two weights headings actually use.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.business.website),

  title: "Calgary Interior Painters | Primo Painters",

  description:
    "Primo Painters provides professional interior painting services in Calgary. We paint walls, ceilings, trim, doors, cabinets and more for homeowners, delivering clean workmanship and free estimates.",

  applicationName: siteConfig.business.applicationName,

  category: "Home Services",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Calgary Interior Painters | Primo Painters",

    description:
      "Professional interior house painting services in Calgary for walls, ceilings, trim, doors and more.",

    url: "/",

    siteName: siteConfig.business.name,

    locale: "en_CA",

    type: "website",

    images: [
      {
        url: siteConfig.branding.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.business.name} - Calgary Interior Painters`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Calgary Interior Painters | Primo Painters",

    description:
      "Professional interior house painting services in Calgary for walls, ceilings, trim, doors and more.",

    images: [siteConfig.branding.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="msvalidate.01" content="DBD9A18509B447FAF5F19EC3C4B5BFC4" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased`}
      >
        {/* One Calendly modal for the site. Wrapping {children} rather than
            rendering the page means every server component inside stays a
            server component. */}
        <CalendlyProvider>
          <main className="text-[17px] 3xl:text-base ">
            <ScrollingBannerA />
            <Header />
            {children}
          </main>
          <Toaster />
          <Footer />
        </CalendlyProvider>
      </body>
    </html>
  );
}
