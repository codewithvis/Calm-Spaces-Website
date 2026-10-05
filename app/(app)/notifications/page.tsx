import { AppShell } from "@/components/site-shell";

export default function NotificationsPage() {
  return (
    <AppShell role="Student">
      <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Notifications</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Helpful when you need them.</h2><div className="mt-8 space-y-3"><div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><p className="text-base text-[var(--color-text)]">Your appointment is tomorrow.</p><p className="mt-1 text-sm text-[var(--color-muted)]">A gentle reminder for your expert check-in.</p></div><div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><p className="text-base text-[var(--color-text)]">There is a new resource you might like.</p><p className="mt-1 text-sm text-[var(--color-muted)]">Explore something about rest and recovery.</p></div></div></div>
    </AppShell>
  );
}
