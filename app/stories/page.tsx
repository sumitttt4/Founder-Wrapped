"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { getAllStories, seedSampleStories } from "@/lib/storage";
import type { StoryFilter } from "@/lib/types";

export default function StoriesPage() {
  const [filter, setFilter] = useState<StoryFilter>("All");
  const [stories, setStories] = useState(getAllStories());
  useEffect(() => { seedSampleStories(); setStories(getAllStories()); }, []);
  const visible = useMemo(() => stories.filter((s) => filter === "All" || (filter === "Revenue" && s.revenue) || (filter === "Launches" && Number(s.launches) > 0) || (filter === "Lessons" && s.biggestLesson)), [stories, filter]);
  return <main className="pb-20"><Nav /><section className="mx-auto mt-10 max-w-6xl px-6"><h1 className="heading text-5xl">Founder stories</h1><p className="mt-2 text-brand-textSoft">Real progress from small founders building on the internet.</p><div className="mt-5 flex flex-wrap gap-2">{(["All","Revenue","Launches","Lessons"] as StoryFilter[]).map((f)=><button key={f} onClick={()=>setFilter(f)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ease-out ${filter===f?'border-brand-primary/30 bg-brand-primarySoft text-brand-primary':'border-brand-border bg-white text-brand-muted hover:bg-brand-surfaceAlt'}`}>{f}</button>)}</div><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visible.map((s)=><article key={s.id} className="fw-card"><p className="text-sm text-brand-muted">{s.monthOrLaunch}</p><h3 className="heading mt-1 text-2xl">{s.productName}</h3><p className="text-brand-textSoft">by {s.founderName}</p><p className="mt-2 text-sm">{s.biggestWin}</p><div className="mt-3 flex justify-between text-sm"><span>{s.revenue}</span><span>{s.users} users</span></div><Link href={`/wrapped/${s.id}`} className="mt-4 inline-block text-brand-primary">Read story →</Link></article>)}</div><div className="mt-10 fw-card text-center"><h3 className="heading text-3xl">Create your FounderWrapped</h3><Link href="/create" className="fw-button-primary mt-4">Share your story</Link></div></section></main>;
}
