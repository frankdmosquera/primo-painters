import Image from "next/image";
import Link from "next/link";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { navigationItemsData } from "@/data/navigationData";

export default function Footer() {
  return (
    <footer>
      <div className="bg-black text-white min-h-[400px] p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between  mb-6">
            <div className="md:text-left mb-6 md:mb-0">
              <h2 className="text-[44px] font-semibold uppercase tracking-wider">
                LET'S
              </h2>
              <h3 className="text-3xl md:text-[77px] font-bold">
                GET IN TOUCH
              </h3>
            </div>
            <Link href="/contact">
              <span className="flex items-center gap-2 border-2 border-white rounded-full pl-5 pr-1.5 py-2 text-sm md:text-base font-medium bg-[#0D378D] cursor-pointer transition-colors mt-4 md:mt-[80px]">
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

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-0.5 ">
            {/* Logo and Description */}
            <div className="space-y-6 my-5">
              {/* <div className=" w-48 h-16 flex items-center justify-center rounded"> */}

              <Link href="/">
                <Image
                  // src={logo}
                  alt="Primo Painters Logo"
                  width={180}
                  height={60}
                  className="object-contain"
                  src="/primo-painters-logo.png"
                />
              </Link>
              {/* </div> */}
              <p className="text-sm text-white leading-relaxed mt-10">
                We offer professional interior house painting services in
                Calgary.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:place-self-center">
              <h3 className="font-medium mb-4 text-[20px]">Quick Links</h3>
              <nav>
                <ul className="space-y-5">
                  {navigationItemsData.map(({ title, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact Information */}
            <div className="place-self-start">
              {/* <h3 className="font-medium mb-4 text-[20px]">Contact</h3> */}
              <div className="space-y-5 ">
                <Link target="_blank" href="https://g.co/kgs/Wm9YRbr"></Link>
                <div className="flex flex-row gap-5 mt-2">
                  <Link
                    href="https://www.instagram.com/@Primo-Painters"
                    aria-label="Visit Primo Painting on Instagram"
                  >
                    <Instagram className="text-[#0D378D] text-2xl" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/@Primo-Painters"
                    aria-label="Visit Primo Painting on Facebook"
                  >
                    <Facebook className="text-[#0D378D] text-2xl" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@Primo-Painters"
                    aria-label="Visit Primo Painting on YouTube"
                  >
                    <Youtube className="text-[#0D378D] text-2xl" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t  mt-8 pt-4 text-center text-xs text-gray-700">
            <p className="text-white">© 2026 Primo Painters Calgary.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
