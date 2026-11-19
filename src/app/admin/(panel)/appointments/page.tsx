import type { Metadata } from "next";

import ui from "@/components/admin/ui.module.css";
import InboxBoard from "@/components/admin/InboxBoard";
import { requireAdmin } from "@/lib/admin/session";
import { listBookings } from "@/lib/admin/data";
import { bookingStatuses } from "@/lib/admin/types";

export const metadata: Metadata = { title: "Appointments" };

export default async function AppointmentsAdminPage() {
  await requireAdmin();
  const bookings = await listBookings();

  return (
    <>
      <header className={ui.header}>
        <div>
          <p className="eyebrow">Clients</p>
          <h1>Appointments</h1>
          <p>Requests from the booking form. Newest first.</p>
        </div>
      </header>
      <InboxBoard
        kind="bookings"
        items={bookings}
        statuses={bookingStatuses}
        emptyText="No appointment requests yet. They'll appear here as soon as someone books."
      />
    </>
  );
}