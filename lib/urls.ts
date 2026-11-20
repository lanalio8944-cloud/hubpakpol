import fs from "fs";
import path from "path";

export interface UrlEntry {
  id: string;
  urls: string[];
}

interface DataFile {
  entries: UrlEntry[];
}

let cached: DataFile | null = null;

function loadData(): DataFile {
  if (cached) return cached;
  const filePath = path.join(process.cwd(), "data", "url.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  cached = JSON.parse(raw) as DataFile;
  return cached;
}

export function getAllIds(): string[] {
  return loadData().entries.map((e) => e.id);
}

export function getEntryById(id: string): UrlEntry | null {
  return loadData().entries.find((e) => e.id === id) ?? null;
}

export function normalizeUrl(raw: string): string {
  let u = raw.trim();
  if (!u) return "";
  u = u.replace(/\s+/g, "");
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(u)) u = "https://" + u;
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return u;
    parsed.hostname = parsed.hostname.toLowerCase();
    let out = parsed.toString();
    if (out.endsWith("/") && parsed.pathname === "/" && !parsed.search && !parsed.hash) {
      out = out.slice(0, -1);
    }
    return out;
  } catch {
    return u;
  }
}
