import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import type { Photo } from "@/lib/images";
import styles from "./FixedBand.module.css";

type Props = {
  photo: Photo;
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  cta?: { href: string; label: string };
  align?: "left" | "right"; // which side the text sits on
};

// The photo stays perfectly still while the page scrolls over it.
// It's pure CSS — no JavaScript at all (see FixedBand.module.css).
export default function FixedBand({ photo, eyebrow, title, text, cta, align = "right" }: Props) {
  return (
    <section className={`${styles.band} ${styles[align]}`}>
      <div className={styles.bg}>
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className={styles.img} />
      </div>
      <div className={styles.frame} aria-hidden="true" />

      <div className={`wrap ${styles.inner}`}>
        <div className={styles.card}>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className={styles.title}>{title}</h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className={styles.text}>{text}</p>
          </Reveal>
          {cta && (
            <Reveal delay={0.36}>
              <Button href={cta.href} variant="light">
                {cta.label}
              </Button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}