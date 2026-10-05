import { AppShell } from "@/components/site-shell";

export default function ProfilePage() {
  return (
    <AppShell role="Student">
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--color-muted)]">Profile</p>
        <h2 className="mt-2 text-3xl font-semibold">Student profile</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm text-[var(--color-muted)]">
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Name · Maya Thompson</div>
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Program · Psychology</div>
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Support plan · Monthly check-ins</div>
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">Notifications · On</div>
        </div>
      </div>
    </AppShell>
  );
}
