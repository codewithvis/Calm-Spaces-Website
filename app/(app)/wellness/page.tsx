import { AppShell } from "@/components/site-shell";

export default function WellnessPage() {
  return (
    <AppShell role="Student">
      <div className="grid gap-6 md:grid-cols-2">
        {[
          ['Grounding', 'Try a 2-minute grounding exercise to slow racing thoughts.'],
          ['Breathing', 'Follow a guided breath pattern to restore calm.'],
          ['Focus', 'Use a short reset to re-center after a stressful moment.'],
          ['Creative reflection', 'Turn a difficult feeling into a small creative prompt.'],
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
