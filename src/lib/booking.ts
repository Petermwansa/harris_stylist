// Everything about a booking that ISN'T layout: the shape of the data,
// the options people can choose, and the validation rules.
// No "use client" — in Step 10 the server will import this same file to
// double-check every booking, so the rules live in exactly one place.

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

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks one step. Returns a friendly message for the FIRST problem found,
 * or null if the step is complete.
 */
export function validateStep(step: number, d: BookingData): string | null {
  switch (step) {
    case 0:
      if (!d.occasion) return "Please choose what the piece is for.";
      return null;
    case 1:
      if (!d.style) return "Please choose the style that feels most like you.";
      return null;
    case 2:
      if (!d.format) return "Please choose an appointment format.";
      if (!d.date) return "Please choose a preferred date.";
      if (d.date < todayISO()) return "That date has already passed — please pick another.";
      if (!d.time) return "Please choose a preferred time.";
      return null;
    case 3:
      if (!d.firstName.trim()) return "Please add your first name.";
      if (!EMAIL.test(d.email.trim())) return "Please add a valid email address.";
      return null;
    default:
      return null;
  }
}

/** Validates every step — used before sending (and on the server later). */
export function validateAll(d: BookingData): string | null {
  for (let step = 0; step < STEP_COUNT; step++) {
    const problem = validateStep(step, d);
    if (problem) return problem;
  }
  return null;
}