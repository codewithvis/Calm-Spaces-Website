import Link from "next/link";
import { ArrowRight, Compass, House, MessageSquareText, Search } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main className="flex min-h-[65vh] items-center justify-center py-20 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <span>404 · Gentle Pause</span>
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl">
            This Path Leads to Quiet Ground.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            The page you are looking for may have moved, or the link may have a typo. Take a deep breath — we can help you find your way back.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-brand-primary-hover)] transition"
            >
              <House className="h-4 w-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/resources"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-7 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] transition"
            >
              <Compass className="h-4 w-4 text-[var(--color-brand-primary)]" />
              <span>Explore Resources</span>
            </Link>

            <Link
              href="/find-support"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-7 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] transition"
            >
              <MessageSquareText className="h-4 w-4 text-[var(--color-brand-primary)]" />
              <span>Get Support</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
