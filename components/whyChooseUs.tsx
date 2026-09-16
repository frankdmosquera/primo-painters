import WorkmanshipIcon from "./AboutUs/WorkmanshipIcon";
import TeamIcon from "./AboutUs/TeamIcon";
import LicensedIcon from "./AboutUs/LicensedIcon";
import BgBackground from "./BgBackground";
import FivestarIcon from "./AboutUs/FivestarIcon";

// The four icons are hand rolled SVGs carrying their own width and height
// attributes, and they disagree: 61 or 63 wide, with the drawing sitting at a
// different place inside each viewBox. Rather than edit four files, every icon
// gets the same box here. h-full on the child overrides the baked in
// attributes, and items-end drops them onto a common baseline, which is what
// makes a mismatched set read as a set.
// h-10, not the h-14 this carried. At 56px in a bare column the icons were
// the largest thing in the section and had no box to belong to, so they read
// as floating rather than as part of a card.
const ICON_BOX =
  "mb-4 flex h-10 items-end text-primary [&>svg]:h-full [&>svg]:w-auto";

/**
 * Content lives here rather than in the markup, which is the-latam-painters'
 * pattern and what CLAUDE.md asks for: a new client is a new data file, not a
 * new component.
 *
 * These four headings and four paragraphs are recorded in scripts/seo-baseline
 * on a page that ranks. They are moved, not rewritten - byte for byte what was
 * in the JSX before.
 */
const reasons = [
  {
    Icon: WorkmanshipIcon,
    title: "Small Local Team",
    body: "As a locally owned Calgary business, we take on a limited number of projects so every home receives the attention it deserves.",
  },
  {
    Icon: FivestarIcon,
    title: "Superior Workmanship",
    body: "From careful preparation to clean lines and smooth finishes, we take pride in delivering results that look great and last.",
  },
  {
    Icon: LicensedIcon,
    title: "Reliable & Professional",
    body: "We show up on time, protect your home, keep the workspace clean, and complete projects efficiently with clear communication throughout.",
  },
  {
    Icon: TeamIcon,
    title: "Respect for Your Home",
    body: "We protect your floors, furniture, and belongings while maintaining a clean workspace from start to finish, treating your home with the care it deserves.",
  },
];

export default function WhyChooseUs() {
  return (
    // LATAM's section rhythm, py-16 md:py-24, and their bg-background rather
    // than the hardcoded #E2E7F1 this carried. Every #0D378D in this file is
    // now text-primary, so the section follows the theme instead of pinning
    // its own copy of the brand blue.
    <section className="relative w-full bg-background py-16 md:py-24">
      {/* Decorative only. The offset stays in px on purpose: it is measured
          against the graphic's own pixel geometry, so in rem it would drift
          away from what it is anchoring to as soon as the root size changed. */}
      <div className="absolute top-[-490px]">
        <BgBackground />
      </div>

      {/* --site-max and the same px scale as the header and the hero, so the
          page keeps one edge all the way down instead of each section picking
          its own. This was max-w-[51rem], which sat 464px narrower than the
          header above it. */}
      <div className="relative mx-auto w-full max-w-[var(--site-max)] px-4 sm:px-6 lg:px-8">
        {/* Centred, and their type scale. Primo's own comment here used to say
            the heading was deliberately left aligned to match House Painting
            Services, Reviews and the FAQ - but those sections are being ported
            to LATAM too, so the thing it was matching is going away. */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          WHY HOMEOWNERS CHOOSE PRIMO PAINTERS
        </h2>
        <p className="mx-auto mt-4 mb-12 max-w-[60ch] text-center text-muted-foreground">
          We&apos;re committed to delivering a painting experience that&apos;s
          as exceptional as the finished result.
        </p>

        {/* One, two, then four. This used to say "two columns, never four",
            written when the section was capped at 51rem - four columns there
            gave each card 15.75rem, about 30 characters a line, against copy
            that wants 45 to 75. At --site-max the row is 464px wider, so four
            is worth having.

            Three is still not an option: with four items it always leaves a
            ragged 3 + 1. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {reasons.map(({ Icon, title, body }) => (
            // LATAM's card treatment, taken from their services section:
            // rounded-2xl, a border token, bg-card and a soft shadow. The card
            // is what gives the icon somewhere to sit.
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 text-start shadow-sm"
            >
              <div className={ICON_BOX}>
                <Icon />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-primary">
                {title}
              </h3>
              <p className="text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
