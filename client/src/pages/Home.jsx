import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import SocialProof from "../components/SocialProof.jsx";
import Services from "../components/Services.jsx";
import Process from "../components/Process.jsx";
import BookingTeaser from "../components/BookingTeaser.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SocialProof />
      <Services />
      <Process />
      <BookingTeaser />
    </>
  );
}
