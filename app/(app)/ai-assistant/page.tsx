import { AppShell } from "@/components/site-shell";

export default function AIAssistantPage() {
  return (
    <AppShell role="Student">
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--color-muted)]">AI support</p>
        <h2 className="mt-2 text-3xl font-semibold">How can I help today?</h2>
        <div className="mt-6 rounded-2xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
          “I’m feeling stretched thin after back-to-back deadlines. What calming step should I take next?”
        </div>
      </div>
    </AppShell>
  );
}
