import { copyFile, mkdir, readdir, rename, rm, stat, writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const distDir = resolve(rootDir, "dist");
const clientDir = resolve(distDir, "client");
const serverDir = resolve(distDir, "server");
const assetsDir = resolve(clientDir, "assets");
const redirectsSourcePath = resolve(rootDir, "public", "_redirects");
const redirectsTargetPath = resolve(distDir, "_redirects");
const rootRoutePath = resolve(rootDir, "src", "routes", "__root.tsx");

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

function extractTitle(rootCode) {
  const m = rootCode.match(/title:\s*["'`]([^"'`]+)["'`]/);
  return m ? m[1] : "Site";
}

function extractMetas(rootCode) {
  const metas = [];
  const re = /\{\s*(?:name|property|charSet)\s*:\s*["']?([^"',}]+)["']?\s*,\s*content\s*:\s*["`]([^"`]+)["`]/g;
  let m;
  while ((m = re.exec(rootCode)) !== null) {
    const [, key, value] = m;
    if (key === "charSet" || key === "charset") continue;
    metas.push({ key, value });
  }
  return metas;
}

async function buildIndexHtml() {
  const assets = await readdir(assetsDir);
  const sizes = await Promise.all(
    assets.map(async (f) => ({ name: f, size: (await stat(resolve(assetsDir, f))).size }))
  );

  const entryJs = sizes
    .filter((f) => f.name.startsWith("index-") && f.name.endsWith(".js"))
    .sort((a, b) => b.size - a.size)[0];
  const mainCss = sizes
    .filter((f) => f.name.endsWith(".css"))
    .sort((a, b) => b.size - a.size)[0];

  if (!entryJs) throw new Error("Could not find entry JS in dist/client/assets");

  let title = "Site";
  let metaTags = "";
  if (await exists(rootRoutePath)) {
    const rootCode = await readFile(rootRoutePath, "utf8");
    title = extractTitle(rootCode);
    const metas = extractMetas(rootCode);
    metaTags = metas
      .map(({ key, value }) => {
        const safe = value.replace(/"/g, "&quot;");
        const attr = key.startsWith("og:") || key.startsWith("twitter:") ? "property" : "name";
        return `<meta ${attr}="${key}" content="${safe}" />`;
      })
      .join("\n");
  }

  const cssTag = mainCss ? `<link rel="stylesheet" href="/assets/${mainCss.name}" />` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
${metaTags}
<link rel="icon" href="/favicon.ico" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${cssTag}
<script type="module" crossorigin src="/assets/${entryJs.name}"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
`;
}

async function moveClientOutputToRoot() {
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

  const html = await buildIndexHtml();
  await writeFile(resolve(clientDir, "index.html"), html, "utf8");

  await moveClientOutputToRoot();

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