"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ExpertSchedule, BookRequest } from "@/lib/supabase/types";
import { Calendar, Clock, ShieldCheck, UserCheck, Stethoscope } from "lucide-react";

export default function ExpertPage() {
  const [schedules, setSchedules] = useState<ExpertSchedule[]>([]);
  const [consultations, setConsultations] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExpertData() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Load expert schedules
          const { data: schedData } = await supabase
            .from("expert_schedule")
            .select("*")
            .eq("expert_id", user.id)
            .order("date", { ascending: true });

          if (schedData) setSchedules(schedData as ExpertSchedule[]);

          // Load consultation requests
          const { data: reqData } = await supabase
            .from("book_request")
            .select("*")
            .eq("provider_id", user.id)
            .order("booking_date", { ascending: true });

          if (reqData) setConsultations(reqData as BookRequest[]);
        }
      } catch (err) {
        console.warn("Expert workspace error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadExpertData();
  }, []);

  return (
    <AppShell role="Expert">
      <div className="max-w-4xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--calm-border-soft)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
              <Stethoscope className="h-3.5 w-3.5" />
              <span>CEAPS Faculty &amp; Clinical Psychologist Portal</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)]">
              Professional Care Workspace
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Manage student consultation appointments, clinical availability slots, and student care pathways.
            </p>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Available Slots
            </p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">
              {schedules.filter((s) => !s.is_booked).length}
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Open for booking</p>
          </div>
          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Booked Sessions
            </p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">
              {consultations.length}
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Student consultations</p>
          </div>
          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Location
            </p>
            <p className="mt-2 text-base font-bold text-[var(--color-text-primary)]">
              A Block, Room 10
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Counselling Wing</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Configured Consultation Slots</h2>

          {loading ? (
            <div className="py-8 text-center text-sm text-[var(--color-muted)]">
              Loading clinical schedules...
            </div>
          ) : schedules.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--calm-border-soft)] p-8 text-center text-xs text-[var(--color-muted)]">
              No custom consultation slots configured for this calendar cycle. Walk-ins are handled via CEAPS counselling reception.
            </div>
          ) : (
            <div className="space-y-2.5">
              {schedules.map((slot) => (
                <div
                  key={slot.id}
                  className="rounded-xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{slot.date}</span>
                    <span className="text-xs text-[var(--color-muted)]">({slot.start_time} - {slot.end_time})</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    slot.is_booked ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {slot.is_booked ? "Booked" : "Available"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
