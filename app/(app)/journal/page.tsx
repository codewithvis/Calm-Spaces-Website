"use client";

import { useState } from "react";
import { AppShell } from "@/components/site-shell";
import { exportJournal, loadJournal, saveJournal } from "@/lib/data/journal";

const prompts = ["Something I’m carrying today...", "One thing I wish someone understood...", "Something that made today easier...", "What do I need right now?"];

export default function JournalPage() {
  const [journalText, setJournalText] = useState(() => loadJournal("current-user"));
  const [promptIndex, setPromptIndex] = useState(0);
  const [status, setStatus] = useState("Saved privately in this browser");

  function handleChange(value: string) {
    setJournalText(value);
    saveJournal("current-user", value);
    setStatus("Saved just now");
  }

  return (
    <AppShell role="Student">
      <div className="max-w-4xl space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Private journal</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">What&apos;s on your mind?</h2></div><p className="text-sm text-[var(--color-muted)]">{status}</p></div><div className="border-y border-[var(--color-border-default)] py-5"><p className="text-sm text-[var(--color-muted)]">Try a prompt</p><button type="button" onClick={() => setPromptIndex((current) => (current + 1) % prompts.length)} className="mt-2 text-left text-lg text-[var(--color-text-primary)] underline decoration-[var(--color-border-strong)] underline-offset-4">{prompts[promptIndex]}</button></div><textarea value={journalText} onChange={(event) => handleChange(event.target.value)} className="min-h-[28rem] w-full resize-y border-0 border-b border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 font-[family-name:var(--font-display)] text-2xl leading-relaxed text-[var(--color-text-primary)] outline-none" placeholder="Write freely. There is no right way to do this..." aria-label="Private journal entry" /><div className="flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-[var(--color-muted)]">This journal is stored locally to mirror the Android app&apos;s current behavior.</p><button type="button" onClick={() => exportJournal(journalText)} className="min-h-11 rounded-full border border-[var(--color-border-default)] px-5 py-3 text-sm font-medium text-[var(--color-text-primary)]">Export writing</button></div></div>
    </AppShell>
  );
}
