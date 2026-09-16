"use client";

// Rebuilt on shadcn's Accordion, which sits on Base UI. It replaces
// @heroui/react, a package that is not installed here and was the reason this
// file did not typecheck. Nothing was installed to make the swap: the shadcn
// component is a file in this repo and Base UI was already a dependency.
//
// The component order in CLAUDE.md is shadcn first, then a free library built
// on shadcn, ours last. A hand rolled accordion would have been third.
//
// Content is untouched. Every question, every answer and the intro paragraph
// come from data/faqData.ts exactly as before, so data/faqJsonLd.ts stays in
// sync with what is on the page.
//
// Two details worth knowing:
//
//   Questions render as h2, through headerRender. Base UI's Accordion.Header
//   is an h3 by default and the HeroUI version forced h3 too, on the reasoning
//   that seven h2s make the page read as fourteen top level sections. But that
//   section was commented out, so the h3 never shipped:
//   scripts/seo-baseline/index.txt line 208 has these as h2 on the live site.
//   Text that ranks does not move on a design pass. If the level should change,
//   it changes as its own decision, with the baseline regenerated to match.
//
//   Plus and Minus in a ringed circle, not shadcn's chevrons. The chevrons are
//   hidden through their data-slot rather than by editing the ui component,
//   and the swap is driven by aria-expanded, so it needs no state.
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/faqData";
import BookNowTrigger from "../BookNowTrigger";
import BgBackground2 from "@/public/SVGs/backgrounds/above-gallery-bg-line.svg";

const FaqSection = () => {
  return (
    <section className="relative bg-background">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-28 z-0">
        <img
          src={BgBackground2.src}
          width={BgBackground2.width}
          height={BgBackground2.height}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-11 max-sm:py-8">
      <h2 className="text-[clamp(1.5625rem,3.2vw,2.25rem)] font-bold text-[#0D378D]">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 max-w-[60ch] text-black">
        Have questions? We&apos;ve answered the ones homeowners ask most about
        interior painting, from pricing and preparation to timelines, repairs,
        and booking.
      </p>

      {/* items-start keeps the two columns on independent heights, so opening
          an answer grows the questions column without shunting the panel
          around. Stacks below lg with the questions first, which is the order
          someone reads them in anyway. */}
      <div className="mt-12 flex flex-col gap-8 max-sm:mt-5 lg:flex-row lg:items-start">
        <div className="bg-white p-6 shadow-[0_0.4375rem_2.8125rem_0_rgba(0,15,44,0.12)] lg:flex-1">
          {/* gap-3 with no dividers is HeroUI's "splitted" look: each question
              is its own tile rather than rows in one bordered list. */}
          <Accordion className="gap-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.title}
                value={`faq-${index}`}
                className="border-none bg-[#F2F2F2] px-4 py-3 max-sm:py-0"
              >
                <AccordionTrigger
                  headerRender={<h2 />}
                  className="items-center py-3 text-base font-normal text-black hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                  <span className="pr-4 text-left">{item.title}</span>

                  <Plus
                    aria-hidden
                    className="ml-auto size-8 shrink-0 rounded-full border-2 border-[#0D378D66] p-1 text-[#0D378D] group-aria-expanded/accordion-trigger:hidden"
                  />
                  <Minus
                    aria-hidden
                    className="ml-auto hidden size-8 shrink-0 rounded-full border-2 border-[#0D378D66] p-1 text-[#0D378D] group-aria-expanded/accordion-trigger:block"
                  />
                </AccordionTrigger>

                <AccordionContent className="pb-4">
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Catches the person whose question was not on the list. sticky so it
            travels down with them rather than scrolling away at question one. */}
        <aside className="bg-[#0D378D] p-6 text-white lg:sticky lg:top-24 lg:w-[20rem] lg:shrink-0">
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="mt-3 text-white/90">
            Book a free estimate and we&apos;ll go through your project with
            you.
          </p>
          <BookNowTrigger className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 font-semibold text-[#0D378D] transition-colors hover:bg-gray-100">
            Book Your Free Estimate
          </BookNowTrigger>
        </aside>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
