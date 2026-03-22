"use client";

import { forwardRef } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface ShareCardProps {
  rclName: string;
  rclNameEn: string;
  season: string;
  koText: string;
  koRef: string;
  memo: string;
  date: Date;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ rclName, rclNameEn, season, koText, koRef, memo, date }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1080px",
          background: "linear-gradient(145deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          fontFamily: "inherit",
        }}
      >
        {/* Cross */}
        <div style={{ marginBottom: "28px", opacity: 0.3 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="17" y="4" width="6" height="32" fill="white" rx="3" />
            <rect x="4" y="14" width="32" height="6" fill="white" rx="3" />
          </svg>
        </div>

        {/* Date */}
        <p style={{ fontSize: "20px", color: "#93c5fd", marginBottom: "16px", letterSpacing: "0.1em" }}>
          {format(date, "yyyy년 M월 d일 EEEE", { locale: ko })}
        </p>

        {/* Season + name */}
        <div style={{ background: "rgba(255,255,255,0.15)", padding: "6px 24px", borderRadius: "999px", marginBottom: "12px" }}>
          <p style={{ fontSize: "18px", color: "#bfdbfe", letterSpacing: "0.1em" }}>{season} · {rclNameEn}</p>
        </div>
        <p style={{ fontSize: "28px", fontWeight: "600", color: "white", marginBottom: "40px" }}>{rclName}</p>

        {/* Korean verse text */}
        {koText && (
          <p style={{
            fontSize: "30px",
            fontWeight: "300",
            color: "#dbeafe",
            lineHeight: "2.0",
            textAlign: "center",
            maxWidth: "860px",
            marginBottom: "24px",
          }}>
            {koText.split("\n").slice(0, 8).join("\n")}
          </p>
        )}

        {koRef && (
          <p style={{ fontSize: "22px", color: "#93c5fd", fontWeight: "500", marginBottom: memo ? "36px" : "0" }}>
            — {koRef}
          </p>
        )}

        {/* Memo */}
        {memo && (
          <div style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "24px 36px",
            maxWidth: "860px",
            marginTop: "8px",
          }}>
            <p style={{ fontSize: "22px", color: "#e0f2fe", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
              {memo.slice(0, 200)}
            </p>
          </div>
        )}

        <p style={{
          position: "absolute",
          bottom: "40px",
          fontSize: "18px",
          color: "#60a5fa",
          letterSpacing: "0.2em",
        }}>
          매일 묵상
        </p>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";
export default ShareCard;
