import { Photo } from "@/components/Photo";
import { OurStoryImg } from "@/data/images/general-images";

export default function OurStory() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div>
          <p className="uppercase tracking-widest text-[#0D378D] font-semibold">
            Our Story
          </p>

          <h2 className="text-3xl lg:text-5xl font-bold mt-3 text-black">
            Quality Painting. Honest Service. No Shortcuts.
          </h2>

          <div className="mt-8 space-y-6 text-gray-700 leading-8">
            <p>
              Primo Painters was founded with a simple goal: provide Calgary
              homeowners with an interior painting experience that is
              straightforward, dependable, and built around quality workmanship.
            </p>

            <p>
              Instead of trying to complete as many projects as possible, we
              choose to stay focused on delivering meticulous results. Every
              project receives the preparation, attention to detail, and care
              needed to produce a finish that looks beautiful and lasts.
            </p>

            <p>
              We believe homeowners deserve honest advice, transparent pricing,
              and clear communication from the first estimate through the final
              walkthrough. That's why we treat every home with the same respect
              and care we would expect in our own.
            </p>

            <p>
              Whether you're refreshing a single room or repainting your entire
              home, our goal is always the same: make the process simple,
              stress-free, and deliver results you'll be proud to live with for
              years to come.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
          <Photo
            src={OurStoryImg.src}
            alt={OurStoryImg.alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
