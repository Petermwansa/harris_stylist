import { images, type Photo } from "./images";

// PLACEHOLDER copy. Replace with Harris's real words before launch.
// The Collections page now reads its pieces from Firestore (src/lib/works.ts);
// `sampleWorks` below is only the fallback and the seed data.

export const services = [
  { n: "i.", title: "Bespoke Couture", text: "One-of-one garments built around your measurements, your story and the occasion, from first sketch to final fitting." },
  { n: "ii.", title: "Ready-to-Wear", text: "Limited seasonal collections designed in-house, available in standard sizes or adapted to your fit." },
  { n: "iii.", title: "Personal Styling", text: "Wardrobe edits, shopping and styling for editorials, events and everyday confidence." },
  { n: "iv.", title: "Bridal & Occasion", text: "Gowns and suits for weddings, galas and milestones, with a dedicated fitting schedule." },
  { n: "v.", title: "Menswear Tailoring", text: "Suits, kaftans and statement separates cut close, clean and with quiet authority." },
  { n: "vi.", title: "Editorial & Stage", text: "Looks for shoots, music videos and performances, styled to read beautifully on camera." },
];

export const processSteps = [
  { n: "01", title: "Your Vision", text: "Tell us about the occasion, the feeling and yourself. Our brief opens the conversation." },
  { n: "02", title: "The Conversation", text: "We meet in the studio or online to explore references, colour and fabric together." },
  { n: "03", title: "Design & Sourcing", text: "Sketches take shape. Fabrics, trims and textures are sourced for your piece alone." },
  { n: "04", title: "The Toile", text: "A first fitting in calico, so we perfect the line before cutting the final cloth." },
  { n: "05", title: "The Making", text: "Your garment is cut, sewn and finished by hand, with fittings until it sits exactly right." },
  { n: "06", title: "The Day", text: "Final styling and dressing, because the piece is only finished when you wear it." },
];

export const stats = [
  { value: 250, suffix: "+", label: "Pieces commissioned" },
  { value: 8, suffix: "+", label: "Years of craft" },
  { value: 100, suffix: "%", label: "Hand-finished" },
];

export const testimonials = [
  { quote: "It was exactly what I wanted, and somehow more. The dress understood the moment before I did.", by: "Client name · Bridal gown" },
  { quote: "The fit on my suit is the best I've ever had. Every fitting felt considered and calm.", by: "Client name · Bespoke suit" },
  { quote: "Harris styled our whole shoot. Effortless, elegant and so easy to work with.", by: "Client name · Editorial styling" },
];

export type Garment = { name: string; tag: string; photo: Photo };

export const theEdit: Record<"her" | "him", Garment[]> = {
  her: [
    { name: "Aurelia Gown", tag: "Couture", photo: images.aurelia },
    { name: "Crimson Sweep", tag: "Occasion", photo: images.crimson },
    { name: "Noir Column", tag: "Ready-to-wear", photo: images.noir },
  ],
  him: [
    { name: "Windowpane Three-Piece", tag: "Bespoke", photo: images.windowpane },
    { name: "Midnight Suit", tag: "Tailoring", photo: images.midnight },
    { name: "The Navy Classic", tag: "Menswear", photo: images.navyClassic },
  ],
};

export const instagramPhotos: Photo[] = [
  images.aurelia,
  images.windowpane,
  images.crimson,
  images.bandAtelier,
  images.noir,
  images.midnight,
];

// ---- Collections page ----------------------------------------------------

export const categories = [
  { id: "all", label: "All Work" },
  { id: "couture", label: "Couture" },
  { id: "bridal", label: "Bridal & Occasion" },
  { id: "menswear", label: "Menswear" },
  { id: "rtw", label: "Ready-to-Wear" },
  { id: "styling", label: "Styling" },
] as const;

export type CategoryId = (typeof categories)[number]["id"]; // "all" | "couture" | …

