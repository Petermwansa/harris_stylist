import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { instagramPhotos } from "@/lib/content";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";
import styles from "./InstagramStrip.module.css";

export default function InstagramStrip() {
  return (
    <section className={`section bg-white ${styles.section}`}>
      <div className={`wrap ${styles.head}`}>
        <div>
          <Reveal>
            <p className="eyebrow">Follow the atelier</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className={styles.title}>{INSTAGRAM_HANDLE}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.24}>
          <a className={styles.follow} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
          </a>
        </Reveal>
      </div>

      <Reveal className={styles.grid}>
        {instagramPhotos.map((photo, i) => (
          <a key={i} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.tile}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1000px) 33vw, 17vw" className={styles.img} />
            <span className={styles.hover}>View on Instagram</span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}