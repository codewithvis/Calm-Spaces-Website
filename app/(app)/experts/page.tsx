import { AppShell } from "@/components/site-shell";

export default function ExpertsPage() {
  return (
    <AppShell role="Student">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['Licensed counselor', 'Thursday · 4:00 PM'],
          ['Peer guide', 'Friday · 1:30 PM'],
          ['Workshop host', 'Saturday · 10:00 AM'],
        ].map(([title, schedule]) => (
          <div key={title} className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{schedule}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
