import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Heart, Sparkles, Target } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import interior1 from "@/assets/interior-1.jpg";
import { siteAssets } from "@/data/siteAssets";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tiffany Tseng — Vancouver Realtor with 10+ Years Experience" },
      { name: "description", content: "Meet Tiffany Tseng PREC, a Vancouver Realtor known for warmth, sharp negotiation, and a design-driven approach to marketing every listing beautifully." },
      { property: "og:title", content: "About Tiffany Tseng PREC" },
      { property: "og:description", content: "A decade of trusted real estate service across Metro Vancouver." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-36 pb-16 bg-cream">
        <div className="container-tight">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            A trusted partner in your real estate journey.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Built on a decade of experience, kindness, and genuine care for every client.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2 img-zoom aspect-[4/5] bg-muted lg:sticky lg:top-28">
            <img
              src={siteAssets.tiffanyPortrait}
              alt="Tiffany Tseng, Personal Real Estate Corporation"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-3 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="eyebrow">Tiffany Tseng PREC</p>
            <h2 className="font-display text-4xl text-foreground leading-tight">Your Vancouver real estate expert</h2>
            <div className="gold-line" />
            <p>
              I'm Tiffany Tseng, a Vancouver-based Realtor with more than a decade of
              experience helping families, professionals, and investors navigate the local
              market. Real estate isn't just about buying and selling homes to me — it's
              about guiding people through one of life's biggest milestones with care,
              trust, and a personal touch.
            </p>
            <p>
              Clients know me for my energy, warmth, and dedication. I bring a sharp eye
              for detail, strong market knowledge, and a design sensibility that ensures
              every home is showcased at its very best. From the first meeting to the
              final handshake, I'm here to make the process smooth, stress-free, and
              rewarding.
            </p>
            <p>
              Marketing is one of my specialties. I love telling the story of each
              property through creative visuals, thoughtful staging, and social media
              strategies that get real results. Every listing is presented with style and
              precision, so it stands out and attracts the right buyers.
            </p>
            <p>
              Whether you're purchasing your first condo, moving up to a family home, or
              selling a luxury estate, I provide full-service support — clear
              communication, skilled negotiation, and a tailored plan that puts your
              needs first.
            </p>
            <p>
              At Tiffany Tseng Personal Real Estate Corporation, I believe real estate
              should be more than a transaction. It's an experience — one handled with
              professionalism, kindness, and genuine care.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container-tight">
          <p className="eyebrow text-center">What I bring</p>
          <h2 className="mt-4 text-center font-display text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
            A thoughtful approach to every client.
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-90">
            <img
              src={siteAssets.medallion}
              alt="Medallion Club Member"
              className="h-20 md:h-24 w-auto object-contain"
              loading="lazy"
            />
            <img
              src={siteAssets.suttonMasters}
              alt="Sutton Masters Award 2022"
              className="h-20 md:h-24 w-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Warmth & Care", desc: "Every client is treated like family. Clear, kind communication at every step." },
              { icon: Target, title: "Sharp Negotiation", desc: "Skilled at securing the best terms — buying or selling." },
              { icon: Sparkles, title: "Design Sensibility", desc: "Beautiful listings, thoughtful staging, scroll-stopping visuals." },
              { icon: Award, title: "Local Expertise", desc: "Deep knowledge of Vancouver, Burnaby, Surrey, and beyond." },
            ].map((v) => (
              <div key={v.title} className="bg-background p-8 border border-border">
                <v.icon className="h-7 w-7 text-accent mb-6" strokeWidth={1.25} />
                <h3 className="font-display text-2xl text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-tight grid lg:grid-cols-2 gap-16 items-center">
          <div className="img-zoom aspect-[4/3] bg-muted order-last lg:order-first">
            <img src={interior1} alt="Modern interior" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">More than a transaction</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">An experience built on trust.</h2>
            <div className="gold-line my-8" />
            <p className="text-muted-foreground leading-relaxed">
              I work with clients across Metro Vancouver — first-time buyers, growing
              families, downsizers, and investors. The properties change. The promise
              doesn't: honest advice, tireless preparation, and a real partnership from
              first conversation to final handshake.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Start a Conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
