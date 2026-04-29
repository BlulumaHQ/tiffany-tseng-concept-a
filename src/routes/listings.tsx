import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ListingCard } from "@/components/ListingCard";
import { CTASection } from "@/components/CTASection";
import { listings } from "@/data/listings";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Vancouver Real Estate Listings — Tiffany Tseng PREC" },
      { name: "description", content: "Browse exclusive Metro Vancouver homes for sale with Tiffany Tseng PREC. Featured listings across Burnaby, Surrey, New Westminster, Tsawwassen and Vancouver." },
      { property: "og:title", content: "Vancouver Listings — Tiffany Tseng PREC" },
      { property: "og:description", content: "Featured homes across Metro Vancouver." },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  return (
    <SiteLayout>
      <section className="pt-36 pb-16 bg-cream">
        <div className="container-tight">
          <p className="eyebrow">Listings</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            Featured homes across Metro Vancouver.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            A curated selection of properties — from city condos to family homes
            and luxury estates.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-tight">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Looking for something specific?{" "}
            <a href="mailto:hello@tiffanytseng.com" className="text-accent underline-offset-4 hover:underline">
              Email Tiffany
            </a>{" "}
            for a personalized search.
          </p>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
