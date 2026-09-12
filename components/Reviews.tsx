import "./ReviewsCarousel.css";
import ServiceSection from "./service-section";
import GoogleReviews from "./GoogleReviews";
import ScrollingBannerA from "./scrolling-banner-a";

const Reviews = () => {
  return (
    <>
      {/* The reviews column is deliberately narrow, which left the sides of a
          wide screen reading as nothing rather than as space. Two quiet layers
          fix that without putting anything else in the section.

          A soft radial wash, warmer and lighter than the flat #E2E7F1 band
          directly above, so the two sections stay distinct instead of merging
          into one slab. And a faint dot grid, which only becomes visible as
          the screen grows, which is exactly where the emptiness was. */}
      <section className="relative isolate overflow-hidden bg-[#F7F9FC]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_50%_0%,#FFFFFF_0%,#F7F9FC_55%,#EDF1F8_100%)]"
        />
        {/* 1px dots on a 1.5rem grid, masked away through the middle so the
            texture only lives in the margins and nothing sits behind the
            heading or the widget. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(#0D378D 1px, transparent 1px)",
            backgroundSize: "1.5rem 1.5rem",
            // Tailwind was dropping the arbitrary mask-image variant, so the
            // dots ran behind the heading as well. Inline keeps both the
            // standard and the WebKit property, which Safari still needs.
            maskImage:
              "linear-gradient(to right, black 0%, transparent 34%, transparent 66%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, transparent 34%, transparent 66%, black 100%)",
          }}
        />

        {/* No padding on this wrapper on purpose: ServiceSection carries its
            own container with px-4, and it is shared with the gallery section,
            so padding here as well would double up on the heading only. The
            paragraph and the widget match its px-4 instead. */}
        <div className="mx-auto max-w-3xl py-12">
          <ServiceSection
            title="What Our Clients Say"
            description="Reviews from Our Satisfied <br /> Customers"
          />
          <div className="px-4">
            <p className="mt-5 mb-10 text-black">
              See why Primo Painters is a trusted choice for professional
              interior painting in Calgary.
            </p>
            {/* Elfsight. Nothing to style inside it, so this only decides how
                wide it is allowed to be. */}
            <GoogleReviews />
          </div>
        </div>
      </section>
      <ScrollingBannerA />
    </>
  );
};

export default Reviews;
