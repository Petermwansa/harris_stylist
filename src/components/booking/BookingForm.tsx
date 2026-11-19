"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { ChoiceCards, Field, Honeypot, TimeSlots } from "./fields";
import Confirmation from "./Confirmation";
import { submitBooking } from "@/app/actions";
import {
  emptyBooking,
  formatOptions,
  occasionOptions,
  STEP_COUNT,
  stepTitles,
  styleOptions,
  timeSlots,
  todayISO,
  validateAll,
  validateStep,
  type BookingData,
} from "@/lib/booking";
import { easeOut } from "@/lib/motion";
import styles from "./BookingForm.module.css";

// Steps slide in from the side you're heading towards.
// `custom` (the direction: 1 = forward, -1 = back) is passed in by
// AnimatePresence, so even the LEAVING step knows which way to go.
const slide: Variants = {
  enter: (direction: number) => ({ x: direction * 60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
  exit: (direction: number) => ({ x: direction * -60, opacity: 0, transition: { duration: 0.3 } }),
};

type Status = "editing" | "sending" | "sent";

export default function BookingForm() {
  // ONE object holds every answer. In Step 10 we send this straight to Firebase.
  const [data, setData] = useState<BookingData>(emptyBooking);
  // [current step, direction we moved] — kept together so they always match
  const [[step, direction], setStep] = useState<[number, number]>([0, 1]);
  const [error, setError] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0); // changes on every error → re-triggers the shake
  const [status, setStatus] = useState<Status>("editing");
  const [trap, setTrap] = useState(""); // the honeypot's value (should stay empty)

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false); // has the visitor changed step yet?
  const lenis = useLenis();

  // Returns an onChange handler for one field, e.g. update("email").
  // [key] is a "computed property name": it sets whichever field `key` names.
  const update = (key: keyof BookingData) => (value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (error) setError(null); // clear the message as soon as they fix something
  };

  function showError(message: string) {
    setError(message);
    setErrorCount((n) => n + 1);
  }

  function goTo(next: number) {
    moved.current = true;
    setStep([next, next > step ? 1 : -1]);
    setError(null);
    // Glide back to the top of the form so the new step's question is visible
    if (formRef.current) lenis?.scrollTo(formRef.current, { offset: -110 });
  }

  // Accessibility: after a step change, move keyboard/screen-reader focus to
  // the new question. We wait until the new step has finished sliding in —
  // with mode="wait" the OLD step is still on screen when `step` changes,
  // so focusing straight away would focus the heading that's about to vanish.
  function focusQuestion(definition: unknown) {
    if (definition === "center" && moved.current) headingRef.current?.focus({ preventScroll: true });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // pressing Enter in any field lands here too

    const problem = validateStep(step, data);
    if (problem) return showError(problem);

    if (step < STEP_COUNT - 1) return goTo(step + 1);

    // Last step: check EVERYTHING once more, then send.
    const anyProblem = validateAll(data);
    if (anyProblem) return showError(anyProblem);

    setStatus("sending");
    // Runs on the SERVER (src/app/actions.ts), which checks everything again
    // and saves it to Firestore. We just wait for the answer.
    const result = await submitBooking(data, trap);
    if (!result.ok) {
      setStatus("editing");
      return showError(result.error);
    }
    setStatus("sent");
    if (formRef.current) lenis?.scrollTo(formRef.current, { offset: -110 });
  }

  if (status === "sent") return <Confirmation data={data} />;

  const t = stepTitles[step];

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <Honeypot value={trap} onChange={setTrap} />
      {/* ---------- Progress ---------- */}
      <div className={styles.progress} aria-label={`Step ${step + 1} of ${STEP_COUNT}`}>
        <div className={styles.track}>
          <motion.div
            className={styles.fill}
            animate={{ scaleX: step / (STEP_COUNT - 1) }}
            transition={{ duration: 0.8, ease: easeOut }}
          />
        </div>
        {stepTitles.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i < step ? styles.past : ""} ${i === step ? styles.current : ""}`}>
            {i < step ? "✓" : i + 1}
          </span>
        ))}
      </div>

      {/* ---------- The current step ---------- */}
      <div className={styles.stage}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationComplete={focusQuestion}
          >
            <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
              {t.title} <em>{t.em}</em>
            </h3>
            <p className={styles.sub}>{t.sub}</p>

            {step === 0 && (
              <>
                <ChoiceCards name="occasion" options={occasionOptions} value={data.occasion} onChange={update("occasion")} />
                <Field label="Tell us a little about the occasion" multiline optional value={data.about} onChange={update("about")} />
              </>
            )}

            {step === 1 && (
              <>
                <ChoiceCards name="style" options={styleOptions} value={data.style} onChange={update("style")} />
                <Field label="What do you already wear that you love?" multiline optional value={data.love} onChange={update("love")} />
              </>
            )}

            {step === 2 && (
              <>
                <ChoiceCards name="format" options={formatOptions} value={data.format} onChange={update("format")} />
                <div className={styles.row}>
                  <Field label="Preferred date" type="date" min={todayISO()} value={data.date} onChange={update("date")} />
                  <Field label="Date of the occasion" type="date" optional min={todayISO()} value={data.occasionDate} onChange={update("occasionDate")} />
                </div>
                <div className={styles.field}>
                  <p className={styles.label}>Preferred time</p>
                  <TimeSlots name="time" options={timeSlots} value={data.time} onChange={update("time")} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.row}>
                  <Field label="First name" autoComplete="given-name" value={data.firstName} onChange={update("firstName")} />
                  <Field label="Last name" optional autoComplete="family-name" value={data.lastName} onChange={update("lastName")} />
                  <Field label="Email address" type="email" autoComplete="email" value={data.email} onChange={update("email")} />
                  <Field label="Phone / WhatsApp" type="tel" optional autoComplete="tel" value={data.phone} onChange={update("phone")} />
                </div>
                <Field label="Anything else we should know?" multiline optional value={data.notes} onChange={update("notes")} />
                <p className={styles.consent}>
                  By sending this request you agree to our <Link href="/privacy">Privacy Policy</Link> and{" "}
                  <Link href="/terms">Terms</Link>.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Error (shakes each time it appears) ---------- */}
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

      {/* ---------- Navigation ---------- */}
      <div className={styles.nav}>
        <button type="button" className={styles.back} onClick={() => goTo(step - 1)} disabled={step === 0}>
          ← Back
        </button>
        <span className={styles.count}>
          {step + 1} / {STEP_COUNT}
        </span>
        <button type="submit" className={styles.next} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : step === STEP_COUNT - 1 ? "Send Request" : "Continue"}
        </button>
      </div>
    </form>
  );
}