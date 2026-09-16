"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  House,
  Images,
  Mail,
  Phone,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { logoImg } from "@/data/images";
import { siteConfig } from "@/data/siteConfig";
import {
  navigationItemsData,
  type NavigationIcon,
} from "@/data/navigationData";
import { useCalendly } from "./calendly-provider";

// Names in navigationData map to components here, so the data file never has
// to import React. lucide renders inline <svg>, nothing extra is fetched.
const NAV_ICONS: Record<NavigationIcon, typeof House> = {
  home: House,
  about: Users,
  contact: Mail,
  projects: Images,
};

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const openCalendly = useCalendly();

  // Escape closes the panel. The old click-outside listener was removed: the
  // panel covers the whole viewport now, so there is no outside left to click.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-800"
        aria-label="Open menu"
      >
        <svg
          width="61"
          height="48"
          viewBox="0 0 61 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="59" height="46" rx="23" fill="#0D378D" />
          <path
            d="M19.5 17H41.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M19.5 24H41.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30.5 31L41.5 31"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        // inset-0 is the full screen. The previous h-[630px] left the page
        // showing underneath on any viewport taller than that.
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-white"
        >
          <div className="flex items-center justify-between p-7">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src={logoImg.src}
                alt={logoImg.alt}
                title={siteConfig.business.name}
                width={130}
                height={60}
                className="h-auto w-[7rem]"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-gray-800 transition-colors hover:bg-black/5"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* One centred group, so there is no dead gap between the links and
              the call to action on tall screens. */}
          <div className="flex flex-1 flex-col items-center justify-center gap-9 px-7 pb-16">
            {/* items-start inside a w-fit wrapper: the block is centred as a
                whole, but the links align left so the icons form a column
                instead of drifting with each word's length. */}
            <nav
              className="mx-auto flex w-fit flex-col items-start gap-7"
              aria-label="Site menu"
            >
              {navigationItemsData.map(({ title, href, icon }) => {
                const Icon = NAV_ICONS[icon];
                const isActive = currentPath === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 text-2xl motion-safe:transition-colors ${
                      isActive
                        ? "font-semibold text-[#0D378D]"
                        : "font-medium text-gray-800 hover:text-[#0D378D]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.4 : 1.9}
                      className={isActive ? "" : "text-gray-400"}
                    />
                    {title}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                // Close this panel first so only the Calendly overlay is left.
                // Otherwise the visitor has to dismiss two things to back out.
                setIsOpen(false);
                openCalendly();
              }}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#0D378D] px-9 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_-10px_rgba(13,55,141,0.8)] motion-safe:transition-all hover:bg-[#0a2c72] hover:shadow-[0_18px_36px_-10px_rgba(13,55,141,0.9)]"
            >
              <CalendarDays size={20} strokeWidth={2.2} />
              Book Now
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="opacity-70 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
              />
            </button>

            <a
              href={`tel:${siteConfig.business.phone}`}
              aria-label={`Call ${siteConfig.business.name} at ${siteConfig.business.phoneDisplay}`}
              className="flex items-center gap-2 text-base font-semibold text-[#0D378D]"
            >
              <Phone size={16} strokeWidth={2.5} />
              {siteConfig.business.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
