import { Image as IKImage } from "@imagekit/next";

type GalleryImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

/**
 * Renders through ImageKit whenever `src` is a relative media-library path
 * (the real setup). Falls back to a plain <img> for absolute placeholder
 * URLs (e.g. picsum.photos) so the gallery works before ImageKit has real
 * assets uploaded — swap `src` values in lib/projects.ts later and this
 * component needs zero changes.
 */
export function GalleryImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority,
}: GalleryImageProps) {
  const isAbsoluteUrl = /^https?:\/\//.test(src);

  if (isAbsoluteUrl || !IMAGEKIT_URL_ENDPOINT) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <IKImage
      urlEndpoint={IMAGEKIT_URL_ENDPOINT}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      transformation={[{ quality: 80 }]}
    />
  );
}
