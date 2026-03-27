export interface RCLReadings {
  sundayDate: string; // YYYY-MM-DD of that liturgical Sunday
  season: string;      // e.g. "사순절"
  name: string;        // e.g. "사순절 제4주일 (Year A)"
  nameEn: string;      // e.g. "Lent 4A"
  ot: string;
  psalm: string;
  epistle: string;
  gospel: string;
}

// Year A 2025-2026 + start of Year B (Advent 2026)
// Special weekdays keyed by exact date override the Sunday lookup
const SPECIAL_DAYS: Record<string, RCLReadings> = {
  // Ash Wednesday
  "2026-02-18": { sundayDate: "2026-02-18", season: "사순절", name: "재의 수요일", nameEn: "Ash Wednesday", ot: "Joel 2:1-2, 12-17", psalm: "Psalm 51:1-17", epistle: "2 Cor 5:20b—6:10", gospel: "Matt 6:1-6, 16-21" },
  // Annunciation (March 25)
  "2026-03-25": { sundayDate: "2026-03-25", season: "사순절", name: "성모영보 (수태고지)", nameEn: "Annunciation", ot: "Isa 7:10-14", psalm: "Psalm 45:10-17", epistle: "Heb 10:4-10", gospel: "Luke 1:26-38" },
  "2026-03-30": { sundayDate: "2026-03-30", season: "고난주간", name: "성(월)요일", nameEn: "Holy Monday", ot: "Isa 42:1-9", psalm: "Psalm 36:5-11", epistle: "Heb 9:11-15", gospel: "John 12:1-11" },
  "2026-03-31": { sundayDate: "2026-03-31", season: "고난주간", name: "성(화)요일", nameEn: "Holy Tuesday", ot: "Isa 49:1-7", psalm: "Psalm 71:1-14", epistle: "1 Cor 1:18-31", gospel: "John 12:20-36" },
  "2026-04-01": { sundayDate: "2026-04-01", season: "고난주간", name: "성(수)요일", nameEn: "Holy Wednesday", ot: "Isa 50:4-9a", psalm: "Psalm 70", epistle: "Heb 12:1-3", gospel: "John 13:21-32" },
  "2026-04-02": { sundayDate: "2026-04-02", season: "고난주간", name: "세족 목요일", nameEn: "Maundy Thursday", ot: "Exod 12:1-14", psalm: "Psalm 116:1-2, 12-19", epistle: "1 Cor 11:23-26", gospel: "John 13:1-17, 31b-35" },
  "2026-04-03": { sundayDate: "2026-04-03", season: "고난주간", name: "성 금요일", nameEn: "Good Friday", ot: "Isa 52:13—53:12", psalm: "Psalm 22", epistle: "Heb 10:16-25", gospel: "John 18:1—19:42" },
  "2026-04-04": { sundayDate: "2026-04-04", season: "고난주간", name: "성 토요일", nameEn: "Holy Saturday", ot: "Job 14:1-14", psalm: "Psalm 31:1-4, 15-16", epistle: "1 Pet 4:1-8", gospel: "Matt 27:57-66" },
  "2025-12-25": { sundayDate: "2025-12-25", season: "성탄절", name: "성탄절 (낮)", nameEn: "Christmas Day", ot: "Isa 9:2-7", psalm: "Psalm 96", epistle: "Titus 2:11-14", gospel: "Luke 2:1-14(15-20)" },
  "2026-01-06": { sundayDate: "2026-01-06", season: "주현절", name: "주현절", nameEn: "Epiphany", ot: "Isa 60:1-6", psalm: "Psalm 72:1-7, 10-14", epistle: "Eph 3:1-12", gospel: "Matt 2:1-12" },
  "2026-05-14": { sundayDate: "2026-05-14", season: "부활절", name: "승천일", nameEn: "Ascension Day", ot: "Acts 1:1-11", psalm: "Psalm 47", epistle: "Eph 1:15-23", gospel: "Luke 24:44-53" },
};

