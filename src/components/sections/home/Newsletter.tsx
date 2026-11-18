"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { easeOut } from "@/lib/motion";
import styles from "./Newsletter.module.css";

// For now the form only shows a thank-you. In Step 10 we'll save the
// email to Firebase (Firestore) instead.
export default function Newsletter() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser from reloading the page
    // TODO (Step 10): save the email to Firestore here
    setSent(true);
  }

  return (
    <section className="section">
      <div className={`wrap ${styles.wrap}`}>
        <SectionHeading
          center
          eyebrow="The Harris letter"
          title={<>From the atelier, <em>to your inbox</em></>}
          text="New collections, private previews and appointment openings. Only when there's something worth seeing."
        />

        <div className={styles.slot}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.p
                key="thanks"
                className={styles.thanks}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut }}
              >
                Thank you. You&apos;re on the list.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
              >
                <input type="email" required placeholder="Your email address" aria-label="Email address" />
                <button type="submit">Join</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}