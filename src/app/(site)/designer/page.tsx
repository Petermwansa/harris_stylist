import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SplitStory from "@/components/sections/SplitStory";
import FixedBand from "@/components/sections/FixedBand";
import Portrait from "@/components/sections/designer/Portrait";
import Timeline from "@/components/sections/designer/Timeline";
import Truths from "@/components/sections/designer/Truths";
import ScrollWords from "@/components/motion/ScrollWords";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Designer",
  description: "Meet Harris — the fashion designer and stylist behind every piece.",
};

export default function DesignerPage() {
  return (
    <main>
      <Hero
        image={images.heroDesigner}
        eyebrow="My journey"
        title={
          <>
            From a single
            <br />
            <em>conviction.</em>
          </>
        }
      />

      {/* Same component as the home page intro — different content */}
      <SplitStory
        eyebrow="The beginning"
        title={
          <>
            Fashion is not decoration. <em>It is authorship.</em>
          </>
        }
        lead="Harris founded the label on one idea: a garment should be built around a person, never the other way around. What began as styling friends for special occasions grew into a full atelier for couture, tailoring and ready-to-wear."
        body="The process is deliberately slow. The first meeting is entirely about listening, until he understands the client, the occasion and the version of themselves they want to step into."
        photos={[images.designerRail, images.designerFabrics]}
        verticalLabel="harris_stylist · est."
      />

      <Portrait />

      <section className="section">
        <div className="wrap">
          <ScrollWords
            className="pull-quote"
            text="“A garment made for one person, for one moment, is categorically different from anything bought off a rail.”"
            highlight={["categorically", "different"]}
          />
          <Reveal className="center-block" delay={0.1}>
            <p className="eyebrow">— Harris</p>
          </Reveal>
        </div>
      </section>

      <Timeline />

      <FixedBand
        photo={images.bandStudio}
        eyebrow="Inside the studio"
        title={
          <>
            Made for one person <em>at a time.</em>
          </>
        }
        text="Consultations happen privately, away from the floor. Each fabric is chosen for a single commission."
      />

      <Truths />

      <section className="section bg-cream">
        <div className="wrap center-text">
          <Reveal>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="big-quote">
              I have never felt so seen by a piece of clothing. Harris listened, and then made something
              better than I imagined.
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="eyebrow" style={{ marginTop: 30 }}>
              Client name · Evening gown
            </p>
          </Reveal>
          <Reveal delay={0.3} className="center-block">
            <Button href="/appointments">Begin your commission</Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}