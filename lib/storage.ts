export interface DailyEntry {
  date: string; // YYYY-MM-DD
  memo: string;
  prayer: string;
  verseReference: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppSettings {
  notificationEnabled: boolean;
  notificationTime: string; // HH:mm
  userName: string;
}

const ENTRIES_KEY = "daily-qt-entries";
const SETTINGS_KEY = "daily-qt-settings";

export function getEntries(): Record<string, DailyEntry> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(ENTRIES_KEY);
  return data ? JSON.parse(data) : {};
}

export function getEntry(date: string): DailyEntry | null {
  const entries = getEntries();
  return entries[date] || null;
}

export function saveEntry(date: string, entry: Partial<DailyEntry>): DailyEntry {
  const entries = getEntries();
  const now = new Date().toISOString();
  const existing = entries[date];
  const defaults: DailyEntry = {
    date,
    memo: "",
    prayer: "",
    verseReference: "",
    createdAt: now,
    updatedAt: now,
  };
  const updated: DailyEntry = {
    ...defaults,
    ...existing,
    ...entry,
    date,
    updatedAt: now,
  };
  entries[date] = updated;
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  return updated;
}

export function getSettings(): AppSettings {
  if (typeof window === "undefined") {
    return { notificationEnabled: false, notificationTime: "07:00", userName: "" };
  }
  const data = localStorage.getItem(SETTINGS_KEY);
  return data
    ? JSON.parse(data)
    : { notificationEnabled: false, notificationTime: "07:00", userName: "" };
}

export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}
