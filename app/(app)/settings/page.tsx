import { AppShell } from "@/components/site-shell";

export default function SettingsPage() {
  return (
    <AppShell role="Student">
      <div className="grid gap-6 md:grid-cols-2">
        {[
          ['Privacy preferences', 'Manage who can see your calendar and profile summary.'],
          ['Notifications', 'Choose how reminders and check-ins arrive.'],
          ['Security', 'Review active sessions and update sign-in settings.'],
          ['Data controls', 'Download or delete personal wellbeing data.'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
