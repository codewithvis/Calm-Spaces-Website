import { AppShell } from "@/components/site-shell";

export default function JournalPage() {
  return (
    <AppShell role="Student">
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--color-muted)]">Private journal</p>
        <h2 className="mt-2 text-3xl font-semibold">What stood out today?</h2>
        <textarea
          className="mt-6 min-h-56 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-base text-[var(--color-text)] outline-none"
          placeholder="Write a brief reflection..."
        />
      </div>
    </AppShell>
  );
}
