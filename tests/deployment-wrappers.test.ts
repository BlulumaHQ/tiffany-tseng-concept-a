import { describe, expect, it } from "vitest";
import { startInstance } from "../src/start";
import netlifyNoindex from "../netlify/edge-functions/noindex-default-host";
import { onRequest as pagesNoindex } from "../functions/[[path]]";

function htmlResponse(): Response {
  return new Response("<html></html>", {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

async function runStartMiddleware(request: Request): Promise<Response> {
  const middleware = startInstance.getOptions().requestMiddleware?.[0];
  const server = (middleware as any).options.server as (args: {
    request: Request;
    next: () => Promise<{ response: Response }>;
  }) => Promise<{ response: Response }>;

  const result = await server({
    request,
    next: async () => ({ response: htmlResponse() }),
  });
  return result.response;
}

describe("deployment integrations", () => {
  it("applies noindex through the registered TanStack request middleware", async () => {
    const response = await runStartMiddleware(
      new Request("https://my-project.lovable.app/listings"),
    );

    expect(response.headers.get("x-robots-tag")).toBe("noindex");
  });

  it("leaves custom domains untouched in the TanStack middleware", async () => {
    const response = await runStartMiddleware(
      new Request("https://www.example.com/listings"),
    );

    expect(response.headers.get("x-robots-tag")).toBeNull();
  });

  it("applies noindex through the Netlify edge handler", async () => {
    const response = await netlifyNoindex(
      new Request("https://my-project.netlify.app/listings"),
      { next: async () => htmlResponse() },
    );

    expect(response.headers.get("x-robots-tag")).toBe("noindex");
  });

  it("leaves custom domains untouched in the Netlify edge handler", async () => {
    const response = await netlifyNoindex(
      new Request("https://www.example.com/listings"),
      { next: async () => htmlResponse() },
    );

    expect(response.headers.get("x-robots-tag")).toBeNull();
  });

  it("applies noindex through the Cloudflare Pages handler", async () => {
    const response = await pagesNoindex({
      request: new Request("https://my-project.pages.dev/listings"),
      next: async () => htmlResponse(),
    });

    expect(response.headers.get("x-robots-tag")).toBe("noindex");
  });

  it("leaves custom domains untouched in the Cloudflare Pages handler", async () => {
    const response = await pagesNoindex({
      request: new Request("https://www.example.com/listings"),
      next: async () => htmlResponse(),
    });

    expect(response.headers.get("x-robots-tag")).toBeNull();
  });
});
