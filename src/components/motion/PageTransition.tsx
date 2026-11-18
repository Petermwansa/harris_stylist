"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { easeOut } from "@/lib/motion";
import styles from "./PageTransition.module.css";

// A gold curtain that lifts away every time the page (URL path) changes.
//
// Why not app/template.tsx? In this Next.js version, pages you leave are
// HIDDEN (kept alive with React's <Activity>), not destroyed — so a template
// on a page you return to isn't re-mounted, and its animation wouldn't replay.
// Watching the pathname from the layout works for every navigation.
export default function PageTransition() {
  const pathname = usePathname();
  const [previous, setPrevious] = useState(pathname);
  const [count, setCount] = useState(0); // how many navigations so far

  // "Adjusting state while rendering" — React's recommended way to react to a
  // prop/value change. React re-renders immediately, BEFORE painting, so the
  // curtain appears in the very same frame as the new page (no flash).
  if (pathname !== previous) {
    setPrevious(pathname);
    setCount((c) => c + 1);
  }

  // No curtain on the very first page load (the home loader handles that).
  if (count === 0) return null;

  return (
    // A new key on each navigation = a brand-new curtain = the animation replays.
    <div key={count} className={styles.wrap} aria-hidden="true">
      <motion.div
        className={styles.curtain}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
      />
      <motion.span
        className={styles.word}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        HARRIS
      </motion.span>
    </div>
  );
}