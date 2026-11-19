// Same idea as booking.ts: the shape of a contact message and its rules,
// with no React — so the server reuses validateContact() in src/app/actions.ts.

import { asRecord, cleanText, isEmail } from "./validation";

export const contactTopics = ["A commission", "Styling", "Press & collaborations", "Something else"] as const;

export type ContactData = {
  topic: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const emptyContact: ContactData = { topic: "", name: "", email: "", phone: "", message: "" };

export function validateContact(d: ContactData): string | null {
  if (!d.topic) return "Please choose what your message is about.";
  if (!(contactTopics as readonly string[]).includes(d.topic)) return "Please choose one of the topics.";
  if (!d.name.trim()) return "Please add your name.";
  if (!isEmail(d.email.trim())) return "Please add a valid email address.";
  if (d.message.trim().length < 10) return "Please write a little more in your message.";
  return null;
}

/** SERVER SIDE: builds a clean ContactData from whatever was sent. */
export function parseContact(input: unknown): ContactData {
  const raw = asRecord(input);
  return {
    topic: cleanText(raw.topic, 100),
    name: cleanText(raw.name, 200),
    email: cleanText(raw.email, 254),
    phone: cleanText(raw.phone, 50),
    message: cleanText(raw.message, 5000),
  };
}