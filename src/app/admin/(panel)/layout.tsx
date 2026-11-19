import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/session";
import PanelLoading from "./PanelLoading";

// Every page inside "(panel)" gets the sidebar AND must be signed in.
//
// Checking the login reads a cookie, which only exists when a real person
// visits. With Cache Components on, that has to happen inside <Suspense>:
// the sidebar is ready instantly, and the page streams in once checked.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <Suspense fallback={<PanelLoading />}>
        <Gate>{children}</Gate>
      </Suspense>
    </AdminShell>
  );
}

async function Gate({ children }: { children: React.ReactNode }) {
  await requireAdmin(); // not signed in → redirected to /admin/login
  return children;
}