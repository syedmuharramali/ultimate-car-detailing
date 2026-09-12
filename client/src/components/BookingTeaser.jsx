import { Phone, MapPin } from "lucide-react";
import { MagneticLink, MagneticAnchor } from "./Magnetic.jsx";

const PHONE = "647-492-2025";

export default function BookingTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="rounded-sm border border-gold/30 bg-gradient-to-br from-panel to-graphite px-8 py-16 text-center sm:px-16">
        <h2 className="font-display text-4xl font-bold text-bone sm:text-5xl">
          Ready to look your best?
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-bone/65">
          Book online in under a minute, or reach us directly — we'll
          confirm a time and come straight to you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticLink
            to="/contact"
            className="rounded-full bg-gold px-8 py-4 font-body text-base font-semibold text-graphite"
          >
            Book online
          </MagneticLink>
          <MagneticAnchor
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="flex items-center gap-2 rounded-full border border-bone/25 px-8 py-4 font-body text-base text-bone/85 hover:border-bone/60"
          >
            <Phone size={18} />
            {PHONE}
          </MagneticAnchor>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 font-body text-sm text-bone/45">
          <MapPin size={14} />
          Mobile service across the GTA &amp; Surrounding Areas
        </div>
      </div>
    </section>
  );
}
