/**
 * Shared class strings for controls that appear in more than one place.
 *
 * These live here rather than being copied into each component so a circular
 * control cannot end up looking one way in the services gallery and another in
 * the reviews carousel. Change it once.
 */

/**
 * A round icon button: the gallery's prev/play/next, and the reviews
 * carousel's arrows.
 *
 * The hover fills the circle rather than shifting the icon's blue a shade
 * darker, which is what the original hover:text-blue-800 did - technically a
 * hover, invisible in practice. It is a real button everywhere it is used, so
 * it carries a focus ring and a press state too.
 */
export const CONTROL =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95";

/**
 * A pill button: the services tab triggers, "See all reviews", "Load more".
 * Same shape and the same fill-on-hover as CONTROL, sized for a text label.
 */
export const PILL =
  "h-auto cursor-pointer rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground";
