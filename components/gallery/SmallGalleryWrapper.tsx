"use client";

import React, { useRef, useState, ReactNode } from "react";
// import { GalleryHomeImages } from "@/data/images";
import Image from "next/image";

// interface SmallGalleryWrapperProps {
//   children: ReactNode;
// }
type SmallGalleryWrapperProps = {
  GalleryImages: {
    src: string;
    alt: string;
  }[];
  children: ReactNode;
};

export default function SmallGalleryWrapper({
  children,
  GalleryImages,
}: SmallGalleryWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // const numberOfImages = GalleryHomeImages.length;
  const numberOfImages = GalleryImages.length;

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const totalScrollWidth = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    const scrollPercent = (currentScroll / totalScrollWidth) * 100;
    const stepSize = 100 / numberOfImages;

    const step = Math.min(
      Math.floor(scrollPercent / stepSize),
      numberOfImages - 1,
    );

    setCurrentStep(step);
  };

  return (
    <>
      <div className="relative xl:hidden">
        {/* Images directly rendered */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          tabIndex={0} // Make focusable
          onKeyDown={(e) => {
            if (!scrollRef.current) return; // Null check

            if (e.key === "ArrowRight") {
              scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
              e.preventDefault();
            } else if (e.key === "ArrowLeft") {
              scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
              e.preventDefault();
            }
          }}
          className="overflow-x-auto flex snap-x snap-mandatory scroll-smooth  cursor-grab active:cursor-grabbing"
        >
          {children}
        </div>
      </div>
      {/* thumbnails */}
      <div className="bg-black w-full xl:hidden  flex  justify-center px-1 py-1 gap-2 xsm:gap-3 md:gap-4 overflow-hidden">
        {GalleryImages.map((img, index) => (
          <div
            className="relative h-5 w-5 tn:h-6 tn:w-6 xsm:h-7 xsm:w-7 "
            key={index}
          >
            {/* These render at 20 to 28px. Without `sizes`, next/image assumes
                a full viewport width image and fetches the 1080px variant, so
                each fingernail sized thumbnail was pulling roughly 63KB instead
                of 0.6KB. */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="32px"
              className={`object-cover transition-opacity duration-300 rounded-xl ${
                index === currentStep ? "opacity-100" : "opacity-40"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
