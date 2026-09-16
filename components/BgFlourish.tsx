import { cn } from "@/lib/utils";

/**
 * The thin brand-blue line that drifts behind a section.
 *
 * Inline, not an <img>. It is one path of about 780 bytes, so a file meant a
 * network request for less markup than this comment. Inline also lets it take
 * its colour from CSS: the stroke is currentColor, so `text-primary` here
 * follows the theme instead of pinning a second copy of #0D378D.
 *
 * ── why the old version drew nothing ──────────────────────────────────────
 * It was <div class="absolute top-[-490px]"> wrapping an <Image>. A block that
 * is absolutely positioned shrink-wraps its content, the content was an img
 * carrying Tailwind's `max-width: 100%`, and 100% of a shrink-wrapped box is
 * zero. Each layer was reasonable; together they resolved to 0x0, on every
 * page that used it. Measured, not guessed: an image carrying next/image's
 * exact output collapsed in that same parent too.
 *
 * The fix is `inset-x-0` on the wrapper. It gives the box a real width to be
 * a percentage of, and everything below it follows.
 *
 * The path runs from about -197 to 2056 inside a 1920 viewBox, so it is drawn
 * to overflow its own artboard. That is what makes it bleed off both edges
 * rather than tucking in politely at the margins. overflow-hidden on the
 * wrapper keeps that bleed from widening the page.
 */

const PATH =
  "M-132 32.3613C-132 32.3613 41.962 80.6704 122.647 126.616C185.913 162.642 247.888 183.499 249.971 230.323C252.885 295.842 -52.8376 299.118 15.3071 356.176C70.3494 402.263 228.859 339.498 296.789 381.563C347.19 412.773 278.578 448.765 325.337 481.219C418.338 545.765 641.663 517.573 744.991 456.642C867.079 384.649 643.808 336.458 601.11 230.323C490.964 -43.4694 1003.83 -61.5944 1009.92 120.134C1013.87 238.072 1111.51 97.6028 1121.82 137.689C1160.73 288.895 1113.94 382.655 1245.72 317.286C1382.64 249.366 1474.86 203.004 1553.47 277.045C1729.63 442.976 1374.57 -97.519 1739.6 159.835C1947.59 306.475 2121 381.563 2121 381.563";

type BgFlourishProps = {
  /**
   * Rotates the curve 180°. The two SVG files this replaced were the same
   * shape drawn in opposite directions, so consecutive sections can alternate
   * without repeating a silhouette the eye has just seen.
   */
  flip?: boolean;
  /**
   * Where it sits in the section. Vertical offset belongs to the caller: each
   * section is a different height, so there is no offset that suits all of
   * them. Give it a `top-*`, `bottom-*` or `inset-y-*`.
   */
  className?: string;
};

export default function BgFlourish({ flip, className }: BgFlourishProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* The svg is narrower than the section on purpose, so the curve reads
          smaller without losing its bleed. The path spans 2253 units inside a
          1920 viewBox, about 17% of overflow, so at 11/12 there is still
          roughly 7% hanging off each edge. Below about 85% it stops reaching
          the edges and starts looking like a centred graphic rather than a
          background.

          Stock scale values throughout, never arbitrary ones: h-[12rem] sat on
          this component doing nothing because Tailwind had not generated a rule
          for it, and the height silently fell back to auto. */}
      <svg
        viewBox="0 0 1920 519"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "mx-auto h-auto w-11/12 text-primary",
          flip && "rotate-180",
        )}
      >
        {/* strokeWidth is in viewBox units, not pixels. The svg is drawn at
            1920 wide and displayed at roughly 1265, so 0.6 here lands at about
            0.4 of a device pixel. Under 1px a browser cannot draw a thinner
            line, it anti-aliases instead, which is why going finer than this
            reads as fainter rather than sharper. The original had no
            strokeWidth at all, so it inherited 1. */}
        <path
          d={PATH}
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}
