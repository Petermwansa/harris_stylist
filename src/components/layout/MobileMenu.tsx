"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { allLinks, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";
import { easeOut } from "@/lib/motion";
import styles from "./MobileMenu.module.css";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const lenis = useLenis(); // the Lenis instance from <Providers>

  // Side effects: things that happen BECAUSE `open` changed.
  useEffect(() => {
    if (!open) return;

    lenis?.stop(); // freeze the page behind the menu

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    // The "cleanup" runs when the menu closes (or the component unmounts)
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  return (
    // AnimatePresence lets an element play an EXIT animation before React
    // removes it. Without it, the menu would just vanish instantly.
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.menu}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }} // hidden: clipped to nothing at the top
          animate={{ clipPath: "inset(0 0 0% 0)" }} // open: curtain drops down
          exit={{ clipPath: "inset(100% 0 0 0)" }} // close: curtain lifts away downward
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <button className={styles.close} onClick={onClose}>
            Close
          </button>

          <nav className={styles.links}>
            {allLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.25 + i * 0.07 }}
              >
                <Link href={link.href} onClick={onClose} className={styles.link}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.a
            className={styles.ig}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.7 } }}
            exit={{ opacity: 0 }}
          >
            {INSTAGRAM_HANDLE}
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}