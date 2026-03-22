import { NextResponse } from "next/server";

export interface NewsItem {
  title: string;
  summary: string;
  link: string;
  source: string;
  pubDate: string;
}

export interface NewsResult {
  bbc: NewsItem[];
  daum: NewsItem[];
}

// Social justice & societal issue keywords (Korean + English)
const JUSTICE_KEYWORDS_EN = [
  "poverty", "hunger", "homeless", "refugee", "migrant", "asylum",
  "human rights", "inequality", "discrimination", "racism", "protest",
  "climate", "environment", "war", "conflict", "ceasefire", "peace",
  "healthcare", "disease", "epidemic", "famine", "disaster",
  "prison", "police", "violence", "abuse", "trafficking", "slavery",
  "education", "child", "women", "gender", "lgbtq", "minority",
  "aid", "relief", "sanction", "justice", "court", "trial",
  "corruption", "democracy", "election", "freedom", "censorship",
];

const JUSTICE_KEYWORDS_KO = [
  "빈곤", "기아", "노숙", "난민", "이주", "망명", "인권", "불평등",
  "차별", "인종", "시위", "집회", "기후", "환경", "전쟁", "분쟁",
  "휴전", "평화", "의료", "질병", "전염병", "기근", "재해", "재난",
  "구금", "경찰", "폭력", "학대", "인신매매", "노예", "교육",
  "아동", "여성", "성별", "소수자", "구호", "제재", "정의",
  "재판", "부패", "민주주의", "선거", "자유", "검열", "노동",
  "복지", "실업", "해고", "파업", "이재민", "피해자", "사회",
];

function scoreItem(item: NewsItem, isKorean: boolean): number {
  const text = (item.title + " " + item.summary).toLowerCase();
  const keywords = isKorean ? JUSTICE_KEYWORDS_KO : JUSTICE_KEYWORDS_EN;
  let score = 0;
  for (const kw of keywords) {
    if (text.includes(kw)) score++;
  }
  return score;
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
  );
  if (!m) return "";
  return (m[1] ?? m[2] ?? "").replace(/<[^>]+>/g, "").trim();
}

function extractLink(block: string): string {
  const m1 = block.match(/<link>([^<]+)<\/link>/i);
  if (m1) return m1[1].trim();
  const m2 = block.match(/<guid[^>]*>([^<]+)<\/guid>/i);
  if (m2) return m2[1].trim();
  return "";
}

function parseItems(xml: string, source: string, limit: number): NewsItem[] {
  const items: NewsItem[] = [];
  const itemBlocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  for (const block of itemBlocks.slice(0, limit)) {
    const title = extractTag(block, "title");
    const link = extractLink(block);
    const description = extractTag(block, "description");
    const pubDate = extractTag(block, "pubDate");
    if (title) {
      items.push({ title, summary: description.slice(0, 200), link, source, pubDate });
    }
  }
  return items;
}

async function fetchFeed(url: string, source: string, limit: number): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DailyQT/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseItems(xml, source, limit);
  } catch {
    return [];
  }
}

function filterAndRank(items: NewsItem[], isKorean: boolean, take: number): NewsItem[] {
  const scored = items.map((item) => ({ item, score: scoreItem(item, isKorean) }));
  // Sort by score desc; items with score 0 go last
  scored.sort((a, b) => b.score - a.score);
  // Take top `take`, but include at least some if none match keywords
  const result = scored.slice(0, take).map((s) => s.item);
  return result;
}

export async function GET() {
  const [bbcRaw, daumRaw] = await Promise.all([
    // Fetch more to allow filtering
    fetchFeed("https://feeds.bbci.co.uk/news/world/rss.xml", "BBC News", 20),
    fetchFeed("https://www.yna.co.kr/rss/news.xml", "연합뉴스", 20),
  ]);

  const bbc = filterAndRank(bbcRaw, false, 3);
  const daum = filterAndRank(daumRaw, true, 3);

  const result: NewsResult = { bbc, daum };
  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
