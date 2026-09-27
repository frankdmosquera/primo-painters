import { siteConfig } from "@/data/siteConfig";

/**
 * Reads this business's Google reviews, server side.
 *
 * ⚠ SERVER ONLY, but not enforced. The `server-only` package would turn a
 * client-side import of this file into a build error. It is not installed, and
 * nothing gets installed without asking, so this is a comment rather than a
 * guarantee. What does hold regardless: GOOGLE_MAPS_API_KEY has no
 * NEXT_PUBLIC_ prefix, so it is simply absent in the browser bundle. Imported
 * from a client component this returns empty rather than leaking the key.
 *
 * Three decisions are baked in here, and each one has a reason.
 *
 * SERVER SIDE. The previous version of this feature fetched in the browser,
 * behind a cookie and a localStorage cache, which meant the review text never
 * reached the HTML at all. On a site that ranks, review text Google cannot
 * read is review text that does not exist.
 *
 * TWO CACHES, DIFFERENT SCOPES. Do not collapse them into one.
 *
 *   next: { revalidate } here   the FETCH cache. keyed by URL, shared by every
 *                               caller in the app. decides how often GOOGLE is
 *                               called
 *   export const revalidate     the PAGE cache, in each page file. decides how
 *                               often THAT page's HTML regenerates
 *
 * The page one alone is not enough. Twenty pages rendering this section would
 * regenerate on twenty unaligned schedules and each one would call Google. The
 * fetch cache means the first caller pays and the rest read the stored copy.
 * Same at build time: next build generates every route in one run, so without
 * this, one build is one Google call per page that uses it, on every push.
 *
 * And the number is not arbitrary. Reviews come from Place Details Enterprise +
 * Atmosphere: 1,000 calls a month free, then $25 per 1,000, and the free 1,000
 * is per Google Cloud BILLING ACCOUNT, shared by every project linked to it,
 * not per project or per key (checked against the pricing page 2026-09-27).
 * Once an hour is about 720 a month, so one site can poll hourly for free and
 * a second on the same billing account cannot. Do the arithmetic again before
 * lowering it or before pointing another site at the same billing account.
 *
 * Hourly rather than daily since 2026-09-27, so a new review reaches the page
 * within the hour. The proper trigger, Google telling us when a review lands,
 * is parked: it needs the owner sign-in and Business Profile API approval.
 *
 * NEVER THROWS. Every failure path returns empty rather than raising. A dead
 * key, a rotated place id, a Google outage or a quota stop should make the
 * section render nothing, not take the page down with it.
 */

const ENDPOINT = "https://places.googleapis.com/v1/places";

/** One hour. See the note above before changing it. */
const REVALIDATE_SECONDS = 3_600;

/** Fours and fives are shown; three and below are not. */
const MIN_RATING = 4;

export type GoogleReview = {
  rating: number;
  author: string;
  /** Link to the reviewer's Google profile, when Google supplies one. */
  authorUrl?: string;
  /** A real uploaded photo hosted by Google, or nothing. See uploadedPhoto. */
  photoUrl?: string;
  /**
   * Google's own phrase, e.g. "in the last week". Coarse: anything under
   * seven days gets that same phrase. Kept as the fallback when publishTime
   * is missing.
   */
  relativeTime: string;
  /** The exact publish time, ISO 8601. The card formats this, not relativeTime. */
  publishTime?: string;
  text: string;
};

export type GoogleReviewsResult = {
  /** Null when Google returned nothing, so callers can tell it apart from 0. */
  rating: number | null;
  total: number;
  reviews: GoogleReview[];
  /** The listing on Maps, for a "leave a review" link. */
  mapsUrl: string | null;
};

const EMPTY: GoogleReviewsResult = {
  rating: null,
  total: 0,
  reviews: [],
  mapsUrl: null,
};

/**
 * Google's shape, named so the mapping below reads as a translation rather
 * than as guesswork. Everything is optional because a field mask can come back
 * partially filled and a review can carry a rating with no text.
 */
type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    publishTime?: string;
    text?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

/**
 * A real photograph, or nothing.
 *
 * Google never reports "no avatar". For anyone who has not uploaded a
 * picture it generates one, a flat coloured circle with their first letter,
 * and returns that like any other image. So the card always received a valid
 * src, the initials fallback never fired, and the section showed circles in
 * Google's palette rather than this site's.
 *
 * The two are told apart by the path. An uploaded photo is served from
 * `/a-/`; a generated one from `/a/`. Ported from face-and-body.
 */
function uploadedPhoto(uri: string | undefined) {
  return uri?.includes("googleusercontent.com/a-/") ? uri : undefined;
}

export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = siteConfig.reviews.placeId;

  if (!key || !placeId) return EMPTY;

  try {
    const response = await fetch(`${ENDPOINT}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        // Asking for less costs less. Every extra field can move the request
        // into a pricier SKU, and reviews already sit in the dearest one.
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return EMPTY;

    const data = (await response.json()) as PlacesResponse;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      // A review can be a star rating with no words. Nothing to show.
      .filter((review) => review.text?.text)
      // Fours and fives only. A three or below is a real review and it stays
      // on the listing where anyone can read it. The rating and the count
      // above the section are Google's unfiltered numbers, and the link goes
      // straight to the listing. This section is the testimonial wall, not
      // the record.
      .filter((review) => (review.rating ?? 0) >= MIN_RATING)
      .map((review) => ({
        rating: review.rating ?? 0,
        author: review.authorAttribution?.displayName ?? "Google reviewer",
        authorUrl: review.authorAttribution?.uri,
        photoUrl: uploadedPhoto(review.authorAttribution?.photoUri),
        relativeTime: review.relativePublishTimeDescription ?? "",
        publishTime: review.publishTime,
        text: review.text?.text ?? "",
      }));

    return {
      rating: data.rating ?? null,
      total: data.userRatingCount ?? 0,
      reviews,
      mapsUrl: data.googleMapsUri ?? null,
    };
  } catch {
    return EMPTY;
  }
}
