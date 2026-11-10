import { describe, expect, it } from "vitest";
import {
  applyDefaultHostNoindex,
  isDefaultProjectHostname,
} from "../src/lib/indexing-policy";

function htmlResponse(headers?: HeadersInit): Response {
  return new Response("<html></html>", {
    headers: { "content-type": "text/html; charset=utf-8", ...headers },
  });
}

describe("default project hostname detection", () => {
  it.each(["lovable.app", "workers.dev", "pages.dev", "netlify.app"])(
    "matches %s and its subdomains",
    (suffix) => {
      expect(isDefaultProjectHostname(suffix)).toBe(true);
      expect(isDefaultProjectHostname(`my-project.${suffix}`)).toBe(true);
      expect(isDefaultProjectHostname(`MY-PROJECT.${suffix.toUpperCase()}.`)).toBe(true);
    },
  );

  it("does not match custom domains or lookalike suffixes", () => {
    expect(isDefaultProjectHostname("www.example.com")).toBe(false);
    expect(isDefaultProjectHostname("lovable.app.example.com")).toBe(false);
    expect(isDefaultProjectHostname("notnetlify.app")).toBe(false);
  });
});

describe("HTML response policy", () => {
  it.each(["lovable.app", "workers.dev", "pages.dev", "netlify.app"])(
    "adds noindex on nested HTML routes for %s",
    (suffix) => {
      const request = new Request(`https://my-project.${suffix}/listings/123`);
      const response = applyDefaultHostNoindex(request, htmlResponse());

      expect(response.headers.get("x-robots-tag")).toBe("noindex");
    },
  );

  it("leaves custom-domain HTML untouched", () => {
    const original = htmlResponse();
    const response = applyDefaultHostNoindex(
      new Request("https://www.example.com/listings"),
      original,
    );

    expect(response).toBe(original);
    expect(response.headers.get("x-robots-tag")).toBeNull();
  });

  it("uses the request URL hostname rather than forwarded host headers", () => {
    const response = applyDefaultHostNoindex(
      new Request("https://my-project.netlify.app/listings", {
        headers: { "x-forwarded-host": "www.example.com" },
      }),
      htmlResponse(),
    );

    expect(response.headers.get("x-robots-tag")).toBe("noindex");
  });

  it("leaves non-HTML responses untouched", () => {
    const original = new Response("body { color: red; }", {
      headers: { "content-type": "text/css" },
    });
    const response = applyDefaultHostNoindex(
      new Request("https://my-project.workers.dev/assets/site.css"),
      original,
    );

    expect(response).toBe(original);
    expect(response.headers.get("x-robots-tag")).toBeNull();
  });

  it("preserves existing robots directives when adding noindex", () => {
    const response = applyDefaultHostNoindex(
      new Request("https://my-project.pages.dev/listings"),
      htmlResponse({ "x-robots-tag": "nofollow" }),
    );

    expect(response.headers.get("x-robots-tag")).toBe("nofollow, noindex");
  });

  it("does not duplicate an existing noindex directive", () => {
    const original = htmlResponse({ "x-robots-tag": "noindex, nofollow" });
    const response = applyDefaultHostNoindex(
      new Request("https://my-project.lovable.app/image-audit"),
      original,
    );

    expect(response).toBe(original);
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  });
});
