import Link from "next/link";
import BookNowTrigger from "./BookNowTrigger";

export default function FinalCTA() {
  return (
    <section className="relative z-2  py-20 px-6 bg-[#0D378D] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Let's Bring Your Vision to Life
        </h2>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Whether you're refreshing a single room or repainting your entire
          home, Primo Painters delivers beautiful interior painting with
          meticulous workmanship, honest communication, and free estimates.
        </p>

        <BookNowTrigger
          className="inline-flex items-center justify-center rounded-full bg-white text-[#0D378D] px-8 py-4 text-lg font-semibold transition hover:scale-[1.02] hover:bg-gray-100"
        >
          Book Your Free Estimate
        </BookNowTrigger>

        <div className="mt-10 text-white/80 space-y-1 text-sm md:text-base">
          <p>📞 (587) 735-2312</p>
          <p>✉️ info@primopainters.ca</p>
          <p>Serving Calgary & Area</p>
        </div>
      </div>
    </section>
  );
}
