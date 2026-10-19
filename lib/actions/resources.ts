"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Resources
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// READ: list all published resources (optional category filter)
// ---------------------------------------------------------------------------
export async function getResourcesFromDB(category?: string): Promise<Resource[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("resources")
    .select("*")
    .eq("status", "PUBLISHED")
    .order("published_date", { ascending: false });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[resources] getResourcesFromDB:", error.message);
    return [];
  }
  return (data ?? []) as Resource[];
}

// ---------------------------------------------------------------------------
// READ: single resource by slug
// ---------------------------------------------------------------------------
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("slug", slug)
    .eq("status", "PUBLISHED")
    .maybeSingle();

  if (error) {
    console.error("[resources] getResourceBySlug:", error.message);
    return null;
  }
  return data as Resource | null;
}

// ---------------------------------------------------------------------------
// READ: search resources
// ---------------------------------------------------------------------------
export async function searchResourcesFromDB(query: string): Promise<Resource[]> {
  const supabase = await createSupabaseServerClient();
  const term = `%${query}%`;
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("status", "PUBLISHED")
    .or(`title.ilike.${term},summary.ilike.${term},author.ilike.${term}`)
    .order("published_date", { ascending: false })
    .limit(20);

  if (error) {
    console.error("[resources] searchResourcesFromDB:", error.message);
    return [];
  }
  return (data ?? []) as Resource[];
}
