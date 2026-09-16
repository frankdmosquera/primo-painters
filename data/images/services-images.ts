// The six services, as shown in the homepage tabs.
//
// Each array is one service subfolder under public/interior-painting/.
// data/serviceData.ts reads these and nothing else.
//
// One rule holds across both files: a given path carries one alt text. If
// /interior-painting/garage-painting/gar-img-3.jpg appears here and in
// services-images.ts, it reads the same in both. The path names the photo;
// the alt describes that photo.

export type ImageEntry = {
  src: string;
  alt: string;
};

export const GalleryInteriorImages = [
  {
    src: "/interior-painting/strathmoore-railing-prior-to-painting.jpg",
    alt: "Stained oak stair railing on a curved Calgary staircase, before painting",
  },
  {
    src: "/interior-painting/strathmoore-railing-after-painting.jpg",
    alt: "Curved Calgary staircase after painting, white risers and stringer against a blue-grey feature wall",
  },
  {
    src: "/interior-painting/long-wall-before-painted.png",
    alt: "A long office wall carrying its old green zigzag graphic, before repainting",
  },
  {
    src: "/interior-painting/long-wall-after-painted.webp",
    alt: "The same wall repainted as a layered mountain mural in three blues",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-3.jpg",
    alt: "Stairwell wall patched and sanded, outlets and baseboards masked off",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-4.webp",
    alt: "The same stairwell finished in warm beige with white trim and newel posts",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-9.jpg",
    alt: "Stained oak built-ins, arched alcoves and a fireplace mantel before painting",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-10.jpg",
    alt: "The same built-ins and mantel in cream",
  },
  {
    src: "/interior-painting/drywall-repair/garage-drywall-repair-calgary.jpg",
    alt: "Garage wall opened up for drywall repair, studs, insulation and plumbing exposed",
  },
  {
    src: "/interior-painting/drywall-repair/garage-drywall-repair-calgary-after-finished.jpg",
    alt: "The same wall patched, taped and painted",
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
    alt: "Wall patched and sanded, ready for paint",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-2.jpg",
    alt: "Open plan Calgary kitchen and dining area with freshly painted white walls",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-3.jpg",
    alt: "Stairwell wall patched and sanded, outlets and baseboards masked off",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-4.webp",
    alt: "The same stairwell finished in warm beige with white trim and newel posts",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-5.jpg",
    alt: "Kitchen wall filled and patched before painting",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-6.jpg",
    alt: "The same kitchen wall, smooth and evenly covered",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-7.jpg",
    alt: "Wall repaired and sanded beside a window",
  },
  {
    src: "/interior-painting/wall-painting/wall-img-8.jpg",
    alt: "Bedroom wall in soft grey with clean baseboard lines",
  },
];

export const ceilingPaintingImages = [
  {
    src: "/interior-painting/ceiling-painting/ceiling-preparation-for-spray-painting-the-ceilings_mtajyu.jpg",
    alt: "Open plan kitchen and living room masked for ceiling spraying, pot lights bagged",
  },
  {
    src: "/interior-painting/ceiling-painting/20220605_151407_nzvz8d.webp",
    alt: "Living room ceiling sprayed white, the room fully draped",
  },
  {
    src: "/interior-painting/ceiling-painting/20171009_150601.jpg",
    alt: "Freshly sprayed white ceiling over a Calgary kitchen",
  },
  {
    src: "/interior-painting/ceiling-painting/20171009_152317.jpg",
    alt: "The same ceiling seen from the living room side",
  },
  {
    src: "/interior-painting/ceiling-painting/PXL_20230923_210821437.jpg",
    alt: "Kitchen masked up to a cedar plank feature ceiling",
  },
  {
    src: "/interior-painting/ceiling-painting/PXL_20230923_215021422.jpg",
    alt: "Kitchen ceiling sprayed white, cabinets paper banded",
  },
  {
    src: "/interior-painting/ceiling-painting/PXL_20230923_222428881.jpg",
    alt: "The same ceiling with the bulkhead masked off",
  },
];

export const cabinetPaintingImages = [
  {
    src: "/interior-painting/cabinet-painting/cab-img-1.jpg",
    alt: "Dark espresso kitchen cabinets before painting",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-2.jpg",
    alt: "Cabinet doors off and frames masked, ready to spray",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-3.jpg",
    alt: "Kitchen cabinetry and island primed white, mid job",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-4.jpg",
    alt: "The finished kitchen, cabinets in white with a sage green island",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-5.jpg",
    alt: "Near black raised panel cabinets before painting",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-6.jpg",
    alt: "The same frames sprayed white with the doors off",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-7.jpg",
    alt: "Finished cabinets in white with glass front uppers",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-8.jpg",
    alt: "The peninsula of the same kitchen, finished in white",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-9.jpg",
    alt: "Honey oak on one side, white painted cabinets on the other",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-10.jpg",
    alt: "Stained walnut on one side, grey painted cabinets on the other",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-11.jpg",
    alt: "Six painted cabinet door samples, taupe through to navy",
  },
  {
    src: "/interior-painting/cabinet-painting/cab-img-12.jpg",
    alt: "An oak kitchen and the same cabinets painted grey",
  },
];

export const trimAndDoorPaintingImages = [
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-1.jpg",
    alt: "Stained wood stair railing with the stairs masked off",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-2.jpg",
    alt: "Stairwell mid job, the upper railing white and the lower still stained",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-3.webp",
    alt: "Finished stair railing in white, turned spindles and newel posts",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-4.jpg",
    alt: "A painter spraying a stair railing in a Calgary home, spindles half stained and half white",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-5.jpg",
    alt: "Dark stained panelling, built-ins and fireplace surround before painting",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-6.jpg",
    alt: "The same panelling and mantel finished in white",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-7.jpg",
    alt: "Dark stained mantel and surround masked off, ready to paint",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-8.jpg",
    alt: "The same mantel painted white, firebox still masked",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-9.jpg",
    alt: "Stained oak built-ins, arched alcoves and a fireplace mantel before painting",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-10.jpg",
    alt: "The same built-ins and mantel in cream",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-11.jpg",
    alt: "Entry door, sidelights and trim painted white, stair railing draped",
  },
  {
    src: "/interior-painting/trim-and-door-painting/tnd-img-12.jpg",
    alt: "Interior doors painted white, glass panels masked",
  },
];

export const garagePaintingImages = [
  {
    src: "/interior-painting/garage-painting/gar-img-1.webp",
    alt: "Garage walls and ceiling in taped and filled drywall",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-2.jpg",
    alt: "Garage ceiling before paint, seams taped and filled",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-3.jpg",
    alt: "Filled drywall across a garage wall and ceiling",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-4.webp",
    alt: "Two painters rolling out a Calgary garage wall, floor sheeted",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-5.webp",
    alt: "The same garage with the walls and ceiling painted",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-6.jpg",
    alt: "Finished garage ceiling and bulkhead in smooth white",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-7.jpg",
    alt: "Finished garage wall in warm grey, house door and trim in white",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-8.jpg",
    alt: "Freshly painted white garage stairwell",
  },
  {
    src: "/interior-painting/garage-painting/gar-img-9.webp",
    alt: "Painted garage steps, grey treads with cream risers and a white handrail",
  },
];
