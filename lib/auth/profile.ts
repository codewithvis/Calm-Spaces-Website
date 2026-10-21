import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const userRoles = [
  "STUDENT",
  "PEER_LISTENER",
  "EXPERT",
  "CONTENT_EDITOR",
  "EVENT_MANAGER",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

export type UserRole = (typeof userRoles)[number];

export interface ProfileRecord {
  id: string;
  email: string;
  name: string | null;
  full_name: string | null;
  username: string | null;
  role: UserRole;
  type: string;
  student_id: string | null;
  registration_number: number | null;
  department: string | null;
  course: string | null;
  year_of_study?: string | null;
  phone_number: number | null;
  phone?: string | null;
  date_of_birth: string | null;
  avatar_url?: string | null;
  profile_picture_index?: number | null;
  bio?: string | null;
  is_verified_listener?: boolean;
  is_expert?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export function normalizeUserRole(value: string | null | undefined): UserRole {
  const normalized = value?.toUpperCase();
  if (normalized === "SUPER_ADMIN") return "SUPER_ADMIN";
  if (normalized === "ADMIN") return "ADMIN";
  if (normalized === "EXPERT") return "EXPERT";
  if (normalized === "PEER_LISTENER") return "PEER_LISTENER";
  if (normalized === "CONTENT_EDITOR") return "CONTENT_EDITOR";
  if (normalized === "EVENT_MANAGER") return "EVENT_MANAGER";
  return "STUDENT";
}

export async function getCurrentProfile(): Promise<{ user: User; profile: ProfileRecord | null }> {
  const supabase = createSupabaseBrowserClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("You need to be signed in to view your profile.");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (data) {
    // Normalise dual fields in memory if either is unset
    data.name = data.name ?? data.full_name ?? "";
    data.full_name = data.full_name ?? data.name ?? "";
    data.type = data.type ?? data.role ?? "STUDENT";
    data.role = normalizeUserRole(data.role ?? data.type);
  }

  return { user, profile: data as ProfileRecord | null };
}

export async function updateCurrentProfile(input: Partial<ProfileRecord>) {
  const { user } = await getCurrentProfile();
  
  const payload: Record<string, unknown> = { ...input };
  if (input.name && !input.full_name) payload.full_name = input.name;
  if (input.full_name && !input.name) payload.name = input.full_name;
  if (input.department && !input.course) payload.course = input.department;
  if (input.course && !input.department) payload.department = input.course;

  const { data, error } = await createSupabaseBrowserClient()
    .from("profiles")
    .update(payload)
    .eq("id", user.id)
    .select("*")
    .maybeSingle();

  if (error) throw error;
  return data as ProfileRecord | null;
}
