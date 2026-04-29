import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Megaphone, LineChart, Home } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import heroHome from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/selling")({
  head: () => ({
    meta: [
      { title: "Sell Your Vancouver Home — Premium Marketing by Tiffany Tseng" },
      { name: "description", content: "Sell your Vancouver home with Tiffany Tseng PREC. Premium photography, thoughtful staging, social-first marketing, and skilled negotiation that gets results." },
      { property: "og:title", content: "Selling — Tiffany Tseng PREC" },
      { property: "og:description", content: "Premium marketing & expert representation for Vancouver sellers." },
    ],
  }),
  component: SellingPage,
});

const services = [
  { icon: LineChart, title: "Strategic Pricing", desc: "Data-driven pricing strategy informed by current local market conditions." },
  { icon: Home, title: "Staging & Prep", desc: "Thoughtful staging and pre-list recommendations that maximize appeal." },
  { icon: Camera, title: "Premium Visuals", desc: "Professional photography, video, and storytelling that make every listing shine." },
  { icon: Megaphone, title: "Social Marketing", desc: "Reach buyers where they spend time — Instagram, Reels, and beyond." },
];

function SellingPage() {
  return (
    <SiteLayout>
      <section className="relative pt-36 pb-24 overflow-hidden bg-ink text-background">
        <div className="absolute inset-0 opacity-30">
          <img src={heroHome} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container-tight">
          <p className="eyebrow text-accent">For Sellers</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            Beautifully marketed. Expertly sold.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-background/75 leading-relaxed">
            Marketing is my specialty. Every property is presented with style and
            precision, so it stands out and attracts the right buyers.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium bg-accent text-accent-foreground hover:bg-background hover:text-foreground transition-colors"
          >
            Request a Free Home Evaluation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight">
          <p className="eyebrow">The Difference</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-2xl leading-tight">
            Marketing that makes your home unforgettable.
          </h2>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((s) => (
              <div key={s.title} className="bg-background p-10">
                <s.icon className="h-7 w-7 text-accent" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container-tight max-w-3xl text-center">
          <p className="eyebrow">Free Home Evaluation</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            Curious what your home is worth in today's market?
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Get a free, no-obligation valuation grounded in current local data and
            recent comparable sales — plus tailored recommendations to maximize your sale.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Request Your Evaluation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
