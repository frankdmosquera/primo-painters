import Image from "next/image";
import Link from "next/link";
import paintingCompany from "@/public/paintingCompany.webp";
import BookNowTrigger from "./BookNowTrigger";

export const CalgaryPainting = () => {
  return (
    <div className="my-6">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="bg-[#0D378D] text-white p-8 md:p-12 py-30 max-sm:py-10 lg:p-16 flex flex-col justify-center md:w-1/2">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Interior Painting Done Right
            </h2>

            <p className="mb-6">
              A beautiful paint job is about more than a fresh coat of paint.
              Proper preparation, smooth finishes, crisp lines, and attention to
              detail make the difference between results that simply look good
              today and results you'll enjoy for years.
            </p>

            <p className="mb-12">
              At Primo Painters, we take the time to prepare every surface
              properly, protect your home throughout the project, and deliver
              high-quality interior painting for walls, ceilings, trim, doors,
              cabinets, and more. Our goal is simple: beautiful, lasting results
              you'll be proud to come home to.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 pt-4">
              {/* Leave your four icon blocks exactly as they are */}
            </div>

            <div className="flex lg:mt-10 mt-5">
              <BookNowTrigger
                className="flex items-center gap-2 border-2 border-white rounded-full pl-3 pr-1.5 py-2 text-base md:text-sm font-medium hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Book Your Free Estimate
                {/* Keep your SVG exactly as it is */}
              </BookNowTrigger>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 h-[300px] md:h-auto relative">
          <Image
            src={paintingCompany}
            alt="Primo Painters completing an interior house painting project in Calgary"
            fill
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
          />
        </div>
      </div>
    </div>
  );
};
