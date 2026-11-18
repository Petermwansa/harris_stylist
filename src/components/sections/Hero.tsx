"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { easeOut } from "@/lib/motion";
import styles from "./Hero.module.css";
import { useIntroDone } from "../motion/into";

type HeroProps = {
  image: { src: string; alt: string };
  eyebrow: string;
  title: React.ReactNode; // ReactNode = text OR JSX like <>Hello <em>you</em></>
  children?: React.ReactNode; // optional right-hand text + buttons (home only)
  variant?: "home" | "page";
};

// Text rises into place and un-blurs. `custom` (below) passes in each
// element's delay, so one set of variants serves several elements.
const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: easeOut, delay },
  }),
};

// The big headline also "settles": its letters close up as it arrives.
// (Only the headline — the eyebrow keeps its wide letter-spacing.)
const settle: Variants = {
  hidden: { ...rise.hidden, letterSpacing: "0.06em" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    letterSpacing: "-0.01em",
    transition: { duration: 1.6, ease: easeOut, delay },
  }),
};

export default function Hero({ image, eyebrow, title, children, variant = "page" }: HeroProps) {
  const start = useIntroDone(); // false while the home loader is still playing
  const state = start ? "visible" : "hidden";

  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      {/* Layer 1 — settles from 114% to 100% once, when the intro ends */}
      <motion.div
        className={styles.media}
        initial={{ scale: 1.14 }}
        animate={start ? { scale: 1 } : { scale: 1.14 }}
        transition={{ duration: 3.2, ease: easeOut }}
      >
        {/* Layer 2 — then drifts forever (slow zoom + pan, back and forth).
            Two separate layers so the two animations don't fight over `scale`. */}
        <motion.div
          className={styles.drift}
          animate={
            start
              ? { scale: [1, 1.07, 1.1], x: ["0%", "-1.2%", "1.4%"], y: ["0%", "-1%", "-0.6%"] }
              : undefined
          }
          transition={{ duration: 26, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 3.2 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill // fill the parent box (we don't know the photo's size)
            sizes="100vw" // it's always full-width → pick a full-width file
            fetchPriority="high" // most important image on the page: load it first
            className={styles.img}
          />
        </motion.div>
      </motion.div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div>
          <motion.p className="eyebrow" variants={rise} initial="hidden" animate={state} custom={0.4} style={{ color: "var(--gold-soft)" }}>
            {eyebrow}
          </motion.p>
          <motion.h1 className={styles.title} variants={settle} initial="hidden" animate={state} custom={0.5}>
            {title}
          </motion.h1>
        </div>

        {children && (
          <motion.div className={styles.side} variants={rise} initial="hidden" animate={state} custom={0.8}>
            {children}
          </motion.div>
        )}
      </div>

      {variant === "home" && <div className={styles.cue} aria-hidden="true" />}
    </section>
  );
}