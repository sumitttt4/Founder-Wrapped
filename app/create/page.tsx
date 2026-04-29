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

  const [activeStep, setActiveStep] = useState(0);

  const field = (key: FK, label: string, ph: string, stepIndex: number, opts?: { area?: boolean; optional?: boolean; hint?: string }) => (
    <label className="block" data-error={hasErr(key) ? "true" : undefined} onFocus={() => setActiveStep(stepIndex)}>
      <span className="mb-1.5 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-brand-text">{label}</span>
        {opts?.optional && <span className="text-xs text-brand-muted">Optional</span>}
      </span>
      {opts?.area ? (
        <textarea placeholder={ph} rows={3}
          className={`fw-input ${hasErr(key) ? "!border-red-400 !ring-red-100" : ""}`}
          value={(form[key] as string) || ""} onChange={(e) => set(key, e.target.value)} />
      ) : (
        <input placeholder={ph}
          className={`fw-input ${hasErr(key) ? "!border-red-400 !ring-red-100" : ""}`}
          value={(form[key] as string) || ""} onChange={(e) => set(key, e.target.value)} />
      )}
      {opts?.hint && <p className="mt-2 text-xs text-brand-muted">{opts.hint}</p>}
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

        <div className="sticky top-4 z-10 mb-8 flex flex-wrap items-center gap-2 bg-brand-bg/90 py-4 backdrop-blur">
          {["Founder","Product","Progress","Story"].map((s,i) => {
            const isCompleted = i < activeStep;
            const isActive = i === activeStep;
            return (
              <div key={s} className="flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isCompleted ? "bg-brand-primary text-white" :
                  isActive ? "bg-brand-primarySoft text-brand-primary ring-2 ring-brand-primary/20" :
                  "bg-brand-surfaceAlt text-brand-muted"
                }`}>
                  {isCompleted ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg> : i+1}
                </span>
                <span className={`text-sm font-medium transition-colors ${isActive || isCompleted ? "text-brand-text" : "text-brand-textSoft"}`}>{s}</span>
                {i < 3 && <div className={`mx-1 h-px w-6 sm:w-10 transition-colors ${isCompleted ? "bg-brand-primary/50" : "bg-brand-border"}`} />}
              </div>
            );
          })}
        </div>

        <form onSubmit={submit} className="space-y-8">
          <section className="fw-card transition-colors duration-300" style={{ opacity: activeStep === 0 ? 1 : 0.6 }}>
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Founder</h2>
              <p className="mt-1 text-sm text-brand-muted">Who&apos;s behind the product?</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("founderName","Your name","Alex Chen", 0)}
              {field("founderRole","Your role","Solo founder, Co-founder & CEO…", 0)}
              {field("founderAvatarUrl","Avatar URL","https://yoursite.com/avatar.jpg", 0, {optional:true,hint:"Link to your profile photo. Leave blank to use initials."})}
            </div>
          </section>

          <section className="fw-card transition-colors duration-300" style={{ opacity: activeStep === 1 ? 1 : 0.6 }}>
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Product</h2>
              <p className="mt-1 text-sm text-brand-muted">Tell us about what you&apos;re building.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("productName","Product name","Luna", 1)}
              {field("productUrl","Product URL","https://luna.so", 1)}
            </div>
            <div className="mt-5">{field("productDescription","What does it do?","AI workspace that helps solo builders stay focused and ship faster.", 1, {area:true,hint:"One or two sentences — how would you explain it to a founder friend?"})}</div>
            <div className="mt-5">{field("productScreenshotUrl","Screenshot URL","https://yoursite.com/screenshot.png", 1, {optional:true,hint:"A product screenshot or OG image URL."})}</div>
          </section>

          <section className="fw-card transition-colors duration-300" style={{ opacity: activeStep === 2 ? 1 : 0.6 }}>
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Progress</h2>
              <p className="mt-1 text-sm text-brand-muted">Your numbers — be honest, that&apos;s the whole point.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {field("monthOrLaunch","Month or launch","March 2026, Launch Week, v2.0…", 2, {hint:"What period does this wrapped cover?"})}
              {field("revenue","Revenue","$4.2k MRR, $0 (pre-revenue), $850…", 2, {hint:"Any format works. Be real."})}
              {field("users","Users","2,843 active users, 120 beta testers…", 2)}
              {field("launches","Launches","2 features shipped, 1 PH launch…", 2)}
              {field("topChannel","Top growth channel","Product Hunt, X, Reddit, Newsletter…", 2)}
            </div>
          </section>

          <section className="fw-card transition-colors duration-300" style={{ opacity: activeStep === 3 ? 1 : 0.6 }}>
            <div className="mb-5">
              <h2 className="heading text-2xl font-bold">Story</h2>
              <p className="mt-1 text-sm text-brand-muted">The real stuff — wins, fails, and what you learned.</p>
            </div>
            <div className="grid gap-5">
              {field("biggestWin","Biggest win","Shipped onboarding v2 and doubled activation rate.", 3, {area:true,hint:"What went right? The moment that made you pump your fist."})}
              {field("biggestFail","Biggest fail","Spent 3 weeks building a feature nobody asked for.", 3, {area:true,hint:"What didn't work? Founders respect honesty here."})}
              {field("biggestLesson","Biggest lesson","Simple onboarding beats flexible onboarding every time.", 3, {area:true,hint:"What will you carry forward?"})}
              {field("nextGoal","Next goal","Reach 5,000 active users and launch on Product Hunt.", 3, {hint:"What are you aiming for next?"})}
              {field("founderQuote","Your founder quote","Build small, ship weekly, learn fast.", 3, {hint:"One line that captures your builder philosophy."})}
            </div>
          </section>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button type="submit" className="fw-button-primary gap-2" onFocus={() => setActiveStep(3)}>
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
