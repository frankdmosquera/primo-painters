// Logo
// Logo

export const logoImg = {
  // 400x282, 42KB. The original 1225x864 at 1036KB is still on disk as
  // primo-painters-logo.png. Nothing on the site renders it wider than about
  // 140px, so the extra 994KB was never reaching anyone usefully.
  src: "/primo-painters-logo-400.png",
  alt: "Primo Painters Calgary - logo",
};

// BgBackgrounds
// BgBackgrounds
export const BgBackgroundImg = {
  src: "/SVGs/about-background-vector-line.svg",
  alt: "hero showcase image - house painting calgary",
};

// HERO IMAGES
// HERO IMAGES
// The after shot of the living room in tnd-img-9, which now sits behind the
// service banner. Exterior siding used to sit here, under an H1 reading
// INTERIOR HOUSE PAINTERS.
/**
 * Primo's hero. Settled 2026-09-15: the photo stays and it is Primo's, whatever
 * its route onto the site was.
 *
 * The alt was rewritten at the same time to describe what is actually in the
 * frame. It used to read "Living room built-ins and mantel painted cream",
 * which described a different photo and had survived the swap.
 *
 * alt text is tracked by scripts/seo-baseline on a page that ranks, so this
 * line is a content change, not a tidy up. It was made deliberately.
 *
 * tnd-img-10.jpg, the photo that used to be here, is still on disk.
 */
export const HeroHomeImg = {
  src: "/images/home-hero-img.jpg",
  alt: "Open plan kitchen and living room with painted cabinetry and trim - interior painting Calgary",
};

export const AboutUsImg = {
  src: "/about/AboutUs.webp",
  alt: "calgary painters",
};

/**
 * Our Story's photo, separate from the hero's.
 *
 * Both sections used to import AboutUsImg, so /about/AboutUs.webp rendered
 * twice on the same page - full bleed behind the hero, then again 500px down
 * as the Our Story image. The hero darkens it with brightness-70 and a black
 * overlay, which is the only reason it was not obvious.
 *
 * This is a real Primo job rather than a staged shot, and it shows the crisp
 * trim and clean lines the Our Story copy claims. The same photo appears in
 * GalleryInteriorImages below, so it is reused across the site but no longer
 * twice on one page.
 */
export const OurStoryImg = {
  src: "/interior-painting/strathmoore-railing-after-painting.jpg",
  alt: "Curved staircase with white risers and crisp white trim against a blue feature wall, after painting - interior painting Calgary",
};

// GallerySection Images
// GallerySection Images
// GallerySection Images

export const GalleryInteriorImages = [
  {
    src: "/interior-painting/strathmoore-railing-prior-to-painting.jpg",
    alt: "stained oak railing prior to being painted white  - railing painting calgary",
  },
  {
    src: "/interior-painting/strathmoore-railing-after-painting.jpg",
    alt: "stained oak railing after being painted white  - railing painting calgary",
  },
  {
    src: "/interior-painting/long-wall-before-painted.png",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/long-wall-after-painted.webp",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-3.jpg",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-4.webp",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-9.jpg",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-10.jpg",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/drywall-repair/garage-drywall-repair-calgary.jpg",
    alt: "interior painting calgary",
  },
  {
    src: "/interior-painting/drywall-repair/garage-drywall-repair-calgary-after-finished.jpg",
    alt: "interior painting calgary",
  },
  // {
  //   src: "/gallery3.png",
  //   alt: "Oak unit prior to being painted white - cabinet painting calgary",
  // },
  // {
  //   src: "/galleryHome-4.webp",
  //   alt: "Oak unit after being painted white - cabinet painting calgary",
  // },
  // {
  //   src: "/drywall-repair/garage-drywall-repair-calgary.jpg",
  //   alt: "",
  // },
  // {
  //   src: "/drywall-repair/garage-drywall-repair-calgary-after-finished.jpg.jpg",
  //   alt: "",
  // },
  // {
  //   src: "/interior/ourServices3.png",
  //   alt: "",
  // },
  // {
  //   src: "/interior/commercial-painting-project-downtown-paint-finished.webp",
  //   alt: "",
  // },
];

