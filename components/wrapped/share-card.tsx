"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import type { FounderStory } from "@/lib/types";
import { LogoIcon } from "@/components/logo";

/* ── Download helper ── */
function useDownload(ref: React.RefObject<HTMLDivElement | null>, filename: string) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const download = async () => {
    try {
      setError("");
      setBusy(true);
      if (!ref.current) return;
      const data = await toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
        width: 1200,
        height: 630,
        style: { width: "1200px", height: "630px" },
      });
      const a = document.createElement("a");
      a.href = data;
      a.download = filename;
      a.click();
    } catch {
      setError("Export failed — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return { download, busy, error };
}

function DownloadBtn({ busy, onClick }: { busy: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={busy} className="fw-button-secondary mt-3 w-full gap-2 text-sm">
      {busy ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-border border-t-brand-primary" />
          Exporting…
        </>
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PNG
        </>
      )}
    </button>
  );
}

function slug(s: string) { return s.toLowerCase().replace(/\s+/g, "-"); }

/*
  All card content uses inline styles with px values that are designed for
  the 1200×630 export canvas. The preview wrapper scales the card down via
  CSS aspect-ratio; the card content is rendered at full size inside a
  container that has `width: 100%; aspect-ratio: 1200/630` and the inner
  canvas scales via CSS transforms applied by the browser's aspect-ratio.

  The key insight: we render the card at a fixed logical size and let the
  outer wrapper + aspect-ratio handle the visual scaling.
*/

/* =========================================================
   A. Revenue Milestone Card
   ========================================================= */
