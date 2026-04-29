import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/listings", label: "Listings" },
  { to: "/buying", label: "Buying" },
  { to: "/selling", label: "Selling" },
  { to: "/communities", label: "Communities" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_1px_24px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-display text-xl tracking-tight text-foreground">Tiffany Tseng</span>
          <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mt-1">
            Personal Real Estate Corp.
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:6047202545"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            <Phone className="h-4 w-4" />
            604.720.2545
          </a>
          <Link
            to="/contact"
            className="ml-2 inline-flex items-center justify-center px-5 h-10 text-xs tracking-[0.18em] uppercase font-medium bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Book a Consultation
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 -mr-2 text-foreground"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-tight py-6 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/90 border-b border-border last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:6047202545"
              className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Phone className="h-4 w-4" /> 604.720.2545
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center px-5 h-12 text-xs tracking-[0.18em] uppercase font-medium bg-foreground text-background"
            >
              Book a Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
