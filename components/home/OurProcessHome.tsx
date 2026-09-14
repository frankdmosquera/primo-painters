// Ported from the-latam-painters' components/home/OurProcessHome.tsx.
//
// Design from LATAM, content from Primo. The layout, the white heading chips,
// the four-across row of dark cards and the step reveal are theirs. Every word
// on screen is Primo's, read from data/processSteps.ts, which is the same copy
// the About page has been running.
//
// Two deliberate departures:
//
//   The "&" chip is kept. It was dropped once on the reasoning that it joins
//   LATAM's two heading lines and Primo has only one - but it is a shape in the
//   stack, not a conjunction, and the stack reads wrong without it.
//
//   The intro paragraph is gone. LATAM puts no body copy on bare photo, only
//   inside the cards. It has never been live on this page; About keeps it.
//
//   The CTA is BookNowTrigger, not a link to #booking. Primo's CTA opens
//   Calendly and there is no booking anchor on this page.
import {
  processEyebrow,
  processHeading,
  processSteps,
} from "@/data/processSteps";
import BookNowTrigger from "../BookNowTrigger";
import { StepReveal } from "./StepReveal";

export function OurProcessHome() {
  return (
    <section className="pt-24 md:pt-32 pb-48 md:pb-64">
      <div className="mx-auto max-w-[var(--site-max)] px-4 sm:px-8 lg:px-16">
        <div className="font-medium gap-2 flex flex-col items-center mb-14 md:mb-20 text-center">
          <p className="inline-block text-xl bg-white p-1.5 rounded-br-lg text-primary-dark">
            {processEyebrow}
          </p>

          <div className="inline-block bg-white p-1.5 rounded-es-3xl text-primary-dark">
            &amp;
          </div>

          <h2 className="inline-block bg-white p-1.5 text-3xl md:text-4xl font-bold tracking-tight rounded-sm text-foreground">
            {processHeading}
          </h2>

        </div>

        <ol className="relative flex flex-col md:flex-row md:items-start gap-10 md:gap-6">
          {processSteps.map((step, i) => {
            const Icon = step.icon;

            return (
              <StepReveal
                key={step.title}
                index={i}
                icon={<Icon className="size-6 text-primary" />}
              >
                <span className="text-xs font-semibold text-white/80 md:hidden">
                  Step {step.number}
                </span>

                <div className="md:text-center md:px-2">
                  <h3 className="font-semibold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StepReveal>
            );
          })}
        </ol>

        <div>
          <BookNowTrigger className="mt-14 md:mt-16 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 cursor-pointer">
            Book Your Free Estimate
          </BookNowTrigger>
        </div>
      </div>
    </section>
  );
}
