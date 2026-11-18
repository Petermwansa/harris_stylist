"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { easeOut } from "@/lib/motion";
import styles from "./Loader.module.css";

const LETTERS = "HARRIS".split("");

// The full timeline (seconds after the page appears):
// 0.25 ring draws → 1.1 "H" fades in → 2.0 letters rise one by one
// → 2.2 giant "Welcome" blurs in → 3.0 tagline → 4.3 onDone() → exit fade
export default function Loader({ onDone }: { onDone: () => void }) {
  const lenis = useLenis();
  const reduce = useReducedMotion(); // true if the visitor prefers less motion

  useEffect(() => {
    lenis?.stop(); // no scrolling while the loader is up
    window.scrollTo(0, 0);
    const timer = setTimeout(onDone, reduce ? 1200 : 4300);
    return () => {
      clearTimeout(timer);
      lenis?.start();
    };
  }, [lenis, onDone, reduce]);

  return (
    <motion.div
      className={styles.loader}
      aria-hidden="true"
      exit={{ opacity: 0, transition: { duration: 1.1, ease: easeOut, delay: 0.25 } }}
    >
      {/* Giant faint italic word behind everything */}
      <motion.div
        className={styles.welcome}
        initial={{ opacity: 0, scale: 1.06, letterSpacing: "0.04em", filter: "blur(10px)" }}
        animate={{ opacity: 0.09, scale: 1, letterSpacing: "-0.01em", filter: "blur(0px)" }}
        transition={{ duration: 2.2, ease: easeOut, delay: 2.2 }}
      >
        Welcome
      </motion.div>

      {/* The mark: lifts away (bigger + blurred) when the loader exits */}
      <motion.div
        className={styles.mark}
        exit={{ opacity: 0, scale: 1.07, filter: "blur(5px)", transition: { duration: 0.9, ease: easeOut } }}
      >
        <svg viewBox="0 0 120 120" className={styles.svg}>
          {/* pathLength 0 → 1 = the circle "draws" itself */}
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            className={styles.ring}
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.25 }}
          />
          <motion.text
            x="60"
            y="76"
            textAnchor="middle"
            className={styles.mono}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: easeOut, delay: 1.1 }}
          >
            H
          </motion.text>
        </svg>

        <div className={styles.word}>
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "40%", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: easeOut, delay: 2.0 + i * 0.1 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          className={styles.tag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          Fashion Designer · Stylist
        </motion.div>
      </motion.div>
    </motion.div>
  );
}