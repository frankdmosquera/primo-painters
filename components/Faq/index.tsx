"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/faqData";
import BookNowTrigger from "../BookNowTrigger";

const FaqSection = () => {
  return (
    // Two nested single column grids used to live here, each spelling out
    // xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1. One column at every
    // breakpoint is a div with extra steps.
    <section className="mx-auto max-w-7xl px-5 py-11 max-sm:mb-10 max-sm:py-0">
      <h2 className="text-[clamp(1.5625rem,3.2vw,2.25rem)] font-bold text-[#0D378D]">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 max-w-[60ch] text-black">
        Have questions? We've answered the ones homeowners ask most about
        interior painting, from pricing and preparation to timelines, repairs,
        and booking.
      </p>

      {/* items-start keeps the two columns on independent heights, so opening
          an answer grows the questions column without shunting the panel
          around. Stacks below lg with the questions first, which is the order
          someone reads them in anyway. */}
      <div className="mt-12 flex flex-col gap-8 max-sm:mt-5 lg:flex-row lg:items-start">
        <div className="bg-white p-6 shadow-[0_0.4375rem_2.8125rem_0_rgba(0,15,44,0.12)] lg:flex-1">
          <Accordion variant="splitted">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                // HeroUI wraps every accordion title in an h2 by default, which
                // put all seven questions at the same level as the section
                // headings and left the page reading as fourteen top level
                // sections. Every other block here is h2 for the section and h3
                // for its items; this makes the FAQ match. The question text is
                // untouched, so faqJsonLd.ts stays in sync.
                HeadingComponent="h3"
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <Minus className="h-8 w-8 rounded-full border-2 border-[#0D378D66] p-1 text-[#0D378D]" />
                  ) : (
                    <Plus className="h-8 w-8 rounded-full border-2 border-[#0D378D66] p-1 text-[#0D378D]" />
                  )
                }
                // The aria-label used to read "Accordion 0", "Accordion 1", so a
                // screen reader announced a number instead of the question. The
                // title already labels the control, so the attribute only got in
                // the way.
                title={
                  <span className="mb-3 text-base font-normal text-black">
                    {item.title}
                  </span>
                }
                className="mt-3 rounded-none bg-[#F2F2F2] py-3 font-normal max-sm:py-0"
              >
                <p className="text-base font-normal text-[#2c2323]">
                  {item?.content}
                </p>
                {item?.bookOption && (
                  <div className="mt-4">
                    <BookNowTrigger className="inline-block rounded-full bg-[#0D378D] px-4 py-2 text-white transition-colors hover:bg-[#0A2A6B]">
                      Book Your Estimate
                    </BookNowTrigger>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Catches the person whose question was not on the list. sticky so it
            travels down with them rather than scrolling away at question one. */}
        <aside className="bg-[#0D378D] p-6 text-white lg:sticky lg:top-24 lg:w-[20rem] lg:shrink-0">
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="mt-3 text-white/90">
            Book a free estimate and we'll go through your project with you.
          </p>
          <BookNowTrigger className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 font-semibold text-[#0D378D] transition-colors hover:bg-gray-100">
            Book Your Free Estimate
          </BookNowTrigger>
        </aside>
      </div>
    </section>
  );
};

export default FaqSection;
