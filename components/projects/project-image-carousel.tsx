"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Photo } from "@/components/Photo";
// import { ProjectThumbnailStrip } from "./project-thumbnail-strip";
import type { Project } from "@/data/projectsData";
import { ProjectThumbnailStrip } from "./ProjectThumbnailStrip";

type ProjectImageCarouselProps = {
  project: Project;
  /** Which image to open on. Defaults to the first. */
  initialIndex?: number;
};

export function ProjectImageCarousel({
  project,
  initialIndex = 0,
}: ProjectImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (!api) return;

    // Jump straight to the clicked image, no slide animation on open —
    // `true` here is Embla's "jump" flag.
    api.scrollTo(initialIndex, true);
    // Reading the Embla API's snapshot right after — external-system sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return (
    <div className="flex max-h-[85vh] flex-col items-center gap-4 overflow-y-auto p-6">
      <h2 className="text-lg font-medium text-foreground">{project.title}</h2>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {project.images.map((image, index) => (
            <CarouselItem key={image.src}>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-md bg-muted"
                aria-label={`Show image ${index + 2 > project.images.length ? 1 : index + 2}`}
              >
                <Photo
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  priority={index === 0}
                  className="h-full w-full object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <p className="text-sm text-muted-foreground">
        {current + 1} of {project.images.length}
      </p>

      {/* Only worth showing once there are enough images to need jumping around */}
      {project.images.length > 6 && (
        <ProjectThumbnailStrip
          images={project.images}
          currentIndex={current}
          onSelect={(index) => api?.scrollTo(index)}
        />
      )}
    </div>
  );
}
