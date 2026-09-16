"use client";

// Ported from the-latam-painters' components/home/StepReveal.tsx.
//
// Two changes, both forced by this repo rather than chosen:
//
//   motion/react -> framer-motion   the `motion` package is not installed here
//                                   and nothing gets installed without asking.
//                                   framer-motion 12 is the same API.
//
//   primary as the lit end    LATAM's card runs near black to their brand
//                            colour at 70%. The value jump is what makes the
//                            glow read at all. Keeping their near black base
//                            and swapping only the lit stop to our blue: two
//                            blues at both ends killed the effect entirely.
//
// The icon is white, not amber. Amber is the CTA and nothing else, and it
// fails contrast as text anyway - see the note at the top of globals.css.
import { motion } from "framer-motion";

export function StepReveal({
  index,
  icon,
  children,
}: {
  index: number;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const delay = index * 0.15;
  const spinDirection = index % 2 === 0 ? -1 : 1;

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.5, rotateY: spinDirection * 130 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 55, damping: 16, delay }}
      whileHover={{ y: -6 }}
      style={{ transformPerspective: 1200 }}
      className="group relative flex md:flex-1 flex-col items-start md:items-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-neutral-950 via-neutral-900 to-primary-light/70 p-4 pt-5 shadow-lg shadow-black/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-primary-light/30 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
      />

      <div className="relative flex size-12 items-center justify-center">
        <motion.span
          aria-hidden
          initial={{ opacity: 0.55, scale: 0.3 }}
          whileInView={{ opacity: 0, scale: 1.9 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: delay + 0.25, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full bg-primary-light"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 20,
            delay: delay + 0.25,
          }}
          className="flex size-12 items-center justify-center rounded-full bg-white ring-1 ring-white/30"
        >
          {icon}
        </motion.div>
      </div>

      {children}
    </motion.li>
  );
}
