import Link from "next/link";
import { Nav } from "@/components/nav";
import { BarChart, Rocket, DollarSign, User, Lightbulb, Image as ImageIcon, Flame } from "lucide-react";

/* ---------- tiny icon helpers (inline SVG, no deps) ---------- */
const HeartIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3.332.88-4.5 2.12A6.21 6.21 0 007.5 3 5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const ChatIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 104 16.1L2 22Z"/></svg>;

function Initials({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const i = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const s = size === "md" ? "h-10 w-10 text-sm" : "h-7 w-7 text-[11px]";
  return <div className={`flex items-center justify-center rounded-full bg-brand-primarySoft font-bold text-brand-primary ${s}`}>{i}</div>;
}

/* ---------- data ---------- */
const storyExamples = [
  { title: "Hit product-market fit after 8 months.", tag: "Top story", name: "Ben Hale", product: "Shipfast", hearts: 48, comments: 12 },
  { title: "From zero to $10k MRR.", tag: "Revenue", name: "Maya Patel", product: "Flowly", hearts: 63, comments: 19 },
  { title: "3 lessons from a failed onboarding test.", tag: "Lesson", name: "Lena Müller", product: "BuilderOS", hearts: 37, comments: 8 },
];

const steps = [
  { num: "01", title: "Share your journey", desc: "Add your revenue, users, wins, failures, lessons, and next goal." },
  { num: "02", title: "Get beautiful wraps", desc: "Generate recap pages, story cards, and launch-ready social posts." },
  { num: "03", title: "Inspire other builders", desc: "Share your story and get discovered by founders building like you." },
];

const features = [
  { icon: <BarChart className="h-5 w-5 text-brand-textSoft" />, title: "Monthly Wrapped", desc: "Turn each month into a shareable founder recap." },
  { icon: <Rocket className="h-5 w-5 text-brand-textSoft" />, title: "Launch Recap", desc: "Package your launch story for social and communities." },
  { icon: <DollarSign className="h-5 w-5 text-brand-textSoft" />, title: "Revenue Milestone", desc: "Celebrate MRR milestones with beautiful cards." },
  { icon: <User className="h-5 w-5 text-brand-textSoft" />, title: "Founder Profile", desc: "A clean profile that shows your builder journey." },
  { icon: <Lightbulb className="h-5 w-5 text-brand-textSoft" />, title: "Lessons Learned", desc: "Turn failures into compelling content." },
  { icon: <ImageIcon className="h-5 w-5 text-brand-textSoft" />, title: "Social Share Cards", desc: "1200×630 cards ready for X, LinkedIn, and more." },
];

const feedItems = [
  { name: "Maya Patel", text: "Hit 500 signups from yesterday's launch" },
  { name: "Tom Alvarez", text: "Shipped dark mode after 47 user requests" },
  { name: "Lena Müller", text: "3 lessons from my first product failure" },
  { name: "Alex Chen", text: "Reached $10k MRR after 8 months" },
];

export default function Home() {
  return (
    <main className="pb-24">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="fw-section grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Founder media platform</p>
          <h1 className="heading text-5xl font-bold leading-[1.1] sm:text-6xl">
            Where small founders get <span className="text-brand-primary">seen.</span>
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-brand-textSoft">
            Turn your startup progress into beautiful stories and inspire other builders on their journey.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/create" className="fw-button-primary">Share your story</Link>
            <Link href="/stories" className="fw-button-secondary">Explore stories</Link>
          </div>
          <p className="mt-5 text-sm text-brand-muted">Built for indie hackers, solo founders, and bootstrapped teams.</p>
        </div>

        {/* Right — product preview cluster */}
        <div className="relative min-h-[460px]">
          {/* A. Main recap card */}
          <div className="relative z-10 mx-auto w-full max-w-[340px] rounded-3xl border border-brand-border bg-white p-6 shadow-[0_16px_48px_rgba(23,19,17,0.08)] lg:ml-0">
            <p className="text-xs uppercase tracking-wider text-brand-muted">Monthly wrapped</p>
            <p className="heading mt-1 text-2xl font-bold">March Wrapped</p>
            <p className="text-sm text-brand-textSoft">by Alex Chen · IndieMaker</p>
            <div className="mt-5 space-y-2.5">
              {[
                ["Revenue", "$12,540", "+32%"],
                ["Users", "2,843", "+18%"],
                ["Launches", "2", ""],
                ["Lessons", "3", ""],
              ].map(([label, val, change]) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-brand-surfaceAlt px-3.5 py-2.5">
                  <span className="text-sm text-brand-textSoft">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand-text">{val}</span>
                    {change && <span className="text-xs font-semibold text-green-600">{change}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primarySoft px-3 py-1 text-xs font-semibold text-brand-primary">
                26 day streak <Flame className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* B. Revenue milestone card */}
          <div className="absolute -right-2 top-2 z-20 w-52 rotate-2 rounded-[22px] bg-gradient-to-br from-[#FFB84D] to-[#FF9500] p-5 shadow-lg sm:right-0 lg:-right-4">
            <p className="heading text-2xl font-bold text-white">$10k MRR reached</p>
            <p className="mt-1 text-xs text-white/80">Apr 12, 2026</p>
            {/* tiny chart decoration */}
            <svg className="mt-3 opacity-40" width="100" height="24" viewBox="0 0 100 24" fill="none"><polyline points="0,20 15,16 30,18 45,10 60,12 75,6 90,4 100,2" stroke="white" strokeWidth="2" fill="none"/></svg>
          </div>

          {/* C. Launch recap card */}
          <div className="absolute -left-2 bottom-16 z-20 w-56 -rotate-2 rounded-[22px] bg-gradient-to-br from-[#E7FBC0] to-[#C7F36B] p-5 shadow-lg sm:left-0 lg:-left-4">
            <p className="heading text-xl font-bold text-[#1A2E00]">Launch Recap: Luna 2.0 is live!</p>
            <p className="mt-2 text-sm font-medium text-[#3F6B00]">Read the recap →</p>
          </div>

          {/* D. Founder quote card */}
          <div className="absolute -bottom-2 right-4 z-10 w-64 rotate-1 rounded-[20px] border border-brand-border bg-white p-5 shadow-md lg:right-0">
            <p className="text-sm italic leading-relaxed text-brand-textSoft">
              &ldquo;This made my messy month look like a real founder story.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-brand-muted">Alex Chen, IndieMaker</p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="mx-auto max-w-6xl rounded-2xl border border-brand-border bg-brand-surfaceAlt px-6 py-4 text-center text-sm text-brand-textSoft">
        As seen on · Indie Hackers · Product Hunt · Build in Public · Makerlog
      </section>

      {/* ─── SECTION 1: Story Examples ─── */}
      <section className="fw-section pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Examples</p>
        <h2 className="heading mt-2 text-4xl font-bold">Founder story card examples</h2>
        <p className="mt-2 max-w-xl text-brand-textSoft">Real progress from small founders, packaged for the internet.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {storyExamples.map((s) => (
            <div key={s.title} className="fw-card flex flex-col justify-between">
              <div>
                <span className={`fw-badge mb-4 ${s.tag === "Revenue" ? "!bg-[#ffb84d22] !text-[#9a5a00] !border-[#ffd79f]" : s.tag === "Lesson" ? "!bg-blue-50 !text-blue-700 !border-blue-200" : ""}`}>
                  {s.tag}
                </span>
                <p className="heading text-2xl font-bold leading-tight">{s.title}</p>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-brand-border pt-4">
                <div className="flex items-center gap-2.5">
                  <Initials name={s.name} />
                  <div>
                    <p className="text-sm font-semibold text-brand-text">{s.name}</p>
                    <p className="text-xs text-brand-muted">{s.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-brand-muted">
                  <span className="flex items-center gap-1 text-xs"><HeartIcon />{s.hearts}</span>
                  <span className="flex items-center gap-1 text-xs"><ChatIcon />{s.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 2: How it works ─── */}
      <section className="fw-section pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">How it works</p>
        <h2 className="heading mt-2 text-4xl font-bold">Simple founder workflow</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="fw-card">
              <span className="heading text-4xl font-bold text-brand-primarySoft">{s.num}</span>
              <h3 className="heading mt-3 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-brand-textSoft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 3: What you can create ─── */}
      <section className="fw-section pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Features</p>
        <h2 className="heading mt-2 text-4xl font-bold">Everything your progress needs</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="fw-card flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-surfaceAlt text-xl">{f.icon}</span>
              <div>
                <h3 className="heading text-lg font-bold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-textSoft">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: Story feed preview ─── */}
      <section className="fw-section pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Community</p>
        <h2 className="heading mt-2 text-4xl font-bold">Real stories from small founders</h2>
        <div className="mt-8 space-y-3">
          {feedItems.map((f) => (
            <div key={f.text} className="flex items-center gap-4 rounded-2xl border border-brand-border bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Initials name={f.name} size="md" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-brand-text">{f.name}</span>
                <p className="truncate text-brand-textSoft">{f.text}</p>
              </div>
              <span className="hidden shrink-0 text-xs text-brand-muted sm:block">Just now</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/stories" className="fw-button-secondary">Explore stories</Link>
        </div>
      </section>

      {/* ─── SECTION 5: Share card mockups ─── */}
      <section className="fw-section pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Social cards</p>
        <h2 className="heading mt-2 text-4xl font-bold">Built to be shared</h2>
        <p className="mt-2 max-w-xl text-brand-textSoft">Turn your progress into cards founders actually want to post.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {/* Orange revenue card */}
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FF7B4D] to-[#FF5A1F] p-7 text-white shadow-lg" style={{ aspectRatio: "1200/630" }}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">Revenue Milestone</span>
            <p className="heading mt-4 text-4xl font-bold">$12,540</p>
            <p className="heading mt-1 text-xl">earned in March</p>
            <p className="absolute bottom-5 left-7 text-xs opacity-70">Luna · founderwrapped.com</p>
          </div>
          {/* Lime launch card */}
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#E7FBC0] to-[#C7F36B] p-7 shadow-lg" style={{ aspectRatio: "1200/630" }}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3F6B00]/5" />
            <span className="inline-block rounded-full bg-[#3F6B00]/10 px-3 py-1 text-xs font-semibold text-[#3F6B00]">Launch Recap</span>
            <p className="heading mt-4 text-4xl font-bold text-[#1A2E00]">Luna 2.0</p>
            <p className="heading mt-1 text-xl text-[#3F6B00]">is live!</p>
            <p className="absolute bottom-5 left-7 text-xs text-[#3F6B00]/60">Luna · founderwrapped.com</p>
          </div>
          {/* Cream lesson card */}
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FFF6E9] to-[#FFF0E8] p-7 shadow-lg" style={{ aspectRatio: "1200/630" }}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/5" />
            <span className="inline-block rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primaryDark">Lessons Learned</span>
            <p className="heading mt-4 text-4xl font-bold text-brand-text">From zero</p>
            <p className="heading mt-1 text-xl text-brand-textSoft">to $10k MRR</p>
            <p className="absolute bottom-5 left-7 text-xs text-brand-muted">Flowly · founderwrapped.com</p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Final CTA ─── */}
      <section className="mx-auto mt-14 max-w-4xl px-6">
        <div className="rounded-[24px] border border-brand-border bg-white px-8 py-14 text-center shadow-[0_16px_48px_rgba(23,19,17,0.06)]">
          <h2 className="heading text-4xl font-bold sm:text-5xl">Your founder story deserves to be seen.</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-brand-textSoft">
            Create your first FounderWrapped and turn your messy progress into a story worth sharing.
          </p>
          <Link href="/create" className="fw-button-primary mt-8 inline-flex">Share your story</Link>
        </div>
      </section>
    </main>
  );
}
