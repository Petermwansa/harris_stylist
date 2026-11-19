import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Expect from "@/components/sections/appointments/Expect";
import Process from "@/components/sections/home/Process";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/booking/BookingForm";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Appointments",
  description: "Book a studio fitting, home visit or virtual consultation with Harris.",
};

export default function AppointmentsPage() {
  return (
    <main>
      <Hero
        image={images.heroAppointments}
        eyebrow="Appointments"
        title={
          <>
            A conversation,
            <br />
            <em>not a consultation.</em>
          </>
        }
      />

      <Expect />

      {/* Reused from the home page — just a different background */}
      <Process background="bg-white" />

      {/* id="book" lets any link on the site jump here with /appointments#book */}
      <section id="book" className="section bg-cream">
        <div className="wrap">
          <SectionHeading
            center
            eyebrow="Begin the conversation"
            title={
              <>
                Request <em>an appointment</em>
              </>
            }
            text="This isn't just a form. It's the start of a conversation, and there are no wrong answers."
          />
          <BookingForm />
        </div>
      </section>
    </main>
  );
}