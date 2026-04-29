import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tiffany Tseng — Vancouver Real Estate Consultations" },
      { name: "description", content: "Contact Tiffany Tseng PREC to book a Vancouver real estate consultation, request a home evaluation, or start your property search. Call 604.720.2545." },
      { property: "og:title", content: "Contact — Tiffany Tseng PREC" },
      { property: "og:description", content: "Book a consultation with a trusted Vancouver Realtor." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  interest: z.string().max(60),
  message: z.string().trim().min(1, "Please add a short message").max(1000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      interest: String(fd.get("interest") || "General"),
      message: String(fd.get("message") || ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks — Tiffany will be in touch shortly.");
    }, 700);
  }

  return (
    <SiteLayout>
      <Toaster position="top-center" />
      <section className="pt-36 pb-16 bg-cream">
        <div className="container-tight">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            Let's start a conversation.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Whether you're ready to make a move or just exploring, I'd love to hear
            from you. Expect a thoughtful, personal reply — usually within one business day.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-tight grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow">Direct</p>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Office</p>
                    <a href="tel:6047202545" className="font-display text-2xl text-foreground hover:text-accent">604.720.2545</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Email</p>
                    <a href="mailto:hello@tiffanytseng.com" className="font-display text-2xl text-foreground hover:text-accent">hello@tiffanytseng.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Office</p>
                    <p className="text-foreground">#101 — 2806 Kingsway<br />Vancouver, BC V5R 5T5</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Instagram className="h-5 w-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Social</p>
                    <a href="https://www.instagram.com/tiffanytseng_realestate/" target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
                      @tiffanytseng_realestate
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-xs tracking-[0.22em] uppercase text-accent">Brokerage</p>
              <p className="mt-3 text-foreground">RE/MAX City Realty</p>
              <p className="mt-1 text-sm text-muted-foreground">Tiffany Tseng Personal Real Estate Corporation</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-cream p-8 md:p-12 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone (optional)" name="phone" />
              <div>
                <label className="text-xs tracking-[0.18em] uppercase text-muted-foreground">I'm interested in</label>
                <select
                  name="interest"
                  defaultValue="Buying"
                  className="mt-2 w-full bg-transparent border-b border-foreground/30 focus:border-accent outline-none py-2 text-foreground"
                >
                  <option>Buying</option>
                  <option>Selling</option>
                  <option>Home Evaluation</option>
                  <option>General Question</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={1000}
                className="mt-2 w-full bg-transparent border-b border-foreground/30 focus:border-accent outline-none py-2 text-foreground resize-none"
                placeholder="Tell me a little about what you're looking for…"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 h-12 text-xs tracking-[0.22em] uppercase font-medium bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground">
              By submitting, you agree to be contacted regarding your inquiry. Your information stays private.
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="mt-2 w-full bg-transparent border-b border-foreground/30 focus:border-accent outline-none py-2 text-foreground"
      />
    </div>
  );
}
