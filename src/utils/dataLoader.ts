/**
 * Data loader: reads site-content.csv bundled at build time,
 * parses id/value pairs, and returns a flat record map.
 *
 * CSV format: id,value
 * - IDs use kebab-case (e.g. hero-header)
 * - FAQ rows use id="faq" with value="question----answer"
 */
import csvText from "@/data/site-content.csv?raw";

export interface SiteData {
  [key: string]: string;
}

/**
 * Parse raw CSV text into a {id: value} map.
 * Handles quoted fields with commas and newlines.
 */
export function parseCSV(text: string): SiteData {
  const result: SiteData = {};
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (current.trim()) lines.push(current.trim());
      current = "";
      if (ch === "\r" && text[i + 1] === "\n") i++;
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current.trim());

  for (const line of lines) {
    const eqIdx = line.indexOf(",");
    if (eqIdx === -1) continue;
    const id = line.slice(0, eqIdx).trim();
    let value = line.slice(eqIdx + 1).trim();
    // Strip surrounding quotes if present
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    result[id] = value;
  }

  return result;
}

/**
 * Parse the bundled CSV at import time.
 */
export const siteData: SiteData = parseCSV(csvText);

/**
 * Resolve a single value: use CSV data if present, otherwise return default.
 */
export function resolve(
  data: SiteData | null,
  id: string,
  defaultValue: string
): string {
  if (data && data[id]) return data[id];
  return defaultValue;
}

/**
 * Resolve an FAQ entry: id="faq", value="question----answer"
 */
export function resolveFAQ(
  data: SiteData | null,
  index: number,
  defaultQ: string,
  defaultA: string
): { q: string; a: string } {
  if (data && data["faq"]) {
    const entries = data["faq"].split("----");
    if (index < entries.length) {
      const parts = entries[index].split("----");
      if (parts.length >= 2) {
        return { q: parts[0].trim(), a: parts.slice(1).join("----").trim() };
      }
    }
  }
  return { q: defaultQ, a: defaultA };
}
