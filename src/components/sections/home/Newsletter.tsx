"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Honeypot } from "@/components/booking/fields";
import { subscribe } from "@/app/actions";
import { easeOut } from "@/lib/motion";
import styles from "./Newsletter.module.css";

type Status = "editing" | "sending" | "sent";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("editing");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser from reloading the page
    setError(null);
    setStatus("sending");
    const result = await subscribe(email, trap); // saves to Firestore on the server
    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("editing");
      setError(result.error);
    }
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
            {status === "sent" ? (
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
                <Honeypot value={trap} onChange={setTrap} />
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "…" : "Join"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        <p className={error ? styles.error : styles.consent} aria-live="polite">
          {error ?? (
            <>
              Unsubscribe any time. See our <Link href="/privacy">Privacy Policy</Link>.
            </>
          )}
        </p>
      </div>
    </section>
  );
}