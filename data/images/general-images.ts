// Logo
// Logo

export const logoImg = {
  // 400x282, 42KB. The one logo, used everywhere: header, footer, the
  // transactional email and the Organization logo in siteConfig. Nothing on
  // the site renders it wider than about 180px.
  //
  // The 1225x864 original at 1036KB now sits in public/_unused/duplicates/.
  // The footer served it until 2026-09-16, for a 176px slot.
  src: "/primo-painters-logo-400.png",
  alt: "Primo Painters Calgary logo",
};

// BgBackgrounds
// BgBackgrounds
export const BgBackgroundImg = {
  src: "/SVGs/backgrounds/about-background-vector-line.svg",
  alt: "",
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
  src: "/general/home-hero-img.jpg",
  alt: "Open plan Calgary kitchen and living room with freshly painted cabinetry and trim",
};

export const AboutUsImg = {
  src: "/general/AboutUs.webp",
  alt: "Bright living room with a white coffered ceiling and painted staircase",
};

/**
 * Our Story's photo, separate from the hero's.
 *
 * Both sections used to import AboutUsImg, so /general/AboutUs.webp rendered
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
  alt: "Curved Calgary staircase after painting, white risers and stringer against a blue-grey feature wall",
};

// GallerySection Images
// GallerySection Images
// GallerySection Images

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

