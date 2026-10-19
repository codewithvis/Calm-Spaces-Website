"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Initiatives
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Initiative } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// READ: list all published initiatives
// ---------------------------------------------------------------------------
export async function getInitiativesFromDB(category?: string): Promise<Initiative[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("initiatives")
    .select("*")
    .eq("status", "PUBLISHED")
    .order("display_order", { ascending: true });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[initiatives] getInitiativesFromDB:", error.message);
    return [];
  }
  return (data ?? []) as Initiative[];
}

// ---------------------------------------------------------------------------
// READ: single initiative by slug
// ---------------------------------------------------------------------------
export async function getInitiativeBySlug(slug: string): Promise<Initiative | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("initiatives")
    .select("*")
    .eq("slug", slug)
    .eq("status", "PUBLISHED")
    .maybeSingle();

  if (error) {
    console.error("[initiatives] getInitiativeBySlug:", error.message);
    return null;
  }
  return data as Initiative | null;
}
