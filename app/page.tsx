"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { getRCLReadings, RCLReadings } from "@/lib/rcl";
import { getKeyVerses, DayKeyVerses } from "@/lib/keyVerses";
import { getEntry, saveEntry, getEntries, DailyEntry } from "@/lib/storage";
import { shareToInstagram } from "@/lib/share";
import ShareCard from "@/components/ShareCard";
import HistoryCalendar from "@/components/HistoryCalendar";
import NotificationSetup from "@/components/NotificationSetup";
import type { NewsItem, NewsResult } from "@/app/api/news/route";
import {
  BookOpen, PenLine, History, Settings,
  Share2, Download, Save, ExternalLink, Newspaper, Loader2, ChevronDown,
} from "lucide-react";

type Tab = "today" | "history" | "settings";

function NewsFeedBlock({ title, accent, items }: { title: string; accent: string; items: NewsItem[] }) {
  return (
    <div className="bg-white/60 rounded-2xl overflow-hidden">
      <div className={`${accent} px-4 py-2 flex items-center gap-2`}>
        <span className="text-xs font-bold text-white tracking-wide">{title}</span>
      </div>
      <div className="p-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-2">뉴스를 불러올 수 없습니다.</p>
        ) : (
          items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1 text-sm font-semibold text-stone-800 hover:text-blue-700 leading-snug"
                >
                  {item.title}
                  <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 text-stone-400" />
                </a>
                {item.summary && (
                  <p className="text-xs text-stone-500 mt-1 leading-5 line-clamp-2">{item.summary}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
type ReadingKey = "ot" | "psalm" | "epistle" | "gospel";

const READING_LABELS: Record<ReadingKey, { ko: string; color: string }> = {
  ot:      { ko: "구약", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  psalm:   { ko: "시편", color: "bg-violet-100 text-violet-800 border-violet-300" },
  epistle: { ko: "서신", color: "bg-sky-100 text-sky-800 border-sky-300" },
  gospel:  { ko: "복음", color: "bg-blue-100 text-blue-800 border-blue-300" },
};

interface BibleText { en: { text: string; reference: string } | null; ko: { text: string; reference: string } | null }

export default function Home() {
  const [tab, setTab] = useState<Tab>("today");
  const [today] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rcl, setRcl] = useState<RCLReadings | null>(null);
  const [keyVerses, setKeyVerses] = useState<DayKeyVerses | null>(null);
  const [activeReading, setActiveReading] = useState<ReadingKey>("gospel");
  const [bibleText, setBibleText] = useState<BibleText | null>(null);
  const [bibleLoading, setBibleLoading] = useState(false);
  const [memo, setMemo] = useState("");
  const [entries, setEntries] = useState<Record<string, DailyEntry>>({});
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [news, setNews] = useState<NewsResult>({ bbc: [], daum: [] });
  const [newsLoading, setNewsLoading] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const todayStr = format(today, "yyyy-MM-dd");
  const selectedStr = format(selectedDate, "yyyy-MM-dd");
  const isToday = todayStr === selectedStr;

  // Load RCL and saved entry when date changes
  useEffect(() => {
    const readings = getRCLReadings(selectedDate);
    setRcl(readings);
    setKeyVerses(getKeyVerses(readings.sundayDate));
    const entry = getEntry(selectedStr);
    setMemo(entry?.memo ?? "");
    setEntries(getEntries());
  }, [selectedDate, selectedStr]);

  // Fetch Bible text — uses key verse ref if available, otherwise full passage
  const fetchBible = useCallback(async (fullRef: string, keyRef?: string) => {
    setBibleText(null);
    setBibleLoading(true);
    try {
      const ref = keyRef ?? fullRef;
      const res = await fetch(`/api/bible?ref=${encodeURIComponent(ref)}`);
      const data = await res.json();
      setBibleText(data);
    } catch {
      setBibleText(null);
    } finally {
      setBibleLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!rcl) return;
    const kv = keyVerses?.[activeReading];
    fetchBible(rcl[activeReading], kv?.ref);
  }, [rcl, keyVerses, activeReading, fetchBible]);

  // Fetch news once on mount
  useEffect(() => {
    setNewsLoading(true);
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews({ bbc: d?.bbc ?? [], daum: d?.daum ?? [] }))
      .catch(() => setNews({ bbc: [], daum: [] }))
      .finally(() => setNewsLoading(false));
  }, []);

  const handleSave = () => {
    if (!rcl) return;
    saveEntry(selectedStr, { memo, verseReference: rcl.gospel });
    setEntries(getEntries());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setTab("today");
  };

  const handleShare = async () => {
    if (!shareCardRef.current) return;
    try { await shareToInstagram(shareCardRef.current); }
    catch { alert("이미지 저장에 실패했습니다."); }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
            <rect x="12" y="3" width="4" height="22" fill="#1d4ed8" rx="2" />
            <rect x="3" y="10" width="22" height="4" fill="#1d4ed8" rx="2" />
          </svg>
          <h1 className="text-xl font-semibold text-blue-900 tracking-tight">매일 묵상</h1>
        </div>
        <p className="text-sm text-blue-600 font-medium">
          {format(isToday ? today : selectedDate, "M월 d일", { locale: ko })}
        </p>
      </header>

      <main className="flex-1 px-4 pb-28 space-y-4 fade-in">

        {/* ── TODAY TAB ── */}
        {tab === "today" && rcl && (
          <>
            {/* Date label when viewing past */}
            {!isToday && (
              <div className="flex items-center gap-2 px-1">
                <span className="text-sm text-blue-700 font-medium">
                  {format(selectedDate, "yyyy년 M월 d일 EEEE", { locale: ko })}
                </span>
                <button onClick={() => setSelectedDate(today)} className="text-xs text-blue-400 underline">
                  오늘로
                </button>
              </div>
            )}

            {/* Liturgical season card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-5 text-white shadow-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full tracking-wide">
                  {rcl.season}
                </span>
                <span className="text-xs text-blue-200">{rcl.nameEn}</span>
              </div>
              <h2 className="text-lg font-semibold mt-2">{rcl.name}</h2>
              <p className="text-xs text-blue-200 mt-1">
                {format(selectedDate, "yyyy년 M월 d일 EEEE", { locale: ko })}
              </p>
            </div>

            {/* Reading selector tabs */}
            <div className="grid grid-cols-4 gap-2">
              {(["ot", "psalm", "epistle", "gospel"] as ReadingKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveReading(key)}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-xs font-semibold transition-all ${
                    activeReading === key
                      ? `${READING_LABELS[key].color} border-current shadow-sm`
                      : "bg-white/60 text-stone-400 border-stone-200 hover:bg-white"
                  }`}
                >
                  <span>{READING_LABELS[key].ko}</span>
                  <span className="text-[10px] font-normal mt-0.5 opacity-70 leading-tight text-center line-clamp-2 max-w-full px-0.5">
                    {rcl[key]}
                  </span>
                </button>
              ))}
            </div>

            {/* Reading reference + key verse indicator */}
            <div className="px-1 flex items-center justify-between">
              <p className="text-xs text-blue-500 font-medium">{rcl[activeReading]}</p>
              {keyVerses?.[activeReading] && (
                <span className="text-[10px] text-violet-500 font-semibold bg-violet-50 px-2 py-0.5 rounded-full">
                  핵심 {keyVerses[activeReading]!.ref}
                </span>
              )}
            </div>

            {/* Bible text card */}
            <div className="bg-white/70 rounded-2xl p-5 shadow-sm min-h-[140px]">
              {bibleLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                </div>
              ) : bibleText ? (
                <div className="space-y-4">
                  {/* Korean */}
                  {bibleText.ko ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full tracking-widest">한국어 · 개역한글</span>
                      </div>
                      <p className="text-sm text-stone-800 prose-ko whitespace-pre-line leading-loose font-medium">
                        {bibleText.ko.text}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-stone-400 italic">한국어 본문을 불러올 수 없습니다.</p>
                  )}

                  <div className="border-t border-blue-100" />

                  {/* English */}
                  {bibleText.en ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full tracking-widest">English · WEB</span>
                      </div>
                      <p className="text-sm text-stone-500 leading-loose whitespace-pre-line italic">
                        {bibleText.en.text}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-stone-400 italic">English text unavailable.</p>
                  )}

                  {/* Progressive lens note */}
                  {keyVerses?.[activeReading]?.note && (
                    <>
                      <div className="border-t border-violet-100" />
                      <div className="flex items-start gap-2 bg-violet-50 rounded-xl px-3 py-2.5">
                        <span className="text-violet-500 text-xs mt-0.5">✦</span>
                        <p className="text-xs text-violet-700 leading-5">
                          {keyVerses[activeReading]!.note}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-stone-400 text-center py-8">본문을 불러오는 중...</p>
              )}
            </div>

            {/* All readings list */}
            <details className="bg-white/50 rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-3 cursor-pointer text-sm font-medium text-blue-700 list-none">
                <span>이번 주 전체 본문 목록</span>
                <ChevronDown className="w-4 h-4" />
              </summary>
              <div className="px-5 pb-4 space-y-2">
                {(["ot", "psalm", "epistle", "gospel"] as ReadingKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveReading(key)}
                    className="w-full flex items-center justify-between py-2 text-sm"
                  >
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${READING_LABELS[key].color}`}>
                      {READING_LABELS[key].ko}
                    </span>
                    <span className="text-stone-600 text-xs">{rcl[key]}</span>
                  </button>
                ))}
              </div>
            </details>

            {/* Memo section */}
            <div className="bg-white/60 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <PenLine className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-stone-700">오늘의 묵상 노트</h2>
              </div>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="말씀을 읽고 느낀 점, 깨달음, 적용할 점을 자유롭게 적어보세요..."
                rows={5}
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-300 leading-7"
              />
            </div>

            {/* News section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Newspaper className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-stone-700">오늘의 뉴스 (기도 참고)</h2>
              </div>

              {newsLoading ? (
                <div className="bg-white/60 rounded-2xl flex items-center gap-2 py-6 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-sm text-stone-400">뉴스 불러오는 중...</span>
                </div>
              ) : (
                <>
                  {/* BBC */}
                  <NewsFeedBlock
                    title="BBC World News"
                    accent="bg-stone-900"
                    items={news.bbc ?? []}
                  />
                  <NewsFeedBlock
                    title="연합뉴스"
                    accent="bg-blue-600"
                    items={news.daum ?? []}
                  />
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  saved ? "bg-green-500 text-white" : "bg-blue-700 text-white hover:bg-blue-800 active:scale-95"
                }`}
              >
                <Save className="w-4 h-4" />
                {saved ? "저장됨 ✓" : "저장하기"}
              </button>
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold bg-white/70 text-stone-600 hover:bg-white active:scale-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                공유
              </button>
            </div>

            {/* Share panel */}
            {showShare && (
              <div className="bg-white/60 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  Instagram 공유 이미지
                </h3>
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 flex flex-col items-center justify-center p-8 space-y-3">
                  <p className="text-xs text-blue-200 tracking-widest">{rcl.nameEn}</p>
                  <p className="text-white text-sm font-semibold text-center">{rcl.name}</p>
                  {bibleText?.ko && (
                    <p className="text-blue-100 text-xs text-center leading-5 line-clamp-6">{bibleText.ko.text}</p>
                  )}
                  <p className="text-[10px] text-blue-300 tracking-widest mt-4">매일 묵상</p>
                </div>
                <button
                  onClick={handleShare}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  이미지 저장하기
                </button>
              </div>
            )}
          </>
        )}

        {/* ── HISTORY TAB ── */}
        {tab === "history" && (
          <>
            <div className="px-1 mb-2">
              <h2 className="text-base font-semibold text-blue-900">묵상 기록</h2>
              <p className="text-xs text-stone-400 mt-0.5">날짜를 선택하면 해당 날의 묵상을 볼 수 있어요</p>
            </div>
            <HistoryCalendar entries={entries} onSelectDate={handleSelectDate} selectedDate={selectedDate} />
            <div className="space-y-3">
              {Object.values(entries)
                .filter((e) => e.memo)
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 10)
                .map((entry) => (
                  <button
                    key={entry.date}
                    onClick={() => handleSelectDate(new Date(entry.date + "T12:00:00"))}
                    className="w-full bg-white/60 rounded-2xl p-4 text-left hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-blue-700">
                        {format(new Date(entry.date + "T12:00:00"), "M월 d일 EEEE", { locale: ko })}
                      </span>
                      <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">묵상</span>
                    </div>
                    <p className="text-sm text-stone-600 line-clamp-2 leading-6">{entry.memo}</p>
                  </button>
                ))}
              {Object.values(entries).filter((e) => e.memo).length === 0 && (
                <div className="text-center py-12 text-stone-400">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">아직 묵상 기록이 없어요</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab === "settings" && (
          <>
            <div className="px-1 mb-2">
              <h2 className="text-base font-semibold text-blue-900">설정</h2>
            </div>
            <NotificationSetup />
            <div className="bg-white/60 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-stone-700">앱 정보</h3>
              <div className="space-y-2 text-sm text-stone-500">
                <div className="flex justify-between"><span>성경 본문</span><span className="text-stone-400">개역한글 · WEB (영어)</span></div>
                <div className="flex justify-between"><span>일과표</span><span className="text-stone-400">Revised Common Lectionary</span></div>
                <div className="flex justify-between"><span>저장된 기록</span><span className="text-stone-400">{Object.values(entries).filter((e) => e.memo).length}일</span></div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/85 backdrop-blur-xl border-t border-blue-100 px-4 py-2">
        <div className="flex justify-around">
          {([
            { id: "today" as Tab, label: "오늘", Icon: BookOpen },
            { id: "history" as Tab, label: "기록", Icon: History },
            { id: "settings" as Tab, label: "설정", Icon: Settings },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-all ${
                tab === id ? "text-blue-700" : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <Icon className={`w-5 h-5 ${tab === id ? "stroke-[2.5px]" : ""}`} />
              <span className={`text-xs ${tab === id ? "font-semibold" : "font-medium"}`}>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Hidden share card */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        <ShareCard
          ref={shareCardRef}
          rclName={rcl?.name ?? ""}
          rclNameEn={rcl?.nameEn ?? ""}
          season={rcl?.season ?? ""}
          koText={bibleText?.ko?.text ?? ""}
          koRef={bibleText?.ko?.reference ?? ""}
          memo={memo}
          date={selectedDate}
        />
      </div>
    </div>
  );
}
