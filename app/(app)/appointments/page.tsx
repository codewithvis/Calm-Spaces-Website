import { AppShell } from "@/components/site-shell";

export default function AppointmentsPage() {
  return (
    <AppShell role="Student">
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--color-muted)]">Appointments</p>
        <h2 className="mt-2 text-3xl font-semibold">Upcoming sessions</h2>
        <ul className="mt-6 space-y-4 text-[var(--color-muted)]">
          <li className="rounded-2xl bg-[var(--color-surface)] p-4">Thu 4:00 PM · Expert check-in</li>
          <li className="rounded-2xl bg-[var(--color-surface)] p-4">Mon 10:30 AM · Peer support session</li>
        </ul>
      </div>
    </AppShell>
  );
}
