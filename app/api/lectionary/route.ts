import { NextRequest, NextResponse } from "next/server";
import { getRCLReadings } from "@/lib/rcl";

function extractRef(html: string, optionValue: string): string {
  // Match: <option value="reading-First-Reading">First Reading (Exodus 9:13-35)</option>
  const re = new RegExp(
    `<option value="${optionValue}">[^(]*\\(([^)]+)\\)<\\/option>`
  );
  const m = html.match(re);
  if (!m) return "";
  // For multiple psalms like "Psalm 22; 148", take the first only
  return m[1].trim().split(";")[0].trim();
}

export async function GET(req: NextRequest) {
  const dateParam = req.nextUrl.searchParams.get("date");

  // Parse date safely
  let date: Date;
  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    const [y, mo, d] = dateParam.split("-").map(Number);
    date = new Date(y, mo - 1, d);
  } else {
    date = new Date();
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  // Always get season/name metadata from the existing RCL Sunday table
  const rclMeta = getRCLReadings(date);

  try {
    const res = await fetch(
      `https://www.pcusa.org/daily/devotion/${yyyy}/${mm}/${dd}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`PCUSA ${res.status}`);
    const html = await res.text();

    const psalm   = extractRef(html, "reading-Morning");
    const ot      = extractRef(html, "reading-First-Reading");
    const epistle = extractRef(html, "reading-Second-Reading");
    const gospel  = extractRef(html, "reading-Gospel-Reading");

    // Use PCUSA references where available, fall back to RCL
    return NextResponse.json(
      {
        ...rclMeta,
        ot:      ot      || rclMeta.ot,
        psalm:   psalm   || rclMeta.psalm,
        epistle: epistle || rclMeta.epistle,
        gospel:  gospel  || rclMeta.gospel,
      },
      { headers: { "Cache-Control": "public, max-age=86400" } }
    );
  } catch {
    // Fallback to existing static RCL data
    return NextResponse.json(rclMeta, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  }
}
