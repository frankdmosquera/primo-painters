// ⚠ DO NOT MERGE THIS TO main. DO NOT DEPLOY.
//
// Carried over verbatim from the-latam-painters on 2026-09-14, warning and all.
// Every review below is fabricated: invented names, invented dates, invented
// ratings, and stock headshots pulled from pravatar.cc - photographs of real
// strangers - all presented under a "4.9 · 20+ Google reviews" heading.
//
// It renders on primo-painters' home page ON PURPOSE, as boilerplate, so the
// section can be designed against real-looking content. That is the only
// reason it is here.
//
// primo-painters is a live business ranking in Calgary. Fabricated
// testimonials on it are a trust problem and an advertising-standards one, and
// this is server rendered, so the fake names are in the HTML Google reads.
//
// Before this goes anywhere near main: swap the data for real Google reviews
// via app/api/getReviews, or take the section off the page.
//
// LATAM's own note, from their file:
//   "Unlinked from app/page.tsx on 2026-09-12. Re-enable only with real
//    reviews that are actually attributable to the people who left them."
// Their live site renders GoogleReviewCarousel2 instead, for this reason.
"use client";

import { useEffect, useState, useCallback } from "react";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CONTROL, PILL } from "@/lib/controlClasses";

type Review = {
  name: string;
  initials: string;
  avatarUrl: string;
  date: string;
  rating: number;
  service: string;
  text: string;
};

// Fake dataset — swap for real Google Reviews API data later.
// Photos come from pravatar.cc (free placeholder headshots, no API key).
const names = [
  "Maria Gonzalez",
  "James Okafor",
  "Priya Sharma",
  "David Chen",
  "Sofia Martinez",
  "Liam Turner",
  "Ana Rodriguez",
  "Noah Bennett",
  "Camila Reyes",
  "Ethan Wallace",
  "Valentina Cruz",
  "Mason Brooks",
  "Isabella Torres",
  "Lucas Ferreira",
  "Emma Diaz",
  "Oliver Grant",
  "Lucia Fernandez",
  "Benjamin Ross",
  "Daniela Vargas",
  "Henry Coleman",
];
const services = [
  "Interior painting",
  "Trim and doors",
  "Ceiling painting",
  "Full home interior",
];
const texts = [
  "Great price and even better work. They repainted our whole main floor in two days and left everything spotless.",
  "Fast, professional, and the edges are perfectly clean. Communication was clear from quote to final walkthrough.",
  "Solid work on our ceilings, no drips or streaks anywhere. Took a bit longer than expected but worth it.",
  "Booked them for our whole condo. Fair pricing, showed up on time both days, and the colour matching was spot on.",
  "Best quote we got in Calgary and the fastest turnaround too. Very respectful of our home.",
  "Would hire again without thinking twice. Left the place cleaner than when they arrived.",
];

const reviews: Review[] = Array.from({ length: 20 }).map((_, i) => {
  const name = names[i % names.length];
  return {
    name,
    initials: name
      .split(" ")
      .map((n) => n[0])
      .join(""),
    avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    date: `${(i % 6) + 1} ${i % 2 === 0 ? "weeks" : "months"} ago`,
    rating: i % 7 === 0 ? 4 : 5,
    service: services[i % services.length],
    text: texts[i % texts.length],
  };
});

const FEATURED_COUNT = 6;
const LOAD_BATCH = 3;

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-6 shadow-sm flex flex-col">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={review.avatarUrl} alt={review.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {review.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>

      <div className="mt-3">
        <StarRating rating={review.rating} />
      </div>

      <p className="mt-3 text-sm text-foreground flex-1">{review.text}</p>

      <Badge variant="secondary" className="mt-4 w-fit">
        {review.service}
      </Badge>
    </div>
  );
}

export default function GoogleReviewsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(LOAD_BATCH);
  const [showAll, setShowAll] = useState(false);

  const featured = reviews.slice(0, FEATURED_COUNT);
  const remaining = reviews.slice(FEATURED_COUNT);

  const average =
    Math.round(
      (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10,
    ) / 10;

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    // Reading the Embla API's current snapshot once it's ready, then
    // subscribing to its own change events — external-system sync, not
    // state derived from props/state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => onSelect(api));
    api.on("reInit", () => onSelect(api));
  }, [api, onSelect]);

  return (
    // Deliberately translucent, and NOT given an opaque background. The home
    // hero is sticky with the page as its parent, so it sits behind the whole
    // document - and this gradient lets it bleed through before fading to
    // solid. That is the effect on the-latam-painters' live site, checked
    // against it rather than the repo.
    //
    // Gradient matched to theirs: from-primary/5 via-background to-background.
    // Ours had via-primary/5 via-70%, which held the tint far longer and made
    // the photo behind it too strong to read over. primary is our blue, so the
    // tint follows the theme with no colour hardcoded.
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
      {/* soft decorative shapes for depth — spread across the section so it still
          reads as a tinted background even after "load more" grows the section */}
      <div className="pointer-events-none absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-[65%] -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-[65%] -right-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What our customers say
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <StarRating rating={Math.round(average)} />
            <span className="text-sm text-muted-foreground">
              {average} · {reviews.length}+ Google reviews
            </span>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="mt-10 w-full"
        >
          <CarouselContent>
            {featured.map((review, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Matched to the gallery slider's controls so every circular
              control on the site behaves the same: card background, border
              token, brand blue icon, and a hover that fills rather than
              nudging the colour. */}
          <CarouselPrevious className={`hidden sm:flex ${CONTROL}`} />
          <CarouselNext className={`hidden sm:flex ${CONTROL}`} />
        </Carousel>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to review slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                current === i ? "w-6 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {remaining.length > 0 && (
          <div className="mt-8 text-center">
            {/* Same pill as the services tab triggers: rounded-full, border
                token, card background, filling with brand blue on hover. */}
            <Button
              variant="outline"
              onClick={() => setShowAll((v) => !v)}
              className={PILL}
            >
              {showAll ? "Hide reviews" : `See all ${reviews.length} reviews`}
            </Button>
          </div>
        )}

        {showAll && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {remaining.slice(0, visibleCount).map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        )}

        {showAll && visibleCount < remaining.length && (
          <div className="mt-8 text-center">
            <Button
              variant="secondary"
              onClick={() => setVisibleCount((v) => v + LOAD_BATCH)}
              className={PILL}
            >
              Load more reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
