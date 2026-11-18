// A <script> that runs while the browser is still reading the HTML —
// BEFORE anything is painted. (Pattern from the Next.js docs guide
// "How to prevent flash before hydration".)
// On the client we switch type to "text/plain" so React doesn't warn
// about rendering a script; suppressHydrationWarning hides that difference.
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}