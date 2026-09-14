"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

// lucide, not heroicons. heroicons came out in the teardown and CLAUDE.md
// names lucide as the icon library. Aliased to the old names so the four use
// sites below did not have to change.
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

/**
 * One definition for all three controls, so they cannot drift apart. The
 * hover fills the circle rather than nudging the icon's blue a shade darker,
 * which is what the old hover:text-blue-800 did - technically a hover, but
 * invisible in practice.
 */
const CONTROL =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95";

interface ProjectSliderWrapperProps {
  children: ReactNode[];
}

export default function ProjectSliderWrapper({
  children,
}: ProjectSliderWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const numberOfSlides = children.length;

  // Mobile vs Desktop Detector
  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024); // Up to iPad width can drag
      };

      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  }

  const isMobile = useIsMobile();

  // Drag scrolling for mobile
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const totalScrollWidth = container.scrollWidth - container.clientWidth;
    const scrollLeft = container.scrollLeft;

    const scrollPercent = (scrollLeft / totalScrollWidth) * 100;
    const stepSize = 100 / numberOfSlides;

    const step = Math.min(
      Math.floor(scrollPercent / stepSize),
      numberOfSlides - 1,
    );

    setCurrentStep(step);
  };

  const scrollToStep = (step: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const slideWidth = container.scrollWidth / numberOfSlides;
    container.scrollTo({
      left: slideWidth * step,
      behavior: "smooth",
    });
  };

  // Play / Pause for desktop
  const togglePlay = () => {
    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
      setIsPlaying(false);
    } else {
      const interval = setInterval(() => {
        handleNext();
      }, 2500); // every 4 seconds
      playIntervalRef.current = interval;
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (isMobile) {
      // Mobile: scroll previous
      scrollToStep(Math.max(currentStep - 1, 0));
    } else {
      // Desktop: fade previous
      setCurrentStep((prev) => (prev - 1 + numberOfSlides) % numberOfSlides);
    }
  };

  const handleNext = () => {
    if (isMobile) {
      // Mobile: scroll next
      scrollToStep(Math.min(currentStep + 1, numberOfSlides - 1));
    } else {
      // Desktop: fade next
      setCurrentStep((prev) => (prev + 1) % numberOfSlides);
    }
  };

  return (
    <div className="w-full relative">
      <div className="w-full">
        {/* DESKTOP FADE VERSION */}
        {/* aspect-[3/2] rather than a fixed h-[25rem]. A hard 400px forced
            every photo into the same letterbox whatever its shape, so tall
            rooms and wide rooms were both cropped to the same strip. rounded
            to match the mobile slides, which are already rounded-2xl - the
            desktop one was the only square-cornered image on the page. */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black/5">
          {children.map((child, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentStep ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {child}
            </div>
          ))}
        </div>

        {/*
          These were bare SVGs carrying onClick. Three problems: a 36px icon
          floating in white space with nothing to press, a hover that only went
          from one blue to a slightly darker blue so it read as nothing, and no
          keyboard access at all, because an svg is not a button.

          Now real buttons: a 40px circle each, centred in their own row, with
          a hover that fills, a focus ring, and an aria-label.
        */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className={CONTROL}
          >
            <ArrowLeftIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            // mx-2 so play/pause is separated from the two arrows rather than
            // reading as the middle of three identical buttons.
            className={`${CONTROL} mx-2`}
          >
            {isPlaying ? (
              <PauseIcon className="size-4" />
            ) : (
              <PlayIcon className="size-4" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className={CONTROL}
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
