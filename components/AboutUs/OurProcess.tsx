// The About page's process section, now sharing the home page's step cards.
//
// Why it changed: About ran two pale card sections back to back, Our Process
// and Our Promise, 1,800px with no images and no contrast between them. The
// dark cards give this one weight without needing a single new photo, and the
// two pages now read as one site rather than two.
//
// Why the copy did not change: every word here comes from data/processSteps.ts,
// which holds this page's own wording verbatim - the eyebrow, the heading, the
// intro paragraph and all four steps. The home page reads the same file. There
// was a second copy of these words hardcoded in this component; that is gone,
// so the text now lives in one place instead of two.
//
// The intro paragraph is kept here and not on home. That is deliberate: it is
// About's copy and About is where it has always been.
import {
  processEyebrow,
  processHeading,
  processIntro,
  processSteps,
} from "@/data/processSteps";
import { StepReveal } from "../home/StepReveal";

export default function OurProcess() {
  return (
    // The ground is a gradient with glows rather than the flat #E2E7F1 slab it
    // was. Our Promise below runs a gradient wash and two blurred glows, and a
    // solid slab next to it read as unfinished by comparison.
    //
    // No photograph here, deliberately. Two were tried and both were worse.
    //
    // A stairwell shot at 10% did not dissolve: the banister spindles still
    // read as a photograph behind the text, because the image is photographic
    // rather than graphic.
    //
    // Sharing one image across this section and Promise was worse again. Cover
    // sizing stretched it over 1602px, which zoomed past the mural's flat
    // shapes and left the office furniture and a red desk edge legible.
    //
    // So the pair rhymes through treatment, not texture: this section is about
    // its cards, Promise is about its surface.
    <section className="relative overflow-hidden bg-linear-to-b from-background/80 via-primary/5 to-background/80 px-4 py-24">

      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 size-[30rem] rounded-full bg-white/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-32 size-[30rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-primary-dark">
            {processEyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-black lg:text-5xl">
            {processHeading}
          </h2>

          <p className="mt-6 font-light leading-8 text-gray-700">
            {processIntro}
          </p>
        </div>

        <ol className="relative mt-16 flex flex-col gap-10 md:flex-row md:items-start md:gap-6">
          {processSteps.map((step, i) => {
            const Icon = step.icon;

            return (
              <StepReveal
                key={step.title}
                index={i}
                icon={<Icon className="size-6 text-primary" />}
              >
                <span className="text-xs font-semibold tracking-widest text-white/80">
                  STEP {step.number}
                </span>

                <div className="md:px-2 md:text-center">
                  <h3 className="font-semibold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
              </StepReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
