"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projectsData";
import { LazyImage } from "./lazy-image-efferd-mansory";

/**
 * Tracks whether an element has scrolled near the viewport. Starts loading
 * ~200px before it's actually visible so images are ready by the time you
 * scroll to them, then stops observing once true — no reason to keep
 * watching an image that's already loaded.
 */
function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

export function GalleryTile({
  image,
  index,
  isPortrait,
  totalCount,
  onImageClick,
}: {
  image: ProjectImage;
  index: number;
  isPortrait: boolean;
  totalCount: number;
  onImageClick?: (index: number) => void;
}) {
  const { ref, inView } = useInView<HTMLButtonElement>();
  const width = isPortrait ? 1080 : 1920;
  const height = isPortrait ? 1920 : 1080;
  const ratio = isPortrait ? 9 / 16 : 16 / 9;

  // A button's aria-label overrides everything inside it when a screen reader
  // works out the accessible name, so "Open image 1 of 2" on its own discarded
  // the alt text on the photo below it. The photo leads, the action follows.
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onImageClick?.(index)}
      className="relative block w-full cursor-pointer text-left"
      aria-label={`${image.alt}. Open image ${index + 1} of ${totalCount}`}
    >
      <LazyImage
        alt={image.alt}
        containerClassName="cn-rounded"
        inView={inView}
        ratio={ratio}
        src={image.src}
      />

      {/*
        Dev-only alt readout, so alt can be checked against the photo it
        describes rather than against a list in data/images.ts.

        NODE_ENV is replaced with a literal at build time, so this whole block
        is dropped from the production bundle. It cannot ship, which is why it
        is written this way rather than left to be deleted by hand later.
      */}
      {process.env.NODE_ENV === "development" && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-black/75 px-2 py-1 text-[10px] leading-snug text-white">
          {image.alt || "NO ALT"}
        </span>
      )}
    </button>
  );
}
