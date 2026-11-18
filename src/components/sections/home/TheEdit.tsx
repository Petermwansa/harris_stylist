"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { theEdit } from "@/lib/content";
import { easeOut, fadeUp, staggerParent } from "@/lib/motion";
import styles from "./TheEdit.module.css";

type Tab = keyof typeof theEdit; // "her" | "him"
const tabs: { id: Tab; label: string }[] = [
  { id: "her", label: "For Her" },
  { id: "him", label: "For Him" },
];

export default function TheEdit() {
  const [tab, setTab] = useState<Tab>("her");

  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          center
          eyebrow="The Harris Edit"
          title={<>Latest from the <em>pattern table</em></>}
          text="A selection of recent commissions, works in progress and new ready-to-wear pieces."
        />

        <div className={styles.tabs} role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`${styles.tab} ${tab === t.id ? styles.on : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {/* layoutId: there's only ever ONE underline. When the active tab
                  changes, Motion slides it from the old tab to the new one. */}
              {tab === t.id && (
                <motion.span layoutId="edit-underline" className={styles.underline} transition={{ duration: 0.6, ease: easeOut }} />
              )}
            </button>
          ))}
        </div>

        {/* mode="wait": the old grid finishes leaving BEFORE the new one enters.
            key={tab}: a new key tells React "this is a different grid". */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className={styles.grid}
            variants={staggerParent}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 12, transition: { duration: 0.35 } }}
          >
            {theEdit[tab].map((g) => (
              <motion.figure key={g.name} className={styles.item} variants={fadeUp}>
                <div className={styles.photo}>
                  <Image src={g.photo.src} alt={g.photo.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className={styles.img} />
                </div>
                <figcaption className={styles.caption}>
                  <b>{g.name}</b>
                  <span>{g.tag}</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className={styles.more}>
          <Button href="/collections">View All Collections</Button>
        </div>
      </div>
    </section>
  );
}