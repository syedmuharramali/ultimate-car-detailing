import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const PHONE = "647-492-2025";
const TEL = `tel:${PHONE.replace(/-/g, "")}`;

/**
 * Pinned Book Now bar — the CTA is always one thumb-tap away on a phone.
 * Hidden on the contact page, where the booking form is already on screen and
 * the bar would only cover it, and hidden on desktop where the nav CTA serves.
 */
export default function MobileBookBar() {
  const { pathname } = useLocation();
  const hidden = pathname.startsWith("/contact") || pathname.startsWith("/admin");

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          // Opaque, not blurred: this bar only ever renders on phones, where a
          // backdrop-filter would re-composite the page behind it every frame.
          className="fixed inset-x-0 bottom-0 z-[70] flex items-center gap-2.5 border-t border-border bg-graphite px-5 py-3 md:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <Link
            to="/contact"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent font-body text-sm font-semibold text-graphite shadow-[0_8px_26px_-8px_var(--color-accent)] active:scale-[0.98]"
          >
            Book now
          </Link>
          <a
            href={TEL}
            aria-label={`Call ${PHONE}`}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-bone active:scale-[0.98]"
          >
            <Phone size={18} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
