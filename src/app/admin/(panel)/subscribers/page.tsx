import type { Metadata } from "next";
import SubscribersTable from "@/components/admin/SubscribersTable";
import { requireAdmin } from "@/lib/admin/session";
import { listSubscribers } from "@/lib/admin/data";
import ui from "@/components/admin/ui.module.css";

export const metadata: Metadata = { title: "Subscribers" };

export default async function SubscribersAdminPage() {
  await requireAdmin();
  const subscribers = await listSubscribers();

  return (
    <>
      <header className={ui.header}>
        <div>
          <p className="eyebrow">Clients</p>
          <h1>Subscribers</h1>
          <p>People who joined the newsletter on the website.</p>
        </div>
      </header>
      <SubscribersTable subscribers={subscribers} />
    </>
  );
}