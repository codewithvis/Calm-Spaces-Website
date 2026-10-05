import { AppShell } from "@/components/site-shell";

export default function SafetyPage() {
  return (
    <AppShell role="Student">
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--color-muted)]">Safety and support</p>
        <h2 className="mt-2 text-3xl font-semibold">Immediate support</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm text-[var(--color-muted)]">
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Emergency contact · Campus safety team</div>
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Crisis hotline · 988</div>
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Trusted person · Family contact</div>
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Support center · Student wellbeing office</div>
        </div>
      </div>
    </AppShell>
  );
}
