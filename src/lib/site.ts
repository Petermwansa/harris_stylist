// One place for site-wide info. The header, mobile menu and footer all read
// from here, so adding a page or changing the Instagram link is a one-line edit.

export const SITE_NAME = "Harris Stylist";

// The live address of the site. Set NEXT_PUBLIC_SITE_URL when you deploy
// (Step 11); until then, links in share previews point at localhost.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// PLACEHOLDER contact details — replace with Harris's real ones.
export const CONTACT = {
  email: "hello@harrisstylist.com",
  phone: "+000 000 000 000",
  whatsappUrl: "https://wa.me/000000000000",
  studio: "Studio address, City",
  hours: "Mon–Sat · by appointment",
};

export const INSTAGRAM_URL = "https://www.instagram.com/harris_stylist/";
export const INSTAGRAM_HANDLE = "@harris_stylist";

export type NavLink = { href: string; label: string };

export const navLeft: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/designer", label: "The Designer" },
];

export const navRight: NavLink[] = [{ href: "/contact", label: "Contact" }];

// The mobile menu shows everything in one list
export const allLinks: NavLink[] = [
  ...navLeft,
  { href: "/appointments", label: "Appointments" },
  ...navRight,
];