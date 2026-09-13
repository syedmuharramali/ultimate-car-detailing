import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, X, Home, Sparkles, Camera, Info, Mail } from "lucide-react";
import { MagneticAnchor } from "./Magnetic.jsx";

const PHONE = "647-492-2025";

const LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Sparkles },
  { to: "/gallery", label: "Gallery", icon: Camera },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || isOpen
          ? "border-border bg-section/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="leading-none relative z-50">
          <div className="font-display text-2xl font-bold tracking-tight text-text-primary">
            ULTIMATE
          </div>
          <div className="-mt-1 font-display text-xs tracking-[0.35em] text-gold">
            CAR DETAILING
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 font-body text-sm md:flex">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 py-1 transition-colors ${
                    isActive ? "text-gold" : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={`transition-colors ${isActive ? "text-gold" : "text-steel"}`}
                    />
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Side: CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-50">
          <MagneticAnchor
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="flex items-center gap-2 rounded-full border border-gold/60 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-base"
          >
            <Phone size={15} />
            <span className="hidden sm:inline">{PHONE}</span>
          </MagneticAnchor>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-primary md:hidden hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] border-t border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8 px-6 bg-section/95 backdrop-blur-md">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-base font-body transition-colors ${
                    isActive ? "text-gold" : "text-text-secondary hover:text-text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={`transition-colors ${isActive ? "text-gold" : "text-steel"}`}
                    />
                    {link.label}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Mobile CTA inside menu */}
          <MagneticAnchor
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="mt-2 flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-base"
          >
            <Phone size={16} />
            <span>{PHONE}</span>
          </MagneticAnchor>
        </div>
      </div>
    </header>
  );
}