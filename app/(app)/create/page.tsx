import { AppShell } from "@/components/site-shell";

const activities = [
  ["Mandala", "A quiet pattern to color and return to your breath."],
  ["Doodle", "Make marks without needing them to mean anything."],
  ["Creative prompt", "A small invitation to put today into words or shapes."],
];

export default function CreatePage() {
  return (
    <AppShell role="Student">
      <div className="space-y-8">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Create & unwind</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Make a little room for expression.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">There is no right way to create here. Choose something simple and let the process be enough.</p></div>
        <div className="grid gap-4 md:grid-cols-3">{activities.map(([title, description]) => <div key={title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"><div className="h-28 rounded-xl bg-[var(--color-sand)]/55" /><h3 className="mt-5 text-2xl text-[var(--color-text)]">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p><button type="button" className="mt-5 rounded-full bg-[var(--color-sage-strong)] px-4 py-2 text-sm font-medium text-white">Try this</button></div>)}</div>
      </div>
    </AppShell>
  );
}
