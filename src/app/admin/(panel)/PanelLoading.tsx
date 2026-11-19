import styles from "./panel.module.css";

// Shown for a split second while a page loads: soft "shimmering" placeholders
export default function PanelLoading() {
  return (
    <div className={styles.loading} aria-label="Loading">
      <span className={styles.shimmer} style={{ width: 120, height: 10 }} />
      <span className={styles.shimmer} style={{ width: "40%", height: 44, marginTop: 14 }} />
      <span className={styles.shimmer} style={{ width: "100%", height: 260, marginTop: 34 }} />
    </div>
  );
}