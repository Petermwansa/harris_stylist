"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChoiceCards, Field, Honeypot } from "@/components/booking/fields";
import { submitContact } from "@/app/actions";
import { contactTopics, emptyContact, validateContact, type ContactData } from "@/lib/contact";
import { easeOut } from "@/lib/motion";
import styles from "./ContactForm.module.css";

type Status = "editing" | "sending" | "sent";

// A one-step form built from the SAME field components as the booking form.
export default function ContactForm() {
  const [data, setData] = useState<ContactData>(emptyContact);
  const [error, setError] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [status, setStatus] = useState<Status>("editing");
  const [trap, setTrap] = useState("");

  const update = (key: keyof ContactData) => (value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (error) setError(null);
  };

  function showError(message: string) {
    setError(message);
    setErrorCount((n) => n + 1);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const problem = validateContact(data);
    if (problem) return showError(problem);

    setStatus("sending");
    const result = await submitContact(data, trap); // runs on the server
    if (!result.ok) {
      setStatus("editing");
      return showError(result.error);
    }
    setStatus("sent");
  }

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="thanks"
          className={styles.thanks}
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="eyebrow">Message sent</p>
          <h3>
            Thank you, <em>{data.name.trim().split(" ")[0]}.</em>
          </h3>
          <p>We&apos;ll reply to {data.email.trim()} as soon as we can, usually within a day.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
        >
          <Honeypot value={trap} onChange={setTrap} />
          <p className={styles.label}>What is it about?</p>
          <ChoiceCards name="topic" options={contactTopics} value={data.topic} onChange={update("topic")} />

          <div className={styles.row}>
            <Field label="Name" autoComplete="name" value={data.name} onChange={update("name")} />
            <Field label="Email" type="email" autoComplete="email" value={data.email} onChange={update("email")} />
          </div>
          <Field label="Phone / WhatsApp" type="tel" optional autoComplete="tel" value={data.phone} onChange={update("phone")} />
          <Field label="Message" multiline value={data.message} onChange={update("message")} />
          <p className={styles.consent}>
            We&apos;ll only use your details to reply. See our <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <div className={styles.errorSlot} aria-live="polite">
            {error && (
              <motion.p
                key={errorCount}
                className={styles.error}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                transition={{ duration: 0.45 }}
              >
                {error}
              </motion.p>
            )}
          </div>

          <button type="submit" className={styles.send} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}