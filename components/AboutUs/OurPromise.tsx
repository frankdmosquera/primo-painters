// Our Promise. Content comes from data/promiseData.ts; not a word changed.
//
// Four things were wrong rather than merely plain, all fixed here:
//
//   text-justify on every description. In a card this narrow, with no
//   hyphenation, justification stretches word spacing into rivers - the wide
//   ragged gaps that made the section read cheap. Left aligned now.
//
//   p-8 px-4. The px-4 silently overrode the horizontal half of p-8, so the
//   cards had 32px above and below and 16px at the sides.
//
//   The copy was hardcoded here, against the template rule.
//
//   Body text inherited the site's 500 weight, heavy against a semibold
//   heading directly above it.
//
// On the colour: this section is deliberately the bright one. The process
// section above is dark cards on pale blue, and below it sits the solid blue
// block and then the black footer. A dark treatment here would fuse the whole
// bottom third of the page into one slab, so the weight goes into gradient and
// glow instead - same blue family, no new hue.
//
// Amber appears nowhere. It is the CTA colour and nothing else.
//
// Every effect is CSS. No motion library.
import { Check } from "lucide-react";
import {
  promiseEyebrow,
  promiseHeading,
  promiseIntro,
  promises,
} from "@/data/promiseData";

export default function OurPromise() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background/80 via-primary/5 to-background/80 py-24">

      {/* Two soft blue glows, the same motif the step cards use, sized large
          and blurred hard so they read as light rather than as shapes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 size-[28rem] rounded-full bg-primary-light/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-primary-dark">
            {promiseEyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-black lg:text-5xl">
            {promiseHeading}
          </h2>

          <p className="mt-6 font-light leading-8 text-gray-700">
            {promiseIntro}
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {promises.map((promise) => (
            <div
              key={promise.title}
              className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/25 sm:p-8"
            >
              {/* A gradient rail along the top edge, drawn from the left on
                  hover. scale-x with a left origin costs no layout. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary via-primary-light to-primary/0 transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="flex gap-5">
                <div className="mt-0.5 shrink-0">
                  <div className="flex size-12 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary-light shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                    <Check
                      className="size-6 text-white"
                      strokeWidth={2.75}
                      aria-hidden
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-dark sm:text-2xl">
                    {promise.title}
                  </h3>
                  <p className="mt-2 font-light leading-7 text-gray-600">
                    {promise.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
