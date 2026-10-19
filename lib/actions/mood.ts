"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Mood Entries (Android App Sync)
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MoodEntry, MoodEntryInsert } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// WRITE: save a mood check-in (requires auth)
// ---------------------------------------------------------------------------
export async function saveMoodEntryAction(
  entry: Omit<MoodEntryInsert, "user_id">
): Promise<{ success: boolean; message: string; data?: MoodEntry }> {
  const supabase = await createSupabaseServerClient();

  // Get the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "You must be signed in to log a mood entry." };
  }

  const { data, error } = await supabase
    .from("mood_entries")
    .insert({ ...entry, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error("[mood] saveMoodEntryAction:", error.message);
    return { success: false, message: "Could not save your check-in. Please try again." };
  }

  return { success: true, message: "Check-in saved!", data: data as MoodEntry };
}

// ---------------------------------------------------------------------------
// READ: get the authenticated user's mood entries (paginated)
// ---------------------------------------------------------------------------
export async function getMoodEntriesAction(
  page = 1,
  pageSize = 30
): Promise<{ data: MoodEntry[]; count: number }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { data: [], count: 0 };

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("mood_entries")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false })
    .order("entry_time", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("[mood] getMoodEntriesAction:", error.message);
    return { data: [], count: 0 };
  }

  return { data: (data ?? []) as MoodEntry[], count: count ?? 0 };
}

// ---------------------------------------------------------------------------
// READ: get today's mood entry for the current user
// ---------------------------------------------------------------------------
export async function getTodaysMoodAction(): Promise<MoodEntry | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const { data, error } = await supabase
    .from("mood_entries")
    .select("*")
    .eq("user_id", user.id)
    .eq("entry_date", today)
    .order("entry_time", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[mood] getTodaysMoodAction:", error.message);
    return null;
  }

  return data as MoodEntry | null;
}
