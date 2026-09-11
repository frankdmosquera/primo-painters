"use client";

import { InlineWidget } from "react-calendly";
import { siteConfig } from "@/data/siteConfig";

export default function Calendly() {
  return (
    <div className="calendly-widget relative h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="mb-4 text-3xl motion-safe:animate-spin" aria-hidden="true">
          ⏳
        </div>
        <p className="text-lg font-medium">Loading calendar, please wait…</p>
      </div>
      <div className="relative z-2 h-full">
        <InlineWidget
          url={siteConfig.booking.calendlyUrl}
          styles={{ minWidth: "320px", height: "100%" }}
        />
      </div>
    </div>
  );
}