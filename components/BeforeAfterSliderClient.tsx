"use client";

import * as React from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderClientProps {
  beforeSlot: React.ReactNode;
  afterSlot: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  ariaLabel: string;
  initialPosition?: number;
  aspectClassName?: string;
  className?: string;
}

export function BeforeAfterSliderClient({
  beforeSlot,
  afterSlot,
  beforeLabel,
  afterLabel,
  ariaLabel,
  initialPosition = 50,
  aspectClassName = "aspect-[4/3]",
  className,
}: BeforeAfterSliderClientProps) {
  const [position, setPosition] = React.useState(initialPosition);

  return (
    <div
      className={cn(
        "relative w-full select-none overflow-hidden rounded-lg",
        aspectClassName,
        className,
      )}
    >
      {/* After image — full, bottom layer */}
      <div className="absolute inset-0">{afterSlot}</div>

      {/* Before image — clipped to the handle position, top layer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeSlot}
      </div>

      {/* Labels */}
      {beforeLabel && (
        <span
          className="pointer-events-none absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white transition-opacity"
          style={{ opacity: position > 12 ? 1 : 0 }}
        >
          {beforeLabel}
        </span>
      )}
      {afterLabel && (
        <span
          className="pointer-events-none absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white transition-opacity"
          style={{ opacity: position < 88 ? 1 : 0 }}
        >
          {afterLabel}
        </span>
      )}

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%` }}
      />

      {/* Native range input drives drag/touch/keyboard interaction and
          accessibility for free — invisible, but stretched over the full area.
          Must come before the handle in the DOM so peer-focus-visible reaches it. */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={ariaLabel}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:outline-none"
      />

      {/* Handle */}
      <div
        className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="h-4 w-4 text-neutral-700" />
      </div>
    </div>
  );
}
