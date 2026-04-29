import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { listings } from "@/data/listings";
import { siteAssets } from "@/data/siteAssets";

export const Route = createFileRoute("/image-audit")({
  head: () => ({
    meta: [
      { title: "Image Audit — Tiffany Tseng PREC" },
      { name: "description", content: "Internal audit of every image used on the site with live status checks." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ImageAuditPage,
});

type ImageRow = {
  group: string;
  label: string;
  url: string;
  usedOn: string;
};

type Status = "loading" | "ok" | "error";

function buildRows(): ImageRow[] {
  const rows: ImageRow[] = [];

  // Brand / site assets
  const assetMeta: Record<keyof typeof siteAssets, string> = {
    brandLogo: "Header — signature logo",
    brandLogoLight: "Footer — white wordmark",
    remaxLogo: "Footer — RE/MAX City Realty",
    mlsReciprocity: "Footer — MLS reciprocity",
    tiffanyPortrait: "About — professional portrait",
    tiffanyAward: "About — Platinum award",
    vancouverHero: "Home — Vancouver hero",
    medallion: "About — Medallion badge",
    suttonMasters: "About — Sutton Masters badge",
  };
  (Object.keys(siteAssets) as (keyof typeof siteAssets)[]).forEach((key) => {
    rows.push({
      group: "Brand & Site",
      label: key,
      url: siteAssets[key],
      usedOn: assetMeta[key],
    });
  });

  // Listings
  listings.forEach((l) => {
    rows.push({
      group: "Listings",
      label: l.address,
      url: l.image,
      usedOn: `${l.area} — ${l.price}`,
    });
  });

  return rows;
}

function ImageAuditPage() {
  const rows = buildRows();
  const [statuses, setStatuses] = useState<Status[]>(() => rows.map(() => "loading"));

  useEffect(() => {
    let cancelled = false;
    rows.forEach((row, i) => {
      const img = new Image();
      img.onload = () => {
        if (!cancelled)
          setStatuses((s) => {
            const next = [...s];
            next[i] = "ok";
            return next;
          });
      };
      img.onerror = () => {
        if (!cancelled)
          setStatuses((s) => {
            const next = [...s];
            next[i] = "error";
            return next;
          });
      };
      img.src = row.url;
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = rows.length;
  const ok = statuses.filter((s) => s === "ok").length;
  const err = statuses.filter((s) => s === "error").length;
  const pending = statuses.filter((s) => s === "loading").length;

  return (
    <SiteLayout>
      <section className="pt-36 pb-12 bg-cream">
        <div className="container-tight">
          <p className="eyebrow">Internal</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">
            Image audit
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every image referenced on this site, with a live load check against
            its source URL. Use this to verify no AI-generated or placeholder
            assets are in use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-white border border-border">
              Total: <strong>{total}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Real / OK: <strong>{ok}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-200">
              404 / Error: <strong>{err}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Checking: <strong>{pending}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-tight">
          <div className="overflow-x-auto rounded-lg border border-border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3 font-medium">Preview</th>
                  <th className="p-3 font-medium">Group</th>
                  <th className="p-3 font-medium">Label</th>
                  <th className="p-3 font-medium">Used on</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Source URL</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const status = statuses[i];
                  return (
                    <tr key={row.url + i} className="border-t border-border align-top">
                      <td className="p-3">
                        <a href={row.url} target="_blank" rel="noreferrer">
                          <img
                            src={row.url}
                            alt={row.label}
                            className="w-24 h-16 object-cover rounded bg-muted"
                            loading="lazy"
                          />
                        </a>
                      </td>
                      <td className="p-3 whitespace-nowrap text-muted-foreground">{row.group}</td>
                      <td className="p-3 font-medium">{row.label}</td>
                      <td className="p-3 text-muted-foreground">{row.usedOn}</td>
                      <td className="p-3 whitespace-nowrap">
                        {status === "ok" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            ● Real
                          </span>
                        )}
                        {status === "error" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200">
                            ● 404 / Error
                          </span>
                        )}
                        {status === "loading" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            ● Checking…
                          </span>
                        )}
                      </td>
                      <td className="p-3 max-w-md">
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent break-all underline-offset-4 hover:underline"
                        >
                          {row.url}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}