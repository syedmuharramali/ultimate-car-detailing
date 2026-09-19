import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShimmerButton from "@/components/magic/ShimmerButton.jsx";
import { cn } from "@/lib/utils";

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
  name: "",
  phone: "",
  vehicle: "",
  service: SERVICES[5],
  address: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
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
      setErrorMsg(err.message || "Couldn't submit. Please call or text us instead.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="flex flex-col items-center rounded-sm border border-accent/30 bg-panel p-10 text-center"
      >
        <CheckCircle2 size={34} className="text-accent" />
        <h3 className="mt-4 font-display text-2xl font-bold uppercase text-bone">Request sent.</h3>
        <p className="mt-2 font-body text-sm text-text-secondary">
          We'll text or call you shortly to confirm the time.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-body text-sm text-bone/50 underline underline-offset-4 transition-colors hover:text-bone"
        >
          Book another vehicle
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-sm border border-border bg-panel p-6 sm:grid-cols-2 sm:p-8"
    >
      <div className="sm:col-span-2">
        <h3 className="font-display text-2xl font-bold uppercase text-bone">Request a booking</h3>
        <p className="mt-1.5 font-body text-sm text-text-secondary">
          We'll confirm by phone or text — no payment needed now.
        </p>
      </div>

      <Field label="Full name" htmlFor="bf-name">
        <Input
          id="bf-name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Jordan Smith"
          autoComplete="name"
        />
      </Field>

      <Field label="Phone number" htmlFor="bf-phone">
        <Input
          id="bf-phone"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="416-555-0123"
          autoComplete="tel"
        />
      </Field>

      <Field label="Vehicle (year, make, model)" htmlFor="bf-vehicle">
        <Input
          id="bf-vehicle"
          value={form.vehicle}
          onChange={(e) => update("vehicle", e.target.value)}
          placeholder="2022 Honda Civic"
        />
      </Field>

      <Field label="Service" htmlFor="bf-service">
        <Select value={form.service} onValueChange={(v) => update("service", v)}>
          <SelectTrigger id="bf-service">
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Address (where we'll come to)" htmlFor="bf-address" className="sm:col-span-2">
        <Input
          id="bf-address"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Street, city"
          autoComplete="street-address"
        />
      </Field>

      <Field label="Preferred date" htmlFor="bf-date">
        <Input
          id="bf-date"
          type="date"
          value={form.preferredDate}
          onChange={(e) => update("preferredDate", e.target.value)}
        />
      </Field>

      <Field label="Preferred time" htmlFor="bf-time">
        <Input
          id="bf-time"
          type="time"
          value={form.preferredTime}
          onChange={(e) => update("preferredTime", e.target.value)}
        />
      </Field>

      <Field
        label="Anything else we should know?"
        htmlFor="bf-notes"
        className="sm:col-span-2"
      >
        <Textarea
          id="bf-notes"
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Pet hair, spills, parking instructions, etc."
        />
      </Field>

      {status === "error" && (
        <p
          role="alert"
          className="font-body text-sm text-danger sm:col-span-2"
        >
          {errorMsg}
        </p>
      )}

      <div className="sm:col-span-2">
        <ShimmerButton
          type="submit"
          disabled={status === "submitting"}
          className="h-13 w-full disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send booking request"}
        </ShimmerButton>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, children, className = "" }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
