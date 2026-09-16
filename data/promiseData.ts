// Our Promise content. It lives here rather than in the component because the
// site is a template: a new client is a new data file, not a new component.
//
// Copy is unchanged, word for word, from what was hardcoded in
// components/AboutUs/OurPromise.tsx. This page ranks, so nothing here is
// rewritten.

export type Promise = {
  title: string;
  description: string;
};

export const promiseEyebrow = "Our Promise";
export const promiseHeading = "What You Can Expect From Every Project";
export const promiseIntro =
  "Every project completed by Primo Painters reflects our commitment to delivering professional interior painting services Calgary homeowners can rely on.";

export const promises: Promise[] = [
  {
    title: "Honest Communication",
    description:
      "From your first estimate to the final walkthrough, we keep you informed every step of the way with clear expectations and no surprises.",
  },
  {
    title: "Respect for Your Home",
    description:
      "We treat your home with the same care we would our own by protecting your floors, furniture, and belongings while maintaining a clean workspace.",
  },
  {
    title: "Meticulous Workmanship",
    description:
      "Preparation, clean lines, smooth finishes, and attention to detail are at the heart of every project we complete.",
  },
  {
    title: "Quality Without Shortcuts",
    description:
      "We believe doing the job right is more important than doing it quickly. Every project receives the time and care it deserves.",
  },
];
