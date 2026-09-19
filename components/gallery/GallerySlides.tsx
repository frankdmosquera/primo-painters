import { Photo } from "@/components/Photo";

export default function GallerySlides({
  GalleryImages,
}: {
  GalleryImages: { src: string; alt: string }[];
}) {
  return (
    <>
      {GalleryImages?.map((slide, i) => (
        // 86% wide rather than a full 100vw, so the next photo peeks at the
        // right edge. That peek is the swipe affordance: it does the job
        // arrows would, without adding controls to a touch surface.
        <div
          key={i}
          // snap-always is scroll-snap-stop: always. Without it a fast flick
          // sails past several photos and settles wherever momentum dies;
          // with it the scroll is forced to stop at the very next slide.
          className="relative aspect-[4/3] w-[86%] shrink-0 snap-center snap-always overflow-hidden rounded-2xl bg-black/5 sm:aspect-[3/2]"
        >
          <Photo
            src={slide.src}
            alt={slide.alt}
            className="object-cover"
            fill
            sizes="(max-width: 1280px) 86vw, 30rem"
          />
        </div>
      ))}
    </>
  );
}
