"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { moodOptions, saveMoodEntry, type MoodOption } from "@/lib/data/mood";

const contributingFactors = ["Tired", "Stressed", "Lonely", "Hopeful", "Uncertain", "Excited"];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [factors, setFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedMood) return;
    setIsSaving(true);
    setStatus(null);
    setError(null);
    try {
      const { data: { user }, error: userError } = await createSupabaseBrowserClient().auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("Sign in to save this check-in to your space.");
      const factorNote = factors.length ? `Factors: ${factors.join(", ")}.` : "";
      await saveMoodEntry(user.id, selectedMood, [factorNote, notes].filter(Boolean).join(" "));
      setStatus("Your check-in is saved in your private space.");
      setSelectedMood(null);
      setFactors([]);
      setNotes("");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We couldn’t save this right now. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AppShell role="Student">
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Check-in</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">How are you arriving today?</h2><p className="mt-4 text-base leading-7 text-[var(--color-muted)]">Choose whatever feels closest. This is a moment of noticing, not a test.</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{moodOptions.map((mood) => <button type="button" key={mood.label} onClick={() => setSelectedMood(mood)} aria-pressed={selectedMood?.label === mood.label} className={`min-h-28 rounded-2xl border p-4 text-left transition ${selectedMood?.label === mood.label ? "border-[var(--color-brand-primary)] bg-[var(--color-mood-calm)] ring-2 ring-[var(--color-brand-primary)]" : "border-[var(--color-border-default)] bg-[var(--color-surface-primary)] hover:border-[var(--color-brand-primary)]"}`}><span className="text-2xl" aria-hidden="true">{mood.emoji}</span><span className="mt-5 block text-sm font-medium text-[var(--color-text-primary)]">{mood.label}</span></button>)}</div>
        {selectedMood ? <div className="space-y-5 border-t border-[var(--color-border-default)] pt-6"><div><h3 className="text-2xl text-[var(--color-text-primary)]">Anything else you&apos;re carrying?</h3><div className="mt-4 flex flex-wrap gap-2">{contributingFactors.map((factor) => <button type="button" key={factor} onClick={() => setFactors((current) => current.includes(factor) ? current.filter((item) => item !== factor) : [...current, factor])} aria-pressed={factors.includes(factor)} className={`min-h-11 rounded-full border px-4 py-2 text-sm ${factors.includes(factor) ? "border-[var(--color-brand-primary)] bg-[var(--color-mood-calm)] text-[var(--color-text-primary)]" : "border-[var(--color-border-default)] bg-[var(--color-surface-primary)] text-[var(--color-text-secondary)]"}`}>{factor}</button>)}</div></div><label className="block text-sm font-medium text-[var(--color-text-primary)]">Want to write about it?<textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-4 text-base text-[var(--color-text-primary)] outline-none" placeholder="Only write what you want to keep..." /></label><button disabled={isSaving} className="min-h-11 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white disabled:opacity-60">{isSaving ? "Saving..." : "Save this check-in"}</button></div> : null}
        {status ? <p role="status" className="rounded-xl bg-[var(--color-success-bg)] p-4 text-sm text-[var(--color-text-primary)]">{status}</p> : null}
        {error ? <p role="alert" className="rounded-xl bg-[var(--color-error-bg)] p-4 text-sm text-[var(--color-error)]">{error}</p> : null}
      </form>
    </AppShell>
  );
}
