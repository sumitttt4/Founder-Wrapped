"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin, Rocket } from "lucide-react";
import { LogoIcon } from "@/components/logo";
import { useMemo } from "react";

function HorizonGraphic() {
  const gapWidth = 8;
  const maxWidth = 480;

  const topLines = useMemo(() => {
    const lines = [];
    const TOTAL = 28;

    for (let i = 0; i < TOTAL; i++) {
      const y = (i + 1) / TOTAL;
      const totalWidth = y * maxWidth;
      
      const leftEdge = -totalWidth / 2;
      const rightEdge = totalWidth / 2;
      const leftDiag = leftEdge / 3;
      const rightDiag = rightEdge / 3;

      const segments = [
        { start: leftEdge, end: leftDiag - gapWidth/2 },
        { start: leftDiag + gapWidth/2, end: rightDiag - gapWidth/2 },
        { start: rightDiag + gapWidth/2, end: rightEdge }
      ];

      lines.push(
        <div key={`top-${i}`} className="relative h-[2px] w-full" style={{ maxWidth: `${maxWidth}px` }}>
          {segments.map((seg, idx) => {
            const w = seg.end - seg.start;
            if (w > 0) {
              return (
                <div
                  key={idx}
                  className="absolute top-0 h-full bg-brand-primary rounded-full"
                  style={{ width: `${w}px`, left: `calc(50% + ${seg.start}px)` }}
                />
              );
            }
            return null;
          })}
        </div>
      );
    }
    return lines;
  }, []);

  const bottomLines = useMemo(() => {
    const lines = [];
    const TOTAL = 42;

    for (let i = 0; i < TOTAL; i++) {
      const y = i / TOTAL;
      const totalWidth = (1 - y) * maxWidth;
      
      const leftEdge = -totalWidth / 2;
      const rightEdge = totalWidth / 2;
      const leftDiag = leftEdge / 3;
      const rightDiag = rightEdge / 3;

      const segments = [
        { start: leftEdge, end: leftDiag - gapWidth/2 },
        { start: leftDiag + gapWidth/2, end: rightDiag - gapWidth/2 },
        { start: rightDiag + gapWidth/2, end: rightEdge }
      ];

      lines.push(
        <div key={`bot-${i}`} className="relative h-[2px] w-full" style={{ maxWidth: `${maxWidth}px` }}>
          {segments.map((seg, idx) => {
            const w = seg.end - seg.start;
            if (w > 0) {
              return (
                <div
                  key={idx}
                  className="absolute top-0 h-full bg-white rounded-full transition-opacity"
                  style={{ width: `${w}px`, left: `calc(50% + ${seg.start}px)`, opacity: 0.9 - y * 0.7 }}
                />
              );
            }
            return null;
          })}
        </div>
      );
    }
    return lines;
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-16">
      {/* Top half: Light background, orange lines */}
      <div className="flex w-full flex-col items-center gap-[6px] pb-[6px]">
        {topLines}
      </div>
      {/* Bottom half: Solid orange background, white lines */}
      <div className="flex w-full flex-col items-center gap-[6px] bg-brand-primary pt-[6px] pb-16">
        {bottomLines}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="mt-32 w-full">
      {/* CTA Section */}
      <section className="mx-auto max-w-2xl px-6 text-center mb-8">
        <Rocket className="mx-auto h-12 w-12 text-brand-primary" />
        <h2 className="heading mt-6 text-4xl font-bold sm:text-5xl">Your messy month deserves a good story.</h2>
        <p className="mx-auto mt-4 text-lg text-brand-textSoft">
          Turn your milestones, launches, and lessons into beautiful social cards and recaps.
        </p>
        <Link href="/create" className="fw-button-primary mt-8 inline-flex px-8 py-3 text-lg">
          Create your wrapped
        </Link>
      </section>

      {/* Horizon Graphic */}
      <HorizonGraphic />

      {/* Solid Footer Block */}
      <footer className="bg-brand-primary pb-24 text-brand-primarySoft">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand-primary p-1.5">
                <LogoIcon />
              </span>
              <span className="heading text-2xl font-bold">FounderWrapped</span>
            </Link>
            <div className="mt-4 text-sm opacity-80 space-y-2">
              <p>Built in public by <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-brand-primary transition-colors">@yourhandle</a>.</p>
              <p>© {new Date().getFullYear()} FounderWrapped. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
