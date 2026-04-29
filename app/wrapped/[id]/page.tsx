"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DollarSign, Users, Rocket, Megaphone, Check, X, Lightbulb, Target, Twitter, Linkedin } from "lucide-react";
import { Nav } from "@/components/nav";
import { RevenueCard, MonthlyWrappedCard, LessonCard } from "@/components/wrapped/share-card";
import { generateLinkedInPost, generateXThread } from "@/lib/social-copy";
import { getStory } from "@/lib/storage";
import type { FounderStory } from "@/lib/types";

/* ── Copy button with 1.5s "Copied!" state ── */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="fw-button-primary mt-4 gap-2 text-sm">
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copy {label}
        </>
      )}
    </button>
  );
}

/* ── Avatar initials ── */
function Initials({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primarySoft text-lg font-bold text-brand-primary">
      {initials}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function WrappedPage() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<FounderStory | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStory(getStory(id));
    setLoaded(true);
  }, [id]);

  const xThread = useMemo(() => (story ? generateXThread(story) : ""), [story]);
  const liPost = useMemo(() => (story ? generateLinkedInPost(story) : ""), [story]);

  /* Loading */
  if (!loaded) {
    return (
      <main>
        <Nav />
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-border border-t-brand-primary" />
        </div>
      </main>
    );
  }

  /* Empty state */
  if (!story) {
    return (
      <main>
        <Nav />
        <section className="mx-auto mt-20 max-w-lg px-6 text-center">
          <div className="fw-card py-14">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primarySoft">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <h1 className="heading text-3xl font-bold">Story not found</h1>
            <p className="mt-2 text-brand-textSoft">
              This wrapped page doesn&apos;t exist yet. Create your first one!
            </p>
            <Link href="/create" className="fw-button-primary mt-6 inline-flex">
              Create your wrapped
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* ── Data ── */
  const metrics = [
    { label: "Revenue", value: story.revenue, icon: <DollarSign className="h-6 w-6" /> },
    { label: "Users", value: story.users, icon: <Users className="h-6 w-6" /> },
    { label: "Launches", value: story.launches, icon: <Rocket className="h-6 w-6" /> },
    { label: "Top Channel", value: story.topChannel, icon: <Megaphone className="h-6 w-6" /> },
  ];

  const storyCards = [
    { label: "Biggest Win", value: story.biggestWin, color: "bg-green-50 border-green-200", icon: <Check className="h-5 w-5 text-green-600" /> },
    { label: "Biggest Fail", value: story.biggestFail, color: "bg-red-50 border-red-200", icon: <X className="h-5 w-5 text-red-600" /> },
    { label: "Biggest Lesson", value: story.biggestLesson, color: "bg-blue-50 border-blue-200", icon: <Lightbulb className="h-5 w-5 text-blue-600" /> },
    { label: "Next Goal", value: story.nextGoal, color: "bg-amber-50 border-amber-200", icon: <Target className="h-5 w-5 text-amber-600" /> },
  ];

  return (
    <main className="pb-28">
      <Nav />

      {/* ── Hero ── */}
      <section className="mx-auto mt-14 max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
          FounderWrapped · {story.monthOrLaunch}
        </p>
        <h1 className="heading mt-3 text-4xl font-bold sm:text-5xl">
          {story.productName}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-brand-textSoft">
          {story.productDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="fw-button-secondary gap-2 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            Copy link
          </button>
          <Link href="/create" className="fw-button-primary text-sm">
            Create yours
          </Link>
        </div>
      </section>

      {/* ── Founder profile + Metrics ── */}
      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 lg:grid-cols-[1fr_2fr]">
        {/* Founder card */}
        <div className="fw-card flex flex-col items-start gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Founder</p>
          <div className="flex items-center gap-4">
            {story.founderAvatarUrl ? (
              <img src={story.founderAvatarUrl} alt={story.founderName} className="h-14 w-14 rounded-2xl object-cover" />
            ) : (
              <Initials name={story.founderName} />
            )}
            <div>
              <p className="heading text-xl font-bold">{story.founderName}</p>
              <p className="text-sm text-brand-textSoft">{story.founderRole}</p>
            </div>
          </div>
          <a href={story.productUrl} target="_blank" rel="noopener noreferrer" className="fw-link text-sm font-medium">
            {story.productUrl} →
          </a>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="fw-card text-center flex flex-col items-center">
              <span className="flex justify-center text-brand-textSoft">{m.icon}</span>
              <p className="heading mt-3 text-2xl font-bold">{m.value}</p>
              <p className="mt-1 text-xs text-brand-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story cards ── */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <h2 className="heading text-2xl font-bold">The Story</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {storyCards.map((c) => (
            <div key={c.label} className={`rounded-[20px] border p-6 ${c.color}`}>
              <div className="flex items-center gap-2.5">
                {c.icon}
                <h3 className="heading text-lg font-bold">{c.label}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-brand-textSoft">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founder quote ── */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="rounded-[24px] border border-brand-border bg-brand-surfaceAlt px-8 py-10 text-center">
          <span className="heading text-5xl text-brand-primary">&ldquo;</span>
          <p className="heading mx-auto mt-2 max-w-2xl text-2xl font-semibold leading-relaxed">
            {story.founderQuote}
          </p>
          <p className="mt-4 text-sm text-brand-muted">
            — {story.founderName}, {story.founderRole}
          </p>
        </div>
      </section>

      {/* ── Share cards ── */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Share cards</p>
        <h2 className="heading mt-2 text-3xl font-bold">Download &amp; share</h2>
        <p className="mt-1 text-brand-textSoft">
          Post these on X, LinkedIn, or anywhere. Each card exports as a 1200×630 PNG.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RevenueCard story={story} />
          <MonthlyWrappedCard story={story} />
          <LessonCard story={story} />
        </div>
      </section>

      {/* ── Social posts ── */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Social posts</p>
        <h2 className="heading mt-2 text-3xl font-bold">Ready-to-post founder story</h2>
        <p className="mt-1 text-brand-textSoft">
          Copy your launch update for X and LinkedIn.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* X Thread */}
          <div className="fw-card">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-surfaceAlt text-sm font-bold text-brand-text"><Twitter className="h-4 w-4" /></span>
              <h3 className="heading text-xl font-bold">X Thread</h3>
            </div>
            <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-brand-border bg-brand-surfaceAlt p-4">
              <pre className="whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-brand-textSoft">
                {xThread}
              </pre>
            </div>
            <CopyButton text={xThread} label="thread" />
          </div>

          {/* LinkedIn */}
          <div className="fw-card">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-surfaceAlt text-sm text-brand-text"><Linkedin className="h-4 w-4" /></span>
              <h3 className="heading text-xl font-bold">LinkedIn Post</h3>
            </div>
            <div className="mt-4 max-h-72 overflow-y-auto rounded-xl border border-brand-border bg-brand-surfaceAlt p-4">
              <pre className="whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-brand-textSoft">
                {liPost}
              </pre>
            </div>
            <CopyButton text={liPost} label="post" />
          </div>
        </div>
      </section>
    </main>
  );
}
