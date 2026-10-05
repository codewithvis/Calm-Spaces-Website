import { AppShell } from "@/components/site-shell";

export default function SafetyPage() {
  return (
    <AppShell role="Student">
      <div className="max-w-3xl rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6">
        <p className="text-sm text-[var(--color-muted)]">Safety and support</p>
        <h2 className="mt-2 text-3xl font-semibold">Immediate support</h2>
        <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">If you or someone else may be in immediate danger, contact local emergency services or go to the nearest emergency department. Calm Spaces is not an emergency service.</p>
        <div className="mt-6 space-y-3 text-sm text-[var(--color-muted)]">
          <div className="rounded-xl bg-[var(--color-safety-background)] p-4">Verified university emergency, campus safety, crisis-line, and trusted-contact details will appear here after official confirmation.</div>
          <div className="rounded-xl bg-[var(--color-surface-muted)] p-4">Do not rely on Talk Space, peer listeners, or self-help activities for urgent crisis care.</div>
        </div>
      </div>
    </AppShell>
  );
}
