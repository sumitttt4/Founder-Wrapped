"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { saveStory } from "@/lib/storage";
import type { FounderStory } from "@/lib/types";

type FK = keyof FounderStory;

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<FounderStory>>({});
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const set = (key: FK, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => { const n = new Set(p); n.delete(key); return n; });
  };

  const required: FK[] = [
    "founderName","founderRole","productName","productUrl","productDescription",
    "monthOrLaunch","revenue","users","launches","biggestWin","biggestFail",
    "biggestLesson","topChannel","nextGoal","founderQuote",
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = new Set<string>();
    for (const k of required) { if (!form[k]?.toString().trim()) missing.add(k); }
    if (missing.size > 0) {
      setErrors(missing);
      document.querySelector("[data-error='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const id = crypto.randomUUID();
    const story: FounderStory = {
      id, createdAt: new Date().toISOString(),
      founderName: form.founderName!.trim(), founderRole: form.founderRole!.trim(),
      founderAvatarUrl: form.founderAvatarUrl?.trim() || "",
      productName: form.productName!.trim(), productUrl: form.productUrl!.trim(),
      productDescription: form.productDescription!.trim(),
      productScreenshotUrl: form.productScreenshotUrl?.trim() || "",
      monthOrLaunch: form.monthOrLaunch!.trim(), revenue: form.revenue!.trim(),
      users: form.users!.trim(), launches: form.launches!.trim(),
      biggestWin: form.biggestWin!.trim(), biggestFail: form.biggestFail!.trim(),
      biggestLesson: form.biggestLesson!.trim(), topChannel: form.topChannel!.trim(),
      nextGoal: form.nextGoal!.trim(), founderQuote: form.founderQuote!.trim(),
    };
    saveStory(story);
    router.push(`/wrapped/${id}`);
  };

  const hasErr = (k: string) => errors.has(k);

  const field = (key: FK, label: string, ph: string, opts?: { area?: boolean; optional?: boolean; hint?: string }) => (
    <label className="block" data-error={hasErr(key) ? "true" : undefined}>
      <span className="mb-1.5 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-brand-text">{label}</span>
        {opts?.optional && <span className="text-xs text-brand-muted">Optional</span>}
      </span>
      {opts?.hint && <span className="mb-2 block text-xs text-brand-muted">{opts.hint}</span>}
      {opts?.area ? (
        <textarea placeholder={ph} rows={3}
          className={`fw-input ${hasErr(key) ? "!border-red-400 !ring-red-100" : ""}`}
          value={(form[key] as string) || ""} onChange={(e) => set(key, e.target.value)} />
      ) : (
        <input placeholder={ph}
          className={`fw-input ${hasErr(key) ? "!border-red-400 !ring-red-100" : ""}`}
          value={(form[key] as string) || ""} onChange={(e) => set(key, e.target.value)} />
      )}
      {hasErr(key) && <span className="mt-1 block text-xs text-red-500">This field is required</span>}
    </label>
  );

  return (
    <main className="pb-20">
      <Nav />
      <div className="mx-auto mt-10 max-w-3xl px-6">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Create your story</p>
          <h1 className="heading text-4xl font-bold sm:text-5xl">Build your FounderWrapped</h1>
          <p className="mt-3 max-w-xl text-lg text-brand-textSoft">
            Fill in your founder journey — we&apos;ll turn it into a beautiful recap page, share cards, and social posts.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {["Founder","Product","Progress","Story"].map((s,i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primarySoft text-xs font-bold text-brand-primary">{i+1}</span>
              <span className="text-sm font-medium text-brand-textSoft">{s}</span>
              {i < 3 && <div className="mx-1 h-px w-6 bg-brand-border sm:w-10" />}
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-8">
          <section className="fw-card">
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Founder</h2>
              <p className="mt-1 text-sm text-brand-muted">Who&apos;s behind the product?</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("founderName","Your name","Alex Chen")}
              {field("founderRole","Your role","Solo founder, Co-founder & CEO…")}
              {field("founderAvatarUrl","Avatar URL","https://yoursite.com/avatar.jpg",{optional:true,hint:"Link to your profile photo. Leave blank to use initials."})}
            </div>
          </section>

          <section className="fw-card">
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Product</h2>
              <p className="mt-1 text-sm text-brand-muted">Tell us about what you&apos;re building.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("productName","Product name","Luna")}
              {field("productUrl","Product URL","https://luna.so")}
            </div>
            <div className="mt-5">{field("productDescription","What does it do?","AI workspace that helps solo builders stay focused and ship faster.",{area:true,hint:"One or two sentences — how would you explain it to a founder friend?"})}</div>
            <div className="mt-5">{field("productScreenshotUrl","Screenshot URL","https://yoursite.com/screenshot.png",{optional:true,hint:"A product screenshot or OG image URL."})}</div>
          </section>

          <section className="fw-card">
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Progress</h2>
              <p className="mt-1 text-sm text-brand-muted">Your numbers — be honest, that&apos;s the whole point.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("monthOrLaunch","Month or launch","March 2026, Launch Week, v2.0…",{hint:"What period does this wrapped cover?"})}
              {field("revenue","Revenue","$4.2k MRR, $0 (pre-revenue), $850…",{hint:"Any format works. Be real."})}
              {field("users","Users","2,843 active users, 120 beta testers…")}
              {field("launches","Launches","2 features shipped, 1 PH launch…")}
              {field("topChannel","Top growth channel","Product Hunt, X, Reddit, Newsletter…")}
            </div>
          </section>

          <section className="fw-card">
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Story</h2>
              <p className="mt-1 text-sm text-brand-muted">The real stuff — wins, fails, and what you learned.</p>
            </div>
            <div className="grid gap-5">
              {field("biggestWin","Biggest win","Shipped onboarding v2 and doubled activation rate.",{area:true,hint:"What went right? The moment that made you pump your fist."})}
              {field("biggestFail","Biggest fail","Spent 3 weeks building a feature nobody asked for.",{area:true,hint:"What didn't work? Founders respect honesty here."})}
              {field("biggestLesson","Biggest lesson","Simple onboarding beats flexible onboarding every time.",{area:true,hint:"What will you carry forward?"})}
              {field("nextGoal","Next goal","Reach 5,000 active users and launch on Product Hunt.",{hint:"What are you aiming for next?"})}
              {field("founderQuote","Your founder quote","Build small, ship weekly, learn fast.",{hint:"One line that captures your builder philosophy."})}
            </div>
          </section>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button type="submit" className="fw-button-primary gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Generate my wrapped page
            </button>
            <span className="text-sm text-brand-muted">Your data stays in your browser.</span>
          </div>
        </form>
      </div>
    </main>
  );
}
