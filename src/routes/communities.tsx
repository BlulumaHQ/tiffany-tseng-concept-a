import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { listings } from "@/data/listings";

const vancouverAerial = listings[0].image;

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "Metro Vancouver Communities — Tiffany Tseng PREC" },
      { name: "description", content: "Explore the Metro Vancouver communities Tiffany Tseng serves — from Burnaby and Surrey to New Westminster, Tsawwassen, and the heart of Vancouver." },
      { property: "og:title", content: "Communities — Tiffany Tseng PREC" },
      { property: "og:description", content: "Local expertise across Metro Vancouver neighborhoods." },
    ],
  }),
  component: CommunitiesPage,
});

const communities = [
  { name: "Vancouver", areas: ["Collingwood VE", "University VW", "Kingsway corridor"] },
  { name: "Burnaby", areas: ["Metrotown", "South Slope", "Edmonds"] },
  { name: "Surrey", areas: ["Fleetwood Tynehead", "Cloverdale", "Guildford"] },
  { name: "New Westminster", areas: ["The Heights", "Uptown", "Queens Park"] },
  { name: "Tsawwassen", areas: ["Tsawwassen North", "Boundary Bay"] },
  { name: "Tri-Cities & Beyond", areas: ["Coquitlam", "Port Moody", "Richmond"] },
];

function CommunitiesPage() {
  return (
    <SiteLayout>
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={vancouverAerial} alt="Vancouver aerial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/70" />
        </div>
        <div className="relative container-tight text-background">
          <p className="eyebrow text-accent">Communities</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            Local expertise across Metro Vancouver.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-background/80 leading-relaxed">
            From walkable city neighborhoods to family-friendly suburbs, I help clients
            find the community that fits their life.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {communities.map((c) => (
              <div key={c.name} className="bg-background p-10 hover:bg-cream transition-colors">
                <p className="font-display text-3xl text-foreground">{c.name}</p>
                <div className="gold-line my-6" />
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {c.areas.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-muted-foreground max-w-xl mx-auto">
            Don't see your area? Reach out — I work across all of Metro Vancouver and
            am happy to help with any neighborhood.
          </p>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
