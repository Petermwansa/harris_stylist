import type { Variants } from "motion/react";

// The same curve as --out in globals.css: starts fast, settles very slowly.
// Motion wants easing as an array of 4 numbers (a cubic-bezier).
export const easeOut = [0.16, 1, 0.3, 1] as const;

// "Variants" are named animation states. We name them `hidden` and `visible`,
// then tell Motion which one to use. Any child that also uses variants will
// follow its parent automatically — that's how staggering works.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeOut },
  },
};

// A parent that doesn't animate itself, it just releases its children
// one after another, 0.12s apart.
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};