// Sunday readings keyed by Sunday date
const SUNDAY_READINGS: RCLReadings[] = [
  // Advent 2025 (Year A)
  { sundayDate: "2025-11-30", season: "대강절", name: "대강절 제1주일", nameEn: "Advent 1A", ot: "Isa 2:1-5", psalm: "Psalm 122", epistle: "Rom 13:11-14", gospel: "Matt 24:36-44" },
  { sundayDate: "2025-12-07", season: "대강절", name: "대강절 제2주일", nameEn: "Advent 2A", ot: "Isa 11:1-10", psalm: "Psalm 72:1-7, 18-19", epistle: "Rom 15:4-13", gospel: "Matt 3:1-12" },
  { sundayDate: "2025-12-14", season: "대강절", name: "대강절 제3주일", nameEn: "Advent 3A", ot: "Isa 35:1-10", psalm: "Psalm 146:5-10", epistle: "Jas 5:7-10", gospel: "Matt 11:2-11" },
  { sundayDate: "2025-12-21", season: "대강절", name: "대강절 제4주일", nameEn: "Advent 4A", ot: "Isa 7:10-16", psalm: "Psalm 80:1-7, 17-19", epistle: "Rom 1:1-7", gospel: "Matt 1:18-25" },
  // Christmas
  { sundayDate: "2025-12-28", season: "성탄절", name: "성탄 후 제1주일", nameEn: "Christmas 1A", ot: "Isa 63:7-9", psalm: "Psalm 148", epistle: "Heb 2:10-18", gospel: "Matt 2:13-23" },
  // Epiphany season 2026
  { sundayDate: "2026-01-11", season: "주현절", name: "주의 세례 주일", nameEn: "Baptism of the Lord A", ot: "Isa 42:1-9", psalm: "Psalm 29", epistle: "Acts 10:34-43", gospel: "Matt 3:13-17" },
  { sundayDate: "2026-01-18", season: "주현절", name: "주현 후 제2주일", nameEn: "Epiphany 2A", ot: "Isa 49:1-7", psalm: "Psalm 40:1-11", epistle: "1 Cor 1:1-9", gospel: "John 1:29-42" },
  { sundayDate: "2026-01-25", season: "주현절", name: "주현 후 제3주일", nameEn: "Epiphany 3A", ot: "Isa 9:1-4", psalm: "Psalm 27:1, 4-9", epistle: "1 Cor 1:10-18", gospel: "Matt 4:12-23" },
  { sundayDate: "2026-02-01", season: "주현절", name: "주현 후 제4주일", nameEn: "Epiphany 4A", ot: "Mic 6:1-8", psalm: "Psalm 15", epistle: "1 Cor 1:18-31", gospel: "Matt 5:1-12" },
  { sundayDate: "2026-02-08", season: "주현절", name: "주현 후 제5주일", nameEn: "Epiphany 5A", ot: "Isa 58:1-9a", psalm: "Psalm 112:1-9", epistle: "1 Cor 2:1-12", gospel: "Matt 5:13-20" },
  { sundayDate: "2026-02-15", season: "주현절", name: "주현 후 제6주일 (변모 주일)", nameEn: "Transfiguration A", ot: "Exod 24:12-18", psalm: "Psalm 2", epistle: "2 Pet 1:16-21", gospel: "Matt 17:1-9" },
  // Lent 2026
  { sundayDate: "2026-02-22", season: "사순절", name: "사순절 제1주일", nameEn: "Lent 1A", ot: "Gen 2:15-17; 3:1-7", psalm: "Psalm 32", epistle: "Rom 5:12-19", gospel: "Matt 4:1-11" },
  { sundayDate: "2026-03-01", season: "사순절", name: "사순절 제2주일", nameEn: "Lent 2A", ot: "Gen 12:1-4a", psalm: "Psalm 121", epistle: "Rom 4:1-5, 13-17", gospel: "John 3:1-17" },
  { sundayDate: "2026-03-08", season: "사순절", name: "사순절 제3주일", nameEn: "Lent 3A", ot: "Exod 17:1-7", psalm: "Psalm 95", epistle: "Rom 5:1-11", gospel: "John 4:5-42" },
  { sundayDate: "2026-03-15", season: "사순절", name: "사순절 제4주일", nameEn: "Lent 4A", ot: "1 Sam 16:1-13", psalm: "Psalm 23", epistle: "Eph 5:8-14", gospel: "John 9:1-41" },
  { sundayDate: "2026-03-22", season: "사순절", name: "사순절 제5주일", nameEn: "Lent 5A", ot: "Ezek 37:1-14", psalm: "Psalm 130", epistle: "Rom 8:6-11", gospel: "John 11:1-45" },
  { sundayDate: "2026-03-29", season: "고난주간", name: "고난/종려 주일", nameEn: "Palm/Passion Sunday A", ot: "Isa 50:4-9a", psalm: "Psalm 31:9-16", epistle: "Phil 2:5-11", gospel: "Matt 26:14—27:66" },
  // Easter 2026
  { sundayDate: "2026-04-05", season: "부활절", name: "부활절", nameEn: "Easter Sunday A", ot: "Acts 10:34-43", psalm: "Psalm 118:1-2, 14-24", epistle: "Col 3:1-4", gospel: "John 20:1-18" },
  { sundayDate: "2026-04-12", season: "부활절", name: "부활 후 제2주일", nameEn: "Easter 2A", ot: "Acts 2:14a, 22-32", psalm: "Psalm 16", epistle: "1 Pet 1:3-9", gospel: "John 20:19-31" },
  { sundayDate: "2026-04-19", season: "부활절", name: "부활 후 제3주일", nameEn: "Easter 3A", ot: "Acts 2:14a, 36-41", psalm: "Psalm 116:1-4, 12-19", epistle: "1 Pet 1:17-23", gospel: "Luke 24:13-35" },
  { sundayDate: "2026-04-26", season: "부활절", name: "부활 후 제4주일", nameEn: "Easter 4A", ot: "Acts 2:42-47", psalm: "Psalm 23", epistle: "1 Pet 2:19-25", gospel: "John 10:1-10" },
  { sundayDate: "2026-05-03", season: "부활절", name: "부활 후 제5주일", nameEn: "Easter 5A", ot: "Acts 7:55-60", psalm: "Psalm 31:1-5, 15-16", epistle: "1 Pet 2:2-10", gospel: "John 14:1-14" },
  { sundayDate: "2026-05-10", season: "부활절", name: "부활 후 제6주일", nameEn: "Easter 6A", ot: "Acts 17:22-31", psalm: "Psalm 66:8-20", epistle: "1 Pet 3:13-22", gospel: "John 14:15-21" },
  { sundayDate: "2026-05-17", season: "부활절", name: "부활 후 제7주일", nameEn: "Easter 7A", ot: "Acts 1:6-14", psalm: "Psalm 68:1-10, 32-35", epistle: "1 Pet 4:12-14; 5:6-11", gospel: "John 17:1-11" },
  { sundayDate: "2026-05-24", season: "성령강림절", name: "성령강림절", nameEn: "Pentecost A", ot: "Acts 2:1-21", psalm: "Psalm 104:24-34, 35b", epistle: "1 Cor 12:3b-13", gospel: "John 20:19-23" },
  { sundayDate: "2026-05-31", season: "삼위일체절", name: "삼위일체 주일", nameEn: "Trinity Sunday A", ot: "Gen 1:1—2:4a", psalm: "Psalm 8", epistle: "2 Cor 13:11-13", gospel: "Matt 28:16-20" },
  // Ordinary Time 2026
  { sundayDate: "2026-06-07", season: "연중절기", name: "연중 제10주일", nameEn: "Proper 5A", ot: "Gen 12:1-9", psalm: "Psalm 33:1-12", epistle: "Rom 4:13-25", gospel: "Matt 9:9-13, 18-26" },
  { sundayDate: "2026-06-14", season: "연중절기", name: "연중 제11주일", nameEn: "Proper 6A", ot: "Gen 18:1-15", psalm: "Psalm 116:1-2, 12-19", epistle: "Rom 5:1-8", gospel: "Matt 9:35—10:8" },
  { sundayDate: "2026-06-21", season: "연중절기", name: "연중 제12주일", nameEn: "Proper 7A", ot: "Gen 21:8-21", psalm: "Psalm 86:1-10, 16-17", epistle: "Rom 6:1b-11", gospel: "Matt 10:24-39" },
  { sundayDate: "2026-06-28", season: "연중절기", name: "연중 제13주일", nameEn: "Proper 8A", ot: "Gen 22:1-14", psalm: "Psalm 13", epistle: "Rom 6:12-23", gospel: "Matt 10:40-42" },
  { sundayDate: "2026-07-05", season: "연중절기", name: "연중 제14주일", nameEn: "Proper 9A", ot: "Gen 24:34-38, 42-49, 58-67", psalm: "Psalm 45:10-17", epistle: "Rom 7:15-25a", gospel: "Matt 11:16-19, 25-30" },
  { sundayDate: "2026-07-12", season: "연중절기", name: "연중 제15주일", nameEn: "Proper 10A", ot: "Gen 25:19-34", psalm: "Psalm 119:105-112", epistle: "Rom 8:1-11", gospel: "Matt 13:1-9, 18-23" },
  { sundayDate: "2026-07-19", season: "연중절기", name: "연중 제16주일", nameEn: "Proper 11A", ot: "Gen 28:10-19a", psalm: "Psalm 139:1-12, 23-24", epistle: "Rom 8:12-25", gospel: "Matt 13:24-30, 36-43" },
  { sundayDate: "2026-07-26", season: "연중절기", name: "연중 제17주일", nameEn: "Proper 12A", ot: "Gen 29:15-28", psalm: "Psalm 105:1-11, 45b", epistle: "Rom 8:26-39", gospel: "Matt 13:31-33, 44-52" },
  { sundayDate: "2026-08-02", season: "연중절기", name: "연중 제18주일", nameEn: "Proper 13A", ot: "Gen 32:22-31", psalm: "Psalm 17:1-7, 15", epistle: "Rom 9:1-5", gospel: "Matt 14:13-21" },
  { sundayDate: "2026-08-09", season: "연중절기", name: "연중 제19주일", nameEn: "Proper 14A", ot: "Gen 37:1-4, 12-28", psalm: "Psalm 105:1-6, 16-22, 45b", epistle: "Rom 10:5-15", gospel: "Matt 14:22-33" },
  { sundayDate: "2026-08-16", season: "연중절기", name: "연중 제20주일", nameEn: "Proper 15A", ot: "Gen 45:1-15", psalm: "Psalm 133", epistle: "Rom 11:1-2a, 29-32", gospel: "Matt 15:10-28" },
  { sundayDate: "2026-08-23", season: "연중절기", name: "연중 제21주일", nameEn: "Proper 16A", ot: "Exod 1:8—2:10", psalm: "Psalm 124", epistle: "Rom 12:1-8", gospel: "Matt 16:13-20" },
  { sundayDate: "2026-08-30", season: "연중절기", name: "연중 제22주일", nameEn: "Proper 17A", ot: "Exod 3:1-15", psalm: "Psalm 105:1-6, 23-26, 45c", epistle: "Rom 12:9-21", gospel: "Matt 16:21-28" },
  { sundayDate: "2026-09-06", season: "연중절기", name: "연중 제23주일", nameEn: "Proper 18A", ot: "Exod 12:1-14", psalm: "Psalm 149", epistle: "Rom 13:8-14", gospel: "Matt 18:15-20" },
  { sundayDate: "2026-09-13", season: "연중절기", name: "연중 제24주일", nameEn: "Proper 19A", ot: "Exod 14:19-31", psalm: "Psalm 114", epistle: "Rom 14:1-12", gospel: "Matt 18:21-35" },
  { sundayDate: "2026-09-20", season: "연중절기", name: "연중 제25주일", nameEn: "Proper 20A", ot: "Exod 16:2-15", psalm: "Psalm 105:1-6, 37-45", epistle: "Phil 1:21-30", gospel: "Matt 20:1-16" },
  { sundayDate: "2026-09-27", season: "연중절기", name: "연중 제26주일", nameEn: "Proper 21A", ot: "Exod 17:1-7", psalm: "Psalm 78:1-4, 12-16", epistle: "Phil 2:1-13", gospel: "Matt 21:23-32" },
  { sundayDate: "2026-10-04", season: "연중절기", name: "연중 제27주일", nameEn: "Proper 22A", ot: "Exod 20:1-4, 7-9, 12-20", psalm: "Psalm 19", epistle: "Phil 3:4b-14", gospel: "Matt 21:33-46" },
  { sundayDate: "2026-10-11", season: "연중절기", name: "연중 제28주일", nameEn: "Proper 23A", ot: "Exod 32:1-14", psalm: "Psalm 106:1-6, 19-23", epistle: "Phil 4:1-9", gospel: "Matt 22:1-14" },
  { sundayDate: "2026-10-18", season: "연중절기", name: "연중 제29주일", nameEn: "Proper 24A", ot: "Exod 33:12-23", psalm: "Psalm 99", epistle: "1 Thess 1:1-10", gospel: "Matt 22:15-22" },
  { sundayDate: "2026-10-25", season: "연중절기", name: "연중 제30주일", nameEn: "Proper 25A", ot: "Deut 34:1-12", psalm: "Psalm 90:1-6, 13-17", epistle: "1 Thess 2:1-8", gospel: "Matt 22:34-46" },
  { sundayDate: "2026-11-01", season: "연중절기", name: "모든 성인의 날", nameEn: "All Saints A", ot: "Rev 7:9-17", psalm: "Psalm 34:1-10, 22", epistle: "1 John 3:1-3", gospel: "Matt 5:1-12" },
  { sundayDate: "2026-11-08", season: "연중절기", name: "연중 제32주일", nameEn: "Proper 27A", ot: "Josh 24:1-3a, 14-25", psalm: "Psalm 78:1-7", epistle: "1 Thess 4:13-18", gospel: "Matt 25:1-13" },
  { sundayDate: "2026-11-15", season: "연중절기", name: "연중 제33주일", nameEn: "Proper 28A", ot: "Judg 4:1-7", psalm: "Psalm 123", epistle: "1 Thess 5:1-11", gospel: "Matt 25:14-30" },
  { sundayDate: "2026-11-22", season: "연중절기", name: "그리스도 왕 주일", nameEn: "Christ the King A", ot: "Ezek 34:11-16, 20-24", psalm: "Psalm 95:1-7a", epistle: "Eph 4:1-16", gospel: "Matt 25:31-46" },
  // Advent 2026 (Year B starts)
  { sundayDate: "2026-11-29", season: "대강절", name: "대강절 제1주일 (B년)", nameEn: "Advent 1B", ot: "Jer 33:14-16", psalm: "Psalm 25:1-10", epistle: "1 Thess 3:9-13", gospel: "Luke 21:25-36" },
];

