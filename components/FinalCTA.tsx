import BookNowTrigger from "./BookNowTrigger";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export default function FinalCTA() {
  return (
    <section className="relative z-2 bg-[#0D378D] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-[clamp(1.875rem,5vw,3rem)] font-bold">
          Let's Bring Your Vision to Life
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl">
          Whether you're refreshing a single room or repainting your entire
          home, Primo Painters delivers beautiful interior painting with
          meticulous workmanship, honest communication, and free estimates.
        </p>

        {/* Between the paragraph and the button on purpose: the heading talks
            about bringing a vision to life, and dragging the handle is the
            visitor doing exactly that, one moment before the ask.

            These two frames are a colour visualisation, not one of our
            projects, which is what the caption below says. They live in
            public/visualisations rather than public/interior-painting so the
            distinction survives in the file tree as well as on the page. */}
        <div className="mb-4">
          <BeforeAfterSlider
            beforeImage="/visualisations/kitchen-colour-before-oak.jpg"
            afterImage="/visualisations/kitchen-colour-after-black.png"
            beforeAlt="Kitchen with light oak cabinets before a colour change"
            afterAlt="The same kitchen with the cabinets in black"
            beforeLabel="Before"
            afterLabel="After"
            aspectClassName="aspect-[16/10]"
          />
        </div>
        <p className="mb-10 text-sm text-white/70">
          Colour visualisation. Drag to see the difference a cabinet colour
          makes.
        </p>

        <BookNowTrigger className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0D378D] transition hover:scale-[1.02] hover:bg-gray-100">
          Book Your Free Estimate
        </BookNowTrigger>
      </div>
    </section>
  );
}
