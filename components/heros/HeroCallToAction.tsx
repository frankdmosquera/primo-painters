"use client";

import { useState } from "react";
import Image from "next/image";
import { ClipboardList, MessageCircleQuestion, PhoneCall } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import ContactFormSection from "../ContactFormSection";
import { siteConfig } from "@/data/siteConfig";
import { useCalendly } from "../calendly-provider";

const secondaryPillClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-full bg-white text-[#0D378D] px-4 py-2 font-medium shadow-lg hover:bg-gray-100";

export default function HeroCallToAction() {
  const [showCallForm, setShowCallForm] = useState(false);
  const openCalendly = useCalendly();

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={openCalendly}
        className="mx-auto w-38 flex flex-col items-center animate-book-pulse will-change-transform [backface-visibility:hidden]"
      >
        <Image
          src="/SVGs/calendar-img-flat-bottom.svg"
          width={150}
          height={150}
          alt=""
          unoptimized
          className="h-auto w-full"
        />
        <div className="mt-0 pt-0 relative pb-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md rounded-t-none text-sm font-medium bg-[#0D378D] text-white shadow-xs hover:bg-[#0D378D]/90 h-9 px-4 py-2 text-2xl -translate-y-0.5">
          Book Now
        </div>
      </button>

      {!showCallForm && (
        <div
          onClick={() => setShowCallForm(true)}
          className={`mt-8 ${secondaryPillClass}`}
        >
          <MessageCircleQuestion className="size-4" />
          <span>Questions?</span>
        </div>
      )}

      {showCallForm && (
        <div className="mt-8 flex justify-center gap-4">
          <a href={`tel:${siteConfig.business.phone}`} className={secondaryPillClass}>
            <PhoneCall className="size-4" />
            Call
          </a>
          <Sheet>
            <SheetTrigger className={secondaryPillClass}>
              <ClipboardList className="size-4" />
              <span>Form</span>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetTitle className="sr-only">
                Contact Primo Painters
              </SheetTitle>
              <ContactFormSection />
            </SheetContent>
          </Sheet>
        </div>
      )}

    </div>
  );
}
