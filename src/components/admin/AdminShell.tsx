"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Icon, { type IconName } from "./Icon";
import { signOut } from "@/app/admin/actions";
import { easeOut } from "@/lib/motion";
import styles from "./AdminShell.module.css";

type NavItem = { href: string; label: string; icon: IconName; soon?: boolean };

const nav: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }],
  },
  {
    title: "Clients",
    items: [
      { href: "/admin/appointments", label: "Appointments", icon: "calendar" },
      { href: "/admin/messages", label: "Messages", icon: "mail" },
      { href: "/admin/subscribers", label: "Subscribers", icon: "users" },
    ],
  },
  {
    title: "Website",
    items: [
      { href: "/admin/content", label: "Pages & Images", icon: "pen", soon: true },
      { href: "/admin/collection", label: "Collection", icon: "grid", soon: true },
    ],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // "/admin" is only active on exactly /admin; others also match their sub-pages
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const sidebar = (
    <>
      <Link href="/admin" className={styles.brand} onClick={() => setMenuOpen(false)}>
        <b>HARRIS</b>
        <small>Atelier · Admin</small>
      </Link>

      <nav className={styles.nav} aria-label="Admin">
        {nav.map((group) => (
          <div key={group.title} className={styles.group}>
            <p className={styles.groupTitle}>{group.title}</p>
            {group.items.map((item) =>
              item.soon ? (
                <span key={item.href} className={`${styles.item} ${styles.disabled}`} aria-disabled="true">
                  <Icon name={item.icon} />
                  {item.label}
                  <em className={styles.soon}>Soon</em>
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.item} ${isActive(item.href) ? styles.active : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {/* One gold marker that glides to whichever link is active */}
                  {isActive(item.href) && (
                    <motion.span layoutId="admin-nav-active" className={styles.marker} transition={{ duration: 0.5, ease: easeOut }} />
                  )}
                  <Icon name={item.icon} />
                  {item.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </nav>

      <div className={styles.foot}>
        <a href="/" target="_blank" rel="noopener noreferrer" className={styles.item}>
          <Icon name="external" />
          View website
        </a>
        {/* A form whose action is a Server Action: works even before JavaScript loads */}
        <form action={signOut}>
          <button type="submit" className={styles.item}>
            <Icon name="out" />
            Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className={styles.shell}>
      {/* Desktop: always-visible sidebar */}
      <aside className={styles.sidebar}>{sidebar}</aside>

      {/* Phone/tablet: top bar + slide-in drawer */}
      <header className={styles.topbar}>
        <Link href="/admin" className={styles.brand}>
          <b>HARRIS</b>
          <small>Admin</small>
        </Link>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Icon name="menu" size={22} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.scrim}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className={`${styles.sidebar} ${styles.drawer}`}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <Icon name="close" size={20} />
              </button>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className={styles.main}>{children}</main>
    </div>
  );
}