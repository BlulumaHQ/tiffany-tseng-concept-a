import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, Instagram } from "lucide-react";
import { siteAssets } from "@/data/siteAssets";

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
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      {/* TOP BAR */}
      <div className="hidden lg:block bg-ink text-background">
        <div className="container-tight flex items-center justify-between h-9 text-[11px] tracking-[0.14em] uppercase">
          <div className="flex items-center gap-6 text-background/75">
            <a href="tel:6047202545" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-3.5 w-3.5" /> 604.720.2545
            </a>
            <a href="mailto:hello@tiffanytseng.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" /> hello@tiffanytseng.com
            </a>
            <a
              href="https://www.instagram.com/tiffanytseng_realestate/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" /> @tiffanytseng_realestate
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-background/60">RE/MAX City Realty</span>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 h-9 -my-px font-medium text-accent-foreground bg-accent hover:bg-background hover:text-foreground transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="container-tight flex items-center justify-between h-20 lg:h-24">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={siteAssets.brandLogo}
            alt="Tiffany Tseng Personal Real Estate Corporation"
            className="h-10 lg:h-12 w-auto object-contain"
            loading="eager"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-medium tracking-wide text-foreground/75 hover:text-accent transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile-only phone shortcut */}
        <a
          href="tel:6047202545"
          aria-label="Call Tiffany"
          className="lg:hidden mr-1 p-2 text-foreground"
        >
          <Phone className="h-5 w-5" />
        </a>

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
