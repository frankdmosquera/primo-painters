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
const ICON_BOX =
  "mb-4 flex h-14 items-end text-[#0D378D] [&>svg]:h-full [&>svg]:w-auto";

export default function WhyChooseUs() {
  return (
    // px grows with the screen instead of shrinking. It used to be px-10 with
    // lg:px-4, so a 375px phone gave up a fifth of its width while a desktop
    // kept almost all of its own, and the 768 to 1023 band got two columns
    // still carrying the widest padding on the site. That band was the worst
    // looking part of the section.
    <section className="relative bg-[#E2E7F1] px-5 py-20 sm:px-6 lg:px-8">
      {/* Decorative only. The offset stays in px on purpose: it is measured
          against the graphic's own pixel geometry, so in rem it would drift
          away from what it is anchoring to as soon as the root size changed. */}
      <div className="absolute top-[-490px]">
        <BgBackground />
      </div>
      <div className="mx-auto max-w-[51rem]">
        <h2 className="text-[clamp(1.5625rem,3.2vw,2.25rem)] font-bold text-[#0D378D]">
          WHY HOMEOWNERS CHOOSE PRIMO PAINTERS
        </h2>
        {/* Left, like House Painting Services, Reviews, the Calgary block and
            the FAQ. This section used to centre its heading while leaving the
            paragraph left, which is the mismatch that stood out. The closing
            CTA stays centred on purpose and is the only centred block here. */}
        <p className="mt-4 mb-12 max-w-[60ch] text-[#0D378D]">
          We're committed to delivering a painting experience that's as
          exceptional as the finished result.
        </p>
        {/* Two columns, never four. Four capped each card at 15.75rem, roughly
            30 characters a line, and the copy here is paragraphs that want 45
            to 75. Three is not an option either: with four items it always
            leaves a ragged 3 + 1. So the card width is the thing being chosen
            and the column count follows from it, rather than the other way
            round. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-[repeat(2,minmax(0,24rem))] lg:gap-x-12">
          {/* Local owned */}
          <div className="flex flex-col text-start">
            <div className={ICON_BOX}>
              <WorkmanshipIcon />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#0D378D]">
              Small Local Team
            </h3>
            <p className="text-black">
              As a locally owned Calgary business, we take on a limited number
              of projects so every home receives the attention it deserves.
            </p>
          </div>

          {/* Quality Workmanship*/}
          <div className="flex flex-col">
            <div className={ICON_BOX}>
              <FivestarIcon />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#0D378D]">
              Superior Workmanship
            </h3>
            <p className="text-black">
              From careful preparation to clean lines and smooth finishes, we
              take pride in delivering results that look great and last.
            </p>
          </div>

          {/* Customer Satisfaction */}
          <div className="flex flex-col">
            {/* was text-blue, which is not a class Tailwind emits */}
            <div className={ICON_BOX}>
              <LicensedIcon />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#0D378D]">
              Reliable & Professional
            </h3>
            <p className="text-black">
              We show up on time, protect your home, keep the workspace clean,
              and complete projects efficiently with clear communication
              throughout.
            </p>
          </div>

          {/* Honest Pricing */}
          {/* <div className="flex flex-col ">
            <div className={ICON_BOX}>
              <TeamIcon />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#0D378D]">
              Honest Competitive Pricing
            </h3>
            <p className=" text-black">
              No inflated estimates or unnecessary upselling. We provide fair
              pricing, detailed quotes, and excellent value for professional
              interior painting.
            </p>
          </div> */}

          {/* Respect for Your Home */}
          <div className="flex flex-col">
            <div className={ICON_BOX}>
              <TeamIcon />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[#0D378D]">
              Respect for Your Home
            </h3>
            <p className="text-black">
              We protect your floors, furniture, and belongings while
              maintaining a clean workspace from start to finish, treating your
              home with the care it deserves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
