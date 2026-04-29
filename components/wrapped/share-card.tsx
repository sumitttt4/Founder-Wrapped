"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";

type Props = { title: string; subtitle: string; accent?: "orange" | "lime" | "cream"; productName: string; founder: string; metric: string; };

export function ShareCard({ title, subtitle, accent = "orange", productName, founder, metric }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const bg = accent === "lime" ? "from-[#E7FBC0] to-[#C7F36B]" : accent === "cream" ? "from-[#FFF6E9] to-[#FFF0E8]" : "from-[#FF7B4D] to-[#FF5A1F] text-white";

  const download = async () => {
    try {
      setError("");
      if (!ref.current) return;
      const data = await toPng(ref.current, { pixelRatio: 2 });
      const a = document.createElement("a");
      a.href = data;
      a.download = `${productName.toLowerCase().replace(/\s+/g, "-")}-founderwrapped.png`;
      a.click();
    } catch {
      setError("Could not download image. Please try again.");
    }
  };

  return <div className="space-y-3"><div className="w-full overflow-hidden rounded-[24px] border border-brand-border bg-white p-2 shadow-[0_10px_30px_rgba(23,19,17,0.05)]"><div ref={ref} className={`relative h-auto w-full rounded-[28px] bg-gradient-to-br ${bg}`} style={{ aspectRatio: "1200 / 630" }}><div className="p-8"><span className="fw-badge">Featured</span><p className="mt-3 text-sm">FounderWrapped · {founder}</p><p className="mt-4 heading text-5xl font-bold">{metric}</p><p className="heading mt-4 text-3xl">{title}</p><p className="mt-3 text-base opacity-90">{subtitle}</p><p className="absolute bottom-5 text-sm opacity-80">{productName} · founderwrapped.com</p></div><div className="absolute bottom-0 right-0 h-24 w-44 rounded-tl-full border-l border-t border-white/40"/></div></div><button onClick={download} className="fw-button-secondary w-full">Download PNG</button>{error && <p className="text-sm text-red-600">{error}</p>}</div>;
}
