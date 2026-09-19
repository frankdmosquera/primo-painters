import Image, { type ImageProps } from "next/image";
import { Image as IKImage } from "@imagekit/next";

/**
 * Every next/image prop except the two the wrapper owns. `src` is narrowed
 * to a string because a static import of a file under public/ is exactly
 * the thing this component exists to stop.
 */
type PhotoProps = Omit<ImageProps, "src" | "loader"> & {
  src: string;
  ref?: React.Ref<HTMLImageElement>;
};

const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

/**
 * One wrapper for every photograph on the site.
 *
 * Renders through ImageKit whenever NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is set
 * and `src` is a relative media-library path. Without the endpoint it falls
 * back to next/image against public/, so the same call site works offline
 * and flips to the CDN the day the variable lands. The path is the same
 * string either way: the media library mirrors the buckets public/ used,
 * general/, interior-painting/, projects/.
 *
 * Takes every next/image prop, fill included, and passes it straight
 * through. IKImage is next/image with ImageKit's loader plugged in, so
 * fill, sizes, priority, className and the rest mean the same thing on
 * both branches. Lazy loading is next/image's own, and `priority` flips it
 * to eager plus a preload hint exactly as it always did.
 *
 * Absolute URLs bypass ImageKit and render unoptimised, which is what a
 * placeholder needs and nothing else should ever hit.
 *
 * Logo, favicon, icons, the OG image and every SVG do not come through
 * here. They stay in public/ and render directly.
 */
export function Photo({ src, alt, ...rest }: PhotoProps) {
  const isAbsoluteUrl = /^https?:\/\//.test(src);

  if (isAbsoluteUrl) {
    return <Image src={src} alt={alt} unoptimized {...rest} />;
  }

  if (!IMAGEKIT_URL_ENDPOINT) {
    return <Image src={src} alt={alt} {...rest} />;
  }

  return (
    <IKImage
      urlEndpoint={IMAGEKIT_URL_ENDPOINT}
      src={src}
      alt={alt}
      transformation={[{ quality: 80 }]}
      {...rest}
    />
  );
}
