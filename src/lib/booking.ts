// Everything about a booking that ISN'T layout: the shape of the data,
// the options people can choose, and the validation rules.
// No "use client" — the server imports this same file (src/app/actions.ts)
// to double-check every booking, so the rules live in exactly one place.

import { asRecord, cleanText, isEmail } from "./validation";

export const occasionOptions = [
  "A Wedding",
  "A Gala or Event",
  "A Personal Milestone",
  "Styling / Wardrobe",
  "Suit or Menswear",
  "I'm not sure yet",
] as const;

export const styleOptions = [
  "Quiet & considered",
  "Dramatic & sculptural",
  "Romantic & soft",
  "Modern & minimal",
] as const;

export const formatOptions = [
  "Studio Fitting",
  "Home Visit",
  "Virtual Consultation",
  "Styling Session",
] as const;

export const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00"] as const;

export type BookingData = {
  // Step 1 — the occasion
  occasion: string;
  about: string;
  // Step 2 — personal style
  style: string;
  love: string;
  // Step 3 — the appointment
  format: string;
  date: string; // "YYYY-MM-DD" (what <input type="date"> gives us)
  time: string;
  occasionDate: string;
  // Step 4 — contact details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

export const emptyBooking: BookingData = {
  occasion: "",
  about: "",
  style: "",
  love: "",
  format: "",
  date: "",
  time: "",
  occasionDate: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

export const STEP_COUNT = 4;

export const stepTitles = [
  { title: "What is this piece", em: "for?", sub: "Choose the one that fits best." },
  { title: "How would you describe", em: "how you dress?", sub: "Choose the feeling that resonates most." },
  { title: "Choose your", em: "appointment", sub: "Pick a format and a time. We'll confirm within 48 hours." },
  { title: "Last, a few", em: "details about you.", sub: "So we know who we're writing to." },
];

/** Today's date as "YYYY-MM-DD" in the visitor's own time zone. */
export function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

/** The day before an ISO date: "2027-03-01" → "2027-02-28". */
export function dayBefore(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Checks one step. Returns a friendly message for the FIRST problem found,
 * or null if the step is complete.
 * `today` defaults to the visitor's today; the server passes its own value.
 */
export function validateStep(step: number, d: BookingData, today = todayISO()): string | null {
  switch (step) {
    case 0:
      if (!d.occasion) return "Please choose what the piece is for.";
      // `includes` also protects the server from made-up values
      if (!(occasionOptions as readonly string[]).includes(d.occasion)) return "Please choose one of the options.";
      return null;
    case 1:
      if (!d.style) return "Please choose the style that feels most like you.";
      if (!(styleOptions as readonly string[]).includes(d.style)) return "Please choose one of the options.";
      return null;
    case 2:
      if (!d.format) return "Please choose an appointment format.";
      if (!(formatOptions as readonly string[]).includes(d.format)) return "Please choose one of the options.";
      if (!d.date) return "Please choose a preferred date.";
      if (d.date < today) return "That date has already passed — please pick another.";
      if (!d.time) return "Please choose a preferred time.";
      if (!(timeSlots as readonly string[]).includes(d.time)) return "Please choose one of the time slots.";
      return null;
    case 3:
      if (!d.firstName.trim()) return "Please add your first name.";
      if (!isEmail(d.email.trim())) return "Please add a valid email address.";
      return null;
    default:
      return null;
  }
}

/** Validates every step — used before sending, and again on the server. */
export function validateAll(d: BookingData, today = todayISO()): string | null {
  for (let step = 0; step < STEP_COUNT; step++) {
    const problem = validateStep(step, d, today);
    if (problem) return problem;
  }
  return null;
}

/**
 * SERVER SIDE: builds a clean BookingData from whatever was sent.
 * Unknown fields are dropped, everything becomes a trimmed string, long
 * text is cut short. Only then do we run validateAll() on it.
 */
export function parseBooking(input: unknown): BookingData {
  const raw = asRecord(input);
  const clean = { ...emptyBooking };
  for (const key of Object.keys(emptyBooking) as (keyof BookingData)[]) {
    clean[key] = cleanText(raw[key], key === "about" || key === "love" || key === "notes" ? 2000 : 200);
  }
  return clean;
}