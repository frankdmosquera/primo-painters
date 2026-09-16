import Image from "next/image";
import { BeforeAfterSliderClient } from "./BeforeAfterSliderClient";

interface BeforeAfterSliderProps {
  /** Path/URL to the "before" image */
  beforeImage: string;
  /** Path/URL to the "after" image */
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Optional small tag shown over each side, e.g. "Before" / "After" */
  beforeLabel?: string;
  afterLabel?: string;
  /** Starting handle position, 0–100 (default 50 = centered) */
  initialPosition?: number;
  /** Tailwind aspect-ratio class for the container, e.g. "aspect-[4/3]" */
  aspectClassName?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel,
  afterLabel,
  initialPosition = 50,
  aspectClassName = "aspect-[4/3]",
  className,
}: BeforeAfterSliderProps) {
  return (
    <BeforeAfterSliderClient
      beforeLabel={beforeLabel}
      afterLabel={afterLabel}
      ariaLabel={`Comparison slider between ${beforeAlt.toLowerCase()} and ${afterAlt.toLowerCase()}`}
      initialPosition={initialPosition}
      aspectClassName={aspectClassName}
      className={className}
      afterSlot={
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
          draggable={false}
        />
      }
      beforeSlot={
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
          draggable={false}
        />
      }
    />
  );
}
