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
 * REVALIDATED DAILY. Reviews come from Place Details Enterprise + Atmosphere,
 * which allows 1,000 calls a month free and then costs $25 per 1,000. One call
 * per page view would pass the free tier at a thousand visits. Once a day is
 * about 30 a month, and reviews do not change hourly. This number is the
 * difference between free and a bill, so do not lower it without doing the
 * arithmetic again.
 *
 * NEVER THROWS. Every failure path returns empty rather than raising. A dead
 * key, a rotated place id, a Google outage or a quota stop should make the
 * section render nothing, not take the page down with it.
 */

const ENDPOINT = "https://places.googleapis.com/v1/places";

/** One day. See the note above before changing it. */
const REVALIDATE_SECONDS = 86_400;

export type GoogleReview = {
  rating: number;
  author: string;
  /** Link to the reviewer's Google profile, when Google supplies one. */
  authorUrl?: string;
  /** Reviewer's avatar, hosted by Google. */
  photoUrl?: string;
  /** Google's own wording, e.g. "a month ago". Not a date we format. */
  relativeTime: string;
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
    text?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

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
        "X-Goog-FieldMask":
          "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return EMPTY;

    const data = (await response.json()) as PlacesResponse;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      // A review can be a star rating with no words. Nothing to show.
      .filter((review) => review.text?.text)
      .map((review) => ({
        rating: review.rating ?? 0,
        author: review.authorAttribution?.displayName ?? "Google reviewer",
        authorUrl: review.authorAttribution?.uri,
        photoUrl: review.authorAttribution?.photoUri,
        relativeTime: review.relativePublishTimeDescription ?? "",
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
