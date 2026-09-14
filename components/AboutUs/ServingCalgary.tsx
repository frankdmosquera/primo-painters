export default function ServingCalgary() {
  return (
    <section className="bg-[#0D378D] text-white py-24 px-4">
      <div className="container max-w-5xl mx-auto text-center">
        <p className="uppercase tracking-[0.25em] font-semibold text-[#CADBFF]">
          Proudly Serving Calgary
        </p>

        <h2 className="text-3xl lg:text-5xl font-bold mt-3">
          Interior Painting Throughout Calgary
        </h2>

        {/* One paragraph, not two. Merged on 2026-09-14 at Frank's request.
            Not a single word changed: both sentences are here in the same
            order, so what a search engine reads is identical and only the
            markup differs. The SEO gate will show the two blocks joined into
            one line, with nothing added and nothing lost. */}
        <p className="mt-8 text-lg font-light leading-8 text-gray-100">
          Primo Painters proudly provides professional interior painting
          services throughout Calgary, helping homeowners refresh everything
          from a single room to an entire home. Whether you&apos;re updating
          walls, ceilings, trim, doors, cabinets, or garages, our focus is
          always the same: meticulous workmanship, honest communication, and
          beautiful results that last.
        </p>
      </div>
    </section>
  );
}
