"use client";

import { useState, useTransition } from "react";
import Icon from "./Icon";
import LocalTime from "./LocalTime";
import { useToast } from "./Toast";
import { deleteItem } from "@/app/admin/actions";
import type { Subscriber } from "@/lib/admin/types";
import ui from "./ui.module.css";
import styles from "./SubscribersTable.module.css";

export default function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  const toast = useToast();
  const [armed, setArmed] = useState<string | null>(null); // which row's "remove" is armed
  const [pending, startTransition] = useTransition();

  async function copyAll() {
    await navigator.clipboard.writeText(subscribers.map((s) => s.email).join(", "));
    toast(`${subscribers.length} emails copied`);
  }

  // Builds a CSV file in the browser and "clicks" a hidden download link.
  // Opens in Excel, Google Sheets, Mailchimp imports…
  function downloadCsv() {
    const rows = [["email", "subscribed_at"], ...subscribers.map((s) => [s.email, s.subscribedAt ?? ""])];
    const csv = rows.map((r) => r.map((v) => `"${v.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "harris-subscribers.csv" });
    a.click();
    URL.revokeObjectURL(url);
  }

  function remove(id: string) {
    if (armed !== id) return setArmed(id);
    startTransition(async () => {
      const result = await deleteItem("subscribers", id);
      setArmed(null);
      toast(result.ok ? "Subscriber removed" : result.error, result.ok ? "ok" : "error");
    });
  }

  if (subscribers.length === 0) {
    return (
      <div className={ui.card}>
        <p className={ui.empty}>No subscribers yet. They&apos;ll appear here when people join the newsletter.</p>
      </div>
    );
  }

  return (
    <div className={ui.card}>
      <div className={ui.cardHead}>
        <h2>
          {subscribers.length} {subscribers.length === 1 ? "subscriber" : "subscribers"}
        </h2>
        <div className={ui.headerActions}>
          <button className={ui.btn} onClick={copyAll}>
            <Icon name="copy" size={16} /> Copy all
          </button>
          <button className={`${ui.btn} ${ui.primary}`} onClick={downloadCsv}>
            <Icon name="download" size={16} /> Download CSV
          </button>
        </div>
      </div>

      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Joined</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </td>
                <td>
                  <LocalTime iso={s.subscribedAt} withTime={false} />
                </td>
                <td className={styles.actions}>
                  <button
                    className={`${ui.btn} ${armed === s.id ? ui.dangerArmed : ui.danger}`}
                    onClick={() => remove(s.id)}
                    disabled={pending}
                  >
                    {armed === s.id ? "Confirm" : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}