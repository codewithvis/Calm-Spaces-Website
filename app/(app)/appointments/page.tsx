"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { BookRequest } from "@/lib/supabase/types";
import { Calendar, Clock, MapPin, Plus, ShieldCheck, UserCheck } from "lucide-react";

export default function AppointmentsPage() {
  const [bookings, setBookings] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("book_request")
            .select("*")
            .or(`user_id.eq.${user.id},provider_id.eq.${user.id}`)
            .order("booking_date", { ascending: true });

          if (!error && data) {
            setBookings(data as BookRequest[]);
          }
        }
      } catch (err) {
        console.warn("Bookings load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  return (
    <AppShell role="Student">
      <div className="max-w-4xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--calm-border-soft)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Confidential Student Appointments</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)]">
              Your Sessions &amp; Appointments
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Scheduled consultations with CEAPS counsellors and certified C.A.L.M peer companions.
            </p>
          </div>

          <Link
            href="/find-support"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Book New Session</span>
          </Link>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Upcoming &amp; Past Sessions</h2>

          {loading ? (
            <div className="py-12 text-center text-sm text-[var(--color-muted)]">
              Loading your appointments...
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-10 text-center space-y-4">
              <Calendar className="mx-auto h-8 w-8 text-[var(--color-brand-primary)] opacity-70" />
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  No appointments scheduled
                </h3>
                <p className="mt-1 text-xs text-[var(--color-muted)] max-w-sm mx-auto">
                  Whenever you would like to talk through academic stress, transitions, or emotional health, you can book a session with CEAPS staff.
                </p>
              </div>
              <Link
                href="/find-support"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-primary)] px-5 py-2 text-xs font-semibold text-[var(--color-brand-primary)] transition hover:bg-[var(--calm-lavender-pale)]"
              >
                <span>Find an Available Slot</span>
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-md bg-[var(--calm-lavender-pale)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--color-brand-primary)]">
                      {booking.provider_type} Session
                    </span>
                    <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                      booking.status === "CONFIRMED"
                        ? "bg-[var(--color-success-bg)] text-[var(--color-brand-primary)]"
                        : "bg-amber-50 text-amber-800"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {booking.notes || `${booking.provider_type === "EXPERT" ? "Psychological Consultation" : "Peer Support Connection"}`}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                      <span>{booking.booking_date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                      <span>{booking.booking_time}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                      <span className="capitalize">{booking.mode}</span>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[var(--color-muted)]">
                  <span>Room No. 10, Lower Ground Floor, A Block</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
