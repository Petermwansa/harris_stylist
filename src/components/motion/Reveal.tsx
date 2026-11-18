"use client";

import { motion } from "motion/react";
import { easeOut } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number; // seconds to wait before animating
  y?: number; // how far below (px) it starts
  className?: string;
};

// Fades + lifts its children into place the first time they scroll into view.
// Usage:  <Reveal delay={0.2}><h2>Hello</h2></Reveal>
export default function Reveal({ children, delay = 0, y = 34, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }} // where it starts
      whileInView={{ opacity: 1, y: 0 }} // where it goes when visible
      viewport={{
        once: true, // animate only the first time (no flicker when scrolling back up)
        margin: "0px 0px -8% 0px", // wait until it's a little way into the screen
      }}
      transition={{ duration: 1.2, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}