"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/ui/Logo";
import {allLinks, INSTAGRAM_URL, navLeft, navRight } from "@/lib/site";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname(); // e.g. "/designer" — tells us which link is active
  const [solid, setSolid] = useState(false); // transparent over the hero, solid after
  const [menuOpen, setMenuOpen] = useState(false);

  // useScroll gives us the page's scroll position as a "motion value".
  // Motion values update WITHOUT re-rendering React on every pixel —
  // we only call setSolid when the answer actually changes.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const shouldBeSolid = y > window.innerHeight * 0.6;
    if (shouldBeSolid !== solid) setSolid(shouldBeSolid);
  });

    // Every page in our menu starts with a dark hero photo, so the white,
  // see-through header looks right there. Anywhere else (like the 404 page)
  // there's no photo behind it, so it must be solid from the start.
  const overHero = allLinks.some((link) => link.href === pathname);
  const isSolid = solid || !overHero;

  // "/designer" is active on /designer; "/" only on exactly "/"
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const renderLinks = (links: typeof navLeft) =>
    links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={`${styles.link} ${isActive(link.href) ? styles.active : ""}`}
      >
        {link.label}
      </Link>
    ));

  return (
    <>
      <header className={`${styles.header} ${isSolid ? styles.solid : ""}`}>        <div className={styles.bar}>
          <nav className={styles.nav} aria-label="Main">
            {renderLinks(navLeft)}
          </nav>

          <Logo className={styles.logo} />

          <nav className={`${styles.nav} ${styles.right}`} aria-label="Secondary">
            {renderLinks(navRight)}
            <a className={styles.link} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <Link href="/appointments" className={`${styles.link} ${styles.book}`}>
              Book Appointment
            </Link>
          </nav>

          <button
            className={styles.burger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}