export const wallPaintingImages = [
  {
    src: "/interior-painting/wall-painting/wall-img-1.jpg",
    alt: "wall patched and sanded ready for paint - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-2.jpg",
    alt: "freshly painted white walls in an open plan kitchen and dining area - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-3.jpg",
    alt: "wall part painted with outlets and trim masked off - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-4.webp",
    alt: "stairwell walls painted white beside a black iron railing - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-5.jpg",
    alt: "kitchen wall filled and patched before painting - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-6.jpg",
    alt: "the same kitchen wall after painting, smooth and evenly covered - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-7.jpg",
    alt: "wall repaired and sanded beside a window before painting - wall painting calgary",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-8.jpg",
    alt: "bedroom wall painted soft grey with clean baseboard lines - wall painting calgary",
  },
];

export const ceilingPaintingImages = [
  {
    src: "/interior-painting/ceiling-painting/ceiling-preparation-for-spray-painting-the-ceilings_mtajyu.jpg",
    alt: "ceiling painting calgary - open plan kitchen and living room masked for spraying, pot lights bagged and walls sheeted - Primo Painters",
  },
  {
    src: "/interior-painting/ceiling-painting/20220605_151407_nzvz8d.webp",
    alt: "calgary interior house painting - living room ceiling sprayed white with the room fully draped - Primo Painters",
  },
  {
    src: "/interior-painting/ceiling-painting/20171009_150601.jpg",
    alt: "ceiling painting calgary - freshly sprayed white ceiling over a kitchen, pot lights bagged - Primo Painters",
  },
  {
    src: "/interior-painting/ceiling-painting/20171009_152317.jpg",
    alt: "ceiling spraying calgary - the same sprayed white ceiling from the living room side - Primo Painters",
  },
  {
    src: "/interior-painting/ceiling-painting/PXL_20230923_210821437.jpg",
    alt: "calgary interior house painters - kitchen masked up to a cedar plank feature ceiling before spraying - Primo Painters",
  },
  {
    src: "/interior-painting/ceiling-painting/PXL_20230923_215021422.jpg",
    alt: "ceiling painting calgary - kitchen ceiling sprayed white with the cabinets paper banded - Primo Painters",
  },
  {
    src: "/interior-painting/ceiling-painting/PXL_20230923_222428881.jpg",
    alt: "ceiling spraying calgary - the same sprayed ceiling with the bulkhead masked off - Primo Painters",
  },
];
export const cabinetPaintingImages = [
  {
    src: "/interior-painting/cabinet-painting/cab-img-1.jpg",
    alt: "cabinet painting calgary - dark espresso kitchen cabinets before painting - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-2.jpg",
    alt: "cabinet spraying calgary - kitchen cabinets masked off, doors removed and frames exposed, ready to spray - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-3.jpg",
    alt: "cabinet painting calgary - kitchen cabinetry and island primed white mid job - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-4.jpg",
    alt: "calgary interior house painting - the same kitchen cabinets finished in white with a sage green island - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-5.jpg",
    alt: "cabinet painting calgary - near black raised panel kitchen cabinets before painting - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-6.jpg",
    alt: "cabinet spraying calgary - the same cabinet frames sprayed white with the doors off - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-7.jpg",
    alt: "calgary interior house painters - the finished kitchen cabinets in white with glass front uppers - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-8.jpg",
    alt: "kitchen cabinet painting calgary - the peninsula of the same kitchen finished in white - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-9.jpg",
    alt: "cabinet painting calgary - before and after of a kitchen, honey oak on one side and white painted cabinets on the other - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-10.jpg",
    alt: "cabinet refinishing calgary - before and after of a kitchen, stained walnut on one side and grey painted cabinets on the other - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-11.jpg",
    alt: "calgary interior house painting - cabinet colour options with six painted door samples from taupe to navy - Primo Painters",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-12.jpg",
    alt: "cabinet painting calgary - before and after of an oak kitchen with the same cabinets painted grey - Primo Painters",
  },
];

