import { copyFile, mkdir, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const rootDir = process.cwd();
const distDir = resolve(rootDir, "dist");
const clientDir = resolve(distDir, "client");
const serverDir = resolve(distDir, "server");
const serverEntryPath = resolve(serverDir, "index.js");
const redirectsSourcePath = resolve(rootDir, "public", "_redirects");
const redirectsTargetPath = resolve(distDir, "_redirects");

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function prerenderRootHtml() {
  const mod = await import(pathToFileURL(serverEntryPath).href);
  const handler = mod.default;
  if (!handler || typeof handler.fetch !== "function") {
    throw new Error("dist/server/index.js does not export default.fetch — cannot prerender");
  }

  const request = new Request("http://localhost/");
  const env = {};
  const ctx = {
    waitUntil: () => {},
    passThroughOnException: () => {},
  };

  const response = await handler.fetch(request, env, ctx);
  if (response.status !== 200) {
    throw new Error(`Prerender returned HTTP ${response.status}`);
  }

  const html = await response.text();
  if (!html.includes("<html")) {
    throw new Error("Prerender output does not look like HTML");
  }

  return html;
}

async function flattenClientToRoot() {
  const entries = await readdir(clientDir);
  for (const entry of entries) {
    const src = resolve(clientDir, entry);
    const dest = resolve(distDir, entry);
    await rm(dest, { recursive: true, force: true });
    await rename(src, dest);
  }
  await rm(clientDir, { recursive: true, force: true });
}

async function ensureRedirects() {
  if (!(await exists(redirectsTargetPath)) && (await exists(redirectsSourcePath))) {
    await mkdir(distDir, { recursive: true });
    await copyFile(redirectsSourcePath, redirectsTargetPath);
  }
}

async function main() {
  if (!(await exists(clientDir))) {
    throw new Error("Expected dist/client after vite build");
  }
  if (!(await exists(serverEntryPath))) {
    throw new Error("Expected dist/server/index.js after vite build");
  }

  console.log("[static-build] Prerendering root HTML from server bundle...");
  const html = await prerenderRootHtml();
  console.log(`[static-build] Got ${html.length} bytes of HTML`);

  await writeFile(resolve(clientDir, "index.html"), html, "utf8");

  console.log("[static-build] Flattening dist/client/* → dist/");
  await flattenClientToRoot();

  if (await exists(serverDir)) {
    await rm(serverDir, { recursive: true, force: true });
  }

  await ensureRedirects();

  console.log("[static-build] Success");
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("[static-build] Failed:", err);
  process.exit(1);
}