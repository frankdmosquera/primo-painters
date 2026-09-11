"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  ClipboardPen,
  Star,
  MapPin,
  TicketPercent,
} from "lucide-react";

const items = [
  {
    icon: TicketPercent,
    text: "15% OFF Interior Painting",
    highlight: true,
  },
  {
    icon: CalendarClock,
    text: "Offer Ends 11/17",
  },
  {
    icon: ClipboardPen,
    text: "Free Estimates",
  },
  {
    icon: TicketPercent,
    text: "15% OFF Interior Painting",
    highlight: true,
  },
  {
    icon: Star,
    text: "5-Star Rated",
  },
  {
    icon: MapPin,
    text: "Serving Calgary & Area",
  },
];

export default function ScrollingBannerA() {
  // Respects the visitor's OS setting. A permanently moving bar is a real
  // problem for motion sensitivity, and it is the first thing on every page.
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-b border-white/10 bg-[#0D378D]">
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...Array(2)].map((_, repeat) => (
          <div key={repeat} className="flex items-center">
            {items.map(({ icon: Icon, text, highlight }, i) => (
              <div
                key={`${repeat}-${i}`}
                className="flex items-center whitespace-nowrap"
              >
                <div className="flex items-center gap-2 px-6 py-2">
                  <Icon
                    size={14}
                    strokeWidth={2}
                    className={highlight ? "text-[#FFD54A]" : "text-white/70"}
                  />
                  <span
                    className={`text-[11px] uppercase tracking-[0.14em] ${
                      highlight
                        ? "font-semibold text-[#FFD54A]"
                        : "font-medium text-white/90"
                    }`}
                  >
                    {text}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="h-3 w-px bg-white/20"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
