import SplitStory from "@/components/sections/SplitStory";
import { images } from "@/lib/images";

// The home page's version of the shared SplitStory section.
export default function Intro() {
  return (
    <SplitStory
      eyebrow="Quiet luxury · Distinctive design"
      title={
        <>
          Clothes designed with <em>intention</em>, made to be lived in.
        </>
      }
      lead="Harris designs contemporary womenswear and menswear with a sharp eye for proportion, movement and finish, from bespoke commissions to limited ready-to-wear."
      body="Every client is fitted personally. Every detail is considered. The result is a garment that feels unmistakably yours, and unmistakably Harris."
      photos={[images.introLarge, images.introSmall]}
      verticalLabel="harris_stylist · atelier"
      cta={{ href: "/designer", label: "Meet the Designer" }}
    />
  );
}