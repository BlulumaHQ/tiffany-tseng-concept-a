import { copyFile, mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { once } from "node:events";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const rootDir = process.cwd();
const distDir = resolve(rootDir, "dist");
const clientDir = resolve(distDir, "client");
const serverDir = resolve(distDir, "server");
const serverIndexPath = resolve(serverDir, "index.js");
const serverAliasPath = resolve(serverDir, "server.js");
const redirectsSourcePath = resolve(rootDir, "public", "_redirects");
const redirectsTargetPath = resolve(distDir, "_redirects");
const prerenderUrl = "http://127.0.0.1:4910/";

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function waitForPreview(url, attempts = 150, delayMs = 200) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      if (response.ok && text.includes("<html")) {
        return { response, text };
      }
      lastError = new Error(
        `Preview returned ${response.status} (attempt ${attempt + 1})`
      );
    } catch (err) {
      lastError = err;
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, delayMs));
  }
  throw new Error(
    `Timed out waiting for preview server at ${url}. Last error: ${lastError?.message}`
  );
}

async function stopPreviewServer(child) {
  if (!child || child.exitCode !== null) return;

  child.kill("SIGTERM");
  const settled = Promise.race([
    once(child, "exit"),
    new Promise((resolveTimeout) => setTimeout(resolveTimeout, 3_000)),
  ]);
  await settled;

  if (child.exitCode === null) {
    child.kill("SIGKILL");
    await once(child, "exit");
  }
}

async function moveClientOutputToRoot() {
  const clientEntries = await readdir(clientDir);

  await Promise.all(
    clientEntries.map(async (entry) => {
      const sourcePath = resolve(clientDir, entry);
      const destinationPath = resolve(distDir, entry);
      await rm(destinationPath, { recursive: true, force: true });
      await rename(sourcePath, destinationPath);
    }),
  );

  await rm(clientDir, { recursive: true, force: true });
}

async function ensureBuildOutputsExist() {
  if (!(await exists(clientDir)) || !(await exists(serverDir))) {
    throw new Error("Expected vite build output in dist/client and dist/server before running static-build.");
  }

  if (!(await exists(serverIndexPath))) {
    throw new Error("Expected dist/server/index.js to exist before running static-build.");
  }
}

async function main() {
  await ensureBuildOutputsExist();

  if (!(await exists(serverAliasPath))) {
    await copyFile(serverIndexPath, serverAliasPath);
  }

  const previewProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["vite", "preview", "--host", "127.0.0.1", "--port", "4910", "--strictPort"],
    {
      cwd: rootDir,
      stdio: "inherit",
    },
  );

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const { text: html } = await waitForPreview(prerenderUrl);
    await writeFile(resolve(clientDir, "index.html"), html, "utf8");

    await moveClientOutputToRoot();
    await rm(serverDir, { recursive: true, force: true });

    if (!(await exists(redirectsTargetPath)) && (await exists(redirectsSourcePath))) {
      await mkdir(distDir, { recursive: true });
      await copyFile(redirectsSourcePath, redirectsTargetPath);
    }
  } finally {
    await stopPreviewServer(previewProcess);
  }

  if (!(await exists(redirectsTargetPath)) && (await exists(redirectsSourcePath))) {
    const redirects = await readFile(redirectsSourcePath, "utf8");
    await writeFile(redirectsTargetPath, redirects, "utf8");
  }
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("[static-build] Failed:", err);
  process.exit(1);
}