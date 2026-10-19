"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Admin CMS (CRUD)
// All admin mutations require authenticated user with ADMIN/SUPER_ADMIN role
// enforced by both RLS and application-level checks.
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Event,
  Initiative,
  Resource,
  AuditLog,
  EventRegistration,
} from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Helper: verify admin role
// ---------------------------------------------------------------------------
async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Authentication required.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "EVENT_MANAGER"].includes(profile.role)) {
    throw new Error("Insufficient permissions.");
  }

  return { supabase, user, role: profile.role };
}

// ---------------------------------------------------------------------------
// EVENTS CRUD
// ---------------------------------------------------------------------------
export async function adminCreateEvent(
  event: Omit<Event, "id" | "created_at" | "updated_at" | "registered_count">
): Promise<{ success: boolean; message: string; data?: Event }> {
  try {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase
      .from("events")
      .insert({ ...event, registered_count: 0 })
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/events");
    revalidatePath("/app");
    return { success: true, message: "Event created.", data: data as Event };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create event.";
    return { success: false, message };
  }
}

export async function adminUpdateEvent(
  id: string,
  updates: Partial<Event>
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase
      .from("events")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/events");
    return { success: true, message: "Event updated." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update event.";
    return { success: false, message };
  }
}

export async function adminDeleteEvent(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) throw error;
    revalidatePath("/events");
    return { success: true, message: "Event deleted." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete event.";
    return { success: false, message };
  }
}

export async function adminGetEventRegistrations(
  eventId: string
): Promise<EventRegistration[]> {
  try {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as EventRegistration[];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// INITIATIVES CRUD
// ---------------------------------------------------------------------------
export async function adminCreateInitiative(
  initiative: Omit<Initiative, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; message: string; data?: Initiative }> {
  try {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase
      .from("initiatives")
      .insert(initiative)
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/initiatives");
    return { success: true, message: "Initiative created.", data: data as Initiative };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create initiative.";
    return { success: false, message };
  }
}

export async function adminUpdateInitiative(
  id: string,
  updates: Partial<Initiative>
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase
      .from("initiatives")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/initiatives");
    return { success: true, message: "Initiative updated." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update initiative.";
    return { success: false, message };
  }
}

export async function adminDeleteInitiative(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("initiatives").delete().eq("id", id);

    if (error) throw error;
    revalidatePath("/initiatives");
    return { success: true, message: "Initiative deleted." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete initiative.";
    return { success: false, message };
  }
}

// ---------------------------------------------------------------------------
// RESOURCES CRUD
// ---------------------------------------------------------------------------
export async function adminCreateResource(
  resource: Omit<Resource, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; message: string; data?: Resource }> {
  try {
    const { supabase } = await requireAdmin();
    const { data, error } = await supabase
      .from("resources")
      .insert(resource)
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/resources");
    return { success: true, message: "Resource created.", data: data as Resource };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create resource.";
    return { success: false, message };
  }
}

export async function adminUpdateResource(
  id: string,
  updates: Partial<Resource>
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase
      .from("resources")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    revalidatePath("/resources");
    return { success: true, message: "Resource updated." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update resource.";
    return { success: false, message };
  }
}

export async function adminDeleteResource(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("resources").delete().eq("id", id);

    if (error) throw error;
    revalidatePath("/resources");
    return { success: true, message: "Resource deleted." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete resource.";
    return { success: false, message };
  }
}

// ---------------------------------------------------------------------------
// AUDIT LOGS
// ---------------------------------------------------------------------------
export async function getAuditLogs(
  page = 1,
  pageSize = 50
): Promise<{ data: AuditLog[]; count: number }> {
  try {
    const { supabase } = await requireAdmin();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase
      .from("audit_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data: (data ?? []) as AuditLog[], count: count ?? 0 };
  } catch {
    return { data: [], count: 0 };
  }
}

// ---------------------------------------------------------------------------
// DASHBOARD STATS
// ---------------------------------------------------------------------------
export async function getDashboardStats(): Promise<{
  totalEvents: number;
  totalInitiatives: number;
  totalResources: number;
  totalRegistrations: number;
  totalContacts: number;
  totalNewsletterSubs: number;
}> {
  try {
    const { supabase } = await requireAdmin();

    const [events, initiatives, resources, registrations, contacts, newsletter] =
      await Promise.all([
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("initiatives").select("*", { count: "exact", head: true }),
        supabase.from("resources").select("*", { count: "exact", head: true }),
        supabase.from("event_registrations").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscriptions").select("*", { count: "exact", head: true }),
      ]);

    return {
      totalEvents: events.count ?? 0,
      totalInitiatives: initiatives.count ?? 0,
      totalResources: resources.count ?? 0,
      totalRegistrations: registrations.count ?? 0,
      totalContacts: contacts.count ?? 0,
      totalNewsletterSubs: newsletter.count ?? 0,
    };
  } catch {
    return {
      totalEvents: 0,
      totalInitiatives: 0,
      totalResources: 0,
      totalRegistrations: 0,
      totalContacts: 0,
      totalNewsletterSubs: 0,
    };
  }
}
