import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import Services from "../components/Services.jsx";
import SpecSheet from "../components/SpecSheet.jsx";
import Process from "../components/Process.jsx";
import SocialProof from "../components/SocialProof.jsx";
import BookingTeaser from "../components/BookingTeaser.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      {/* The reveal sits directly under the hero on purpose: proof before
          description is what converts on a detailing site. */}
      <BeforeAfter />
      <Services />
      <SpecSheet />
      <Process />
      <SocialProof />
      <BookingTeaser />
    </>
  );
}
