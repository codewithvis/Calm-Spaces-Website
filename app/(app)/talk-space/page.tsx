import Link from "next/link";
import { AppShell } from "@/components/site-shell";

export default function TalkSpacePage() {
  return (
    <AppShell role="Student">
      <div className="max-w-3xl space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Talk Space</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Someone to talk things through with.</h2><p className="mt-4 text-base leading-7 text-[var(--color-muted)]">Talk Space can help you reflect, explore ideas, and find resources. It is not a therapist or emergency service.</p></div><div className="grid gap-3 sm:grid-cols-2">{["I’m feeling overwhelmed.", "I don’t know what I’m feeling.", "I need to calm down.", "I just want to talk."].map((prompt) => <Link href="/ai-assistant" key={prompt} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left text-base text-[var(--color-text)] hover:border-[var(--color-sage-strong)]">{prompt}</Link>)}</div></div>
    </AppShell>
  );
}
