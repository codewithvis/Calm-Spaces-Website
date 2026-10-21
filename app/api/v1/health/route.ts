import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/data/provider";

export const dynamic = "force-dynamic";

export async function GET() {
  const isConfigured = isSupabaseConfigured();
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "C.A.L.M Spaces Centralized Unified API",
    version: "3.0.0",
    database: isConfigured ? "connected" : "fallback_mode",
  });
}
