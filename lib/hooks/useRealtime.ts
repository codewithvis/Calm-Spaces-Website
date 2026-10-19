// =============================================================================
// C.A.L.M Spaces · Supabase Realtime Client Hook
// Drop-in hook that subscribes to live Supabase table changes
// =============================================================================
"use client";

import { useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

/**
 * Subscribe to INSERT/UPDATE/DELETE on any Supabase table.
 *
 * @param table  The Postgres table name to watch
 * @param filter Optional PostgREST filter string, e.g. "event_id=eq.abc-123"
 * @param onEvent Callback fired on every change event
 */
export function useRealtimeTable<T extends Record<string, unknown>>(
  table: string,
  filter: string | undefined,
  onEvent: (payload: { eventType: "INSERT" | "UPDATE" | "DELETE"; new: T; old: T }) => void
) {
  const supabase = createSupabaseBrowserClient();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const channelName = `realtime:${table}:${filter ?? "all"}`;
    channelRef.current = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
          ...(filter ? { filter } : {}),
        } as { event: "*"; schema: "public"; table: string; filter?: string },
        (payload: unknown) => {
          onEvent(payload as { eventType: "INSERT" | "UPDATE" | "DELETE"; new: T; old: T });
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, filter]);
}

/**
 * useRealtimeCount — tracks a row count for a table in real time.
 * Useful for "X seats remaining" displays on the Events page.
 */
export function useRealtimeEventCapacity(
  eventId: string,
  initialRegistered: number,
  capacity: number
) {
  const [registeredCount, setRegisteredCount] = useState(initialRegistered);

  useRealtimeTable<{ event_id: string; registered_count: number }>(
    "events",
    `id=eq.${eventId}`,
    (payload) => {
      if (payload.eventType === "UPDATE" && payload.new?.registered_count !== undefined) {
        setRegisteredCount(payload.new.registered_count as number);
      }
    }
  );

  const seatsLeft = Math.max(0, capacity - registeredCount);
  const isFull = seatsLeft === 0;
  const percentFull = Math.min(100, Math.round((registeredCount / capacity) * 100));

  return { registeredCount, seatsLeft, isFull, percentFull };
}
