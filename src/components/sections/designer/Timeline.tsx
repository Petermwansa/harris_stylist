"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { milestones } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import styles from "./Timeline.module.css";

export default function Timeline() {
  const list = useRef<HTMLDivElement>(null);

  // 0 → 1 as the list scrolls from "its top at the screen's middle"
  // to "its bottom at the screen's middle".
  const { scrollYProgress } = useScroll({ target: list, offset: ["start center", "end center"] });

  // useSpring smooths the raw value, so the line glides instead of
  // following every tiny scroll movement exactly.
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="section bg-white">
      <div className={`wrap ${styles.wrap}`}>
        <SectionHeading center eyebrow="Road to the atelier" title="Milestones" />

        <div ref={list} className={styles.list}>
          {/* Two lines: a faint full-length track, and a gold one that grows.
              They sit beside the <ol>, because a list may only contain <li>s. */}
          <span className={styles.track} aria-hidden="true" />
          <motion.span className={styles.progress} style={{ scaleY }} aria-hidden="true" />

          <ol className={styles.items}>
            {milestones.map((m, i) => (
              <motion.li
                key={m.title}
                className={styles.item}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 1, ease: easeOut }}
              >
                <div className={styles.year}>
                  {m.year}
                  <small>{m.label}</small>
                </div>
                <motion.span
                  className={styles.dot}
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
                />
                <div className={styles.body}>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}