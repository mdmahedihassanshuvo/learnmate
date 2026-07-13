import { copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");

try {
  await copyFile(indexPath, fallbackPath);
  console.log("Created GitHub Pages SPA fallback at dist/404.html");
} catch (error) {
  console.error("Could not create GitHub Pages SPA fallback.");
  console.error(error);
  process.exit(1);
}
