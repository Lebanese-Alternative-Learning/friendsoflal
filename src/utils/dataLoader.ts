/**
 * Data loader: reads site-content.csv bundled at build time,
 * parses id/value pairs, and returns a flat record map.
 * Supports both comma and pipe delimiters.
 */
import csvText from "@/data/site-content.csv?raw";

export interface SiteData {
  [key: string]: string;
}

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
    // Try pipe first (|), then comma (,)
    let delimIdx = line.indexOf("|");
    if (delimIdx === -1) delimIdx = line.indexOf(",");
    if (delimIdx === -1) continue;
    const id = line.slice(0, delimIdx).trim();
    let value = line.slice(delimIdx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    if (result[id]) {
      result[id] = result[id] + "----" + value;
    } else {
      result[id] = value;
    }
  }

  return result;
}

export const siteData: SiteData = parseCSV(csvText);

/**
 * Resolve a single value: CSV if present, else default.
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
 * Resolve an image path from CSV.
 * - Absolute URLs (http/https) pass through unchanged.
 * - Import paths like "@/assets/foo.jpg" are resolved via Vite's glob imports.
 * - Falls back to the default path using the same logic.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const imageMap = import.meta.glob("@/assets/*.{jpg,jpeg,png,webp,gif,svg}", {
  eager: true,
}) as Record<string, any>;

// Build a comprehensive lookup map with ALL possible key forms
const imageLookup: Record<string, string> = {};

for (const [path, mod] of Object.entries(imageMap)) {
  const resolvedUrl = mod.default;
  const basename = path.split("/").pop() || path;
  const relative = path.replace("/src/", "");
  
  // Store under multiple key forms for flexible lookup
  imageLookup[path] = resolvedUrl;           // /src/assets/foo.jpg
  imageLookup[relative] = resolvedUrl;       // assets/foo.jpg
  imageLookup[basename] = resolvedUrl;       // foo.jpg
  imageLookup["@/" + relative] = resolvedUrl; // @/assets/foo.jpg
  imageLookup["@/" + basename] = resolvedUrl; // @/foo.jpg
}

export function resolveImage(
  data: SiteData | null,
  id: string,
  defaultPath: string
): string {
  let candidate: string | undefined;

  if (data && data[id]) {
    candidate = data[id];
  }

  const source = candidate || defaultPath;

  // Absolute URL → use directly
  if (source.startsWith("http://") || source.startsWith("https://")) {
    return source;
  }

  // Try exact match first
  if (imageLookup[source]) return imageLookup[source];

  // Try basename match
  const basename = source.split("/").pop() || source;
  if (imageLookup[basename]) return imageLookup[basename];

  // Try relative path (strip @/ or /src/)
  const normalized = source.replace("@/", "").replace("/src/", "");
  if (imageLookup[normalized]) return imageLookup[normalized];

  // Final fallback: return as-is (Vite will handle static assets)
  return source;
}

/**
 * Check if a URL is a YouTube link.
 */
export function isYouTubeUrl(url: string): boolean {
  return (
    url.includes("youtube.com/watch") ||
    url.includes("youtu.be/") ||
    url.includes("youtube.com/embed/") ||
    url.includes("youtube.com/shorts/")
  );
}

/**
 * Extract YouTube video ID from various URL formats.
 */
export function extractYouTubeId(url: string): string | null {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];

  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (shortsMatch) return shortsMatch[1];

  return null;
}

/**
 * Resolve FAQ entries: id="faq", value="q1----a1----q2----a2"
 */
export function resolveFAQ(
  data: SiteData | null,
  index: number,
  defaultQ: string,
  defaultA: string
): { q: string; a: string } {
  if (data && data["faq"]) {
    const entries = data["faq"].split("----");
    if (index * 2 < entries.length) {
      return {
        q: entries[index * 2].trim(),
        a: entries[index * 2 + 1]?.trim() || defaultA,
      };
    }
  }
  return { q: defaultQ, a: defaultA };
}
