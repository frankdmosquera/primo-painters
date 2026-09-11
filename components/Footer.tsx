import Image from "next/image";
import Link from "next/link";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { navigationItemsData } from "@/data/navigationData";
import { siteConfig } from "@/data/siteConfig";

/**
 * An account with no URL yet renders as a plain shape, not a link. It cannot
 * be clicked or tabbed to, and Google never sees an anchor. Filling the URL
 * into siteConfig.social turns it into a real link with no component change.
 */
const socialLinks = [
  { name: "Instagram", Icon: Instagram, url: siteConfig.social.instagram },
  { name: "Facebook", Icon: Facebook, url: siteConfig.social.facebook },
  { name: "YouTube", Icon: Youtube, url: siteConfig.social.youtube },
];

export default function Footer() {
  return (
    <footer>
      <div className="min-h-[25rem] bg-black p-6 text-white md:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex flex-col justify-between md:flex-row">
            <div className="mb-6 md:mb-0 md:text-left">
              {/* clamp replaces a fixed size plus a breakpoint override, and
                  stays in rem at both ends so it follows the browser setting */}
              <h2 className="text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-wider uppercase">
                LET'S
              </h2>
              <h3 className="text-[clamp(2rem,7vw,4.8125rem)] leading-[1.05] font-bold text-balance">
                GET IN TOUCH
              </h3>
            </div>
            <Link href="/contact" className="self-start md:self-end">
              <span className="mt-4 flex items-center gap-2 rounded-full border-2 border-white bg-[#0D378D] py-2 pr-1.5 pl-5 text-sm font-medium transition-colors hover:bg-[#0a2c72] md:mt-0 md:text-base">
                Contact Us
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="31" height="30" rx="15" fill="white" />
                  <path
                    d="M23 9C23 8.44771 22.5523 8 22 8L13 8C12.4477 8 12 8.44771 12 9C12 9.55228 12.4477 10 13 10L21 10L21 18C21 18.5523 21.4477 19 22 19C22.5523 19 23 18.5523 23 18L23 9ZM10.7071 21.7071L22.7071 9.70711L21.2929 8.29289L9.29289 20.2929L10.7071 21.7071Z"
                    fill="#0D378D"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-4"></div>

          {/* Content. Columns sized to their contents rather than three equal
              thirds, so the icon row no longer reserves a third of the width. */}
          <div className="mt-0.5 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto]">
            {/* Logo and Description */}
            <div className="my-5 space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  alt="Primo Painters Logo"
                  width={180}
                  height={60}
                  className="h-auto w-[11rem] object-contain"
                  src="/primo-painters-logo.png"
                />
              </Link>
              <p className="max-w-[32ch] text-sm leading-relaxed text-white/75">
                We offer professional interior house painting services in
                Calgary.
              </p>
            </div>

            {/* Quick Links */}
            <div className="my-5">
              <h3 className="mb-4 text-xl font-medium">Quick Links</h3>
              <nav>
                <ul className="space-y-4">
                  {navigationItemsData.map(({ title, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-white/75 transition-colors hover:text-white"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social */}
            <div className="my-5">
              <div className="flex flex-row gap-3">
                {socialLinks.map(({ name, Icon, url }) => {
                  // All three look identical. Only the element differs: a real
                  // anchor when the account exists, an inert span when it does
                  // not, so nothing is ever a broken or fake link.
                  const shell =
                    "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white";
                  const icon = <Icon className="h-5 w-5" strokeWidth={1.8} />;

                  return url ? (
                    <Link
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${siteConfig.business.name} on ${name}`}
                      className={`${shell} transition-colors hover:border-white/40 hover:bg-white/15`}
                    >
                      {icon}
                    </Link>
                  ) : (
                    <span key={name} aria-hidden="true" className={shell}>
                      {icon}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/15 pt-5 text-center text-xs">
            <p className="text-white/60">© 2026 Primo Painters Calgary.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
