"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { DailyEntry } from "@/lib/storage";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HistoryCalendarProps {
  entries: Record<string, DailyEntry>;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

export default function HistoryCalendar({ entries, onSelectDate, selectedDate }: HistoryCalendarProps) {
  const [viewMonth, setViewMonth] = useState(new Date());

  const days = eachDayOfInterval({ start: startOfMonth(viewMonth), end: endOfMonth(viewMonth) });
  const startPadding = getDay(startOfMonth(viewMonth));

  return (
    <div className="bg-white/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))} className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors">
          <ChevronLeft className="w-4 h-4 text-stone-600" />
        </button>
        <h3 className="font-medium text-stone-700">{format(viewMonth, "yyyy년 M월", { locale: ko })}</h3>
        <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))} className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors">
          <ChevronRight className="w-4 h-4 text-stone-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d} className="text-center text-xs text-stone-400 py-1 font-medium">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startPadding }).map((_, i) => <div key={`p-${i}`} />)}
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const hasEntry = !!entries[dateStr]?.memo;
          const isSelected = isSameDay(day, selectedDate);
          const todayFlag = isToday(day);
          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(day)}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl text-sm transition-all ${
                isSelected ? "bg-blue-700 text-white" : todayFlag ? "bg-blue-100 text-blue-800" : "hover:bg-blue-50 text-stone-600"
              }`}
            >
              {day.getDate()}
              {hasEntry && <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? "bg-white/70" : "bg-blue-500"}`} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
