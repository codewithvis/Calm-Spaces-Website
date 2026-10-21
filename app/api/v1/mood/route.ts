import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { isSupabaseConfigured } from "@/lib/data/provider";

function getSupabaseForRequest(req: NextRequest) {
  const { url, anonKey } = getSupabaseEnv();
  const authHeader = req.headers.get("Authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return createServerClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
      cookies: { getAll: () => [], setAll: () => {} },
    });
  }

  return createServerClient(url, anonKey, {
    cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} },
  });
}

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase backend is in fallback mode. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." }, { status: 503 });
    }
    const supabase = getSupabaseForRequest(req);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("entry_date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, moods: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase backend is in fallback mode. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." }, { status: 503 });
    }
    const supabase = getSupabaseForRequest(req);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.mood_label || !body.mood_emoji) {
      return NextResponse.json({ error: "mood_label and mood_emoji are required" }, { status: 400 });
    }

    const now = new Date();
    const entry = {
      user_id: user.id,
      user_type: body.user_type || "STUDENT",
      mood_emoji: body.mood_emoji,
      mood_label: body.mood_label,
      entry_date: body.entry_date || now.toISOString().slice(0, 10),
      entry_time: body.entry_time || now.toLocaleTimeString("en-GB", { hour12: false }),
      scheduled_label: body.scheduled_label || "Unscheduled",
      schedule_key: body.schedule_key || "",
      notes: body.notes || null,
    };

    const { data, error } = await supabase
      .from("mood_entries")
      .insert(entry)
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, mood: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
