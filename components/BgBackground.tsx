import { BgBackgroundImg } from "@/data/images/general-images";

/**
 * Plain <img> rather than next/image. See BgLines for why: an SVG has nothing
 * for the optimiser to do.
 *
 * The classes replace next/image's `fill`, which is only inline styles:
 * absolutely positioned, pinned to all four sides, 100% of the parent. The
 * parent still has to be positioned for that to mean anything, exactly as it
 * did before.
 */
export default function BgBackground() {
  return (
    <img
      src={BgBackgroundImg.src}
      alt={BgBackgroundImg.alt}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
