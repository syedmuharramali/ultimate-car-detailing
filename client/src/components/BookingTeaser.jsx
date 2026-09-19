import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import ShimmerButton from "@/components/magic/ShimmerButton.jsx";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/magic/Reveal.jsx";

const PHONE = "647-492-2025";
const TEL = `tel:${PHONE.replace(/-/g, "")}`;

export default function BookingTeaser() {
  return (
    <section id="book" className="cv-auto mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-sm border border-accent/30 bg-[linear-gradient(150deg,#171613,#0c0b0a_72%)] px-6 py-12 text-center sm:px-16 sm:py-18">
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Book a detail
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] text-bone sm:text-5xl">
              Ready to look
              <br />
              your best?
            </h2>
            <p className="max-w-[52ch] font-body text-[15px] leading-relaxed text-text-secondary">
              Tell us the vehicle and where it's parked. We'll confirm a time by phone
              or text — usually the same day.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3.5">
              <ShimmerButton as={Link} to="/contact">
                Request a booking
              </ShimmerButton>
              <Button asChild variant="subtle" size="lg">
                <a href={TEL}>
                  <Phone size={16} className="text-accent" />
                  {PHONE}
                </a>
              </Button>
            </div>

            <p className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-bone/40">
              <MapPin size={13} />
              Mobile service across the GTA &amp; surrounding areas
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
