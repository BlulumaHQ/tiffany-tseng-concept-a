# Architecture

- Keep hostname-dependent indexing rules in `src/lib/indexing-policy.ts` so every deployment target applies the same default-host noindex policy without affecting custom domains.
- Apply the indexing policy through `src/start.ts` for TanStack Start/Worker responses, the Netlify edge function for static Netlify deployments, and `functions/[[path]].ts` for Cloudflare Pages; static HTML alone cannot vary response headers by hostname.
