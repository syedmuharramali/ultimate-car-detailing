import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

// TODO: swap these placeholders for the client's real handles/email once he sends them.
const SOCIALS = {
  instagram: "https://instagram.com/ultimatecardetailing",
  facebook: "https://www.facebook.com/profile.php?id=100064043434818",
  email: "mailto:info@ultimatecardetailing.ca",
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center font-body text-sm text-bone/45 sm:text-left">
          <span className="text-bone/70">Ultimate Car Detailing</span>{" "}
          &mdash; Mobile detailing, GTA &amp; Surrounding Areas
          <div className="mt-1">647-492-2025</div>
        </div>

        <nav className="flex gap-6 font-body text-sm text-bone/55">
          <Link to="/services" className="hover:text-bone">Services</Link>
          <Link to="/gallery" className="hover:text-bone">Gallery</Link>
          <Link to="/about" className="hover:text-bone">About</Link>
          <Link to="/contact" className="hover:text-bone">Contact</Link>
        </nav>

        <div className="flex gap-4">
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-bone/55 transition-colors hover:text-gold">
            <Instagram size={18} />
          </a>
          <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-bone/55 transition-colors hover:text-gold">
            <Facebook size={18} />
          </a>
          <a href={SOCIALS.email} aria-label="Email" className="text-bone/55 transition-colors hover:text-gold">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
