import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Button from "@/components/ui/Button";
import { services } from "@/lib/content";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className="section bg-white">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <Reveal>
              <p className="eyebrow">What we do</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className={styles.title}>
                The House <em>of Harris</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.24}>
            <Button href="/appointments" variant="link">
              Start a commission
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className={styles.grid}>
          {services.map((s) => (
            <StaggerItem key={s.title} className={styles.card}>
              <span className={styles.n}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}