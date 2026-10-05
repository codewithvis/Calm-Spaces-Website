import { AppShell } from "@/components/site-shell";

export default function PeerListenerPage() {
  return <AppShell role="Peer Listener"><div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Peer listener space</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Support people with care.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">Your workspace for availability, assigned conversations, sessions, and clear escalation boundaries.</p></div><div className="grid gap-4 md:grid-cols-3">{["Availability", "Assigned conversations", "Session history"].map((item) => <div key={item} className="border-t border-[var(--color-border-default)] pt-5"><h3 className="text-2xl text-[var(--color-text)]">{item}</h3><p className="mt-2 text-sm text-[var(--color-muted)]">Connect this view to the existing role-specific Supabase records.</p></div>)}</div></div></AppShell>;
}
