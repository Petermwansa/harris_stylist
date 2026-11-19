// Tiny line icons for the admin panel (drawn with SVG — no icon library needed).
// Each is a 24×24 drawing made of thin strokes that inherit the text colour.
const paths = {
  dashboard: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.8-3.5 3.4-5 6.5-5s5.7 1.5 6.5 5M16 4.5a3.5 3.5 0 0 1 0 6.5M18 15c2 .6 3.2 2.2 3.5 5",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a1 1 0 1 0 0-.01",
  pen: "M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
  grid: "M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z",
  out: "M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z",
  whatsapp: "M4 20l1.3-4A8 8 0 1 1 8 19zM9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z",
  trash: "M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  copy: "M8 8h11v12H8zM5 16V4h11",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM16 16l4 4",
  arrow: "M5 12h14M13 6l6 6-6 6",
  back: "M19 12H5M11 6l-6 6 6 6",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}