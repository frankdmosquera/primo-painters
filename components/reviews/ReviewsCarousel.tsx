"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/**
 * The reviews carousel, ported from face-and-body components/home/ReviewsCarousel.tsx
 * on 2026-09-27. Cards in a loop, one control row underneath, pause on its own
 * line below that.
 *
 * ONE ROW OF CONTROLS. Not shadcn's `CarouselPrevious` and `CarouselNext`,
 * which position themselves absolutely outside the track and fight the page
 * gutters at every width. These are plain buttons driving the same `api`,
 * sitting in the flow with the dots.
 *
 * AUTOPLAY, five seconds. `stopOnInteraction` hands control over for good on
 * the first swipe, arrow or dot. Nothing should move a card out from under
 * someone reading it. The pause button is a WCAG 2.2.1 requirement for
 * content that moves on its own.
 *
 * ONLY THE SLIDING SHIPS TO THE BROWSER. The section that renders this is a
 * server component and hands the cards in as finished markup, so the review
 * text is in the HTML Google reads.
 */

export function ReviewsCarousel({ slides }: { slides: ReactNode[] }) {
  // Built once, via a lazy initialiser. Inline, a fresh plugin every render
  // restarts its own timer and the carousel never advances; in a ref, reading
  // .current during render trips the React compiler. State holds it properly.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(true);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    // Reading the Embla API's current snapshot once it is ready, then
    // subscribing to its own change events. External-system sync, not state
    // derived from props.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => onSelect(api));
    api.on("reInit", () => onSelect(api));
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    // The plugin stops itself on the first swipe, so the button has to read
    // its state rather than assume it.
    const sync = () => setPlaying(autoplay.isPlaying());
    sync();
    api.on("autoplay:play", sync);
    api.on("autoplay:stop", sync);
    api.on("reInit", sync);
  }, [api, autoplay]);

  // Neutral at rest, gold on hover. Gold at rest put four accent circles
  // under every card and pulled the eye off the reviews.
  const control =
    "grid size-9 shrink-0 place-items-center rounded-full border border-on-dark/25 text-on-dark/70 transition-colors hover:border-accent hover:text-accent focus-visible:ring-3 focus-visible:ring-accent/50 focus-visible:outline-none";

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[autoplay]}
        className="mt-10 w-full"
      >
        <CarouselContent className="items-stretch">
          {slides.map((slide, i) => (
            // One card on a phone, two from md, and never three. Face-and-body
            // goes to three at xl because it has eight cards. Primo has three,
            // and three per view would show them all at once with nothing to
            // slide. Two keeps the carousel a carousel.
            <CarouselItem key={i} className="md:basis-1/2">
              {slide}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation: back, position, forward. Every target is at least 36px
          of clickable area even though a dot reads as 6px. The visible dot is
          an inner span and the padding around it is the target. */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous review"
          className={control}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>

        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={current === i}
              className="grid h-9 w-5 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  current === i
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-on-dark/30 hover:bg-on-dark/60",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next review"
          className={control}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>

      {/* On its own centred line, below the navigation. It governs the whole
          section rather than moving one card, and on the end of that row it
          read as a fourth navigation control. */}
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => {
            // Branch on our own state, not autoplay.isPlaying(): that reports
            // stale on the same tick and reports false in a background tab
            // even right after play(), so both made the button need two
            // presses. The listeners above reconcile if the plugin stops on
            // its own.
            if (playing) {
              autoplay.stop();
              setPlaying(false);
            } else {
              autoplay.play();
              setPlaying(true);
            }
          }}
          aria-label={playing ? "Pause the reviews" : "Play the reviews"}
          className={control}
        >
          {playing ? (
            <Pause aria-hidden="true" className="size-3.5 fill-current" />
          ) : (
            <Play
              aria-hidden="true"
              className="size-3.5 translate-x-px fill-current"
            />
          )}
        </button>
      </div>
    </>
  );
}
