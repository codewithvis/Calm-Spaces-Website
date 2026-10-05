import { AppShell } from "@/components/site-shell";

export default function AdminPage() {
  return <AppShell role="Admin"><div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Administration</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Keep the platform safe and useful.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">Aggregate operations, moderation, content, users, and reports. Individual wellbeing data should stay out of this view unless explicitly authorized.</p></div><div className="grid gap-4 md:grid-cols-3">{["Overview", "Content and resources", "Community reports", "Users and roles", "Appointments", "Settings"].map((item) => <div key={item} className="border-t border-[var(--color-border-default)] pt-5"><h3 className="text-xl text-[var(--color-text)]">{item}</h3></div>)}</div></div></AppShell>;
}
