import type { Metadata } from "next";
import { ToastProvider } from "@/components/admin/Toast";

// Everything under /admin. Private: search engines are told not to index it
// (robots.txt also disallows /admin).
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Harris Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}