export const trimAndDoorPaintingImages = [
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-1.jpg",
    alt: "trim and door painting calgary - stained wood stair railing before painting, with the stairs masked off - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-2.jpg",
    alt: "railing painting calgary - stairwell mid job, the upper railing painted white and the lower still stained - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-3.webp",
    alt: "railing painting calgary - finished stair railing in white, turned spindles and newel posts - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-4.jpg",
    alt: "calgary interior house painters - a painter spraying a stair railing, the spindles half stained and half white - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-5.jpg",
    alt: "trim and door painting calgary - dark stained panelling, built-ins and fireplace surround before painting - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-6.jpg",
    alt: "calgary interior house painting - the same panelling, built-ins and mantel finished in white - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-7.jpg",
    alt: "fireplace mantel painting calgary - dark stained mantel and surround masked off ready to paint - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-8.jpg",
    alt: "trim and door painting calgary - the same fireplace mantel painted white with the firebox still masked - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-9.jpg",
    alt: "trim and door painting calgary - stained oak built-in wall with arched alcoves and a fireplace mantel before painting - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-10.jpg",
    alt: "calgary interior house painting - the same built-ins and mantel painted cream - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-11.jpg",
    alt: "door painting calgary - entry door, sidelights and trim painted white with the stair railing draped - Primo Painters",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-12.jpg",
    alt: "door painting calgary - interior doors painted white, glass panels masked and a painter at work - Primo Painters",
  },
];

export const garagePaintingImages = [
  {
    src: "/interior-painting/garage-painting/gar-img-1.webp",
    alt: "garage painting calgary - garage walls and ceiling in taped and filled drywall before painting - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-2.jpg",
    alt: "garage drywall painting calgary - garage ceiling before paint, drywall seams taped and filled - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-3.jpg",
    alt: "garage painting calgary - garage walls and ceiling in filled drywall before painting - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-4.webp",
    alt: "calgary interior house painters - two painters rolling out a garage wall with the floor sheeted - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-5.webp",
    alt: "garage painting calgary - the same garage with the walls and ceiling painted - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-6.jpg",
    alt: "calgary interior house painting - finished garage ceiling and bulkhead painted smooth white - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-7.jpg",
    alt: "garage painting calgary - finished garage wall in warm grey with the house door and trim in white - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-8.jpg",
    alt: "garage painting calgary - freshly painted white garage stairwell - Primo Painters",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-9.webp",
    alt: "calgary interior house painting - painted garage steps, grey treads with cream risers and a white handrail - Primo Painters",
  },
];

// PROJECT GALLERIES
// PROJECT GALLERIES
//
// One array per job, unlike the service arrays above which are one per service.
// Sources are the raw job folders outside the repo; only the photos that
// actually show finished work were copied in, and the originals were left where
// they are.
//
// The after shot is first in every array, because the first entry is the card's
// thumbnail. look-into.md item 18 records what happens otherwise: the interiors
// tab opens on an unpainted railing.
//
// Alt describes the frame. It does not repeat the project title, and it does
// not claim anything about products or process that is not visible.

export const darkKitchenCabinetsImages = [
  {
    src: "/projects/dark-kitchen-cabinets-painted-white/kitchen-cabinets-after-painted-white.jpg",
    alt: "Kitchen with cabinets painted white, granite counters, glass-front upper cabinets and stainless wall ovens, after painting",
  },
  {
    src: "/projects/dark-kitchen-cabinets-painted-white/kitchen-cabinets-before-dark-espresso.jpg",
    alt: "The same kitchen before painting, with dark espresso-stained cabinets against a cream tile backsplash",
  },
];

export const bearspawBuiltInsImages = [
  {
    src: "/projects/built-ins-and-panelling-bearspaw/built-ins-painted-white-glass-doors.jpg",
    alt: "Built-in cabinetry painted white with glass-front doors, beside a white panelled hallway and a navy front door",
  },
  {
    src: "/projects/built-ins-and-panelling-bearspaw/sunroom-doors-and-trim-painted-white.jpg",
    alt: "Sunroom doors and window frames painted white beneath a stained wood slat ceiling",
  },
];

export const garageDrywallImages = [
  {
    src: "/projects/garage-drywall-painted-white/garage-after-painted-white.jpg",
    alt: "Garage interior with the drywall painted white, after painting",
  },
  {
    src: "/projects/garage-drywall-painted-white/garage-before-bare-taped-drywall.jpg",
    alt: "The same garage before painting, with bare drywall and taped, mudded seams",
  },
];
