import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/admin/Icon";
import LocalTime from "@/components/admin/LocalTime";
import StatusChip from "@/components/admin/StatusChip";
import { requireAdmin } from "@/lib/admin/session";
import { getDashboard } from "@/lib/admin/data";
import { bookingStatuses, messageStatuses } from "@/lib/admin/types";
import ui from "@/components/admin/ui.module.css";
import styles from "./panel.module.css";

export const metadata: Metadata = { title: "Dashboard" };

const label = (list: readonly { id: string; label: string }[], id: string) => list.find((s) => s.id === id)?.label ?? id;

export default async function DashboardPage() {
  const session = await requireAdmin(); // every page checks — never rely on the layout alone
  const d = await getDashboard();

  const stats: { href: string; label: string; value: number; note: string; icon: IconName; highlight?: boolean }[] = [
    { href: "/admin/appointments", label: "New appointments", value: d.newBookings, note: "waiting for a reply", icon: "calendar", highlight: d.newBookings > 0 },
    { href: "/admin/messages", label: "New messages", value: d.newMessages, note: "unread", icon: "mail" },
    { href: "/admin/subscribers", label: "Subscribers", value: d.subscriberCount, note: "on the newsletter", icon: "users" },
    { href: "/collections", label: "Collection", value: d.workCount, note: "pieces on the website", icon: "grid" },
  ];

  return (
    <>
      <header className={ui.header}>
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>
            Welcome <em>back.</em>
          </h1>
          <p>Signed in as {session.email}</p>
        </div>
      </header>

      <div className={styles.stats}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${styles.stat} ${s.highlight ? styles.highlight : ""}`}>
            <span className={styles.statIcon}>
              <Icon name={s.icon} size={20} />
            </span>
            <span>{s.label}</span>
            <b>{s.value}</b>
            <small>{s.note}</small>
          </Link>
        ))}
      </div>

      <div className={styles.columns}>
        <section className={ui.card}>
          <div className={ui.cardHead}>
            <h2>Upcoming appointments</h2>
            <Link href="/admin/appointments" className={ui.link}>
              View all
            </Link>
          </div>
          {d.upcoming.length === 0 ? (
            <p className={ui.empty}>No upcoming appointments yet.</p>
          ) : (
            <ul className={`${ui.cardBody} ${styles.list}`}>
              {d.upcoming.map((b) => {
                const date = new Date(`${b.date}T00:00:00Z`);
                return (
                  <li key={b.id} className={styles.listRow}>
                    <div className={styles.rowLeft}>
                      <div className={styles.dateBadge}>
                        <small>{date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}</small>
                        <strong>{date.getUTCDate()}</strong>
                      </div>
                      <div>
                        <b>{b.name}</b>
                        <p>{[b.headline, b.when?.split(" · ").pop()].filter(Boolean).join(" · ")}</p>
                      </div>
                    </div>
                    <StatusChip status={b.status} label={label(bookingStatuses, b.status)} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className={ui.card}>
          <div className={ui.cardHead}>
            <h2>Latest messages</h2>
            <Link href="/admin/messages" className={ui.link}>
              View all
            </Link>
          </div>
          {d.latestMessages.length === 0 ? (
            <p className={ui.empty}>No messages yet.</p>
          ) : (
            <ul className={`${ui.cardBody} ${styles.list}`}>
              {d.latestMessages.map((m) => (
                <li key={m.id} className={styles.listRow}>
                  <div>
                    <b>{m.name}</b>
                    <p>
                      <LocalTime iso={m.createdAt} withTime={false} /> · {m.preview}
                    </p>
                  </div>
                  <StatusChip status={m.status} label={label(messageStatuses, m.status)} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}