import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Button from "@/components/ui/Button";
import { designerCredentials } from "@/lib/content";
import { images } from "@/lib/images";
import styles from "./Portrait.module.css";

// Half photo, half text. On desktop the photo is "sticky": it stays put
// while the taller text column scrolls past it (pure CSS — position: sticky).
export default function Portrait() {
  return (
    <section className={styles.portrait}>
      <div className={styles.photoCol}>
        <div className={styles.photo}>
          <Image src={images.designerPortrait.src} alt={images.designerPortrait.alt} fill sizes="(max-width: 1000px) 100vw, 50vw" className={styles.img} />
        </div>
      </div>

      <div className={styles.text}>
        <Reveal>
          <p className="eyebrow">The Designer</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={styles.name}>Harris</h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className={styles.role}>Fashion, made personal.</p>
        </Reveal>
        <Reveal delay={0.26}>
          <p className={styles.bio}>
            The hand behind every Harris piece. A designer and stylist who builds garments one
            conversation at a time, by hand and by eye, and dresses each client personally.
          </p>
          <p className={styles.bio}>
            Harris believes a garment should be built around a person, never the other way around,
            and that the most memorable clothes are the ones that feel completely natural to wear.
          </p>
        </Reveal>

        <StaggerGroup className={styles.creds}>
          {designerCredentials.map((c) => (
            <StaggerItem key={c.label} className={styles.cred}>
              <span>{c.label}</span>
              <b>{c.value}</b>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <Button href="/appointments" variant="solid">
            Request an Appointment
          </Button>
        </Reveal>
      </div>
    </section>
  );
}