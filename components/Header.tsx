import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "lucide-react";
import NavBar from "./NavBar";
import MobileNav from "./MobileNav";
import HeaderBookNow from "./HeaderBookNow";
import { HeaderScrollHider } from "./HeaderScrollHider";
import { logoImg } from "@/data/images/general-images";
import { siteConfig } from "@/data/siteConfig";

/**
 * Layout ported from the-latam-painters. Content is Primo's: same three links,
 * same hrefs, same logo alt and title, same phone number, and the CTA stays
 * "Book Now" opening Calendly.
 *
 * Server component. The only client pieces are the scroll wrapper, the nav's
 * active link and the CTA, each isolated in its own file.
 */
export function Header() {
  return (
    <HeaderScrollHider>
      {/* --site-max, not Tailwind's `container`. See the note in globals.css:
          this project's custom breakpoints make `container` 1881px wide. */}
      <div className="mx-auto flex w-full max-w-[var(--site-max)] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={logoImg.src}
            alt={logoImg.alt}
            width={142}
            height={100}
            priority
            className="h-16 w-auto sm:h-18 md:h-20 lg:h-24"
          />
        </Link>

        <div className="hidden lg:block">
          <NavBar />
        </div>
        <div className="lg:hidden">
          <MobileNav />
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {/* A plain <a>, not next/link: a tel: is not a route, so there is nothing
              to prefetch or client-side navigate. MobileNav already does this. */}
          <a
            href={`tel:${siteConfig.business.phone}`}
            aria-label={`Call ${siteConfig.business.name} at ${siteConfig.business.phoneDisplay}`}
            className="flex items-center gap-1 font-semibold"
          >
            <PhoneIcon className="text-primary-light" fill="var(--primary)" />
            <span className="text-primary-dark whitespace-nowrap">
              {siteConfig.business.phoneDisplay}
            </span>
          </a>

          <HeaderBookNow />
        </div>
      </div>
    </HeaderScrollHider>
  );
}
