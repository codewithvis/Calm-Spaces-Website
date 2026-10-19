"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Events
// All mutations go via Supabase server client (RLS-enforced)
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Event, EventRegistrationInsert, PaginatedResult } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// READ: list all public events
// ---------------------------------------------------------------------------
export async function getEventsFromDB(): Promise<Event[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("[events] getEventsFromDB:", error.message);
    return [];
  }
  return (data ?? []) as Event[];
}

// ---------------------------------------------------------------------------
// READ: single event by slug
// ---------------------------------------------------------------------------
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[events] getEventBySlug:", error.message);
    return null;
  }
  return data as Event | null;
}

// ---------------------------------------------------------------------------
// WRITE: register a student for an event
// ---------------------------------------------------------------------------
export async function registerForEventAction(
  registration: EventRegistrationInsert
): Promise<{ success: boolean; message: string }> {
  const supabase = await createSupabaseServerClient();

  // Check capacity before registering
  const { data: event, error: evError } = await supabase
    .from("events")
    .select("capacity, registered_count, status, title")
    .eq("id", registration.event_id)
    .maybeSingle();

  if (evError || !event) {
    return { success: false, message: "Event not found." };
  }

  if (event.registered_count >= event.capacity) {
    return { success: false, message: `Sorry, "${event.title}" is now full.` };
  }

  if (event.status === "CANCELLED" || event.status === "COMPLETED") {
    return { success: false, message: "Registration is not available for this event." };
  }

  // Insert registration
  const { error: regError } = await supabase
    .from("event_registrations")
    .insert(registration);

  if (regError) {
    if (regError.code === "23505") {
      return { success: false, message: "You are already registered for this event." };
    }
    console.error("[events] registerForEventAction:", regError.message);
    return { success: false, message: "Registration failed. Please try again." };
  }

  // Increment registered_count
  await supabase
    .from("events")
    .update({ registered_count: event.registered_count + 1 })
    .eq("id", registration.event_id);

  revalidatePath("/events");
  return {
    success: true,
    message: `You're registered for "${event.title}"! A confirmation will be sent to ${registration.student_email}.`,
  };
}
