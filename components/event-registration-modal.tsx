"use client";

import { useState, useTransition } from "react";
import { X, Calendar, MapPin, User, CheckCircle2, AlertCircle } from "lucide-react";
import { EventItem, registerForEvent } from "@/lib/data/events";
import { registerForEventAction } from "@/lib/actions/events";

interface EventRegistrationModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onSuccess,
}: EventRegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<{ success: boolean; message: string; refId?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isOpen || !event) return null;

  const seatsLeft = Math.max(0, event.capacity - event.registeredCount);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !studentId.trim() || !department.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    startTransition(async () => {
      try {
        // Try Supabase server action first
        const res = await registerForEventAction({
          event_id: event!.id,
          student_name: name.trim(),
          student_email: email.trim(),
          student_id: studentId.trim(),
          faculty_department: department.trim(),
          notes: notes.trim() || null,
          user_id: null,
        });

        if (res.success) {
          setResult({ success: true, message: res.message });
          if (onSuccess) onSuccess();
        } else {
          setResult({ success: false, message: res.message });
        }
      } catch {
        // Fallback to local mock registration
        const res = registerForEvent({
          eventId: event!.id,
          eventTitle: event!.title,
          studentName: name.trim(),
          studentEmail: email.trim(),
          studentId: studentId.trim(),
          facultyDepartment: department.trim(),
          notes: notes.trim() || undefined,
        });

        if (res.success) {
          setResult({ success: true, message: res.message, refId: res.registrationId });
          if (onSuccess) onSuccess();
        } else {
          setResult({ success: false, message: res.message });
        }
      }
    });
  }

  function handleReset() {
    setName("");
    setEmail("");
    setStudentId("");
    setDepartment("");
    setNotes("");
    setResult(null);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--calm-plum-deep)]/60 p-4 backdrop-blur-sm"
      onClick={handleReset}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-6 py-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
              Campus Event Registration
            </span>
            <h3 id="modal-title" className="text-lg font-bold text-[var(--color-text-primary)]">
              {event.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white text-[var(--calm-text-muted)]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {result?.success ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="mt-4 text-xl font-bold text-[var(--color-text-primary)]">
                Registration Confirmed!
              </h4>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {result.message}
              </p>
              <div className="mt-6 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 text-xs text-left space-y-1.5">
                <p><strong className="text-[var(--color-text-primary)]">Event:</strong> {event.title}</p>
                <p><strong className="text-[var(--color-text-primary)]">Date:</strong> {event.formattedDate} ({event.time})</p>
                <p><strong className="text-[var(--color-text-primary)]">Location:</strong> {event.location}</p>
                <p><strong className="text-[var(--color-text-primary)]">Reference:</strong> {result.refId}</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 w-full rounded-full bg-[var(--color-brand-primary)] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-primary-hover)] transition"
              >
                Close &amp; Return
              </button>
            </div>
          ) : (
            <>
              {/* Event Quick Info */}
              <div className="mb-5 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 text-xs text-[var(--color-text-secondary)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                  <span>{event.formattedDate} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                  <span>Facilitator: {event.facilitator}</span>
                </div>
                <div className="pt-1 text-[11px] font-semibold text-[var(--color-brand-primary)]">
                  Available Capacity: {seatsLeft} seat{seatsLeft === 1 ? "" : "s"} remaining
                </div>
              </div>

              {result && !result.success && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{result.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sen"
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                      University Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@sgtuniversity.org"
                      className="w-full rounded-xl border border-[var(--calm-border-soft)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                      Student ID / Roll No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. 230104088"
                      className="w-full rounded-xl border border-[var(--calm-border-soft)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                    Faculty / Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Faculty of Allied Health Sciences / Medicine / Law"
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                    Special notes or accessibility accommodations (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific questions or accommodation needs..."
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] px-3.5 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending || seatsLeft <= 0}
                    className="w-full rounded-full bg-[var(--color-brand-primary)] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-primary-hover)] disabled:opacity-50 transition"
                  >
                    {isPending ? "Registering..." : seatsLeft <= 0 ? "Event Full" : "Confirm My Seat"}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-[var(--calm-text-muted)]">
                    Free for all SGT University students. Your information is held under university privacy standards.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
