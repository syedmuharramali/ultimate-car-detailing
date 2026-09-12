import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import BookingForm from "../components/BookingForm.jsx";

const PHONE = "647-492-2025";

// TODO: swap these placeholders for the client's real handles/email once he sends them.
const SOCIALS = {
  instagram: "https://instagram.com/ultimatecardetailing",
  facebook: "https://www.facebook.com/profile.php?id=100064043434818",
  email: "info@ultimatecardetailing.ca",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-12 max-w-xl">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-gold">Get in touch</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-bone sm:text-6xl">Let's book your detail.</h1>
        <p className="mt-4 font-body text-bone/65">Fill in the form and we'll confirm by phone or text — or reach out directly using any of the options below.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div className="space-y-6">
          <ContactRow icon={Phone} label="Call or text" value={PHONE} href={`tel:${PHONE.replace(/-/g, "")}`} />
          <ContactRow icon={Mail} label="Email" value={SOCIALS.email} href={`mailto:${SOCIALS.email}`} />
          <ContactRow icon={MapPin} label="Service area" value="GTA & Surrounding Areas" />
          <ContactRow icon={Instagram} label="Instagram" value="@ultimatecardetailing" href={SOCIALS.instagram} />
          <ContactRow icon={Facebook} label="Facebook" value="Ultimate Car Detailing" href={SOCIALS.facebook} />
        </div>

        <BookingForm />
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-panel px-5 py-4">
      <Icon size={20} className="mt-0.5 text-gold" />
      <div>
        <div className="font-body text-xs uppercase tracking-wider text-bone/45">{label}</div>
        <div className="font-body text-sm text-bone/85">{value}</div>
      </div>
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  );
}
