"use client";

import { useState, useEffect } from "react";
import { getSettings, saveSettings } from "@/lib/storage";
import { Bell, BellOff, Check } from "lucide-react";

export default function NotificationSetup() {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("07:00");
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    setEnabled(settings.notificationEnabled);
    setTime(settings.notificationTime);
    if ("Notification" in window) setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) { alert("이 브라우저는 알림을 지원하지 않습니다."); return; }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      setEnabled(true);
      saveSettings({ notificationEnabled: true, notificationTime: time });
      new Notification("매일 묵상", { body: "알림이 설정되었습니다!" });
    }
  };

  const handleSave = () => {
    saveSettings({ notificationEnabled: enabled, notificationTime: time });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggle = async () => {
    if (!enabled && permission !== "granted") { await requestPermission(); return; }
    const next = !enabled;
    setEnabled(next);
    saveSettings({ notificationEnabled: next, notificationTime: time });
  };

  return (
    <div className="bg-white/60 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {enabled ? <Bell className="w-5 h-5 text-blue-700" /> : <BellOff className="w-5 h-5 text-blue-300" />}
          <span className="font-medium text-stone-700">매일 묵상 알림</span>
        </div>
        <button onClick={handleToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-stone-300"}`}>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
        </button>
      </div>
      {enabled && (
        <div className="flex items-center gap-3">
          <label className="text-sm text-stone-600">알림 시간</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border border-blue-200 rounded-lg px-3 py-1.5 text-sm bg-blue-50 text-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <button onClick={handleSave} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${saved ? "bg-green-100 text-green-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
            {saved ? <><Check className="w-3.5 h-3.5" /> 저장됨</> : "저장"}
          </button>
        </div>
      )}
      {permission === "denied" && <p className="text-xs text-red-500">브라우저 설정에서 알림 권한을 허용해 주세요.</p>}
    </div>
  );
}
