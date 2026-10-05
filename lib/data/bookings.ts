import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type BookingType = "EXPERT" | "PEER";
export type BookingMode = "online" | "offline" | null;

export async function listAvailableSlots(registrationNumber: string, date: string, type: BookingType) {
  const table = type === "EXPERT" ? "expert_schedule" : "student_schedule";
  const regField = type === "EXPERT" ? "expert_registration_number" : "peer_registration_number";
  const { data, error } = await createSupabaseBrowserClient().from(table).select("*").eq(regField, registrationNumber).eq("date", date).order("start_time", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function bookSession(input: { expertId: string; slotId: string; expertRegistrationNumber: string; expertName: string; date: string; time: string; mode: BookingMode; type: BookingType }) {
  const idempotencyKey = crypto.randomUUID();
  const { data, error } = await createSupabaseBrowserClient().functions.invoke("book-session", { body: { ...input, idempotencyKey } });
  if (error) throw error;
  return data;
}
