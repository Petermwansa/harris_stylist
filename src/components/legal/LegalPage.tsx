import Reveal from "@/components/motion/Reveal";
import { LAST_UPDATED, type Block, type LegalDoc } from "@/lib/legal";
import styles from "./LegalPage.module.css";

// Wraps every [BRACKETED PLACEHOLDER] in a <mark>, so anything still to be
// filled in is highlighted in gold on the page — hard to miss before launch.
function withPlaceholders(text: string) {
  // split() with a capture group ( ) keeps the matches in the result:
  // "Hi [NAME]!" → ["Hi ", "[NAME]", "!"]
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <mark key={i} className={styles.placeholder}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function renderBlock(block: Block, i: number) {
  if (typeof block === "string") return <p key={i}>{withPlaceholders(block)}</p>;
  return (
    <ul key={i}>
      {block.list.map((item, j) => (
        <li key={j}>{withPlaceholders(item)}</li>
      ))}
    </ul>
  );
}

// One layout for BOTH legal pages: they differ only in their content.
// A server component — no animation library needed beyond the header reveal.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className={styles.page}>
      <header className={`wrap ${styles.head}`}>
        <Reveal>
          <p className="eyebrow">{doc.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className={styles.title}>{doc.title}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={styles.updated}>Last updated: {withPlaceholders(LAST_UPDATED)}</p>
          <p className={styles.intro}>{doc.intro}</p>
        </Reveal>

        {/* Only visible while developing (npm run dev), never on the live site */}
        {process.env.NODE_ENV !== "production" && (
          <p className={styles.devNote}>
            Template text — replace the highlighted placeholders and have it reviewed before launch.
            Edit it in <code>src/lib/legal.ts</code>.
          </p>
        )}
      </header>

      <div className={`wrap ${styles.layout}`}>
        {/* Table of contents: sticks beside the text on wide screens */}
        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocTitle}>On this page</p>
          <ol>
            {doc.sections.map((s) => (
              <li key={s.id}>
                {/* "#id" links glide to the section (Lenis anchors) */}
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.body}>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body.map(renderBlock)}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}