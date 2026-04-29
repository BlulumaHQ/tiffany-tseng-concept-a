import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, Key, MapPin, Sparkles, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ListingCard } from "@/components/ListingCard";
import { CTASection } from "@/components/CTASection";
import { listings } from "@/data/listings";
import heroHome from "@/assets/hero-home.jpg";
import vancouverAerial from "@/assets/vancouver-aerial.jpg";
import { siteAssets } from "@/data/siteAssets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiffany Tseng PREC — Vancouver Realtor | Buy & Sell with Confidence" },
      { name: "description", content: "Tiffany Tseng is a Vancouver Realtor with 10+ years of experience helping clients buy and sell homes across Metro Vancouver. Personalized service, premium marketing." },
      { property: "og:title", content: "Tiffany Tseng — Vancouver Real Estate" },
      { property: "og:description", content: "Premium real estate guidance across Vancouver, Burnaby, Surrey & beyond." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroHome}
            alt="Luxury Vancouver home at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/85" />
        </div>
        <div className="relative container-tight pt-32 pb-20 text-background">
          <p className="eyebrow text-accent">Vancouver · Burnaby · Surrey</p>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-[5.25rem] leading-[1.02] max-w-4xl">
            Your dream home, found with care.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-background/80 leading-relaxed">
            Tiffany Tseng PREC — a decade of guiding families, professionals, and investors
            through Vancouver's most important real estate decisions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 h-13 py-4 text-xs tracking-[0.22em] uppercase font-medium bg-accent text-accent-foreground hover:bg-background hover:text-foreground transition-colors"
            >
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/listings"
              className="inline-flex items-center justify-center px-8 h-13 py-4 text-xs tracking-[0.22em] uppercase font-medium border border-background/40 text-background hover:bg-background hover:text-foreground transition-colors"
            >
              View Listings
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-cream">
        <div className="container-tight py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { k: "10+", v: "Years of Experience" },
            { k: "RE/MAX", v: "City Realty" },
            { k: "Metro", v: "Vancouver Specialist" },
            { k: "Full-Service", v: "Buy · Sell · Invest" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-display text-3xl text-foreground">{s.k}</p>
              <p className="mt-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-24 md:py-32">
        <div className="container-tight">
          <div className="flex items-end justify-between gap-8 mb-14 flex-wrap">
            <div>
              <p className="eyebrow">Featured Properties</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-xl leading-tight">
                Exclusive homes for sale across Metro Vancouver
              </h2>
            </div>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent border-b border-foreground hover:border-accent pb-1 transition-colors"
            >
              View All Listings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {listings.slice(0, 6).map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow">How I Can Help</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Full-service real estate, tailored to you.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                icon: Key,
                title: "Buying",
                desc: "From your first condo to a family home, get expert guidance, sharp negotiation, and a tailored search strategy.",
                href: "/buying" as const,
              },
              {
                icon: Sparkles,
                title: "Selling",
                desc: "Premium staging, creative marketing, and storytelling that positions your home to attract the right buyers.",
                href: "/selling" as const,
              },
              {
                icon: MapPin,
                title: "Communities",
                desc: "Deep local knowledge across Vancouver, Burnaby, Surrey, New Westminster, and beyond.",
                href: "/communities" as const,
              },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.href}
                className="group bg-background p-10 md:p-12 hover:bg-foreground hover:text-background transition-colors duration-500"
              >
                <s.icon className="h-8 w-8 text-accent mb-8" strokeWidth={1.25} />
                <h3 className="font-display text-3xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/75 transition-colors">
                  {s.desc}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase font-medium">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 md:py-32">
        <div className="container-tight grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="img-zoom aspect-[4/5] bg-muted">
            <img
              src={siteAssets.tiffanyPortrait}
              alt="Tiffany Tseng, Vancouver Realtor"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Meet Tiffany</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Your Vancouver real estate expert.
            </h2>
            <div className="gold-line my-8" />
            <p className="text-base leading-relaxed text-muted-foreground">
              I'm Tiffany Tseng, a Vancouver-based Realtor with more than a decade of
              experience helping families, professionals, and investors navigate the
              local market. Real estate isn't just about buying and selling — it's
              about guiding people through one of life's biggest milestones with care,
              trust, and a personal touch.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Clients know me for my energy, warmth, and dedication. I bring a sharp eye
              for detail, strong market knowledge, and a design sensibility that
              ensures every home is showcased at its very best.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent border-b border-foreground hover:border-accent pb-1 transition-colors"
            >
              More About Tiffany <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-24 bg-ink text-background">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <p className="eyebrow text-accent">At Your Service</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
                Helpful Vancouver real estate resources.
              </h2>
            </div>
            <p className="text-background/70 max-w-md">
              From market alerts to mortgage calculators and home evaluations — everything
              you need to make confident decisions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10">
            {[
              { title: "Listing Alerts", desc: "Be first to know about new homes." },
              { title: "Mortgage Calculator", desc: "Estimate your monthly payment." },
              { title: "Home Evaluation", desc: "Free, no-obligation valuation." },
              { title: "Home Search", desc: "Browse all Metro Vancouver listings." },
            ].map((r) => (
              <Link
                key={r.title}
                to="/contact"
                className="bg-ink p-8 hover:bg-accent hover:text-accent-foreground transition-colors group"
              >
                <h3 className="font-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm text-background/65 group-hover:text-accent-foreground/80">
                  {r.desc}
                </p>
                <ArrowRight className="h-5 w-5 mt-6 text-accent group-hover:text-accent-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
