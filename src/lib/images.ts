// PLACEHOLDER photos (Unsplash) — replaced with Harris's own work from
// Firebase Storage in Step 10. Keeping them in one file makes that swap easy.

export type Photo = { src: string; alt: string };

// Every URL ends in the same "?w=2400&q=85" — the exact query string we
// allowed in next.config.ts. next/image then resizes it for each screen.
const unsplash = (id: string, alt: string): Photo => ({
  src: `https://images.unsplash.com/${id}?w=2400&q=85`,
  alt,
});

export const images = {
  // Heroes
  heroHome: unsplash(
    "photo-1595777457583-95e059d581b8",
    "Model twirling in a flowing red gown",
  ),
  heroCollections: unsplash(
    "photo-1558769132-cb1aea458c5e",
    "Neutral knitwear on a studio rail",
  ),
  heroDesigner: unsplash(
    "photo-1594938298603-c8148c4dae35",
    "Tailored windowpane three-piece suit",
  ),
  heroAppointments: unsplash(
    "photo-1566174053879-31528523f8ae",
    "Off-the-shoulder plum evening gown",
  ),
  heroContact: unsplash(
    "photo-1483985988355-763728e1935b",
    "Woman in a bordeaux coat with shopping bags",
  ),

  // Home page
  introLarge: unsplash(
    "photo-1566174053879-31528523f8ae",
    "Off-the-shoulder plum evening gown",
  ),
  introSmall: unsplash(
    "photo-1550639525-c97d455acf70",
    "Black knit top with a quilted midi skirt",
  ),
  bandAtelier: unsplash(
    "photo-1445205170230-053b83016050",
    "Rails of garments in warm light inside the atelier",
  ),
  bandFitting: unsplash(
    "photo-1507679799987-c73779587ccf",
    "Man fastening the button of a navy tailored suit",
  ),

  // Designer page
  designerRail: unsplash(
    "photo-1490481651871-ab68de25d43d",
    "Finished garments hanging on a rail in the studio",
  ),
  designerFabrics: unsplash(
    "photo-1512436991641-6745cdb1723f",
    "Fabrics and garments on hangers in soft light",
  ),
  designerPortrait: unsplash(
    "photo-1617137968427-85924c800a22",
    "Portrait of the designer (placeholder)",
  ),
  bandStudio: unsplash(
    "photo-1485968579580-b6d095142e6e",
    "Client in a tartan coat stepping out of the studio",
  ),

  // Appointments page
  expect: unsplash(
    "photo-1550639525-c97d455acf70",
    "Client in a tailored black look during a fitting",
  ),

  // Garments (used by The Edit, Instagram strip, and later Collections)
  aurelia: unsplash(
    "photo-1566174053879-31528523f8ae",
    "Aurelia gown — plum, off-the-shoulder",
  ),
  crimson: unsplash(
    "photo-1595777457583-95e059d581b8",
    "Crimson Sweep — red full-skirted gown",
  ),
  noir: unsplash(
    "photo-1550639525-c97d455acf70",
    "Noir Column — black knit and quilted skirt",
  ),
  windowpane: unsplash(
    "photo-1594938298603-c8148c4dae35",
    "Windowpane three-piece suit in blue",
  ),
  midnight: unsplash(
    "photo-1617137968427-85924c800a22",
    "Midnight suit, navy, worn with a white shirt",
  ),
  navyClassic: unsplash(
    "photo-1507679799987-c73779587ccf",
    "The Navy Classic — navy suit with striped tie",
  ),
  tartanCoat: unsplash(
    "photo-1485968579580-b6d095142e6e",
    "Tartan wool coat styled over black",
  ),
  blushRuffle: unsplash(
    "photo-1581044777550-4cfa60707c03",
    "Blush ruffled off-the-shoulder blouse",
  ),
  powderCoat: unsplash(
    "photo-1539109136881-3be0616acf4b",
    "Powder-blue long coat with a pastel bag",
  ),
  gardenWrap: unsplash(
    "photo-1496747611176-843222e1e57c",
    "Floral wrap dress caught in the breeze",
  ),
  sheerBlouse: unsplash(
    "photo-1524504388940-b1c1722653e1",
    "Sheer black evening blouse",
  ),
  bordeauxCoat: unsplash(
    "photo-1483985988355-763728e1935b",
    "Bordeaux coat with black leather gloves",
  ),
} satisfies Record<string, Photo>;
