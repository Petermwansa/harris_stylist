"use client";

// If something goes wrong while loading an admin page (e.g. no internet),
// Harris sees this friendly message instead of a broken screen.
// error.tsx files must be client components; `reset` tries again.
export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ maxWidth: 520, padding: "60px 0" }}>
      <p className="eyebrow">Something went wrong</p>
      <h1 style={{ fontSize: 40, margin: "12px 0" }}>This page couldn&apos;t load.</h1>
      <p style={{ color: "var(--muted)", marginBottom: 26 }}>
        Please check your internet connection and try again. If it keeps happening, let your web developer know.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "14px 28px",
          background: "var(--gold)",
          color: "var(--white)",
          font: "500 11px var(--sans)",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
        }}
      >
        Try again
      </button>
    </div>
  );
}