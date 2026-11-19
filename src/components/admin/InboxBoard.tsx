"use client";

import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "./Icon";
import LocalTime from "./LocalTime";
import StatusChip from "./StatusChip";
import { useToast } from "./Toast";
import { deleteItem, setStatus } from "@/app/admin/actions";
import type { InboxItem, InboxKind } from "@/lib/admin/types";
import { easeOut } from "@/lib/motion";
import ui from "./ui.module.css";
import styles from "./InboxBoard.module.css";

type Props = {
  kind: InboxKind;
  items: InboxItem[];
  statuses: readonly { id: string; label: string }[];
  emptyText: string;
};

// The same board shows appointments AND messages — only the data differs.
export default function InboxBoard({ kind, items, statuses, emptyText }: Props) {
  const toast = useToast();
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [armedDelete, setArmedDelete] = useState(false); // "click again to delete"
  const [pending, startTransition] = useTransition();

  const labelFor = (id: string) => statuses.find((s) => s.id === id)?.label ?? id;
  const countFor = (id: string) => (id === "all" ? items.length : items.filter((i) => i.status === id).length);

  // useMemo = only re-filter when the inputs actually change
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (filter === "all" || i.status === filter) &&
        (!q || `${i.name} ${i.email} ${i.phone} ${i.headline}`.toLowerCase().includes(q)),
    );
  }, [items, filter, query]);

  const selected = items.find((i) => i.id === selectedId) ?? null;

  // Choosing another item also cancels any half-finished "delete?" click.
  // (Done right here in the click, not in a useEffect — fewer re-renders.)
  function select(id: string | null) {
    setSelectedId(id);
    setArmedDelete(false);
  }

  function changeStatus(status: string) {
    if (!selected || selected.status === status) return;
    startTransition(async () => {
      const result = await setStatus(kind, selected.id, status);
      toast(result.ok ? `Marked as ${labelFor(status).toLowerCase()}` : result.error, result.ok ? "ok" : "error");
    });
  }

  function remove() {
    if (!selected) return;
    if (!armedDelete) return setArmedDelete(true); // first click only "arms" the button
    startTransition(async () => {
      const result = await deleteItem(kind, selected.id);
      if (result.ok) {
        select(null);
        toast("Deleted");
      } else toast(result.error, "error");
    });
  }

  const whatsapp = selected?.phone.replace(/[^\d]/g, "");

  return (
    <div className={styles.board}>
      {/* ---------- Filters ---------- */}
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist">
          {[{ id: "all", label: "All" }, ...statuses].map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={filter === s.id}
              className={`${styles.tab} ${filter === s.id ? styles.tabOn : ""}`}
              onClick={() => setFilter(s.id)}
            >
              {s.label} <sup>{countFor(s.id)}</sup>
              {filter === s.id && <motion.span layoutId={`${kind}-tab`} className={styles.tabLine} />}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <Icon name="search" size={16} />
          <input placeholder="Search name, email, phone…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>

      <div className={styles.split}>
        {/* ---------- The list ---------- */}
        <div className={`${ui.card} ${styles.list}`}>
          {visible.length === 0 ? (
            <p className={ui.empty}>{items.length === 0 ? emptyText : "Nothing matches this filter."}</p>
          ) : (
            <ul>
              {visible.map((item) => (
                <li key={item.id}>
                  <button
                    className={`${styles.row} ${item.id === selectedId ? styles.rowOn : ""}`}
                    onClick={() => select(item.id)}
                  >
                    {item.status === "new" && <span className={styles.dot} aria-label="New" />}
                    <span className={styles.rowMain}>
                      <b>{item.name}</b>
                      <span className={styles.rowHeadline}>{item.headline}</span>
                      {item.when && <span className={styles.rowWhen}>{item.when}</span>}
                    </span>
                    <span className={styles.rowSide}>
                      <StatusChip status={item.status} label={labelFor(item.status)} />
                      <small>
                        <LocalTime iso={item.createdAt} withTime={false} />
                      </small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ---------- The detail panel ---------- */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.section
              key={selected.id}
              className={`${ui.card} ${styles.detail}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <button className={styles.back} onClick={() => select(null)}>
                <Icon name="back" size={16} /> Back to list
              </button>

              <header className={styles.detailHead}>
                <StatusChip status={selected.status} label={labelFor(selected.status)} />
                <h2>{selected.name}</h2>
                <p>
                  Received <LocalTime iso={selected.createdAt} />
                </p>
                {selected.when && <p className={styles.when}>{selected.when}</p>}
              </header>

              <div className={styles.contactRow}>
                {selected.email && (
                  <a className={ui.btn} href={`mailto:${selected.email}`}>
                    <Icon name="mail" size={16} /> Email
                  </a>
                )}
                {whatsapp && (
                  <a className={ui.btn} href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" size={16} /> WhatsApp
                  </a>
                )}
                {selected.phone && (
                  <a className={ui.btn} href={`tel:${selected.phone}`}>
                    <Icon name="phone" size={16} /> Call
                  </a>
                )}
              </div>

              <dl className={styles.facts}>
                <div>
                  <dt>Email</dt>
                  <dd>{selected.email || "—"}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{selected.phone || "—"}</dd>
                </div>
                {selected.details.map((row) => (
                  <div key={row.label} className={row.value.length > 60 ? styles.wide : ""}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.statusBox}>
                <p className={styles.statusTitle}>Status</p>
                <div className={styles.segments}>
                  {statuses.map((s) => (
                    <button
                      key={s.id}
                      className={`${styles.segment} ${selected.status === s.id ? styles.segmentOn : ""}`}
                      onClick={() => changeStatus(s.id)}
                      disabled={pending}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`${ui.btn} ${armedDelete ? ui.dangerArmed : ui.danger} ${styles.delete}`}
                onClick={remove}
                disabled={pending}
              >
                <Icon name="trash" size={16} />
                {armedDelete ? "Click again to delete forever" : "Delete"}
              </button>
            </motion.section>
          ) : (
            <motion.div
              key="none"
              className={styles.placeholder}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className={styles.placeholderMark}>H</span>
              <p>Select {kind === "bookings" ? "an appointment" : "a message"} to see the details.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}