"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/site-shell";
import {
  exportJournal,
  loadLocalJournal,
  saveJournalEntry,
  listJournalEntries,
} from "@/lib/data/journal";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const prompts = [
  "Something I’m carrying today...",
  "One thing I wish someone understood...",
  "Something that made today easier...",
  "What do I need right now?",
];

export default function JournalPage() {
  const [userId, setUserId] = useState<string>("anonymous");
  const [journalText, setJournalText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [status, setStatus] = useState("Loading your journal...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function initJournal() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);
          const entries = await listJournalEntries(user.id);
          if (entries.length > 0) {
            setJournalText(entries[0].content);
            setStatus("Synced with your private cloud space");
          } else {
            const local = loadLocalJournal(user.id);
            if (local) setJournalText(local);
            setStatus("Ready for your reflections");
          }
        } else {
          const local = loadLocalJournal("anonymous");
          if (local) setJournalText(local);
          setStatus("Saved in this browser (sign in to sync across devices)");
        }
      } catch (err) {
        console.warn("Journal load error:", err);
        setStatus("Ready for your reflections");
      }
    }
    initJournal();
  }, []);

  async function handleChange(value: string) {
    setJournalText(value);
    setIsSaving(true);
    setStatus("Saving changes...");

    try {
      if (userId !== "anonymous") {
        await saveJournalEntry(userId, value, prompts[promptIndex]);
        setStatus("Synced with your private space");
      } else {
        saveJournalEntry("anonymous", value, prompts[promptIndex]);
        setStatus("Saved privately in this browser");
      }
    } catch {
      setStatus("Saved locally");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AppShell role="Student">
      <div className="max-w-4xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">
              Private Journal
            </p>
            <h2 className="mt-3 text-4xl text-[var(--color-text)]">What&apos;s on your mind?</h2>
          </div>
          <div className="flex items-center gap-2">
            {isSaving && <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-brand-primary)] animate-ping" />}
            <p className="text-sm text-[var(--color-muted)]">{status}</p>
          </div>
        </div>

        <div className="border-y border-[var(--color-border-default)] py-5">
          <p className="text-sm text-[var(--color-muted)]">Try a prompt</p>
          <button
            type="button"
            onClick={() => setPromptIndex((current) => (current + 1) % prompts.length)}
            className="mt-2 text-left text-lg text-[var(--color-text-primary)] underline decoration-[var(--color-border-strong)] underline-offset-4"
          >
            {prompts[promptIndex]}
          </button>
        </div>

        <textarea
          value={journalText}
          onChange={(event) => handleChange(event.target.value)}
          className="min-h-[28rem] w-full resize-y border-0 border-b border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 font-[family-name:var(--font-display)] text-2xl leading-relaxed text-[var(--color-text-primary)] outline-none"
          placeholder="Write freely. There is no right way to do this..."
          aria-label="Private journal entry"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            Protected by Row Level Security. Only you have access to your personal journal reflections.
          </p>
          <button
            type="button"
            onClick={() => exportJournal(journalText)}
            className="min-h-11 rounded-full border border-[var(--color-border-default)] px-5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-surface-muted)]"
          >
            Export writing
          </button>
        </div>
      </div>
    </AppShell>
  );
}
