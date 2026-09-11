"use client";

import { useCalendly } from "../calendly-provider";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

// Deliberately abstract. Real dates would either need date logic that can
// disagree between server and client, or they go stale. The actual picking
// happens inside Calendly; this card's job is to say "choose a day".
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const AVAILABLE = [18, 19];

export function HeroCalendarImage() {
  const openCalendly = useCalendly();

  return (
    <>
      <button
        type="button"
        onClick={openCalendly}
        aria-label="Book a free interior painting estimate"
        className="group animate-book-pulse w-[14rem] cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] will-change-transform [backface-visibility:hidden] motion-safe:transition-shadow hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)]"
      >
        <div className="flex items-center justify-between bg-[#0D378D] px-4 py-2.5">
          <span className="text-sm font-semibold tracking-wide text-white">
            Pick a day
          </span>
          <span className="text-xs font-medium text-white/70">Free</span>
        </div>

        {/* Dots rather than digits. The original was an image, so it added no
            text to the page; rebuilding it in HTML with real numerals would
            have written "S M T W T F S 1 2 3 ... 30" into the homepage's
            content. A 7 column grid with two cells filled still reads
            unmistakably as a calendar, and adds nothing for a crawler to
            read. Those numerals were 11px grey anyway, decoration pretending
            to be information. */}
        <div className="px-4 pt-4 pb-3" aria-hidden="true">
          <div className="grid grid-cols-7 justify-items-center gap-x-1.5 gap-y-2">
            {WEEKDAYS.map((_, i) => (
              <span key={`h-${i}`} className="h-1 w-3 rounded-full bg-black/15" />
            ))}

            {/* Offsets the first row so the grid reads like a real month */}
            <span />
            <span />

            {DAYS.map((day) => (
              <span
                key={day}
                className={
                  AVAILABLE.includes(day)
                    ? "h-2 w-2 rounded-full bg-[#0D378D] ring-2 ring-[#0D378D]/25"
                    : "h-2 w-2 rounded-full bg-black/12"
                }
              />
            ))}
          </div>
        </div>

        <div className="px-3 pb-3">
          <span className="block rounded-lg bg-[#0D378D] py-2.5 text-center text-base font-semibold text-white motion-safe:transition-colors group-hover:bg-[#0a2c72]">
            Book Now
          </span>
        </div>
      </button>

    </>
  );
}
