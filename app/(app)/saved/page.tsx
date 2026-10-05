import { AppShell } from "@/components/site-shell";

export default function SavedPage() {
  return (
    <AppShell role="Student">
      <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Saved</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Keep what helps close by.</h2><div className="mt-8 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center"><p className="text-xl text-[var(--color-text)]">Nothing saved yet.</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">When a resource, activity, or community post feels useful, save it here to find it again.</p></div></div>
    </AppShell>
  );
}
