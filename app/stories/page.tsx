"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { getAllStories, seedSampleStories } from "@/lib/storage";
import type { StoryFilter } from "@/lib/types";

export default function StoriesPage() {
  const [filter, setFilter] = useState<StoryFilter>("All");
  const [stories, setStories] = useState(getAllStories());
  
  useEffect(() => { 
    seedSampleStories(); 
    setStories(getAllStories()); 
  }, []);
  
  const visible = useMemo(() => 
    stories.filter((s) => filter === "All" || (filter === "Revenue" && s.revenue) || (filter === "Launches" && Number(s.launches) > 0) || (filter === "Lessons" && s.biggestLesson)), 
  [stories, filter]);

  return (
    <main className="min-h-screen pb-20 relative bg-isometric">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg/95 z-0" />
      <div className="relative z-10">
        <Nav />
        <section className="mx-auto mt-16 max-w-6xl px-6">
          <h1 className="heading text-5xl font-bold">Founder stories</h1>
          <p className="mt-4 text-lg text-brand-textSoft">Real progress from indie builders, shipped in public.</p>
          
          <div className="mt-8 flex flex-wrap gap-2">
            {(["All","Revenue","Launches","Lessons"] as StoryFilter[]).map((f) => (
              <button 
                key={f} 
                onClick={() => setFilter(f)} 
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ease-out ${filter === f ? 'border-brand-primary/30 bg-brand-primarySoft text-brand-primary' : 'border-brand-border bg-white text-brand-textSoft hover:bg-brand-surfaceAlt hover:text-brand-text'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* SKELETON EMPTY STATE */}
              <article className="fw-card relative overflow-hidden border-dashed border-2 border-brand-border/60 bg-brand-surfaceAlt/30 opacity-70">
                <div className="h-4 w-20 rounded-md bg-brand-border animate-pulse mb-3" />
                <div className="h-8 w-3/4 rounded-md bg-brand-border animate-pulse mb-2" />
                <div className="h-4 w-1/2 rounded-md bg-brand-border animate-pulse" />
                <div className="mt-6 h-12 w-full rounded-md bg-brand-border animate-pulse" />
                <div className="mt-5 flex justify-between border-t border-brand-border/50 pt-4">
                  <div className="h-4 w-16 rounded-md bg-brand-border animate-pulse" />
                  <div className="h-4 w-20 rounded-md bg-brand-border animate-pulse" />
                </div>
              </article>
              
              <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col items-start justify-center pl-4 lg:pl-12">
                <h3 className="heading text-2xl font-bold text-brand-text">Be the first story.</h3>
                <p className="mt-2 text-brand-textSoft">Yours could be right here. No massive audience required.</p>
                <Link href="/create" className="fw-button-primary mt-6 inline-flex">
                  Share your story
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((s) => (
                <article key={s.id} className="fw-card transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">{s.monthOrLaunch}</p>
                  <h3 className="heading mt-2 text-2xl font-bold text-brand-text">{s.productName}</h3>
                  <p className="mt-1 text-sm text-brand-textSoft">by {s.founderName}</p>
                  <p className="mt-4 text-sm leading-relaxed text-brand-textSoft line-clamp-3">&ldquo;{s.biggestWin}&rdquo;</p>
                  
                  <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-4 text-sm font-semibold">
                    <span className="text-brand-primary">{s.revenue}</span>
                    <span className="text-brand-muted">{s.users} users</span>
                  </div>
                  
                  <Link href={`/wrapped/${s.id}`} className="absolute inset-0 flex items-center justify-center bg-white/0 opacity-0 transition-opacity hover:opacity-100">
                    <span className="sr-only">Read story</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
          
          {visible.length > 0 && (
            <div className="mt-20 flex flex-col items-center justify-center rounded-3xl bg-brand-surfaceAlt py-16 px-6 text-center border border-brand-border">
              <h3 className="heading text-3xl font-bold">Your turn to share.</h3>
              <p className="mt-3 text-brand-textSoft">Don&apos;t wait for the perfect moment. Document your journey now.</p>
              <Link href="/create" className="fw-button-primary mt-8 inline-flex px-8 py-3">
                Create your FounderWrapped
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
