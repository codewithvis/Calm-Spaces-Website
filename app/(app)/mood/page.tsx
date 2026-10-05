import { AppShell } from "@/components/site-shell";

export default function MoodPage() {
  return (
    <AppShell role="Student">
      <div className="space-y-6">
        <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <p className="text-sm text-[var(--color-muted)]">Mood check-in</p>
          <h2 className="mt-2 text-3xl font-semibold">How are you feeling today?</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {['Calm', 'Anxious', 'Overwhelmed', 'Hopeful', 'Tired', 'Focused'].map((label) => (
            <div key={label} className="rounded-3xl border border-[var(--color-border)] bg-white p-5 text-center text-lg font-medium text-[var(--color-text)] shadow-sm">
              {label}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
