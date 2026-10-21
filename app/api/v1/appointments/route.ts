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
      .from("book_request")
      .select("*")
      .or(`user_id.eq.${user.id},provider_id.eq.${user.id}`)
      .order("booking_date", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, appointments: data });
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

    if (!body.provider_id || !body.booking_date || !body.booking_time) {
      return NextResponse.json({ error: "provider_id, booking_date, and booking_time are required" }, { status: 400 });
    }

    const booking = {
      user_id: user.id,
      provider_id: body.provider_id,
      provider_type: body.provider_type || "PEER",
      slot_id: body.slot_id || crypto.randomUUID(),
      booking_date: body.booking_date,
      booking_time: body.booking_time,
      mode: body.mode || "online",
      status: "CONFIRMED",
      notes: body.notes || null,
    };

    const { data, error } = await supabase
      .from("book_request")
      .insert(booking)
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, appointment: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