// Returns which reading to feature by default based on day of week
// Sun→gospel, Mon→ot, Tue→psalm, Wed→epistle, Thu→gospel, Fri→ot, Sat→psalm
export type ReadingKey = "ot" | "psalm" | "epistle" | "gospel";
const DAY_READING: ReadingKey[] = ["gospel", "ot", "psalm", "epistle", "gospel", "ot", "psalm"];
export function getDailyReading(date: Date): ReadingKey {
  return DAY_READING[date.getDay()];
}

export function getRCLReadings(date: Date): RCLReadings {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  // Check special days first
  if (SPECIAL_DAYS[dateStr]) return SPECIAL_DAYS[dateStr];

  // Find the most recent Sunday on or before the date
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const recentSunday = new Date(date);
  recentSunday.setDate(date.getDate() - dayOfWeek);
  const sundayStr = `${recentSunday.getFullYear()}-${String(recentSunday.getMonth() + 1).padStart(2, "0")}-${String(recentSunday.getDate()).padStart(2, "0")}`;

  const match = SUNDAY_READINGS.find((r) => r.sundayDate === sundayStr);
  if (match) return match;

  // Fallback: find nearest reading before this date
  const sorted = [...SUNDAY_READINGS].sort((a, b) => b.sundayDate.localeCompare(a.sundayDate));
  const fallback = sorted.find((r) => r.sundayDate <= dateStr);
  return fallback ?? SUNDAY_READINGS[0];
}
