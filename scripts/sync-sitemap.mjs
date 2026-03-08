import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourcePath = resolve(rootDir, "public", "sitemap.xml");
const targets = [
  resolve(rootDir, "dist", "sitemap.xml"),
  resolve(rootDir, ".vercel", "output", "static", "sitemap.xml"),
];

for (const targetPath of targets) {
  try {
    await copyFile(sourcePath, targetPath);
    console.info("[sitemap:sync] copied", {
      from: sourcePath,
      to: targetPath,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[sitemap:sync] skipped", {
      from: sourcePath,
      to: targetPath,
      reason: message,
    });
  }
}
