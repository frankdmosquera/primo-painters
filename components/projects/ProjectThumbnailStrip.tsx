"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Photo } from "@/components/Photo";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projectsData";

type ProjectThumbnailStripProps = {
  images: ProjectImage[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function ProjectThumbnailStrip({
  images,
  currentIndex,
  onSelect,
}: ProjectThumbnailStripProps) {
  const [thumbApi, setThumbApi] = useState<CarouselApi>();

  // Keep the active thumb scrolled into view as the main image changes.
  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(currentIndex);
  }, [thumbApi, currentIndex]);

  return (
    <Carousel
      setApi={setThumbApi}
      opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
      className="w-full"
    >
      <CarouselContent className="-ml-2">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          return (
            <CarouselItem
              key={image.src}
              className="basis-1/5 pl-2 min-[520px]:basis-1/6 min-[720px]:basis-[12.5%]"
            >
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-md ring-offset-2 ring-offset-background transition-all",
                  isActive
                    ? "ring-2 ring-foreground"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Photo
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
