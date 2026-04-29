import Link from "next/link";
import { Nav } from "@/components/nav";

export default function Home() {
  return <main className="pb-20"><Nav />
  <section className="fw-section grid gap-10 lg:grid-cols-2">
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-brand-muted">Founder media platform</p>
      <h1 className="heading text-6xl font-bold leading-tight">Where small founders get <span className="text-brand-primary">seen.</span></h1>
      <p className="mt-5 max-w-xl text-xl text-brand-textSoft">Turn your startup progress into beautiful stories and inspire other builders on their journey.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/create" className="fw-button-primary">Share your story</Link><Link href="/stories" className="fw-button-secondary">Explore stories</Link></div>
    </div>
    <div className="relative min-h-[380px]">
      <div className="fw-card absolute left-2 top-0 w-72"><p className="text-xs uppercase tracking-wider text-brand-muted">Monthly wrapped</p><p className="heading mt-2 text-2xl">March Wrapped</p></div>
      <div className="absolute right-2 top-20 w-56 rotate-2 rounded-[22px] bg-brand-gold p-5 shadow-sm"><p className="heading text-4xl">$10k MRR reached</p></div>
      <div className="absolute bottom-0 left-8 -rotate-2 rounded-[22px] bg-brand-lime p-6 shadow-sm"><p className="heading text-3xl">Launch Recap: Luna 2.0 is live</p></div>
    </div>
  </section>
  <section className="mx-auto max-w-6xl rounded-2xl border border-brand-border bg-brand-surfaceAlt px-6 py-4 text-center text-brand-textSoft">As seen on • Indie Hackers • Product Hunt • build in public • Makerlog</section>
  <section className="fw-section pt-12"><p className="text-xs uppercase tracking-[0.18em] text-brand-muted">Examples</p><h2 className="heading mt-2 text-4xl">Founder story card examples</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{["Hit product-market fit after 8 months.","From zero to $10k MRR.","3 lessons from a failed onboarding test."].map((t)=><div key={t} className="fw-card"><span className="fw-badge mb-3">Top story</span><p className="heading text-2xl">{t}</p></div>)}</div></section>
  <section className="fw-section pt-2"><p className="text-xs uppercase tracking-[0.18em] text-brand-muted">How it works</p><h2 className="heading mt-2 text-4xl">Simple founder workflow</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{["Share your journey","Get beautiful wraps","Inspire other builders"].map((t)=><div key={t} className="fw-card"><h3 className="heading text-2xl">{t}</h3><p className="mt-2 text-brand-textSoft">Clean, warm, social-first storytelling.</p></div>)}</div></section>
  <section className="fw-section pt-2"><p className="text-xs uppercase tracking-[0.18em] text-brand-muted">Social cards</p><h2 className="heading mt-2 text-4xl">Social share card mockups</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{["bg-brand-primary text-white","bg-brand-lime","bg-brand-primarySoft"].map((c)=><div key={c} className={`rounded-[24px] border border-brand-border p-5 ${c}`}><p className="heading text-3xl">FounderWrapped</p></div>)}</div></section>
  <section className="mx-auto mt-8 max-w-4xl rounded-[24px] border border-brand-border bg-white px-8 py-10 text-center shadow-[0_10px_30px_rgba(23,19,17,0.05)]"><h2 className="heading text-5xl">Where small founders get seen.</h2><Link href="/create" className="fw-button-primary mt-6">Create your FounderWrapped</Link></section>
  </main>;
}
