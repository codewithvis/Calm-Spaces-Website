import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { JournalEntry } from "@/lib/supabase/types";

const journalKey = (userId: string) => `calm-spaces:journal:${userId}`;

export function loadLocalJournal(userId: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(journalKey(userId)) ?? "";
}

export function saveLocalJournal(userId: string, text: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(journalKey(userId), text);
}

/**
 * Fetch all journal entries for the current user from Supabase.
 */
export async function listJournalEntries(userId: string): Promise<JournalEntry[]> {
  try {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.warn("[journal] Supabase query failed, falling back to local:", error.message);
      return [];
    }
    return (data ?? []) as JournalEntry[];
  } catch (err) {
    console.warn("[journal] listJournalEntries error:", err);
    return [];
  }
}

/**
 * Save or update a journal entry in Supabase and update local fallback.
 */
export async function saveJournalEntry(
  userId: string,
  content: string,
  prompt?: string,
  entryId?: string
): Promise<JournalEntry | null> {
  // Always update local cache for instant offline responsiveness
  saveLocalJournal(userId, content);

  try {
    const supabase = createSupabaseBrowserClient();

    if (entryId) {
      const { data, error } = await supabase
        .from("journal_entries")
        .update({
          content,
          prompt: prompt ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", entryId)
        .eq("user_id", userId)
        .select("*")
        .maybeSingle();

      if (error) throw error;
      return data as JournalEntry;
    }

    // Insert new entry
    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: userId,
        content,
        prompt: prompt ?? null,
        title: prompt ?? (content.slice(0, 40) + "..."),
      })
      .select("*")
      .maybeSingle();

    if (error) throw error;
    return data as JournalEntry;
  } catch (err) {
    console.warn("[journal] Failed to sync journal to Supabase:", err);
    return null;
  }
}

/**
 * Delete a journal entry from Supabase.
 */
export async function deleteJournalEntry(userId: string, entryId: string): Promise<boolean> {
  try {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", entryId)
      .eq("user_id", userId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[journal] deleteJournalEntry error:", err);
    return false;
  }
}

/**
 * Export writing to a downloaded file.
 */
export function exportJournal(text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `calm-spaces-journal-${new Date().toISOString().slice(0, 10)}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}
