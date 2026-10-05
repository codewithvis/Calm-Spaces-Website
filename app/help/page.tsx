import { Search } from "lucide-react";
import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

const categories = ["Getting started", "Account and privacy", "Mood and journal", "Wellness tools", "Buddy Connect", "Experts and appointments", "Community", "Safety", "Technical issues"];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"><SiteHeader /><PageContainer><SectionHeading eyebrow="Help center" title="Find your way around Calm Spaces" description="Simple answers for getting started, managing your account, finding support, and using the wellbeing spaces." /><div className="mb-10 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 text-sm text-[var(--color-muted)]"><Search className="h-4 w-4" /> Search the help center</div><div className="grid gap-3 md:grid-cols-3">{categories.map((category) => <div key={category} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-base text-[var(--color-text)]">{category}<p className="mt-2 text-sm text-[var(--color-muted)]">Browse answers</p></div>)}</div></PageContainer><Footer /></div>
  );
}
