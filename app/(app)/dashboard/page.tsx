import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Leaf, MessageSquareText, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { AppShell } from "@/components/site-shell";

const moodData = [
  { day: "Mon", value: 6 },
  { day: "Tue", value: 7 },
  { day: "Wed", value: 8 },
  { day: "Thu", value: 6 },
  { day: "Fri", value: 9 },
  { day: "Sat", value: 7 },
  { day: "Sun", value: 8 },
];

function MoodPattern() {
  const width = 620;
  const height = 190;
  const padding = 24;
  const points = moodData.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / (moodData.length - 1);
    const y = height - padding - (point.value / 10) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full" role="img" aria-label="A gentle summary of mood check-ins over the last seven days">
        {[0, 1, 2, 3].map((line) => {
          const y = padding + (line * (height - padding * 2)) / 3;
          return <line key={line} x1={padding} x2={width - padding} y1={y} y2={y} stroke="var(--color-border)" strokeDasharray="4 5" />;
        })}
        <polyline fill="none" stroke="var(--color-sage-strong)" strokeWidth="3" points={points.join(" ")} strokeLinecap="round" strokeLinejoin="round" />
        {moodData.map((point, index) => {
          const x = padding + (index * (width - padding * 2)) / (moodData.length - 1);
          const y = height - padding - (point.value / 10) * (height - padding * 2);
          return <g key={point.day}><circle cx={x} cy={y} r="5" fill="var(--color-sage-strong)" /><text x={x} y={height - 5} textAnchor="middle" fontSize="11" fill="var(--color-muted)">{point.day}</text></g>;
        })}
      </svg>
      <p className="text-sm leading-6 text-[var(--color-muted)]">You&apos;ve felt a little more settled on the days you made time to pause.</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell role="Student">
      <div className="space-y-8">
        <section className="border-b border-[var(--color-border)] pb-8">
          <p className="text-sm text-[var(--color-muted)]">Good evening, Vishal.</p>
          <h2 className="mt-2 max-w-2xl text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">How are you feeling today?</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Calm", "Okay", "Low", "Anxious", "Hopeful"].map((mood) => <Link href="/mood" key={mood} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-sage-strong)]">{mood}</Link>)}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_8px_24px_rgba(32,51,43,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Your week</p><h3 className="mt-2 text-2xl text-[var(--color-text)]">A small thing we noticed</h3></div>
              <Leaf className="h-6 w-6 text-[var(--color-sage-strong)]" />
            </div>
            <div className="mt-6"><MoodPattern /></div>
            <Link href="/mood" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-sage-strong)]">View your patterns <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-sand)]/55 p-6">
            <Sparkles className="h-6 w-6 text-[var(--color-sage-strong)]" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Something for you</p>
            <h3 className="mt-2 text-2xl leading-tight text-[var(--color-text)]">Try a three-minute breathing reset.</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">A short pause can be enough to make the next moment feel a little more manageable.</p>
            <Link href="/wellness" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-sage-strong)] px-5 py-3 text-sm font-medium text-white">Take a breath <Wind className="h-4 w-4" /></Link>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Keep going gently</p><h3 className="mt-2 text-3xl text-[var(--color-text)]">Continue where you left off</h3></div><Link href="/resources" className="hidden text-sm font-medium text-[var(--color-sage-strong)] sm:inline-flex">Explore more <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/journal" className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"><BookOpenText className="h-5 w-5 text-[var(--color-sage-strong)]" /><h4 className="mt-7 text-xl text-[var(--color-text)]">Finish your reflection</h4><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">You left a thought unfinished yesterday.</p><ArrowRight className="mt-5 h-4 w-4 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/resources" className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"><Sparkles className="h-5 w-5 text-[var(--color-sage-strong)]" /><h4 className="mt-7 text-xl text-[var(--color-text)]">Read something kind</h4><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">A short guide for when everything feels too much.</p><ArrowRight className="mt-5 h-4 w-4 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/buddy-connect" className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"><MessageSquareText className="h-5 w-5 text-[var(--color-sage-strong)]" /><h4 className="mt-7 text-xl text-[var(--color-text)]">Talk to someone</h4><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Peer listeners are here when you&apos;d like company.</p><ArrowRight className="mt-5 h-4 w-4 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </section>

        <section className="grid gap-4 border-t border-[var(--color-border)] pt-8 md:grid-cols-2">
          <div className="flex gap-4 rounded-2xl bg-[var(--color-surface-muted)] p-5"><CalendarDays className="h-5 w-5 shrink-0 text-[var(--color-sage-strong)]" /><div><h3 className="text-lg text-[var(--color-text)]">Your upcoming session</h3><p className="mt-1 text-sm text-[var(--color-muted)]">Thursday at 4:00 PM · Expert check-in</p><Link href="/appointments" className="mt-3 inline-flex text-sm font-medium text-[var(--color-sage-strong)]">View appointment <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div>
          <div className="flex gap-4 rounded-2xl bg-[var(--color-surface-muted)] p-5"><ShieldCheck className="h-5 w-5 shrink-0 text-[var(--color-sage-strong)]" /><div><h3 className="text-lg text-[var(--color-text)]">Your journal is private.</h3><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Only you can access your journal entries within your protected space.</p></div></div>
        </section>
      </div>
    </AppShell>
  );
}
