import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/motion/PageTransition";

// The layout for every PUBLIC page (everything inside the "(site)" folder).
// The brackets make it a "route group": it shares this layout but doesn't
// appear in the URL — app/(site)/designer/page.tsx is still /designer.
// The admin panel (app/admin) has its own, different layout.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
      <PageTransition />
    </Providers>
  );
}