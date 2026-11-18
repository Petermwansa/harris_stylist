"use client";

import { motion } from "motion/react";
import { fadeUp, staggerParent } from "@/lib/motion";

type Props = { children: React.ReactNode; className?: string };

// The parent watches the viewport. When it appears, it switches to "visible"
// and Motion passes that down to every <StaggerItem>, one after another.
export function StaggerGroup({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

// Each item only says WHAT it looks like when hidden/visible.
// It doesn't need its own whileInView — it inherits the parent's state.
export function StaggerItem({ children, className }: Props) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}