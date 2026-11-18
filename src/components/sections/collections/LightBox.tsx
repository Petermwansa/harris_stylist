"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { categoryLabel, type Work } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import styles from "./LightBox.module.css";

type Props = {
  work: Work;
  position: string; // e.g. "3 / 12"
  navigated: boolean;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
};

export default function Lightbox({ work, position, navigated, onClose, onStep }: Props) {
  const lenis = useLenis();

  // Keyboard controls + freeze the page behind the lightbox
  useEffect(() => {
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [lenis, onClose, onStep]);

  return (
    <motion.div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={work.name}
      onClick={onClose} // click anywhere outside the photo to close
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
      transition={{ duration: 0.5 }}
    >
      {/*
        THE "GROW FROM THE GRID" EFFECT
        This frame has the same layoutId as the thumbnail that was clicked,
        so Motion animates it from the thumbnail's size & position to here,
        and back again on close.
        After using the arrows the photo no longer matches the thumbnail you
        clicked, so we drop the layoutId and simply cross-fade instead.
      */}
      <motion.figure
        key={navigated ? work.id : "shared"}
        layoutId={navigated ? undefined : `work-${work.id}`}
        className={styles.frame}
        onClick={(e) => e.stopPropagation()} // clicks ON the photo shouldn't close it
        initial={navigated ? { opacity: 0 } : undefined}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <Image src={work.photo.src} alt={work.photo.alt} fill sizes="(max-width: 640px) 92vw, 62vh" className={styles.img} />
      </motion.figure>

      <motion.div
        className={styles.caption}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.6 } }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          {categoryLabel(work.category)} · {position}
        </span>
        <b>{work.name}</b>
      </motion.div>

      <button className={styles.close} onClick={onClose}>
        Close
      </button>
      <button
        className={`${styles.arrow} ${styles.prev}`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous piece"
      >
        ←
      </button>
      <button
        className={`${styles.arrow} ${styles.next}`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next piece"
      >
        →
      </button>
    </motion.div>
  );
}