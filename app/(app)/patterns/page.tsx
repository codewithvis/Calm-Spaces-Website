import { AppShell } from "@/components/site-shell";

export default function PatternsPage() {
  return (
    <AppShell role="Student">
      <div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Your patterns</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">A moment to look back.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">These reflections are here to help you notice your experience, not measure your mental health.</p></div><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"><p className="text-sm text-[var(--color-muted)]">Check-ins</p><p className="mt-3 text-4xl text-[var(--color-text)]">8</p><p className="mt-2 text-sm text-[var(--color-muted)]">this month</p></div><div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"><p className="text-sm text-[var(--color-muted)]">Most used</p><p className="mt-3 text-2xl text-[var(--color-text)]">Breathing</p><p className="mt-2 text-sm text-[var(--color-muted)]">a pause you return to</p></div><div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"><p className="text-sm text-[var(--color-muted)]">Journal</p><p className="mt-3 text-4xl text-[var(--color-text)]">3</p><p className="mt-2 text-sm text-[var(--color-muted)]">entries this month</p></div></div></div>
    </AppShell>
  );
}
