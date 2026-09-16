// The three real jobs on /projects.
//
// Only jobs live here. The six service galleries reach /projects through the
// map in data/projectsData.ts, which reads them from data/serviceData.ts.
// They are not copied.
//
// A given path carries one alt text wherever it appears.

export type ImageEntry = {
  src: string;
  alt: string;
};


export const darkKitchenCabinetsImages = [
  {
    src: "/projects/dark-kitchen-cabinets-painted-white/kitchen-cabinets-after-painted-white.jpg",
    alt: "Calgary kitchen cabinets painted white, with granite counters and stainless wall ovens",
  },
  {
    src: "/projects/dark-kitchen-cabinets-painted-white/kitchen-cabinets-before-dark-espresso.jpg",
    alt: "The same kitchen in dark espresso, against a cream tile backsplash",
  },
];

export const bearspawBuiltInsImages = [
  {
    src: "/projects/built-ins-and-panelling-bearspaw/built-ins-painted-white-glass-doors.jpg",
    alt: "Built-in cabinetry in white with glass front doors, beside a navy front door",
  },
  {
    src: "/projects/built-ins-and-panelling-bearspaw/sunroom-doors-and-trim-painted-white.jpg",
    alt: "Sunroom doors and window frames in white, under a stained wood slat ceiling",
  },
];

export const garageDrywallImages = [
  {
    src: "/projects/garage-drywall-painted-white/garage-after-painted-white.jpg",
    alt: "Garage walls and ceiling painted white",
  },
  {
    src: "/projects/garage-drywall-painted-white/garage-before-bare-taped-drywall.jpg",
    alt: "The same garage in bare drywall, seams taped and mudded",
  },
];
