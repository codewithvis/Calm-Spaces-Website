"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Auth (sign up, sign in, sign out)
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(120),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  studentId: z.string().optional(),
  department: z.string().optional(),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ---------------------------------------------------------------------------
// SIGN UP
// ---------------------------------------------------------------------------
export async function signUpAction(formData: {
  fullName: string;
  email: string;
  password: string;
  studentId?: string;
  department?: string;
}): Promise<{ success: boolean; message: string }> {
  const parsed = signUpSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
        student_id: parsed.data.studentId ?? null,
        department: parsed.data.department ?? null,
      },
    },
  });

  if (error) {
    console.error("[auth] signUpAction:", error.message);
    return { success: false, message: error.message };
  }

  // Insert profile row (trigger may handle this in production)
  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      email: parsed.data.email,
      full_name: parsed.data.fullName,
      student_id: parsed.data.studentId ?? null,
      department: parsed.data.department ?? null,
      role: "STUDENT",
    });
  }

  return {
    success: true,
    message:
      "Account created! Please check your email to verify your address before signing in.",
  };
}

// ---------------------------------------------------------------------------
// SIGN IN
// ---------------------------------------------------------------------------
export async function signInAction(formData: {
  email: string;
  password: string;
}): Promise<{ success: boolean; message: string }> {
  const parsed = signInSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    console.error("[auth] signInAction:", error.message);
    const friendlyMsg =
      error.message.includes("Invalid login")
        ? "Incorrect email or password. Please try again."
        : error.message;
    return { success: false, message: friendlyMsg };
  }

  return { success: true, message: "Signed in successfully." };
}

// ---------------------------------------------------------------------------
// SIGN OUT
// ---------------------------------------------------------------------------
export async function signOutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ---------------------------------------------------------------------------
// GET SESSION
// ---------------------------------------------------------------------------
export async function getSessionAction() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session;
}

// ---------------------------------------------------------------------------
// GET CURRENT PROFILE (server-side)
// ---------------------------------------------------------------------------
export async function getCurrentProfileAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[auth] getCurrentProfileAction:", error.message);
    return null;
  }

  return data;
}
