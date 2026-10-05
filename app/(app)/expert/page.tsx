import { AppShell } from "@/components/site-shell";

export default function ExpertPage() {
  return <AppShell role="Expert"><div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Professional space</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Make room for meaningful support.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">Manage availability, consultations, client conversations, and resources within the existing expert workflow.</p></div><div className="grid gap-4 md:grid-cols-3">{["Consultations", "Availability", "Client conversations"].map((item) => <div key={item} className="border-t border-[var(--color-border-default)] pt-5"><h3 className="text-2xl text-[var(--color-text)]">{item}</h3><p className="mt-2 text-sm text-[var(--color-muted)]">Role-protected data will load from the existing Supabase contract.</p></div>)}</div></div></AppShell>;
}
