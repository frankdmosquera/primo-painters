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

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onImageClick?.(index)}
      className="block w-full cursor-pointer text-left"
      aria-label={`Open image ${index + 1} of ${totalCount}`}
    >
      <LazyImage
        alt={image.alt}
        containerClassName="cn-rounded"
        fallback={`https://placehold.co/${width}x${height}/`}
        inView={inView}
        ratio={ratio}
        src={image.src}
      />
    </button>
  );
}
