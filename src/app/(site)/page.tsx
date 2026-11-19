import HomeIntro from "@/components/sections/HomeIntro";
import Hero from "@/components/sections/Hero";
import FixedBand from "@/components/sections/FixedBand";
import Intro from "@/components/sections/home/Intro";
import TheEdit from "@/components/sections/home/TheEdit";
import QuoteStats from "@/components/sections/home/QuoteStats";
import Process from "@/components/sections/home/Process";
import Testimonials from "@/components/sections/home/Testimonials";
import InstagramStrip from "@/components/sections/home/InstagramStrip";
import Newsletter from "@/components/sections/home/Newsletter";
import Button from "@/components/ui/Button";
import { images } from "@/lib/images";
import Services from "@/components/sections/home/Services";

// The home page is now just a list of sections, top to bottom.
// Each section lives in its own file — easy to reorder, remove or reuse.
export default function HomePage() {
  return (
    <main>
      <HomeIntro>
        <Hero
          variant="home"
          image={images.heroHome}
          eyebrow="Couture · Ready-to-wear · Styling"
          title={
            <>
              Dressed for
              <br />
              the moment
              <br />
              <em>you&apos;ll remember.</em>
            </>
          }
        >
          <p>
            Each Harris piece starts as a conversation. It&apos;s cut, fitted and finished by hand
            until it could only belong to you.
          </p>
          <div style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
            <Button href="/appointments" variant="light">Book an Appointment</Button>
            <Button href="/collections" variant="link-light">View the Work</Button>
          </div>
        </Hero>
      </HomeIntro>

      <Intro />
      <Services />

      <FixedBand
        photo={images.bandAtelier}
        eyebrow="Inside the atelier"
        title={<>Where a feeling becomes a <em>silhouette.</em></>}
        text="Fabrics chosen for one commission at a time. Toiles pinned and re-pinned. A studio made for one client at a time, with nothing rushed."
        cta={{ href: "/designer", label: "The Atelier Story" }}
      />

      <TheEdit />
      <QuoteStats />
      <Process />

      <FixedBand
        align="left"
        photo={images.bandFitting}
        eyebrow="By appointment"
        title={<>Your fitting, <em>your time.</em></>}
        text="Studio appointments, home visits and virtual consultations. Reserve a private session and we'll be in touch within 48 hours to confirm."
        cta={{ href: "/appointments", label: "Book Your Appointment" }}
      />

      <Testimonials />
      <InstagramStrip />
      <Newsletter />
    </main>
  );
}