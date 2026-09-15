// pnpm dlx shadcn@latest add @efferd/image-gallery-1

"use client";

// motion/react -> framer-motion: the motion package is not installed here and
// nothing gets installed without asking. framer-motion 12 is the same API.
// Same swap as components/home/StepReveal.tsx.

import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type LazyImageProps = {
  alt: string;
  src: string;
  className?: string;
  containerClassName?: string;
  /** URL of the fallback image. default: undefined */
  fallback?: string;
  /** The ratio of the image. */
  ratio: number;
  /** Whether the image should only load when it is in view. default: false */
  inView?: boolean;
};

export function LazyImage({
  alt,
  src,
  ratio,
  fallback,
  inView = false,
  className,
  containerClassName,
}: LazyImageProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const [imgSrc, setImgSrc] = React.useState<string | undefined>(
    inView ? undefined : src,
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const handleError = () => {
    if (fallback) {
      setImgSrc(fallback);
    }
    setIsLoading(false);
  };

  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  // Load image only when inView — syncing from the IntersectionObserver
  // signal `useInView` exposes, not state derived from props.
  React.useEffect(() => {
    if (inView && isInView && !imgSrc) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImgSrc(src);
    }
  }, [inView, isInView, src, imgSrc]);

  // Handle cached images instantly
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, [handleLoad]);

  return (
    <AspectRatio
      className={cn(
        "relative size-full overflow-hidden border bg-accent/30",
        containerClassName,
      )}
      ratio={ratio}
      ref={ref}
    >
      {imgSrc && (
        // biome-ignore lint/correctness/useImageSize: dynamic image size
        <img
          alt={alt}
          className={cn(
            "size-full object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          decoding="async"
          fetchPriority={inView ? "high" : "low"}
          loading="lazy"
          onError={handleError}
          onLoad={handleLoad}
          ref={imgRef}
          role="presentation" // Changed from "img" to "presentation" since it's decorative
          src={imgSrc}
        />
      )}
    </AspectRatio>
  );
}
