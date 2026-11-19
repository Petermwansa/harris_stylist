import type { Metadata } from "next";
import InboxBoard from "@/components/admin/InboxBoard";
import { requireAdmin } from "@/lib/admin/session";
import { listMessages } from "@/lib/admin/data";
import { messageStatuses } from "@/lib/admin/types";
import ui from "@/components/admin/ui.module.css";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesAdminPage() {
  await requireAdmin();
  const messages = await listMessages();

  return (
    <>
      <header className={ui.header}>
        <div>
          <p className="eyebrow">Clients</p>
          <h1>Messages</h1>
          <p>Everything sent through the contact form.</p>
        </div>
      </header>
      <InboxBoard
        kind="messages"
        items={messages}
        statuses={messageStatuses}
        emptyText="No messages yet. They'll appear here when someone uses the contact form."
      />
    </>
  );
}