import Image from "next/image";
import {
  ReviewCard,
  StarRating,
  StarSprite,
  type ReviewCardDataType,
} from "@/components/reviews/ReviewCard";
import { ReviewsCarousel } from "@/components/reviews/ReviewsCarousel";
import { siteConfig } from "@/data/siteConfig";
import { getGoogleReviews } from "@/lib/googleReviews";
import { relativeTime } from "@/lib/relativeTime";

/**
 * The Google reviews, in the carousel from face-and-body components/home/Reviews.tsx,
 * ported on 2026-09-27. Same layout, Primo's dark blue instead of the
 * clinic's copper.
 *
 * LIVE ONLY. Face-and-body backfills from a hand-written pool because its
 * listing has 79 reviews and the Places API returns at most 5. Primo has 3,
 * so the live 5 already cover the whole listing and a pool would add nothing.
 * The day the listing passes 5, either the pool comes over from face-and-body
 * or the sourcing gets solved properly. Until then every card here is
 * Google's own text, with Google's own date, re-read daily.
 *
 * SERVER COMPONENT, deliberately. It awaits the fetch while the HTML is being
 * built, so the review text is in the markup Google reads. Only the sliding
 * ships to the browser.
 *
 * EMPTY MEANS GONE. `getGoogleReviews` returns empty rather than throwing,
 * and with no pool to fall back on, a dead key, a rotated place id or a
 * quota stop takes the section off the page rather than leaving an empty
 * band behind. That is the same behaviour the grid this replaces had.
 *
 * NO REVIEW SCHEMA. Google's review snippet policy disallows marking up
 * reviews about your own business collected from a third party. The
 * LocalBusiness block already carries aggregateRating, and each entity is
 * described once.
 *
 * SOLID BACKGROUND, on purpose. The home hero is sticky behind the whole
 * document. The translucent grid this replaces let it bleed through the
 * heading, which is the first thing that looked wrong. This band is opaque.
 */
export async function Reviews() {
  const live = await getGoogleReviews();

  if (live.reviews.length === 0 || live.rating === null) return null;

  const cards: ReviewCardDataType[] = live.reviews.map((review) => ({
    text: review.text,
    author: review.author,
    // Formatted here from the exact publish time, so "2 days ago" rather than
    // Google's coarse "in the last week". Google's phrase is the fallback.
    date: review.publishTime
      ? relativeTime(review.publishTime)
      : review.relativeTime,
    rating: review.rating,
    avatarUrl: review.photoUrl,
  }));

  const rating = live.rating;
  const total = live.total;

  // "showing 5 of 12" once the listing outgrows what the API returns. While
  // every review fits, the count says so plainly rather than "3 of 3".
  const countLabel =
    cards.length < total
      ? `showing ${cards.length} of ${total} Google reviews`
      : `${total} Google ${total === 1 ? "review" : "reviews"}`;

  // NOT live.mapsUrl: the API's googleMapsUri carries a session parameter and
  // landed on a different page. This is the canonical place URL, identical
  // whether or not the visitor is signed in, and every review is on it.
  const listingUrl = `https://www.google.com/maps/place/?q=place_id:${siteConfig.reviews.placeId}`;

  return (
    <section className="relative overflow-hidden bg-dark-surface py-16 text-on-dark md:py-24">
      {/* Soft depth, kept low and to the sides, clear of the heading. */}
      <div className="pointer-events-none absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-primary-light/35 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-primary-light/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary-light/35 blur-3xl" />

      <StarSprite />
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="relative z-10 text-center">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-accent">
            Customer reviews
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            What our customers say
          </h2>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {/* Google's own mark, unmodified, establishing the source before
                anyone reaches a card. */}
            <Image
              src="/google-g.png"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              className="size-8"
            />
            {/* Unrounded on purpose: a 4.7 draws four full stars and part of
                a fifth. Math.round() here would claim a flat 5.0. */}
            <StarRating rating={rating} size={30} />
            <span className="text-[15px] text-on-dark-muted">
              <b className="text-xl font-medium text-on-dark">
                {rating.toFixed(1)}
              </b>{" "}
              &middot; {countLabel}
            </span>
          </div>
        </div>

        <ReviewsCarousel
          slides={cards.map((card, i) => (
            <ReviewCard key={i} review={card} />
          ))}
        />

        {/* One button, and it leaves the site. New tab on purpose: someone
            reading reviews has not finished with the page they are on. */}
        <div className="mt-10 text-center">
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-on-dark/30 px-6 text-sm font-semibold text-on-dark transition-colors hover:border-accent hover:text-accent"
          >
            Read all {total} reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
