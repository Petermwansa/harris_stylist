"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { categories, categoryLabel, type CategoryId, type Work } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import styles from "./Gallery.module.css";
import Lightbox from "./LightBox";

// `works` now comes in as a prop: the PAGE (a server component) loads them
// from Firestore and hands them over. Gallery itself doesn't know or care
// where they came from.
export default function Gallery({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<CategoryId>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null); // which photo is in the lightbox
  const [navigated, setNavigated] = useState(false); // used the arrows since opening?

  // Derived, not stored: the visible list is always computable from `filter`.
  const visible = filter === "all" ? works : works.filter((w) => w.category === filter);

  const countFor = (id: CategoryId) =>
    id === "all" ? works.length : works.filter((w) => w.category === id).length;

  function open(index: number) {
    setNavigated(false);
    setOpenIndex(index);
  }

  // useCallback (Step 4 lesson): the Lightbox's keyboard effect depends on
  // these, so they must stay the SAME functions between renders.
  const total = visible.length;
  const step = useCallback(
    (direction: 1 | -1) => {
      setNavigated(true);
      // % wraps around: after the last photo comes the first again
      setOpenIndex((i) => (i === null ? i : (i + direction + total) % total));
    },
    [total],
  );
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <div className={styles.filters} role="tablist" aria-label="Filter the collection">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={filter === c.id}
            className={`${styles.filter} ${filter === c.id ? styles.on : ""}`}
            onClick={() => setFilter(c.id)}
          >
            {c.label} <sup>{countFor(c.id)}</sup>
            {filter === c.id && <motion.span layoutId="filter-underline" className={styles.underline} />}
          </button>
        ))}
      </div>

      {works.length === 0 && <p className={styles.empty}>New pieces are on their way. Please check back soon.</p>}

      <motion.div layout className={styles.grid}>
        {/* popLayout: leaving items are taken out of the layout straight away,
            so the remaining ones can glide into the gaps WHILE they fade out. */}
        <AnimatePresence mode="popLayout">
          {visible.map((work, i) => (
            <motion.figure
              key={work.id}
              layout // ← animate to the new grid position whenever it changes
              className={`${styles.item} ${work.tall ? styles.tall : ""}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <button className={styles.open} onClick={() => open(i)} aria-label={`Enlarge ${work.name}`}>
                {/* Same layoutId as the lightbox frame → Motion morphs one into the other */}
                <motion.div layoutId={`work-${work.id}`} className={styles.photo}>
                  <Image
                    src={work.photo.src}
                    alt={work.photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    className={styles.img}
                  />
                </motion.div>
                <figcaption className={styles.caption}>
                  <span>{categoryLabel(work.category)}</span>
                  <b>{work.name}</b>
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {openIndex !== null && visible[openIndex] && (
          <Lightbox
            key="lightbox"
            work={visible[openIndex]}
            position={`${openIndex + 1} / ${visible.length}`}
            navigated={navigated}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  );
}