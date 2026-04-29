import type { Listing } from "@/data/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a
      href={listing.href}
      target="_blank"
      rel="noreferrer"
      className="group block hover-lift"
    >
      <div className="img-zoom relative aspect-[4/3] bg-muted">
        <img
          src={listing.image}
          alt={listing.address}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {listing.isNew && (
          <span className="absolute top-4 left-4 bg-background/95 backdrop-blur text-[10px] tracking-[0.22em] uppercase font-medium px-3 py-1.5">
            New Listing
          </span>
        )}
        <span className="absolute bottom-4 right-4 bg-foreground text-background text-sm font-medium px-3 py-1.5">
          {listing.price}
        </span>
      </div>
      <div className="pt-5 pb-2">
        <p className="text-xs tracking-[0.22em] uppercase text-accent">{listing.area}</p>
        <h3 className="mt-2 font-display text-xl text-foreground group-hover:text-accent transition-colors">
          {listing.address}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">RE/MAX City Realty</p>
      </div>
    </a>
  );
}
