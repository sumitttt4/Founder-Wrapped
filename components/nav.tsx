import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-4 z-20 mx-auto mt-6 flex max-w-6xl items-center justify-between rounded-2xl border border-brand-border bg-white/80 p-4 backdrop-blur">
      <Link className="flex items-center gap-3" href="/">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-primarySoft text-sm font-bold text-brand-primary">FW</span>
        <span className="heading text-2xl font-bold text-brand-text">FounderWrapped</span>
      </Link>
      <div className="hidden items-center gap-6 text-sm text-brand-muted md:flex">
        <Link className="hover:text-brand-primary" href="/stories">Stories</Link><a className="hover:text-brand-primary" href="#">Launches</a><a className="hover:text-brand-primary" href="#">Pricing</a><a className="hover:text-brand-primary" href="#">About</a>
      </div>
      <Link href="/create" className="fw-button-primary">Share your story</Link>
    </nav>
  );
}
