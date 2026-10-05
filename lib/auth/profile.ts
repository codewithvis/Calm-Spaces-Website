import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const userRoles = ["STUDENT", "PEER_LISTENER", "EXPERT", "ADMIN"] as const;
export type UserRole = (typeof userRoles)[number];

export type ProfileRecord = {
  id: string;
  name: string;
  username: string;
  type: string;
  registration_number: number | null;
  course?: string | null;
  phone_number: number | null;
  date_of_birth: string | null;
  email: string;
  profile_picture_index?: number | null;
};

export function normalizeUserRole(value: string | null | undefined): UserRole {
  const normalized = value?.toUpperCase();
  return userRoles.includes(normalized as UserRole) ? normalized as UserRole : "STUDENT";
}

export async function getCurrentProfile(): Promise<{ user: User; profile: ProfileRecord | null }> {
  const supabase = createSupabaseBrowserClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("You need to be signed in to view your profile.");

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) throw error;
  return { user, profile: data as ProfileRecord | null };
}

export async function updateCurrentProfile(input: Pick<ProfileRecord, "name" | "username">) {
  const { user } = await getCurrentProfile();
  const { data, error } = await createSupabaseBrowserClient().from("profiles").update(input).eq("id", user.id).select("*").maybeSingle();
  if (error) throw error;
  return data as ProfileRecord | null;
}