export function RevenueCard({ story }: { story: FounderStory }) {
  const ref = useRef<HTMLDivElement>(null);
  const { download, busy, error } = useDownload(ref, `${slug(story.productName)}-revenue-milestone.png`);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-brand-border bg-white p-1.5 shadow-[0_8px_24px_rgba(23,19,17,0.06)]">
        <div
          ref={ref}
          style={{
            aspectRatio: "1200 / 630",
            background: "linear-gradient(135deg, #FF7B4D 0%, #FF5A1F 55%, #E14D16 100%)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          }}
        >
          {/* Decorative */}
          <div style={{ position: "absolute", top: "-8%", right: "-6%", width: "28%", height: "50%", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "20%", height: "40%", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

          <div style={{ position: "relative", zIndex: 1, padding: "6% 7%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", boxSizing: "border-box" }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.03em" }}>
                FounderWrapped · {story.founderName}
              </span>

              <p style={{ marginTop: "5%", fontSize: "42px", fontWeight: 700, lineHeight: 1.1, color: "#fff", letterSpacing: "-0.02em" }}>
                {story.revenue}
              </p>

              <p style={{ marginTop: "2.5%", fontSize: "22px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                earned in {story.monthOrLaunch}
              </p>

              <p style={{ marginTop: "2%", fontSize: "13px", color: "rgba(255,255,255,0.65)", maxWidth: "60%", lineHeight: 1.5 }}>
                {story.productName} — {story.productDescription}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                {story.productName} · founderwrapped.com
              </span>
              <svg style={{ opacity: 0.25 }} width="90" height="24" viewBox="0 0 100 24" fill="none">
                <polyline points="0,20 15,16 30,18 45,10 60,12 75,6 90,4 100,2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <DownloadBtn busy={busy} onClick={download} />
      {error && <p className="mt-1 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* =========================================================
   B. Monthly Wrapped Card
   ========================================================= */
export function MonthlyWrappedCard({ story }: { story: FounderStory }) {
  const ref = useRef<HTMLDivElement>(null);
  const { download, busy, error } = useDownload(ref, `${slug(story.productName)}-monthly-wrapped.png`);

  const stats = [
    { label: "Revenue", value: story.revenue },
    { label: "Users", value: story.users },
    { label: "Launches", value: story.launches },
    { label: "Top channel", value: story.topChannel },
  ];

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-brand-border bg-white p-1.5 shadow-[0_8px_24px_rgba(23,19,17,0.06)]">
        <div
          ref={ref}
          style={{
            aspectRatio: "1200 / 630",
            background: "linear-gradient(135deg, #FFFAF5 0%, #FFF0E8 50%, #FFE4D6 100%)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          }}
        >
          <div style={{ position: "absolute", top: "-8%", right: "-4%", width: "22%", height: "40%", borderRadius: "50%", background: "rgba(255,90,31,0.04)" }} />

          <div style={{ position: "relative", zIndex: 1, padding: "6% 7%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", boxSizing: "border-box" }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,90,31,0.1)", color: "#E14D16", fontSize: "11px", fontWeight: 600 }}>
                FounderWrapped · {story.founderName}
              </span>

              <p style={{ marginTop: "4%", fontSize: "32px", fontWeight: 700, lineHeight: 1.15, color: "#171311", letterSpacing: "-0.01em" }}>
                {story.monthOrLaunch} Wrapped
              </p>
              <p style={{ marginTop: "1.5%", fontSize: "14px", color: "#4F4742" }}>
                by {story.founderName} · {story.founderRole}
              </p>

              {/* Stat rows */}
              <div style={{ marginTop: "4%", display: "flex", flexDirection: "column", gap: "6px" }}>
                {stats.map((s) => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
                    <span style={{ color: "#8A7F77" }}>{s.label}</span>
                    <span style={{ fontWeight: 700, color: "#171311" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "#8A7F77", fontWeight: 500 }}>
                {story.productName} · founderwrapped.com
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,90,31,0.1)", color: "#E14D16", padding: "6px" }}>
                <LogoIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <DownloadBtn busy={busy} onClick={download} />
      {error && <p className="mt-1 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* =========================================================
   C. Lesson Learned Card
   ========================================================= */
export function LessonCard({ story }: { story: FounderStory }) {
  const ref = useRef<HTMLDivElement>(null);
  const { download, busy, error } = useDownload(ref, `${slug(story.productName)}-lesson-learned.png`);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-brand-border bg-white p-1.5 shadow-[0_8px_24px_rgba(23,19,17,0.06)]">
        <div
          ref={ref}
          style={{
            aspectRatio: "1200 / 630",
            background: "linear-gradient(135deg, #E7FBC0 0%, #C7F36B 55%, #A8DE49 100%)",
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          }}
        >
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "24%", height: "45%", borderRadius: "50%", background: "rgba(63,107,0,0.05)" }} />
          <div style={{ position: "absolute", bottom: "-8%", left: "-4%", width: "18%", height: "35%", borderRadius: "50%", background: "rgba(63,107,0,0.04)" }} />

          <div style={{ position: "relative", zIndex: 1, padding: "6% 7%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", boxSizing: "border-box" }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", background: "rgba(63,107,0,0.1)", color: "#3F6B00", fontSize: "11px", fontWeight: 600 }}>
                FounderWrapped · {story.founderName}
              </span>

              <p style={{ marginTop: "5%", fontSize: "38px", fontWeight: 700, lineHeight: 1.1, color: "#1A2E00", letterSpacing: "-0.01em" }}>
                Build. Learn. Repeat.
              </p>

              <p style={{ marginTop: "3.5%", fontSize: "16px", fontStyle: "italic", lineHeight: 1.5, color: "#3F6B00", maxWidth: "72%" }}>
                &ldquo;{story.biggestLesson}&rdquo;
              </p>

              <p style={{ marginTop: "2.5%", fontSize: "12px", color: "rgba(63,107,0,0.7)" }}>
                — {story.founderName}, {story.founderRole} at {story.productName}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "rgba(63,107,0,0.55)", fontWeight: 500 }}>
                founderwrapped.com
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "8px", background: "rgba(63,107,0,0.1)", color: "#3F6B00", padding: "6px" }}>
                <LogoIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <DownloadBtn busy={busy} onClick={download} />
      {error && <p className="mt-1 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
}