export type Work = {
  id: string; // unique and stable — used for React keys AND for layoutId
  name: string;
  category: Exclude<CategoryId, "all">;
  photo: Photo;
  tall?: boolean; // takes up more height in the grid
};

// Sample pieces: shown while Firebase isn't set up yet, and used by
// `npm run seed` as the starting content for the real database.
export const sampleWorks: Work[] = [
  { id: "aurelia", name: "Aurelia Gown", category: "couture", photo: images.aurelia, tall: true },
  { id: "windowpane", name: "Windowpane Three-Piece", category: "menswear", photo: images.windowpane },
  { id: "crimson", name: "Crimson Sweep", category: "bridal", photo: images.crimson },
  { id: "noir", name: "Noir Column", category: "rtw", photo: images.noir, tall: true },
  { id: "tartan", name: "Tartan Coat Edit", category: "styling", photo: images.tartanCoat },
  { id: "midnight", name: "Midnight Suit", category: "menswear", photo: images.midnight, tall: true },
  { id: "blush", name: "Blush Ruffle Blouse", category: "couture", photo: images.blushRuffle },
  { id: "powder", name: "Powder Coat", category: "styling", photo: images.powderCoat },
  { id: "garden", name: "Garden Wrap Dress", category: "rtw", photo: images.gardenWrap, tall: true },
  { id: "navy", name: "The Navy Classic", category: "menswear", photo: images.navyClassic },
  { id: "sheer", name: "Sheer Evening Blouse", category: "bridal", photo: images.sheerBlouse },
  { id: "bordeaux", name: "Bordeaux Coat", category: "styling", photo: images.bordeauxCoat },
];

export const categoryLabel = (id: Work["category"]) =>
  categories.find((c) => c.id === id)?.label ?? id;

// ---- Designer page ---------------------------------------------------------
// PLACEHOLDER milestones: replace "20XX" with Harris's real years and events.

export const milestones = [
  { year: "20XX", label: "The start", title: "First commissions", text: "Styling and dressing friends and family for weddings and events." },
  { year: "20XX", label: "Training", title: "Design & pattern cutting", text: "Formal study in fashion design, tailoring and garment construction." },
  { year: "20XX", label: "The label", title: "harris_stylist is founded", text: "The brand launches with a first capsule of occasion wear." },
  { year: "20XX", label: "Recognition", title: "Runway & press", text: "First fashion week showing and editorial features." },
  { year: "Today", label: "The atelier", title: "Bespoke, by appointment", text: "Couture, menswear and styling for clients at home and abroad." },
];

export const truths = [
  { tag: "It's personal", title: "Fashion is personal", text: "From the first conversation to dressing you on the day, I'm there at every stage." },
  { tag: "Quiet authority", title: "Let the work speak", text: "Craft, restraint and knowing exactly who we are. Never trendy, never loud." },
  { tag: "Rooted, worldly", title: "Local roots, global eye", text: "Proudly local, designed with an international sensibility." },
  { tag: "Creative trust", title: "Trust the maker", text: "The magic lives in the space between your vision and the maker's craft." },
];

export const designerCredentials = [
  { label: "Discipline", value: "Couture · Tailoring · Styling" },
  { label: "Clients", value: "Bridal, red carpet, editorial, private" },
  { label: "Studio", value: "By appointment · Virtual worldwide" },
];

// ---- Appointments page -----------------------------------------------------

export const whatToExpect = [
  "A relaxed 45–60 minute session, in the studio, at home or online.",
  "Bring references, inspiration and anything you love wearing.",
  "Measurements, fabric swatches and a first design direction.",
  "A written proposal with timeline and pricing within a week.",
];

export const appointmentFormats = [
  { tag: "In person", title: "Studio Fitting", text: "A private session at the atelier with fabrics and samples to hand." },
  { tag: "At your place", title: "Home Visit", text: "Harris comes to you for fittings and wardrobe styling." },
  { tag: "Anywhere", title: "Virtual", text: "A video consultation for clients abroad, with measurements guided step by step." },
];