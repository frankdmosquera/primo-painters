"use client";

import React, { useRef, useState, ReactNode } from "react";

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
  const [progress, setProgress] = useState(0);

  const count = Math.max(GalleryImages.length, 1);

  // Raw scroll fraction rather than a step index. A rail that moves smoothly
  // with the thumb feels connected to the gesture; one that jumps between
  // discrete positions does not.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollByOne = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.86, behavior: "smooth" });
  };

  // The rail segment is one image's share of the track, so it shortens on its
  // own as a service gains photos. Seven images or thirty, it still reads.
  const segmentWidth = 100 / count;
  const travelInOwnWidths = 100 / segmentWidth - 1;

  return (
    <div className="xl:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label="Project photos, scroll sideways to see more"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            scrollByOne(1);
            e.preventDefault();
          } else if (e.key === "ArrowLeft") {
            scrollByOne(-1);
            e.preventDefault();
          }
        }}
        className="flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 py-1 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* Replaces the black thumbnail strip. Those were 20px photos at 40%
          opacity on a solid black bar, unreadable at that size and unable to
          cope with a gallery of thirty. */}
      <div className="mt-3 px-4" aria-hidden="true">
        <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-[#0D378D] motion-safe:transition-transform motion-safe:duration-150"
            style={{
              width: `${segmentWidth}%`,
              transform: `translateX(${progress * travelInOwnWidths * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
