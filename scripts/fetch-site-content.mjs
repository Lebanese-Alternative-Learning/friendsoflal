#!/usr/bin/env node
/**
 * Fetches site content CSV from the remote URL and saves it locally
 * to src/data/site-content.csv.
 *
 * Usage:
 *   node scripts/fetch-site-content.mjs
 *   npm run fetch:content
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CSV_URL =
  process.env.SITE_CONTENT_URL ||
  "https://script.google.com/macros/s/AKfycbxJATN1VUm52K2EefKKnZOVAGPtBRh2MSMcKjqbkQRu7ils8G_T355WAiDf2SlGLO_K/exec";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/data/site-content.csv");

async function main() {
  console.log(`[fetch-site-content] GET ${CSV_URL}`);
  const res = await fetch(CSV_URL, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  if (!text.trim()) throw new Error("Empty response body");

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, text, "utf8");
  console.log(
    `[fetch-site-content] Saved ${text.length} bytes → ${OUT_PATH}`
  );
}

main().catch((err) => {
  console.error("[fetch-site-content] Error:", err);
  process.exit(1);
});
