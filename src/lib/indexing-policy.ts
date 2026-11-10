const DEFAULT_PROJECT_HOST_SUFFIXES = [
  "lovable.app",
  "workers.dev",
  "pages.dev",
  "netlify.app",
] as const;

export function isDefaultProjectHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, "");

  return DEFAULT_PROJECT_HOST_SUFFIXES.some(
    (suffix) => normalized === suffix || normalized.endsWith(`.${suffix}`),
  );
}

function hasNoindexDirective(value: string): boolean {
  return value
    .split(",")
    .some((directive) => {
      const normalized = directive.trim().toLowerCase();
      return normalized === "noindex" || normalized === "none";
    });
}

export function applyDefaultHostNoindex(
  request: Request,
  response: Response,
): Response {
  const contentType = response.headers.get("content-type") ?? "";
  if (!/^text\/html(?:\s*;|$)/i.test(contentType)) {
    return response;
  }

  let hostname: string;
  try {
    hostname = new URL(request.url).hostname;
  } catch {
    return response;
  }

  if (!isDefaultProjectHostname(hostname)) {
    return response;
  }

  const existing = response.headers.get("x-robots-tag");
  if (existing && hasNoindexDirective(existing)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", existing ? `${existing}, noindex` : "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
