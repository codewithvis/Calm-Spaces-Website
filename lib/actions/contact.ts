"use server";

// =============================================================================
// C.A.L.M Spaces · Server Actions — Contact & Newsletter (CMS)
// =============================================================================

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactSubmissionInsert } from "@/lib/supabase/types";
import { z } from "zod";

// ---------------------------------------------------------------------------
// SCHEMA VALIDATION
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(20).optional(),
  category: z.enum([
    "General Inquiry",
    "Counselling Request",
    "Volunteering",
    "Event Feedback",
    "Media",
    "Accessibility",
    "Other",
  ]),
  subject: z.string().min(4, "Subject is required").max(160),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

// ---------------------------------------------------------------------------
// WRITE: submit a contact form
// ---------------------------------------------------------------------------
export async function submitContactFormAction(
  input: ContactSubmissionInsert
): Promise<{ success: boolean; message: string }> {
  // Validate
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return { success: false, message: firstError };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    category: parsed.data.category,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  if (error) {
    console.error("[contact] submitContactFormAction:", error.message);
    return {
      success: false,
      message: "Could not send your message. Please try again or email us directly.",
    };
  }

  return {
    success: true,
    message:
      "Thank you — your message has been received. Our team will respond within 1–2 working days.",
  };
}

// ---------------------------------------------------------------------------
// WRITE: newsletter subscribe
// ---------------------------------------------------------------------------
const emailSchema = z.string().email();

export async function subscribeNewsletterAction(
  email: string
): Promise<{ success: boolean; message: string }> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("newsletter_subscriptions")
    .upsert({ email: parsed.data, is_active: true }, { onConflict: "email" });

  if (error) {
    console.error("[newsletter] subscribeNewsletterAction:", error.message);
    return { success: false, message: "Could not subscribe. Please try again." };
  }

  return { success: true, message: "You're subscribed! Welcome to the C.A.L.M Spaces community." };
}

// ---------------------------------------------------------------------------
// READ: admin — get all contact submissions (admin only, enforced by RLS)
// ---------------------------------------------------------------------------
export async function getContactSubmissionsAction(
  page = 1,
  pageSize = 20
): Promise<{ data: ContactSubmissionInsert[]; count: number }> {
  const supabase = await createSupabaseServerClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("[contact] getContactSubmissionsAction:", error.message);
    return { data: [], count: 0 };
  }

  return { data: (data ?? []) as ContactSubmissionInsert[], count: count ?? 0 };
}
