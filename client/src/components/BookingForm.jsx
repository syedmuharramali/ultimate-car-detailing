import { useState } from "react";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SERVICES = [
  "Complete Interior Detailing",
  "Complete Exterior Wash",
  "Hand Wax",
  "Rims Cleaning",
  "Tire Shine",
  "Full Package (all of the above)",
];

const initialForm = {
  name: "", phone: "", vehicle: "", service: SERVICES[5],
  address: "", preferredDate: "", preferredTime: "", notes: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.vehicle || !form.address) {
      setStatus("error");
      setErrorMsg("Please fill in your name, phone, vehicle, and address.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Couldn't submit. Please call or WhatsApp us instead.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="rounded-sm border border-gold/30 bg-panel p-8 text-center"
      >
        <h3 className="font-display text-2xl font-bold text-gold">Request sent.</h3>
        <p className="mt-2 font-body text-bone/70">We'll text or call you shortly to confirm the time.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 font-body text-sm text-bone/50 underline hover:text-bone/80">
          Book another vehicle
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-sm border border-white/10 bg-panel p-8 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <h3 className="font-display text-2xl font-bold text-bone">Request a booking</h3>
        <p className="mt-1 font-body text-sm text-bone/55">We'll confirm by phone or text — no payment needed now.</p>
      </div>

      <Field label="Full name">
        <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="Jordan Smith" />
      </Field>
      <Field label="Phone number">
        <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="416-555-0123" type="tel" />
      </Field>
      <Field label="Vehicle (year, make, model)">
        <input value={form.vehicle} onChange={(e) => update("vehicle", e.target.value)} className="input" placeholder="2022 Honda Civic" />
      </Field>
      <Field label="Service">
        <select value={form.service} onChange={(e) => update("service", e.target.value)} className="input">
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Address (where we'll come to)" className="sm:col-span-2">
        <input value={form.address} onChange={(e) => update("address", e.target.value)} className="input" placeholder="Street, city" />
      </Field>
      <Field label="Preferred date">
        <input value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} className="input" type="date" />
      </Field>
      <Field label="Preferred time">
        <input value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} className="input" type="time" />
      </Field>
      <Field label="Anything else we should know?" className="sm:col-span-2">
        <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="input" rows={3} placeholder="Pet hair, spills, parking instructions, etc." />
      </Field>

      {status === "error" && <p className="sm:col-span-2 font-body text-sm text-danger">{errorMsg}</p>}

      <div className="sm:col-span-2">
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-graphite disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send booking request"}
        </motion.button>
      </div>

      <style>{`
        .input {
          background: #17171A;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 2px;
          padding: 0.65rem 0.85rem;
          color: #F3F1EA;
          font-family: Manrope, sans-serif;
          font-size: 0.9rem;
          width: 100%;
        }
        .input:focus { outline: 2px solid #C6A15B; outline-offset: 1px; }
      `}</style>
    </form>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="font-body text-xs uppercase tracking-wider text-bone/45">{label}</span>
      {children}
    </label>
  );
}
