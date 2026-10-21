"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Profile, StudentSchedule } from "@/lib/supabase/types";
import { Heart, MessageCircle, ShieldCheck, Users, Calendar, ArrowRight } from "lucide-react";

export default function BuddyConnectPage() {
  const [listeners, setListeners] = useState<Profile[]>([]);
  const [schedules, setSchedules] = useState<StudentSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPeerSupportData() {
      try {
        const supabase = createSupabaseBrowserClient();
        
        // Fetch verified peer listeners
        const { data: peers } = await supabase
          .from("profiles")
          .select("*")
          .or("is_verified_listener.eq.true,role.eq.PEER_LISTENER,type.eq.PEER_LISTENER")
          .limit(10);

        if (peers && peers.length > 0) {
          setListeners(peers as Profile[]);
        }

        // Fetch available peer schedule slots
        const { data: slots } = await supabase
          .from("student_schedule")
          .select("*")
          .eq("is_booked", false)
          .gte("date", new Date().toISOString().slice(0, 10))
          .order("date", { ascending: true })
          .limit(6);

        if (slots && slots.length > 0) {
          setSchedules(slots as StudentSchedule[]);
        }
      } catch (err) {
        console.warn("Peer listeners load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPeerSupportData();
  }, []);

  return (
    <AppShell role="Student">
      <div className="max-w-4xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
            <Heart className="h-3.5 w-3.5" />
            <span>C.A.L.M Companions · Peer Support Network</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Buddy Connect
          </h1>
          <p className="mt-2 text-base leading-relaxed text-[var(--color-muted)]">
            Connect with trained student peer listeners for confidential, judgment-free micro-conversations. Certified under CEAPS 40-hour active listening training.
          </p>
        </div>

        {/* Essential Boundaries Notice */}
        <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-muted)] p-5 text-xs text-[var(--color-muted)] space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-brand-primary)]" />
            <span>Peer Support Scope &amp; Safety Boundaries</span>
          </div>
          <p>
            C.A.L.M Companions offer empathetic listening, shared student perspective, and emotional de-escalation. They are not clinical therapists or crisis hotlines. For medical diagnosis or immediate crisis assistance, please visit the Safety space.
          </p>
        </div>

        {/* Available Drop-in Slots */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Upcoming Listener Drop-ins</h2>
            <span className="text-xs text-[var(--color-muted)]">Room 10, A Block &amp; Online</span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-[var(--color-muted)]">
              Checking peer listener availability...
            </div>
          ) : schedules.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {schedules.map((slot) => (
                <div
                  key={slot.id}
                  className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-4 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--color-text-primary)]">{slot.peer_name}</span>
                    <span className="rounded bg-[var(--calm-lavender-pale)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand-primary)] capitalize">
                      {slot.mode}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                      <span>{slot.date}</span>
                    </span>
                    <span>{slot.start_time} - {slot.end_time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--calm-border-soft)] p-6 text-center text-xs text-[var(--color-muted)]">
              Weekday walk-in hours are active daily from 10:00 AM – 4:00 PM at C.A.L.M Spaces Studio (A Block, Room 10).
            </div>
          )}
        </div>

        {/* Action Pathways */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-6 space-y-3">
            <Users className="h-6 w-6 text-[var(--color-brand-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Drop into C.A.L.M Studio
            </h3>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Prefer an in-person conversation? Visit our dedicated student lounge at Room No. 10, Lower Ground Floor, A Block. No prior appointment needed during open drop-in hours.
            </p>
            <Link
              href="/visit-us"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-primary)] pt-1"
            >
              <span>Location &amp; Hours</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-6 space-y-3">
            <MessageCircle className="h-6 w-6 text-[var(--color-brand-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Listening Circles
            </h3>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Small, confidential peer groups (8–12 students) hosted bi-weekly for shared validation and structured decompression on academic and personal themes.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-primary)] pt-1"
            >
              <span>Browse Circles</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
