// The four process steps. Content, so it lives here rather than in a
// component - a new client is a new data file, not a new component.
//
// The copy is Primo's own, lifted verbatim from the About page section at
// components/AboutUs/OurProcess.tsx. It is not rewritten, because copy on this
// site holds still.
import {
  CalendarCheck,
  Home,
  PaintRoller,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

export type ProcessStep = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

export const processEyebrow = "Our Process";
export const processHeading = "A Simple Process Designed Around Your Home";
export const processIntro =
  "From your first estimate to the final walkthrough, every step is focused on making your interior painting project organized, stress-free, and completed with meticulous attention to detail.";

export const processSteps: ProcessStep[] = [
  {
    icon: CalendarCheck,
    number: "01",
    title: "Book Your Estimate",
    description:
      "Choose a convenient time using our online booking system. We'll visit your home, discuss your project, answer your questions, and provide a detailed, no-obligation estimate.",
  },
  {
    icon: Home,
    number: "02",
    title: "Preparation",
    description:
      "Once you're ready to move forward, we carefully protect your home, prepare every surface, and ensure everything is ready for a smooth, professional finish.",
  },
  {
    icon: PaintRoller,
    number: "03",
    title: "Professional Painting",
    description:
      "Using premium materials and meticulous workmanship, we deliver smooth finishes, crisp lines, and beautiful results while keeping your home clean and organized.",
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: "Final Walkthrough",
    description:
      "Together we'll inspect every detail to ensure you're completely satisfied before we consider the project finished.",
  },
];
