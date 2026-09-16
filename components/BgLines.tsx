import BgBackground2 from "@/public/SVGs/backgrounds/above-gallery-bg-line.svg";

/**
 * A plain <img>, not next/image, and deliberately so.
 *
 * Next cannot optimise an SVG. It is already vector, there is nothing to
 * resize and no smaller format to convert to, so routing it through the image
 * optimiser adds a request and returns the same bytes. The static import is
 * kept because it still gives a hashed, cache-busted URL plus the intrinsic
 * width and height.
 *
 * Decorative: a background line carries no information, so it takes an empty
 * alt and is hidden from screen readers. It used to read "bg-Image".
 */
export default function BgLines() {
  return (
    <div className="absolute ">
      <img
        src={BgBackground2.src}
        width={BgBackground2.width}
        height={BgBackground2.height}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
