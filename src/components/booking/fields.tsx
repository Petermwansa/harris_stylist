"use client";

import { useId } from "react";
import styles from "./BookingForm.module.css";

// Small, reusable form controls. Each one is "controlled": it shows the
// `value` it's given and reports changes through `onChange` — the form
// above it owns the actual data.

type ChoiceProps = {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
};

/** Big tappable cards that behave like radio buttons. */
export function ChoiceCards({ name, options, value, onChange, columns = 2 }: ChoiceProps) {
  return (
    <div className={`${styles.choices} ${columns === 1 ? styles.oneCol : ""}`} role="radiogroup">
      {options.map((option) => (
        <label key={option} className={styles.choice}>
          {/* A real (hidden) radio input: keyboard arrows + screen readers work for free */}
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

/** Small pill buttons for picking a time. Same idea as ChoiceCards. */
export function TimeSlots({ name, options, value, onChange }: Omit<ChoiceProps, "columns">) {
  return (
    <div className={styles.slots} role="radiogroup" aria-label="Preferred time">
      {options.map((option) => (
        <label key={option} className={styles.slot}>
          <input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "date";
  multiline?: boolean;
  autoComplete?: string;
  min?: string;
  optional?: boolean;
};

/** A label + text input (or textarea), with the label properly linked. */
export function Field({ label, value, onChange, type = "text", multiline, autoComplete, min, optional }: FieldProps) {
  // useId makes a unique id like ":r3:" so <label htmlFor> can point at the input.
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {optional && <em> (optional)</em>}
      </label>
      {multiline ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          min={min}
          // The server and browser may disagree about "today" across time
          // zones, so React shouldn't complain if `min` differs.
          suppressHydrationWarning
        />
      )}
    </div>
  );
}