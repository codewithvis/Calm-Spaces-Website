"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ExpertSchedule, BookRequest, Profile } from "@/lib/supabase/types";
import {
  Calendar,
  Clock,
  ShieldCheck,
  UserCheck,
  Stethoscope,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bell,
  Search,
  Filter,
  Check,
  X,
  Send,
  Sparkles,
  MapPin,
  RefreshCw,
  Video,
  Building,
  GraduationCap,
} from "lucide-react";

type ExpertTab = "consultations" | "schedule" | "broadcast";

export default function ExpertPage() {
  const [activeTab, setActiveTab] = useState<ExpertTab>("consultations");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [schedules, setSchedules] = useState<ExpertSchedule[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter for consultations
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Slot Creation Modal
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [slotDate, setSlotDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [slotStart, setSlotStart] = useState("10:00:00");
  const [slotEnd, setSlotEnd] = useState("10:50:00");
  const [slotMode, setSlotMode] = useState<"offline" | "online">("offline");
  const [creatingSlot, setCreatingSlot] = useState(false);

  // Broadcast Notification Modal
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  const [sendingNotif, setSendingNotif] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadExpertData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // 1. Fetch Expert Profile
      const { data: profData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profData) {
        setProfile(profData as Profile);
      }

      const regNum = profData?.registration_number;

      // 2. Fetch Expert Schedules
      let schedQuery = supabase
        .from("expert_schedule")
        .select("*")
        .order("date", { ascending: true })
        .order("start_time", { ascending: true });

      if (regNum) {
        schedQuery = schedQuery.or(`expert_id.eq.${user.id},expert_registration_number.eq.${regNum}`);
      } else {
        schedQuery = schedQuery.eq("expert_id", user.id);
      }

      const { data: schedData } = await schedQuery;
      if (schedData) setSchedules(schedData as ExpertSchedule[]);

      // 3. Fetch Book Requests (Consultations)
      let reqQuery = supabase
        .from("book_request")
        .select("*")
        .order("created_at", { ascending: false });

      if (regNum) {
        reqQuery = reqQuery.or(
          `provider_id.eq.${user.id},expert_id.eq.${user.id},expert_registration_number.eq.${regNum}`
        );
      } else {
        reqQuery = reqQuery.or(`provider_id.eq.${user.id},expert_id.eq.${user.id}`);
      }

      const { data: reqData } = await reqQuery;
      if (reqData) setConsultations(reqData);
    } catch (err) {
      console.warn("[Expert Page] load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpertData();

    // Supabase Realtime synchronization on book_request & expert_schedule
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("expert_workbench_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "book_request" },
        () => {
          loadExpertData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expert_schedule" },
        () => {
          loadExpertData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadExpertData]);

  // Actions on Consultations
  async function handleUpdateStatus(requestId: string, newStatus: string) {
    setProcessingId(requestId);
    setFeedbackMessage(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase
        .from("book_request")
        .update({
          status: newStatus.toLowerCase(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", requestId);

      if (error) throw error;

      setConsultations((prev) =>
        prev.map((c) => (c.id === requestId ? { ...c, status: newStatus.toLowerCase() } : c))
      );
      setFeedbackMessage({
        type: "success",
        text: `Consultation marked as ${newStatus}. Synced with student's device in real-time.`,
      });
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err.message || "Failed to update status. Please try again.",
      });
    } finally {
      setProcessingId(null);
    }
  }

  // Add Availability Slot
  async function handleCreateSlotSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreatingSlot(true);
    setFeedbackMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Authentication required");

      const regNum = profile?.registration_number || null;
      const expertName = profile?.full_name || profile?.name || "Clinical Expert";

      const { error } = await supabase.from("expert_schedule").insert([
        {
          expert_id: user.id,
          expert_registration_number: regNum,
          expert_name: expertName,
          date: slotDate,
          start_time: slotStart,
          end_time: slotEnd,
          mode: slotMode,
          is_booked: false,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setShowSlotModal(false);
      setFeedbackMessage({
        type: "success",
        text: `Slot added for ${slotDate} (${slotStart} - ${slotEnd}). Available for student booking!`,
      });
      loadExpertData();
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err.message || "Failed to create slot.",
      });
    } finally {
      setCreatingSlot(false);
    }
  }

  // Delete Availability Slot
  async function handleDeleteSlot(slotId: string) {
    if (!confirm("Are you sure you want to remove this availability slot?")) return;

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("expert_schedule").delete().eq("id", slotId);
      if (error) throw error;
      setSchedules((prev) => prev.filter((s) => s.id !== slotId));
    } catch (err: any) {
      alert("Error deleting slot: " + err.message);
    }
  }

  // Send Notification Broadcast
  async function handleSendBroadcast(e: React.FormEvent) {
    e.preventDefault();
    if (!notifTitle.trim() || !notifBody.trim()) return;

    setSendingNotif(true);
    setFeedbackMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("notifications").insert([
        {
          sender_id: user?.id,
          title: notifTitle.trim(),
          body: notifBody.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setShowBroadcastModal(false);
      setNotifTitle("");
      setNotifBody("");
      setFeedbackMessage({
        type: "success",
        text: "Notification broadcast sent successfully to campus students and active sessions!",
      });
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err.message || "Failed to dispatch notification.",
      });
    } finally {
      setSendingNotif(false);
    }
  }

  // Filtered Consultations
  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      const st = (c.status || "pending").toLowerCase();
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PENDING" && st === "pending") ||
        (statusFilter === "APPROVED" && st === "approved") ||
        (statusFilter === "COMPLETED" && (st === "complete" || st === "completed")) ||
        (statusFilter === "REJECTED" && st === "rejected");

      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const name = (c.student_name || "").toLowerCase();
      const reg = String(c.student_registration_number || c.student_id || "").toLowerCase();
      const notes = (c.notes || "").toLowerCase();

      return name.includes(q) || reg.includes(q) || notes.includes(q);
    });
  }, [consultations, statusFilter, searchQuery]);

  return (
    <AppShell role="Expert">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--calm-border-soft)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              <Stethoscope className="h-3.5 w-3.5" />
              <span>CEAPS Faculty &amp; Clinical Psychologist Portal</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl font-[family-name:var(--font-display)]">
              Clinical Care &amp; Consultation Workspace
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[var(--color-text-secondary)]">
              Welcome, {profile?.full_name || profile?.name || "Dr. CEAPS Faculty"}. Synchronized with the SGT Calm Spaces Android ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--calm-border-soft)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--color-brand-primary)] shadow-xs hover:bg-[var(--calm-lavender-pale)] transition"
            >
              <Bell className="h-3.5 w-3.5" />
              <span>Send Broadcast</span>
            </button>
            <button
              onClick={() => setShowSlotModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Working Slot</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMessage && (
          <div
            className={`flex items-start gap-3 rounded-2xl p-4 text-xs sm:text-sm ${
              feedbackMessage.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            {feedbackMessage.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            )}
            <div className="flex-1 font-medium">{feedbackMessage.text}</div>
            <button onClick={() => setFeedbackMessage(null)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Status Metrics Cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Pending Requests
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-600 font-[family-name:var(--font-display)]">
              {consultations.filter((c) => (c.status || "pending").toLowerCase() === "pending").length}
            </p>
            <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">Awaiting clinical approval</p>
          </div>

          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Active Consultations
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-700 font-[family-name:var(--font-display)]">
              {consultations.filter((c) => (c.status || "").toLowerCase() === "approved").length}
            </p>
            <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">Confirmed bookings</p>
          </div>

          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Configured Slots
            </p>
            <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
              {schedules.length}
            </p>
            <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">
              {schedules.filter((s) => !s.is_booked).length} available for booking
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              Clinical Location
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-1">
              <MapPin className="h-4 w-4 text-[var(--color-brand-primary)]" />
              Room 10, A Block
            </p>
            <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">CEAPS Counselling Wing</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[var(--calm-border-soft)] gap-2">
          {[
            { id: "consultations", label: "Student Consultations", icon: UserCheck, count: consultations.length },
            { id: "schedule", label: "Working Availability Slots", icon: Calendar, count: schedules.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ExpertTab)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                  : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span className="rounded-full bg-[var(--calm-lavender-pale)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand-primary)]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* TAB 1: CONSULTATIONS WORKBENCH */}
        {activeTab === "consultations" && (
          <div className="space-y-4">
            {/* Control Bar: Search & Status Filters */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--calm-text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name, reg number, intake note..."
                  className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-4 py-2 text-xs sm:text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/70 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "ALL", label: "All" },
                  { id: "PENDING", label: "Pending" },
                  { id: "APPROVED", label: "Approved" },
                  { id: "COMPLETED", label: "Completed" },
                  { id: "REJECTED", label: "Rejected" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatusFilter(s.id)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      statusFilter === s.id
                        ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                        : "bg-[var(--calm-lavender-pale)]/50 text-[var(--color-text-secondary)] hover:bg-[var(--calm-lavender-pale)]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}

                <button
                  onClick={() => loadExpertData()}
                  disabled={loading}
                  aria-label="Refresh consultations"
                  className="ml-2 inline-flex items-center gap-1 rounded-lg border border-[var(--calm-border-soft)] p-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-slate-50 transition"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-[var(--color-brand-primary)]" : ""}`} />
                </button>
              </div>
            </div>

            {/* Consultation Cards */}
            {loading && consultations.length === 0 ? (
              <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-12 text-center text-sm text-[var(--color-text-secondary)] shadow-xs">
                <RefreshCw className="mx-auto h-6 w-6 animate-spin text-[var(--color-brand-primary)] mb-2" />
                Loading consultation requests...
              </div>
            ) : filteredConsultations.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--calm-border-soft)] bg-white p-10 text-center text-xs text-[var(--calm-text-muted)]">
                No consultation requests found for status &quot;{statusFilter}&quot;.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredConsultations.map((item) => {
                  const st = (item.status || "pending").toLowerCase();
                  const isPending = st === "pending";
                  const isApproved = st === "approved";
                  const isComplete = st === "complete" || st === "completed";
                  const dateStr = item.session_date || item.booking_date || "Upcoming";
                  const timeStr = item.session_time || item.booking_time || "TBD";
                  const mode = item.booking_mode || item.mode || "offline";

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--calm-lavender-pale)] text-xs font-bold text-[var(--color-brand-primary)]">
                              {(item.student_name || "S").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-[var(--color-text-primary)]">
                                {item.student_name || "Anonymous Student"}
                              </div>
                              <div className="text-[11px] text-[var(--calm-text-muted)]">
                                Reg: <span className="font-mono">{item.student_registration_number || item.student_id || "N/A"}</span>
                              </div>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isPending
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : isApproved
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : isComplete
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-rose-100 text-rose-800 border border-rose-200"
                            }`}
                          >
                            {item.status || "pending"}
                          </span>
                        </div>

                        {/* Date & Mode Specs */}
                        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)] mb-3">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--calm-white-warm)] px-2.5 py-1">
                            <Calendar className="h-3 w-3 text-[var(--color-brand-primary)]" />
                            <span>{dateStr}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--calm-white-warm)] px-2.5 py-1">
                            <Clock className="h-3 w-3 text-[var(--color-brand-primary)]" />
                            <span>{timeStr}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--calm-white-warm)] px-2.5 py-1">
                            {mode === "online" ? (
                              <>
                                <Video className="h-3 w-3 text-blue-600" />
                                <span>Online Video / Audio</span>
                              </>
                            ) : (
                              <>
                                <Building className="h-3 w-3 text-purple-600" />
                                <span>In-Person (Room 10)</span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Intake Note */}
                        {item.notes && (
                          <div className="rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-3 text-xs text-[var(--color-text-secondary)]">
                            <span className="font-bold text-[var(--color-text-primary)] block mb-0.5">Intake Concern:</span>
                            {item.notes}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-[var(--calm-border-soft)] flex items-center justify-end gap-2">
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "rejected")}
                              disabled={processingId === item.id}
                              className="inline-flex items-center gap-1 rounded-xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Decline</span>
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "approved")}
                              disabled={processingId === item.id}
                              className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Approve Consultation</span>
                            </button>
                          </>
                        )}

                        {isApproved && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, "complete")}
                            disabled={processingId === item.id}
                            className="inline-flex items-center gap-1 rounded-xl bg-[var(--color-brand-primary)] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Mark Consultation Complete</span>
                          </button>
                        )}

                        {(isComplete || st === "rejected") && (
                          <span className="text-[11px] text-[var(--calm-text-muted)]">
                            Session recorded in student history
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHEDULE SLOTS */}
        {activeTab === "schedule" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  Active Clinical Working Hours
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Slots visible to students booking clinical sessions in Android or Web.
                </p>
              </div>
              <button
                onClick={() => setShowSlotModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Time Slot</span>
              </button>
            </div>

            {schedules.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--calm-border-soft)] bg-white p-10 text-center text-xs text-[var(--calm-text-muted)]">
                No active consultation slots configured. Click &quot;Add Time Slot&quot; to open appointment windows.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {schedules.map((slot) => (
                  <div
                    key={slot.id}
                    className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-primary)]">
                        <Calendar className="h-4 w-4 text-[var(--color-brand-primary)]" />
                        <span>{slot.date}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <Clock className="h-3.5 w-3.5 text-[var(--calm-text-muted)]" />
                        <span>
                          {slot.start_time} - {slot.end_time}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                            slot.is_booked
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {slot.is_booked ? "Booked" : "Available"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      title="Remove slot"
                      className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Slot Modal */}
        {showSlotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-md rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
                <h3 className="font-bold text-[var(--color-text-primary)]">Add Clinical Working Slot</h3>
                <button
                  onClick={() => setShowSlotModal(false)}
                  className="rounded-lg p-1 text-[var(--calm-text-muted)] hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSlotSubmit} className="space-y-4 my-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                    Slot Date
                  </label>
                  <input
                    type="date"
                    required
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-2 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      required
                      value={slotStart}
                      onChange={(e) => setSlotStart(e.target.value)}
                      className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-2 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      required
                      value={slotEnd}
                      onChange={(e) => setSlotEnd(e.target.value)}
                      className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-2 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                    Session Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSlotMode("offline")}
                      className={`rounded-xl border p-2.5 text-xs font-bold transition flex items-center justify-center gap-2 ${
                        slotMode === "offline"
                          ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]"
                          : "border-[var(--calm-border-soft)] text-[var(--color-text-secondary)]"
                      }`}
                    >
                      <Building className="h-4 w-4" />
                      <span>In-Person (Room 10)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlotMode("online")}
                      className={`rounded-xl border p-2.5 text-xs font-bold transition flex items-center justify-center gap-2 ${
                        slotMode === "online"
                          ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]"
                          : "border-[var(--calm-border-soft)] text-[var(--color-text-secondary)]"
                      }`}
                    >
                      <Video className="h-4 w-4" />
                      <span>Online Video</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--calm-border-soft)]">
                  <button
                    type="button"
                    onClick={() => setShowSlotModal(false)}
                    className="rounded-xl border border-[var(--calm-border-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingSlot}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 disabled:opacity-50"
                  >
                    {creatingSlot ? <span>Adding...</span> : <span>Publish Slot</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Broadcast Notification Modal */}
        {showBroadcastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fadeIn">
            <div className="w-full max-w-md rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)]">Broadcast Campus Notification</h3>
                    <p className="text-xs text-[var(--calm-text-muted)]">Dispatches to all active student devices</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBroadcastModal(false)}
                  className="rounded-lg p-1 text-[var(--calm-text-muted)] hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4 my-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                    Notification Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={notifTitle}
                    onChange={(e) => setNotifTitle(e.target.value)}
                    placeholder="e.g. Midterm Calm Space Open Walk-in Hours"
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-2 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                    Message Body
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={notifBody}
                    onChange={(e) => setNotifBody(e.target.value)}
                    placeholder="Write your clinical reminder, mindfulness tip, or session schedule update..."
                    className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-3 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--calm-border-soft)]">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="rounded-xl border border-[var(--calm-border-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingNotif || !notifTitle.trim() || !notifBody.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 disabled:opacity-50"
                  >
                    {sendingNotif ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send to Campus</span>
                      </>
                    )}
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
