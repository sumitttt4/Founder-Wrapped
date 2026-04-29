import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LogoIcon } from "@/components/logo";
import { BarChart, Rocket, DollarSign, User, Lightbulb, Image as ImageIcon, Flame } from "lucide-react";

/* ---------- tiny icon helpers (inline SVG, no deps) ---------- */
const HeartIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3.332.88-4.5 2.12A6.21 6.21 0 007.5 3 5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const ChatIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 104 16.1L2 22Z"/></svg>;

function Initials({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const seed = encodeURIComponent(name);
  const s = size === "md" ? "h-10 w-10" : "h-7 w-7";
  return (
    <div className={`flex items-center justify-center rounded-full bg-brand-surfaceAlt overflow-hidden ${s}`}>
      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent`} alt={name} className="w-full h-full object-cover" />
    </div>
  );
}

/* ---------- data ---------- */
const storyExamples = [
  { title: "Hit product-market fit after 8 months.", tag: "Top story", name: "Ben Hale", product: "Shipfast", hearts: 48, comments: 12 },
  { title: "From zero to $10k MRR.", tag: "Revenue", name: "Maya Patel", product: "Flowly", hearts: 63, comments: 19 },
  { title: "3 lessons from a failed onboarding test.", tag: "Lesson", name: "Lena Müller", product: "Glyph", hearts: 37, comments: 8 },
];

const steps = [
  { num: "01", title: "Share your journey", desc: "Add your revenue, users, wins, failures, lessons, and next goal." },
  { num: "02", title: "Get beautiful wraps", desc: "Generate recap pages, story cards, and launch-ready social posts." },
  { num: "03", title: "Inspire other builders", desc: "Share your story and get discovered by founders building like you." },
];

const features = [
  { icon: <BarChart className="h-6 w-6 text-brand-primary" />, title: "Monthly wrapped recaps", desc: "Turn your messy progress into beautiful, digestible monthly summaries. We organize your revenue milestones, user growth, and biggest lessons into a clean format that founders love to read." },
  { icon: <ImageIcon className="h-6 w-6 text-brand-primary" />, title: "Ready-to-post social cards", desc: "Stop wasting hours in Figma. Automatically generate pixel-perfect 1200x630 share cards for every milestone, launch, or failure, optimized perfectly for Twitter and LinkedIn feeds." },
  { icon: <User className="h-6 w-6 text-brand-primary" />, title: "Verified builder profile", desc: "Build a persistent public profile that acts as your founder resume. Prove your consistency, showcase your streak, and give investors and users a real look at your journey." },
];

const feedItems = [
  { name: "Maya Patel", text: "Hit 500 signups from yesterday's launch", time: "2h ago" },
  { name: "Tom Alvarez", text: "Shipped dark mode after 47 user requests", time: "5h ago" },
  { name: "Lena Müller", text: "3 lessons from my first product failure", time: "yesterday" },
  { name: "Alex Chen", text: "Reached $10k MRR after 8 months", time: "2 days ago" },
];

export default function Home() {
  return (
    <main>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="fw-section grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Built for building in public</p>
          <h1 className="heading text-5xl font-bold leading-[1.1] sm:text-6xl">
            Where indie founders get <span className="text-brand-primary">seen.</span>
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-brand-textSoft">
            Turn your startup progress into beautiful stories and inspire other builders on their journey.
          </p>
          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row">
            <Link href="/create" className="fw-button-primary w-full sm:w-auto">Share your story</Link>
            <Link href="/stories" className="font-semibold text-brand-text transition-colors hover:text-brand-primary">Explore stories</Link>
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
            <p className="heading text-xl font-bold text-[#1A2E00]">Launch Recap: Glyph 2.0 is live!</p>
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

      {/* ─── SECTION 1: Story Examples ─── */}
      <section className="fw-section pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Examples</p>
        <h2 className="heading mt-2 text-4xl font-bold">Founder story card examples</h2>
        <p className="mt-2 max-w-xl text-brand-textSoft">Real progress from solo builders, packaged for the internet.</p>
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
        <div className="mt-12 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-border before:via-brand-primary/50 before:to-brand-border space-y-12">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-brand-bg bg-brand-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm">
                {s.num}
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] fw-card hover:border-brand-primary/30 transition-colors duration-300 hover:shadow-md">
                <h3 className="heading text-2xl font-bold text-brand-text">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-textSoft">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="fw-section pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Features</p>
        <h2 className="heading mt-2 text-4xl font-bold">Everything your progress needs</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div key={f.title} className={`fw-card flex flex-col items-start gap-4 ${i === 0 ? 'md:col-span-2 md:flex-row md:items-center' : ''}`}>
              <div className={`flex flex-col items-start gap-4 ${i === 0 ? 'md:w-1/2 lg:w-2/3 md:pr-8' : ''}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primarySoft text-xl">{f.icon}</span>
                <div>
                  <h3 className="heading text-xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-textSoft">{f.desc}</p>
                </div>
              </div>
              {i === 0 && (
                <div className="mt-4 w-full md:mt-0 md:w-1/2 lg:w-1/3 shrink-0 rounded-xl bg-brand-surfaceAlt border border-brand-border p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Initials name="Alex Chen" />
                    <div>
                      <div className="h-2 w-24 rounded bg-brand-border" />
                      <div className="h-2 w-16 rounded bg-brand-border mt-1.5 opacity-50" />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-3 w-full rounded bg-brand-border/60" />
                    <div className="h-3 w-5/6 rounded bg-brand-border/60" />
                    <div className="h-3 w-4/6 rounded bg-brand-border/60" />
                  </div>
                  <div className="mt-5 flex justify-between border-t border-brand-border pt-4">
                    <div className="h-3 w-12 rounded bg-brand-primary/40" />
                    <div className="h-3 w-16 rounded bg-brand-border/60" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: Story feed preview ─── */}
      <section className="fw-section pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Community</p>
        <h2 className="heading mt-2 text-4xl font-bold">Real stories from bootstrapped founders</h2>
        <div className="mt-8 space-y-3">
          {feedItems.map((f) => (
            <div key={f.text} className="flex items-center gap-4 rounded-2xl border border-brand-border bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Initials name={f.name} size="md" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-brand-text">{f.name}</span>
                <p className="truncate text-brand-textSoft">{f.text}</p>
              </div>
              <span className="hidden shrink-0 text-xs text-brand-muted sm:block">{f.time}</span>
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
        <div className="mt-16 flex flex-col items-center justify-center py-10 perspective-1000">
          <div className="relative w-full max-w-4xl h-[400px] sm:h-[500px] flex items-center justify-center">
            
            {/* Background card (Left) */}
            <div className="absolute left-0 sm:left-10 w-[280px] sm:w-[400px] opacity-70 transition-transform duration-700 hover:opacity-100 hover:z-30 hover:-translate-y-4 hover:rotate-[-5deg]" style={{ aspectRatio: "1200/630", transform: "perspective(1000px) rotateY(15deg) rotateZ(-8deg) translateX(-10%)" }}>
              <div className="w-full h-full rounded-2xl sm:rounded-[24px] bg-gradient-to-br from-[#FFF6E9] to-[#FFF0E8] p-5 sm:p-7 shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/5 blur-2xl" />
                <span className="inline-block rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-brand-primaryDark">Lessons Learned</span>
                <p className="heading mt-4 text-2xl sm:text-4xl font-bold text-brand-text">From zero</p>
                <p className="heading mt-1 text-base sm:text-xl text-brand-textSoft">to $10k MRR</p>
                <p className="absolute bottom-5 left-7 text-[10px] sm:text-xs text-brand-muted font-medium">Flowly · founderwrapped.com</p>
              </div>
            </div>

            {/* Background card (Right) */}
            <div className="absolute right-0 sm:right-10 w-[280px] sm:w-[400px] opacity-70 transition-transform duration-700 hover:opacity-100 hover:z-30 hover:-translate-y-4 hover:rotate-[5deg]" style={{ aspectRatio: "1200/630", transform: "perspective(1000px) rotateY(-15deg) rotateZ(8deg) translateX(10%)" }}>
              <div className="w-full h-full rounded-2xl sm:rounded-[24px] bg-gradient-to-br from-[#E7FBC0] to-[#C7F36B] p-5 sm:p-7 shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3F6B00]/5 blur-2xl" />
                <span className="inline-block rounded-full bg-[#3F6B00]/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#3F6B00]">Launch Recap</span>
                <p className="heading mt-4 text-2xl sm:text-4xl font-bold text-[#1A2E00]">Glyph 2.0</p>
                <p className="heading mt-1 text-base sm:text-xl text-[#3F6B00]">is live!</p>
                <p className="absolute bottom-5 left-7 text-[10px] sm:text-xs text-[#3F6B00]/60 font-medium">Glyph · founderwrapped.com</p>
              </div>
            </div>

            {/* Main card (Center) */}
            <div className="absolute z-20 w-[320px] sm:w-[500px] transition-transform duration-700 hover:-translate-y-2 hover:scale-[1.02]" style={{ aspectRatio: "1200/630" }}>
              <div className="w-full h-full rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#FF7B4D] to-[#FF5A1F] p-6 sm:p-10 text-white shadow-[0_20px_60px_-15px_rgba(255,90,31,0.5)] ring-1 ring-white/20 overflow-hidden relative">
                {/* Noise and decorative elements */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/3 translate-y-1/3 rounded-full border-[20px] border-white/10" />
                
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-wide backdrop-blur-sm shadow-sm ring-1 ring-white/30">
                      Revenue Milestone
                    </span>
                    <p className="heading mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight drop-shadow-sm">$12,540</p>
                    <p className="heading mt-1 text-lg sm:text-2xl font-medium text-white/90 drop-shadow-sm">earned in March</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF5A1F] font-bold shadow-md">
                        <LogoIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight">Alex Chen</p>
                        <p className="text-xs font-medium text-white/70">IndieMaker</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold opacity-70">founderwrapped.com</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
