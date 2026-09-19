import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const PHONE = "647-492-2025";
const TEL = `tel:${PHONE.replace(/-/g, "")}`;

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  // An open sheet over a scrolling page reads as broken; lock the body while
  // it is up and restore whatever overflow was there before.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky z-[60] border-b transition-colors duration-300",
        scrolled || open
          // backdrop-filter re-blurs everything behind a sticky bar on every
          // scroll frame. On mobile that is the single most expensive thing on
          // the page, so phones get an opaque bar instead.
          ? "border-border bg-graphite/95 md:bg-graphite/85 md:backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-3.5">
        <NavLink to="/" className="relative z-[60] flex flex-col leading-[0.95]">
          <span className="font-display text-[21px] font-extrabold tracking-[0.01em] text-bone">
            ULTIMATE
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] text-accent">
            CAR DETAILING
          </span>
        </NavLink>

        <nav className="hidden gap-7 font-body text-sm lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-1 transition-colors",
                  isActive ? "text-accent" : "text-text-secondary hover:text-bone"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="relative z-[60] flex items-center gap-2.5">
          <a
            href={TEL}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-accent/55 px-4 font-mono text-[13px] text-accent transition-colors hover:bg-accent hover:text-graphite"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 text-bone transition-colors hover:text-accent lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-graphite lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "block border-b border-border py-3.5 font-display text-2xl font-bold uppercase transition-colors",
                        isActive ? "text-accent" : "text-bone hover:text-accent"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
