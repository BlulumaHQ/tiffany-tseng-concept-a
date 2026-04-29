import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background">
      <div className="container-tight py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <p className="font-display text-2xl leading-tight">Tiffany Tseng</p>
          <p className="text-xs tracking-[0.28em] uppercase text-background/60 mt-2">
            Personal Real Estate Corporation
          </p>
          <p className="mt-6 text-sm text-background/70 leading-relaxed">
            A Vancouver Realtor with over a decade of experience guiding families,
            professionals, and investors through one of life's biggest milestones —
            with care, trust, and a personal touch.
          </p>
          <a
            href="https://www.instagram.com/tiffanytseng_realestate/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-background/80 hover:text-accent transition-colors"
          >
            <Instagram className="h-4 w-4" /> @tiffanytseng_realestate
          </a>
        </div>

        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-accent mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-background/80">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/listings" className="hover:text-accent">Listings</Link></li>
            <li><Link to="/buying" className="hover:text-accent">Buying</Link></li>
            <li><Link to="/selling" className="hover:text-accent">Selling</Link></li>
            <li><Link to="/communities" className="hover:text-accent">Communities</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-accent mb-5">Contact</p>
          <ul className="space-y-4 text-sm text-background/80">
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-accent" />
              <a href="tel:6047202545" className="hover:text-accent">604.720.2545</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-accent" />
              <a href="mailto:hello@tiffanytseng.com" className="hover:text-accent">hello@tiffanytseng.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-accent" />
              <span>#101 — 2806 Kingsway<br />Vancouver, BC V5R 5T5</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Tiffany Tseng Personal Real Estate Corporation. All rights reserved.</p>
          <p>RE/MAX City Realty</p>
        </div>
      </div>
    </footer>
  );
}
