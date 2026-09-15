import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getGoogleReviews } from "@/lib/googleReviews";

/**
 * The reviews section, read from Google at build and revalidated daily.
 *
 * SERVER COMPONENT, deliberately. No "use client". It awaits
 * getGoogleReviews() while the HTML is being built, so the review text is in
 * the markup Google reads. The component this replaces fetched in the browser,
 * which meant the text never reached the HTML at all.
 *
 * NOT A CAROUSEL. Google returns one review for this listing. A carousel of
 * one is controls with nothing to scroll. It lays out as a single centred
 * testimonial and becomes a grid on its own if more reviews arrive, so nothing
 * here needs revisiting when the second one lands.
 *
 * NO JSON-LD HERE. The LocalBusiness block already carries aggregateRating,
 * and our rule is each entity described once, never marked up twice.
 *
 * The heading reads Google's own numbers. It is not given a hardcoded rating,
 * because the point of this whole change was that the old one said
 * "4.9 · 20+ Google reviews" on a business with one.
 */

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
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

export default async function GoogleReviews() {
  const { rating, total, reviews, mapsUrl } = await getGoogleReviews();

  // getGoogleReviews never throws, it returns empty. So the empty case is
  // handled in the markup too, not just in the data: a dead key, a rotated
  // place id or a quota stop takes the section off the page rather than
  // leaving an empty card behind.
  if (reviews.length === 0 || rating === null) return null;

  return (
    // Translucent on purpose, and NOT given an opaque background. The home
    // hero is sticky with the page as its parent, so it sits behind the whole
    // document, and this gradient lets it bleed through before fading to
    // solid. Carried over from the section this replaces.
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
      <div className="pointer-events-none absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What our customers say
          </h2>

          <div className="mt-3 flex items-center justify-center gap-2">
            <StarRating rating={Math.round(rating)} />
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} from {total} Google{" "}
              {total === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {/* One review centres. Two or more become a grid, with no change here. */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 [&>*:only-child]:md:col-span-2 [&>*:only-child]:mx-auto [&>*:only-child]:max-w-2xl">
          {reviews.map((review) => (
            <figure
              key={`${review.author}-${review.relativeTime}`}
              className="h-full rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  {/* Google's own hosted avatar for the person who wrote it. */}
                  <AvatarImage src={review.photoUrl} alt="" />
                  <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                    {initialsOf(review.author)}
                  </AvatarFallback>
                </Avatar>
                <figcaption>
                  <span className="block text-sm font-medium text-foreground">
                    {review.author}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {review.relativeTime}
                  </span>
                </figcaption>
              </div>

              <div className="mt-3">
                <StarRating rating={review.rating} />
              </div>

              <blockquote className="mt-3 text-sm text-pretty text-foreground">
                {review.text}
              </blockquote>
            </figure>
          ))}
        </div>

        {mapsUrl && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Read or leave a review on Google
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
