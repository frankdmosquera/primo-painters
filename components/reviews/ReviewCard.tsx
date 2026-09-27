import Image from "next/image";

/**
 * A single Google review, ported from face-and-body components/home/ReviewCard.tsx
 * on 2026-09-27, restyled for Primo's dark blue band.
 *
 * IT COPIES GOOGLE'S OWN CARD: 36px avatar, name at weight 400, stars with
 * the date in grey on the same line. The date on the star line is what makes
 * it read as a Google review rather than a generic testimonial.
 *
 * NO REVIEW MARKUP. Nothing here emits `Review` or `aggregateRating` JSON-LD.
 * Google's review snippet policy disallows marking up reviews about your own
 * business gathered from a third party. The LocalBusiness block on the home
 * page already carries the rating, and each entity is described once.
 *
 * Two things face-and-body's card has that this one does not, on purpose:
 * the ImageKit avatar path and the treatment badge. Both exist there for the
 * hand-written review pool, and Primo has no pool. Every card here comes from
 * the live API, so the avatar is always a Google URL or nothing.
 */

export type ReviewCardDataType = {
  text: string;
  author: string;
  /** Google's own wording, e.g. "a month ago". Not a date we format. */
  date?: string;
  /** 1-5. */
  rating?: number;
  /** A real uploaded photo hosted by Google, or nothing. See lib/googleReviews.ts. */
  avatarUrl?: string;
};

/**
 * The star, defined once per page.
 *
 * Every rating draws each star twice, a grey outline and a gold copy clipped
 * to a percentage on top, which is what lets a 4.7 show as four and a bit.
 * Rendered as one symbol so every star on the page is a `<use>` reference to
 * it rather than its own copy of the path.
 */
export function StarSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      {/* GEOMETRY ONLY. No `fill` and no `stroke` here: a presentation
          attribute on the symbol beats the value inherited from the `<use>`,
          so `fill="none"` made every star render hollow. Colour is the
          caller's job. */}
      <symbol
        id="pp-star"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </symbol>
    </svg>
  );
}

function Star({ size, className }: { size: number; className: string }) {
  return (
    <svg
      aria-hidden="true"
      stroke="currentColor"
      className={className}
      style={{ width: size, height: size, maxWidth: "none" }}
    >
      <use href="#pp-star" />
    </svg>
  );
}

/**
 * Stars, including a partial one.
 *
 * A 4.7 is not rounded to five full stars. The fifth star is filled to a
 * fraction of its width and the rest shows through as the empty outline.
 * Rounding up in a business's own favour is the kind of small lie that makes
 * a visitor doubt everything else on the page.
 */
export function StarRating({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const exact = Math.max(0, Math.min(1, rating - i));
        // Perceptual, not arithmetic. A star is widest across the middle and
        // tapers to points, so clipping at 70% of the width shows well under
        // 70% of the ink. The exponent was tuned by eye in face-and-body so
        // a 4.7 reads as a 4.7. Full and empty stars are untouched.
        const fill = exact > 0 && exact < 1 ? exact ** 0.85 : exact;
        return (
          <span
            key={i}
            className="relative block shrink-0"
            style={{ width: size, height: size }}
          >
            <Star
              size={size}
              className="absolute inset-0 fill-transparent text-on-dark/25"
            />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: size * fill }}
              >
                <Star size={size} className="fill-amber-400 text-amber-400" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewCard({ review }: { review: ReviewCardDataType }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-primary-light/25 bg-primary/25 p-6 sm:p-7">
      <div className="flex items-start gap-3">
        {/* `next/image`, not the shadcn Avatar. `AvatarImage` mounts only once
            the file has loaded in the browser, so the photo was absent from
            the server HTML and every card flashed its initials first.

            Eager, not lazy. Cards start off-screen inside the carousel, so
            lazy loading fetches the face as the card slides in and it pops
            into a card someone is already reading.

            Decorative on purpose. The name is rendered beside it, so alt text
            would make a screen reader say it twice. */}
        {review.avatarUrl ? (
          <Image
            src={review.avatarUrl}
            alt=""
            width={36}
            height={36}
            priority
            className="size-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-medium text-accent"
          >
            {initialsOf(review.author)}
          </span>
        )}

        <figcaption className="min-w-0 flex-1">
          <span className="block truncate text-[15px] text-on-dark">
            {review.author}
          </span>
        </figcaption>

        {/* Top-right, where Google's own cards put it. Their published asset,
            unmodified: the brand terms allow the mark for attribution, and
            Places data requires attribution, provided it is never recoloured
            or stretched.

            NOT decorative. The mark is the whole attribution, so it carries
            real alt text and a screen reader gets what the picture conveys. */}
        <Image
          src="/google-g.png"
          alt="Posted on Google"
          width={22}
          height={22}
          className="mt-0.5 size-[22px] shrink-0"
        />
      </div>

      {/* Stars and date on one line, which is Google's arrangement. */}
      {(review.rating !== undefined || review.date) && (
        <div className="mt-2.5 flex items-center gap-2">
          {review.rating !== undefined && (
            <StarRating rating={review.rating} size={16} />
          )}
          {review.date && (
            <span className="text-[13px] text-on-dark-muted">{review.date}</span>
          )}
        </div>
      )}

      {/* FOUR LINES, FIXED. The cards are `items-stretch`, so every one is as
          tall as the tallest. Clamped, not truncated: the full quote stays in
          the HTML for Google to read and only the display is capped. The
          button under the carousel goes to the same review on Google, where
          it is whole. */}
      <blockquote className="mt-3.5 line-clamp-4 flex-1 text-[14.5px] leading-[1.55] text-pretty text-on-dark">
        {review.text}
      </blockquote>
    </figure>
  );
}
