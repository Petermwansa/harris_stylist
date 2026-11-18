"use client";

import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import type { BookingData } from "@/lib/booking";
import { easeOut } from "@/lib/motion";
import styles from "./BookingForm.module.css";

// "2026-12-10" → "Thursday 10 December 2026"
function prettyDate(iso: string) {
  // Adding T00:00 makes it local midnight (a bare "YYYY-MM-DD" is read as UTC,
  // which can show the previous day in some time zones).
  return new Date(`${iso}T00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Confirmation({ data }: { data: BookingData }) {
  const summary = [
    { label: "Appointment", value: data.format },
    { label: "Date", value: prettyDate(data.date) },
    { label: "Time", value: data.time },
    { label: "For", value: data.occasion },
  ];

  return (
    <motion.div
      className={styles.done}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOut }}
      role="status"
    >
      {/* A gold circle draws itself, then the tick */}
      <svg viewBox="0 0 64 64" className={styles.tick} aria-hidden="true">
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: easeOut }}
        />
        <motion.path
          d="M20 33 l8 8 l16 -18"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.8 }}
        />
      </svg>

      <p className="eyebrow">Request received</p>
      <h3 className={styles.doneTitle}>
        Thank you, <em>{data.firstName.trim()}.</em>
      </h3>
      <p className={styles.doneText}>
        We&apos;ll be in touch at <b>{data.email.trim()}</b> within 48 hours to confirm. Every
        commission starts exactly this way: quietly, without pressure.
      </p>

      <dl className={styles.summary}>
        {summary.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>

      <Button href="/collections">Browse the Collections</Button>
    </motion.div>
  );
}