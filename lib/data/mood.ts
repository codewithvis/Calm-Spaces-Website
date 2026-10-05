import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type MoodOption = { emoji: string; label: string };
export type MoodEntry = {
  id?: string;
  user_id: string;
  user_type: string;
  mood_emoji: string;
  mood_label: string;
  entry_date: string;
  entry_time: string;
  scheduled_label: string;
  schedule_key: string;
  notes: string | null;
};

export const moodOptions: MoodOption[] = [
  { emoji: "◌", label: "Calm" },
  { emoji: "☀", label: "Good" },
  { emoji: "◐", label: "Okay" },
  { emoji: "↓", label: "Low" },
  { emoji: "~", label: "Overwhelmed" },
];

export async function listMoodEntries(userId: string) {
  const { data, error } = await createSupabaseBrowserClient().from("mood_entries").select("*").eq("user_id", userId).order("entry_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as MoodEntry[];
}

export async function saveMoodEntry(userId: string, mood: MoodOption, notes = "") {
  const now = new Date();
  const entry: MoodEntry = {
    user_id: userId,
    user_type: "STUDENT",
    mood_emoji: mood.emoji,
    mood_label: mood.label,
    entry_date: now.toISOString().slice(0, 10),
    entry_time: now.toLocaleTimeString("en-GB", { hour12: false }),
    scheduled_label: "Unscheduled",
    schedule_key: "",
    notes: notes.trim() || null,
  };
  const { data, error } = await createSupabaseBrowserClient().from("mood_entries").insert(entry).select("*").maybeSingle();
  if (error) throw error;
  return data as MoodEntry | null;
}
