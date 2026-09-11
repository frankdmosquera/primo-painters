"use client";
import * as React from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PopupModal } from "react-calendly";
import { Phone } from "lucide-react";
import { logoImg } from "@/data/images";
import { siteConfig } from "@/data/siteConfig";
import { navigationItemsData } from "@/data/navigationData";

const CALENDLY_URL =
  "https://calendly.com/primo-painting/30min?hide_gdpr_banner=1";

export function Header() {
  // usePathname is already reactive. Mirroring it into state only delayed the
  // active link by a render, so nothing was highlighted on first paint.
  const currentPath = usePathname();

  // Same pattern as the hero CTA: PopupModal needs document.body, so it only
  // renders after mount.
  const [isCalendlyOpen, setIsCalendlyOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Shrinks once the promo ticker has scrolled away, so the sticky header
  // gives the page back some height. Hysteresis, 60 down and 20 up, stops it
  // flickering when a scroll lands right on the threshold.
  const [compact, setCompact] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setCompact((wasCompact) =>
        wasCompact ? window.scrollY > 20 : window.scrollY > 60,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[99999] bg-white px-4 motion-safe:transition-shadow motion-safe:duration-300 md:px-8 xl:px-16 ${
        compact
          ? "shadow-[0_1px_0_rgba(13,55,141,0.10),0_10px_24px_-14px_rgba(13,55,141,0.55)]"
          : "shadow-[0_1px_0_rgba(13,55,141,0.08)]"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-6 motion-safe:transition-all motion-safe:duration-300 ${
          compact ? "py-0.5" : "py-2"
        }`}
      >
        <Link href="/" className="shrink-0">
          <Image
            src={logoImg.src}
            alt={logoImg.alt}
            title={siteConfig.business.name}
            width={130}
            height={60}
            priority
            className={`h-auto motion-safe:transition-all motion-safe:duration-300 ${
              compact ? "w-[92px]" : "w-[130px]"
            }`}
          />
        </Link>

        <nav
          className="menubar hidden items-center gap-9 xl:flex"
          aria-label="Primary navigation"
        >
          {navigationItemsData.map(({ href, title }) => {
            const isActive = currentPath === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                // The underline is a CSS pseudo-element that scales from the
                // left. No library, no JS, nothing to load.
                className={`relative py-1 text-base after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[#0D378D] motion-safe:transition-colors motion-safe:after:transition-transform motion-safe:after:duration-300 ${
                  isActive
                    ? "font-semibold text-[#0D378D] after:scale-x-100"
                    : "font-medium text-black/60 after:scale-x-0 hover:text-[#0D378D] hover:after:scale-x-100"
                }`}
              >
                {title}
              </Link>
            );
          })}
        </nav>

        <div className="btn-img-nav hidden items-center gap-5 xl:flex">
          <Link
            href={`tel:${siteConfig.business.phone}`}
            aria-label={`Call ${siteConfig.business.name} at ${siteConfig.business.phoneDisplay}`}
            className="group flex items-center gap-2 text-base font-semibold text-[#0D378D]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D378D]/10 transition-colors group-hover:bg-[#0D378D]/20">
              <Phone size={15} strokeWidth={2.5} />
            </span>
            <span className="whitespace-nowrap group-hover:underline">
              {siteConfig.business.phoneDisplay}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsCalendlyOpen(true)}
            className="aj-button cursor-pointer whitespace-nowrap rounded-full bg-[#0D378D] px-7 py-2.5 text-base font-medium text-white shadow-[0_6px_16px_-6px_rgba(13,55,141,0.65)] motion-safe:transition-colors hover:bg-[#0a2c72]"
          >
            Book Now
          </button>
        </div>

        <MobileMenu onBookClick={() => setIsCalendlyOpen(true)} />
      </div>

      {mounted && (
        <PopupModal
          url={CALENDLY_URL}
          open={isCalendlyOpen}
          onModalClose={() => setIsCalendlyOpen(false)}
          rootElement={document.body}
        />
      )}
    </header>
  );
}
