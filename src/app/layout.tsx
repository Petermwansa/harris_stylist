import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/motion/PageTransition";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Headline font — a Didot/Bodoni style serif, the closest free match to Vogue.
// It's a variable font, so we don't list weights. We also load the "opsz"
// (optical size) axis so we can make the logo sturdier at small sizes.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

// Body / navigation font — a clean geometric sans.
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Harris — fashion designer and stylist. Bespoke couture, menswear tailoring and ready-to-wear, by appointment.";

export const metadata: Metadata = {
  // Lets the share image and links below use short paths like "/".
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Fashion Designer`,
    template: `%s · ${SITE_NAME}`, // inner pages become e.g. "Appointments · Harris Stylist"
  },
  description,
  keywords: ["fashion designer", "stylist", "bespoke couture", "bridal", "menswear tailoring", "harris_stylist"],
  // What WhatsApp, Instagram, Facebook, LinkedIn… show when the link is shared.
  // The image itself comes from app/opengraph-image.tsx automatically.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Fashion Designer`,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the loader's inline script may add
    // data-intro="seen" to <html> before React loads. That's intended.
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <PageTransition />
        </Providers>
      </body>
    </html>
  );
}