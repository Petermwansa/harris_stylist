import Reveal from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/Parallax";
import Button from "@/components/ui/Button";
import type { Photo } from "@/lib/images";
import styles from "./SplitStory.module.css";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead: string; // first paragraph (dark)
  body: string; // second paragraph (muted)
  photos: [Photo, Photo]; // exactly two: [large, small]
  verticalLabel: string;
  cta?: { href: string; label: string };
};

// Text on the left, two overlapping photos on the right that scroll at
// different speeds. Used on the home page AND the designer page — that's
// why everything that differs comes in through props.
export default function SplitStory({ eyebrow, title, lead, body, photos, verticalLabel, cta }: Props) {
  const [large, small] = photos;

  return (
    <section className="section">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className={styles.title}>{title}</h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="rule" />
          </Reveal>
          <Reveal delay={0.24}>
            <p>{lead}</p>
            <p className={styles.muted}>{body}</p>
          </Reveal>
          {cta && (
            <Reveal delay={0.36} className={styles.cta}>
              <Button href={cta.href}>{cta.label}</Button>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className={styles.stack}>
          <ParallaxImage photo={large} speed={8} sizes="(max-width: 1000px) 80vw, 40vw" className={styles.large} />
          <ParallaxImage photo={small} speed={18} sizes="(max-width: 1000px) 45vw, 22vw" className={styles.small} />
          <span className={styles.vertical}>{verticalLabel}</span>
        </Reveal>
      </div>
    </section>
  );
}