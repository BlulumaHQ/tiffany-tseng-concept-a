import { Link } from "@tanstack/react-router";
import { listings } from "@/data/listings";

const vancouverAerial = listings[5].image;

export function CTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={vancouverAerial}
          alt="Vancouver"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
      </div>
      <div className="relative container-tight text-center text-background">
        <p className="eyebrow">Let's connect</p>
        <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto">
          We look forward to building a relationship with you.
        </h2>
        <p className="mt-6 text-base md:text-lg text-background/75 max-w-xl mx-auto">
          Whether you're buying your first condo or selling a luxury estate,
          let's talk about your next move.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium bg-accent text-accent-foreground hover:bg-background hover:text-foreground transition-colors"
          >
            Book a Consultation
          </Link>
          <a
            href="tel:6047202545"
            className="inline-flex items-center justify-center px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium border border-background/40 text-background hover:bg-background hover:text-foreground transition-colors"
          >
            Call 604.720.2545
          </a>
        </div>
      </div>
    </section>
  );
}
