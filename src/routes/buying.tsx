import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, FileText, Handshake, Key } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import interior1 from "@/assets/interior-1.jpg";

export const Route = createFileRoute("/buying")({
  head: () => ({
    meta: [
      { title: "Buying a Home in Vancouver — Tiffany Tseng PREC" },
      { name: "description", content: "Buy your next home in Vancouver with Tiffany Tseng PREC. Expert guidance, tailored property searches, and skilled negotiation from offer to close." },
      { property: "og:title", content: "Buying — Tiffany Tseng PREC" },
      { property: "og:description", content: "Expert buyer representation across Metro Vancouver." },
    ],
  }),
  component: BuyingPage,
});

const steps = [
  { icon: Search, title: "Discovery", desc: "We start with your goals, budget, and lifestyle to define the perfect property profile." },
  { icon: FileText, title: "Search & Tour", desc: "Curated listings, private showings, and honest insights on every property we visit." },
  { icon: Handshake, title: "Offer & Negotiate", desc: "Strategic offers backed by market data and skilled negotiation on your behalf." },
  { icon: Key, title: "Close & Move In", desc: "Smooth coordination through inspection, financing, and possession day." },
];

function BuyingPage() {
  return (
    <SiteLayout>
      <section className="pt-36 pb-16 bg-cream">
        <div className="container-tight grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="eyebrow">For Buyers</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05]">
              Find a home you'll truly love.
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            Buying a home is one of life's biggest decisions. I'm here to make it
            clear, calm, and confident — from first showing to final handshake.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-tight">
          <p className="eyebrow">The Process</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-2xl leading-tight">
            A clear path from search to keys in hand.
          </h2>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-background p-10">
                <p className="font-display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                <s.icon className="h-6 w-6 mt-6 text-foreground" strokeWidth={1.25} />
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container-tight grid lg:grid-cols-2 gap-16 items-center">
          <div className="img-zoom aspect-[4/3] bg-muted">
            <img src={interior1} alt="Modern Vancouver condo" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">Why work with me</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Knowledge, energy, and a real plan.
            </h2>
            <div className="gold-line my-8" />
            <ul className="space-y-5 text-muted-foreground">
              {[
                "Deep market knowledge across Vancouver, Burnaby, Surrey & beyond",
                "Tailored property search aligned with your lifestyle and goals",
                "Honest insight on value, condition, and long-term potential",
                "Skilled negotiation that protects your interests",
                "Clear communication every step of the way",
              ].map((b) => (
                <li key={b} className="flex gap-4">
                  <span className="mt-2 h-px w-6 bg-accent shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Start Your Search <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
