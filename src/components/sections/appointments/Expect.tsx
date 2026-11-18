import Reveal from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/Parallax";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Button from "@/components/ui/Button";
import { appointmentFormats, whatToExpect } from "@/lib/content";
import { images } from "@/lib/images";
import styles from "./Expect.module.css";

const numerals = ["i.", "ii.", "iii.", "iv."];

export default function Expect() {
  return (
    <section className="section">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Reveal>
            <p className="eyebrow">The atelier</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className={styles.title}>
              We meet <em>before we begin.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="rule" />
          </Reveal>
          <Reveal delay={0.24}>
            <p>
              Before a single sketch is drawn or fabric chosen, we sit together. Harris wants to
              understand how you move, what you feel most yourself in, and the moment you&apos;re
              dressing for.
            </p>
          </Reveal>

          <StaggerGroup className={styles.list}>
            {whatToExpect.map((item, i) => (
              <StaggerItem key={item} className={styles.item}>
                <b>{numerals[i]}</b>
                <span>{item}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1} className={styles.cta}>
            {/* "#book" = the id of the booking section below. Lenis glides there. */}
            <Button href="#book" variant="solid">
              Request an Appointment
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ParallaxImage photo={images.expect} speed={10} sizes="(max-width: 1000px) 90vw, 45vw" className={styles.photo} />
        </Reveal>
      </div>

      <StaggerGroup className={`wrap ${styles.formats}`}>
        {appointmentFormats.map((f) => (
          <StaggerItem key={f.title} className={styles.format}>
            <p className="eyebrow">{f.tag}</p>
            <h3>{f.title}</h3>
            <p className={styles.formatText}>{f.text}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}