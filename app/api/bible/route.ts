import { NextRequest, NextResponse } from "next/server";

// Book name → bible-api.com URL-friendly name
function encodeRef(ref: string): string {
  // Handle semicolons: take the first segment only for primary display
  const primary = ref.split(";")[0].trim();
  return encodeURIComponent(primary);
}

async function fetchEnglish(ref: string): Promise<{ text: string; reference: string } | null> {
  try {
    const url = `https://bible-api.com/${encodeRef(ref)}?translation=web`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    // Use verses array to include verse numbers, fallback to plain text
    if (Array.isArray(data.verses) && data.verses.length > 0) {
      const text = data.verses
        .map((v: { verse: number; text: string }) => `${v.verse} ${v.text.trim()}`)
        .join("\n");
      return { text, reference: data.reference ?? ref };
    }
    return { text: data.text?.trim() ?? "", reference: data.reference ?? ref };
  } catch {
    return null;
  }
}

// getbible.net v2: /v2/{translation}/{book_num}/{chapter}.json
const BOOK_MAP: Record<string, number> = {
  gen: 1, genesis: 1, exod: 2, exo: 2, exodus: 2, lev: 3, leviticus: 3, num: 4, numbers: 4,
  deut: 5, deuteronomy: 5, josh: 6, joshua: 6, judg: 7, judges: 7, ruth: 8,
  "1 sam": 9, "1sam": 9, "1 samuel": 9, "2 sam": 10, "2sam": 10, "2 samuel": 10,
  "1 kgs": 11, "1kgs": 11, "1 kings": 11, "2 kgs": 12, "2kgs": 12, "2 kings": 12,
  "1 chr": 13, "1chr": 13, "1 chronicles": 13, "2 chr": 14, "2chr": 14, "2 chronicles": 14,
  ezra: 15, neh: 16, nehemiah: 16, esth: 17, esther: 17, job: 18,
  ps: 19, psalm: 19, psalms: 19, prov: 20, proverbs: 20, eccl: 21, ecclesiastes: 21,
  song: 22, isa: 23, isaiah: 23, jer: 24, jeremiah: 24, lam: 25, lamentations: 25,
  ezek: 26, ezekiel: 26, dan: 27, daniel: 27, hos: 28, hosea: 28, joel: 29,
  amos: 30, obad: 31, obadiah: 31, jonah: 32, mic: 33, micah: 33, nah: 34, nahum: 34,
  hab: 35, habakkuk: 35, zeph: 36, zephaniah: 36, hag: 37, haggai: 37, zech: 38, zechariah: 38,
  mal: 39, malachi: 39,
  matt: 40, matthew: 40, mark: 41, luke: 42, john: 43, acts: 44,
  rom: 45, romans: 45, "1 cor": 46, "1cor": 46, "1 corinthians": 46,
  "2 cor": 47, "2cor": 47, "2 corinthians": 47, gal: 48, galatians: 48,
  eph: 49, ephesians: 49, phil: 50, philippians: 50, col: 51, colossians: 51,
  "1 thess": 52, "1thess": 52, "1 thessalonians": 52, "2 thess": 53, "2thess": 53,
  "1 tim": 54, "1tim": 54, "2 tim": 55, "2tim": 55, titus: 56, phlm: 57, philemon: 57,
  heb: 58, hebrews: 58, jas: 59, james: 59, "1 pet": 60, "1pet": 60, "1 peter": 60,
  "2 pet": 61, "2pet": 61, "1 john": 62, "1john": 62, "2 john": 63, "3 john": 64,
  jude: 65, rev: 66, revelation: 66,
};

interface ParsedRef { bookNum: number; chapter: number; startVerse?: number; endVerse?: number }

function parseRef(ref: string): ParsedRef | null {
  // e.g. "John 3:1-17" | "Ps 23" | "1 Sam 16:1-13" | "Isa 52:13—53:12"
  const clean = ref.replace(/—/g, "-").replace(/\s+/g, " ").trim();
  // Match: (optional number + space + book name) (chapter) optional(:verse-verse)
  const m = clean.match(/^(\d\s+)?([A-Za-z]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?/);
  if (!m) return null;
  const prefix = m[1] ? m[1].trim() + " " : "";
  const bookKey = (prefix + m[2]).toLowerCase();
  const bookNum = BOOK_MAP[bookKey];
  if (!bookNum) return null;
  return {
    bookNum,
    chapter: parseInt(m[3]),
    startVerse: m[4] ? parseInt(m[4]) : undefined,
    endVerse: m[5] ? parseInt(m[5]) : undefined,
  };
}

async function fetchKorean(ref: string): Promise<{ text: string; reference: string } | null> {
  try {
    const primary = ref.split(";")[0].trim();
    const parsed = parseRef(primary);
    if (!parsed) return null;

    const url = `https://api.getbible.net/v2/korean/${parsed.bookNum}/${parsed.chapter}.json`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();

    const verses: Record<string, { verse: number; text: string }> = data.verses ?? {};
    const start = parsed.startVerse ?? 1;
    const end = parsed.endVerse ?? Object.keys(verses).length;

    const lines = Object.values(verses)
      .filter((v) => v.verse >= start && v.verse <= end)
      .sort((a, b) => a.verse - b.verse)
      .map((v) => `${v.verse} ${v.text.trim()}`);

    const bookName: string = data.book_name ?? "";
    return {
      text: lines.join("\n"),
      reference: `${bookName} ${parsed.chapter}:${start}${parsed.endVerse ? `-${end}` : ""}`,
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.json({ error: "ref required" }, { status: 400 });

  const [en, ko] = await Promise.all([fetchEnglish(ref), fetchKorean(ref)]);

  return NextResponse.json({ en, ko }, { headers: { "Cache-Control": "public, max-age=86400" } });
}
