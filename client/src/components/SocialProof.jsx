import { Star } from "lucide-react";
import CountUp from "./CountUp.jsx";

export default function SocialProof() {
  return (
    <section className="border-y border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-6 py-10 text-center">
          <div className="font-display text-4xl font-bold text-gold">
            <CountUp value={500} suffix="+" />
          </div>
          <div className="mt-1 font-body text-sm text-bone/60">Vehicles detailed</div>
        </div>
        <div className="px-6 py-10 text-center">
          <div className="font-display text-4xl font-bold text-gold">
            <CountUp value={78} suffix="%" />
          </div>
          <div className="mt-1 font-body text-sm text-bone/60">Customers who recommend us</div>
        </div>
        <div className="px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-1 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <div className="mt-1 font-body text-sm text-bone/60">Rated by GTA customers</div>
        </div>
      </div>
    </section>
  );
}
