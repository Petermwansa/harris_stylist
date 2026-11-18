// Same idea as booking.ts: the shape of a contact message and its rules,
// with no React — so the server can reuse validateContact() in Step 10.

export const contactTopics = ["A commission", "Styling", "Press & collaborations", "Something else"] as const;

export type ContactData = {
  topic: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const emptyContact: ContactData = { topic: "", name: "", email: "", phone: "", message: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(d: ContactData): string | null {
  if (!d.topic) return "Please choose what your message is about.";
  if (!d.name.trim()) return "Please add your name.";
  if (!EMAIL.test(d.email.trim())) return "Please add a valid email address.";
  if (d.message.trim().length < 10) return "Please write a little more in your message.";
  return null;
}