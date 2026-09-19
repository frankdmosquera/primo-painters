// import { GalleryHomeImages } from "@/data/images/general-images";
// import ProjectSliderWrapper from "@/app/gallery/ProjectSliderWrapper";
import { Photo } from "@/components/Photo";
import ProjectSliderWrapper from "./ProjectSliderWrapper";

// The slot is measured, not guessed: this slider fills 66vw at 1024 and 46vw
// at 1440, against a rule that used to claim 50vw and 33vw. The browser was
// picking an image about a third narrower than the box it had to fill, so the
// work rendered soft in the one section whose job is showing it sharp. The
// values below round up rather than down, since overshooting costs a few KB
// and undershooting costs sharpness.
const GALLERY_SIZES = "(max-width: 640px) 100vw, (max-width: 1279px) 70vw, 50vw";

export default function BigGalleryAccordion({
  GalleryImages,
}: {
  GalleryImages: { src: string; alt: string }[];
}) {
  return (
    <div className="hidden h-full w-full xl:flex">
      {/* Slider */}
      <ProjectSliderWrapper>
        {GalleryImages?.map((img, index) => (
          <div key={index} className="relative h-full w-full">
            <Photo
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes={GALLERY_SIZES}
            />
          </div>
        ))}
      </ProjectSliderWrapper>
    </div>
  );
}
