import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { CONTACT, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";
import { images } from "@/lib/images";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a commission, styling, press or collaborations? Get in touch with Harris.",
};

const ways = [
  { label: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL, external: true },
  { label: "WhatsApp", value: CONTACT.phone, href: CONTACT.whatsappUrl, external: true },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false },
  { label: "Studio", value: CONTACT.studio, href: undefined, external: false },
];

export default function ContactPage() {
  return (
    <main>
      <Hero
        image={images.heroContact}
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <em>talk.</em>
          </>
        }
      />

      <section className="section">
        <div className={`wrap ${styles.grid}`}>
          <div>
            <Reveal>
              <p className="eyebrow">Where questions meet answers</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className={styles.title}>
                We&apos;d love to <em>hear from you.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.24}>
              <p className={styles.intro}>
                Questions about a commission, styling, press or collaborations? Reach out through any of
                the channels below, or send a message and we&apos;ll reply personally.
              </p>
            </Reveal>

            <StaggerGroup className={styles.ways}>
              {ways.map((w) => (
                <StaggerItem key={w.label}>
                  {w.href ? (
                    <a
                      className={styles.way}
                      href={w.href}
                      {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <b>{w.value}</b>
                      <span>{w.label}</span>
                    </a>
                  ) : (
                    <div className={styles.way}>
                      <b>{w.value}</b>
                      <span>{w.label}</span>
                    </div>
                  )}
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1}>
              <p className={styles.hours}>{CONTACT.hours}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}