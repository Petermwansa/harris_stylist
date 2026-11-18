import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/collections/Gallery";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Collections",
  description: "Couture, bridal, menswear and ready-to-wear pieces by Harris.",
};

export default function CollectionsPage() {
  return (
    <main>
      <Hero
        image={images.heroCollections}
        eyebrow="The Portfolio"
        title={
          <>
            Collections &amp; <em>Lookbook</em>
          </>
        }
      />

      <section className="section">
        <div className="wrap">
          <Gallery />

          <Reveal className="center-block">
            <p className="lead-italic">Love a piece? We can make it yours, in your size and fabric.</p>
            <Button href="/appointments" variant="solid">
              Request a Custom Version
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}