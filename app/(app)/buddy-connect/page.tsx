"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Profile, StudentSchedule } from "@/lib/supabase/types";
import {
  Heart,
  MessageCircle,
  ShieldCheck,
  Users,
  Calendar,
  ArrowRight,
  Clock,
  Building,
  Video,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

export default function BuddyConnectPage() {
  const [listeners, setListeners] = useState<Profile[]>([]);
  const [schedules, setSchedules] = useState<StudentSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal
  const [selectedSlot, setSelectedSlot] = useState<StudentSchedule | null>(null);
  const [intakeNote, setIntakeNote] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPeerSupportData() {
      try {
        const supabase = createSupabaseBrowserClient();

        // Fetch verified peer listeners (support both Web 'PEER_LISTENER' and Android 'PEER')
        const { data: peers } = await supabase
          .from("profiles")
          .select("*")
          .or("is_verified_listener.eq.true,role.eq.PEER_LISTENER,type.eq.PEER_LISTENER,type.eq.PEER,type.eq.peer")
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
          .limit(10);

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

  async function handleBookSessionSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;

    setBookingInProgress(true);
    setBookingError(null);
    setBookingSuccess(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setBookingError("Please sign in to book a session.");
        return;
      }

      // Fetch student profile details
      const { data: studentProf } = await supabase
        .from("profiles")
        .select("name, full_name, registration_number, student_id")
        .eq("id", user.id)
        .maybeSingle();

      const studentName = studentProf?.full_name || studentProf?.name || "Student";
      const studentReg = studentProf?.registration_number || null;

      // Insert into unified book_request table
      const { error: insertError } = await supabase.from("book_request").insert([
        {
          user_id: user.id,
          student_id: user.id,
          student_name: studentName,
          student_registration_number: studentReg,
          provider_id: selectedSlot.peer_id,
          expert_id: selectedSlot.peer_id,
          expert_name: selectedSlot.peer_name,
          expert_registration_number: selectedSlot.peer_registration_number,
          provider_type: "PEER",
          slot_id: selectedSlot.id,
          booking_date: selectedSlot.date,
          session_date: selectedSlot.date,
          booking_time: `${selectedSlot.start_time.slice(0, 5)} - ${selectedSlot.end_time.slice(0, 5)}`,
          session_time: `${selectedSlot.start_time.slice(0, 5)} - ${selectedSlot.end_time.slice(0, 5)}`,
          mode: selectedSlot.mode || "offline",
          booking_mode: selectedSlot.mode || "offline",
          status: "pending",
          notes: intakeNote.trim() || null,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      // Mark slot as booked in student_schedule
      await supabase
        .from("student_schedule")
        .update({ is_booked: true })
        .eq("id", selectedSlot.id);

      setBookingSuccess(
        `Session request sent to ${selectedSlot.peer_name}! You can view your session status in Appointments.`
      );
      setSchedules((prev) => prev.filter((s) => s.id !== selectedSlot.id));

      setTimeout(() => {
        setSelectedSlot(null);
        setIntakeNote("");
        setBookingSuccess(null);
      }, 2500);
    } catch (err: any) {
      console.error("Booking error:", err);
      setBookingError(err.message || "Failed to book session. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  }

  return (
    <AppShell role="Student">
      <div className="max-w-4xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
            <Heart className="h-3.5 w-3.5" />
            <span>C.A.L.M Companions · Peer Support Network</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] font-[family-name:var(--font-display)]">
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
                  className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] p-4 space-y-3 shadow-xs hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-sm text-[var(--color-text-primary)]">
                      {slot.peer_name}
                    </span>
                    <span className="rounded bg-[var(--calm-lavender-pale)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand-primary)] capitalize">
                      {slot.mode || "offline"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                      <span>{slot.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                      <span>
                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                      </span>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[var(--calm-border-soft)] flex items-center justify-between">
                    <span className="text-[11px] text-[var(--calm-text-muted)]">
                      50-min active listening
                    </span>
                    <button
                      onClick={() => {
                        setSelectedSlot(slot);
                        setIntakeNote("");
                        setBookingError(null);
                        setBookingSuccess(null);
                      }}
                      className="inline-flex items-center gap-1 rounded-xl bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition"
                    >
                      <span>Request Slot</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
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

        {/* Booking Intake Modal */}
        {selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-md rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)]">Book Peer Connection</h3>
                    <p className="text-xs text-[var(--calm-text-muted)]">Confidential peer micro-conversation</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="rounded-lg p-1 text-[var(--calm-text-muted)] hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Slot Details Summary */}
              <div className="my-4 rounded-xl bg-[var(--calm-white-warm)] p-3 text-xs space-y-1">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  Peer Listener: {selectedSlot.peer_name}
                </div>
                <div className="text-[var(--color-text-secondary)]">
                  Date: {selectedSlot.date} ({selectedSlot.start_time.slice(0, 5)} - {selectedSlot.end_time.slice(0, 5)})
                </div>
                <div className="text-[var(--calm-text-muted)]">
                  Mode: {selectedSlot.mode === "online" ? "Online Video Space" : "In-Person (Room 10, A Block)"}
                </div>
              </div>

              {bookingSuccess && (
                <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{bookingSuccess}</span>
                </div>
              )}

              {bookingError && (
                <div className="mb-4 flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-900">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{bookingError}</span>
                </div>
              )}

              <form onSubmit={handleBookSessionSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                    What is on your mind? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={intakeNote}
                    onChange={(e) => setIntakeNote(e.target.value)}
                    placeholder="e.g. Midterm stress, feeling homesick, needing someone to listen..."
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-3 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                  />
                  <span className="text-[10px] text-[var(--calm-text-muted)]">
                    Only shared confidentially with your assigned listener.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--calm-border-soft)]">
                  <button
                    type="button"
                    onClick={() => setSelectedSlot(null)}
                    disabled={bookingInProgress}
                    className="rounded-xl border border-[var(--calm-border-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bookingInProgress}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 disabled:opacity-50"
                  >
                    {bookingInProgress ? <span>Sending Request...</span> : <span>Confirm Booking</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
