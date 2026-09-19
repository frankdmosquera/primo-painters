// pnpm dlx shadcn@latest add @efferd/image-gallery-1

"use client";

// motion/react -> framer-motion: the motion package is not installed here and
// nothing gets installed without asking. framer-motion 12 is the same API.
// Same swap as components/home/StepReveal.tsx.

import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import React from "react";
import { Photo } from "@/components/Photo";
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
  // On error, fall back only to a host next.config's remotePatterns allows.
  // The gallery used to pass a placehold.co URL here, which a bare <img> did
  // not care about; next/image refuses any host not on that list, so the
  // fallback would have failed in production and only in production. Clearing
  // the src instead leaves the container's own bg-accent/30 showing, which is
  // a quiet grey box rather than a broken image icon.
  const handleError = () => {
    setImgSrc(fallback);
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
        /*
          next/image rather than a bare <img>: these are full size phone
          photos, 3.5MB in one case, and a plain tag serves every byte of
          that to every visitor. `fill` works because AspectRatio above is
          already position:relative with a fixed ratio.

          next.config sets unoptimized in development, so this makes no
          difference locally. It is the production build that changes.
        */
        <Photo
          alt={alt}
          className={cn(
            "size-full object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          fill
          onError={handleError}
          onLoad={handleLoad}
          priority={inView}
          ref={imgRef}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={imgSrc}
        />
      )}
    </AspectRatio>
  );
}
