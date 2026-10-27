"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Users,
  Search,
  Filter,
  Shield,
  UserCheck,
  Stethoscope,
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  Calendar,
  BookOpen,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

interface AdminUserManagementProps {
  onStatsUpdate?: (stats: {
    total: number;
    students: number;
    peers: number;
    experts: number;
    admins: number;
  }) => void;
}

export function AdminUserManagement({ onStatsUpdate }: AdminUserManagementProps) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Role Edit Modal State
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [newSelectedRole, setNewSelectedRole] = useState<string>("STUDENT");
  const [modalFeedback, setModalFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("[Admin] Profiles fetch notice:", error.message);
      }

      if (data) {
        setUsers(data as Profile[]);
      }
    } catch (err) {
      console.error("[Admin] Exception fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();

    // Supabase Realtime synchronization matching Android useAdminUsers hook
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("admin_profiles_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUsers]);

  // Compute live statistics
  const stats = useMemo(() => {
    const total = users.length;
    let students = 0;
    let peers = 0;
    let experts = 0;
    let admins = 0;

    users.forEach((u) => {
      const normalized = (u.type || u.role || "STUDENT").toUpperCase();
      if (normalized === "ADMIN" || normalized === "SUPER_ADMIN") admins++;
      else if (normalized === "EXPERT") experts++;
      else if (normalized === "PEER" || normalized === "PEER_LISTENER") peers++;
      else students++;
    });

    return { total, students, peers, experts, admins };
  }, [users]);

  useEffect(() => {
    if (onStatsUpdate) {
      onStatsUpdate(stats);
    }
  }, [stats, onStatsUpdate]);

  // Filter & Search
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const normalizedRole = (u.type || u.role || "STUDENT").toUpperCase();
      const matchesFilter =
        roleFilter === "ALL" ||
        (roleFilter === "STUDENT" && normalizedRole === "STUDENT") ||
        (roleFilter === "PEER" && (normalizedRole === "PEER" || normalizedRole === "PEER_LISTENER")) ||
        (roleFilter === "EXPERT" && normalizedRole === "EXPERT") ||
        (roleFilter === "ADMIN" && (normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN"));

      if (!matchesFilter) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const name = (u.full_name || u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const username = (u.username || "").toLowerCase();
      const reg = (u.registration_number ? String(u.registration_number) : u.student_id || "").toLowerCase();
      const course = (u.course || u.department || "").toLowerCase();

      return name.includes(q) || email.includes(q) || username.includes(q) || reg.includes(q) || course.includes(q);
    });
  }, [users, roleFilter, searchQuery]);

  async function handleRoleChangeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser) return;

    setUpdatingUserId(selectedUser.id);
    setModalFeedback(null);

    try {
      const supabase = createSupabaseBrowserClient();

      // Map chosen role to both Android 'type' and Web 'role'
      let targetType = "STUDENT";
      let targetRole: Profile["role"] = "STUDENT";
      let isVerified = selectedUser.is_verified_listener;
      let isExpert = selectedUser.is_expert;

      if (newSelectedRole === "ADMIN") {
        targetType = "ADMIN";
        targetRole = "ADMIN";
      } else if (newSelectedRole === "EXPERT") {
        targetType = "EXPERT";
        targetRole = "EXPERT";
        isExpert = true;
      } else if (newSelectedRole === "PEER") {
        targetType = "PEER";
        targetRole = "PEER_LISTENER";
        isVerified = true;
      } else {
        targetType = "STUDENT";
        targetRole = "STUDENT";
        isVerified = false;
        isExpert = false;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          type: targetType,
          role: targetRole,
          is_verified_listener: isVerified,
          is_expert: isExpert,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedUser.id);

      if (error) {
        throw error;
      }

      setModalFeedback({
        type: "success",
        text: `Successfully updated ${selectedUser.full_name || selectedUser.name || "user"} to ${newSelectedRole}. Permissions synchronized across Web and Android!`,
      });

      // Update local state immediately for instant feedback
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, type: targetType, role: targetRole, is_verified_listener: isVerified, is_expert: isExpert }
            : u
        )
      );

      setTimeout(() => {
        setSelectedUser(null);
        setModalFeedback(null);
      }, 1200);
    } catch (err: any) {
      console.error("[Admin] Role change error:", err);
      setModalFeedback({
        type: "error",
        text: err.message || "Failed to update role. Please verify your permissions.",
      });
    } finally {
      setUpdatingUserId(null);
    }
  }

  function getBadgeColor(typeOrRole?: string) {
    const normalized = (typeOrRole || "STUDENT").toUpperCase();
    if (normalized === "ADMIN" || normalized === "SUPER_ADMIN") {
      return "bg-purple-100 text-purple-800 border-purple-200";
    }
    if (normalized === "EXPERT") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }
    if (normalized === "PEER" || normalized === "PEER_LISTENER") {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
    return "bg-slate-100 text-slate-800 border-slate-200";
  }

  return (
    <div className="space-y-6">
      {/* 4-Panel Synchronized Metrics Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-secondary)]">
            <Users className="h-4 w-4 text-[var(--color-brand-primary)]" />
            <span>Total Accounts</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
            {stats.total}
          </p>
          <span className="text-[10px] text-[var(--calm-text-muted)]">Registered in ecosystem</span>
        </div>

        <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <GraduationCap className="h-4 w-4 text-slate-600" />
            <span>Students</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 font-[family-name:var(--font-display)]">
            {stats.students}
          </p>
          <span className="text-[10px] text-slate-500">Self-care & reflections</span>
        </div>

        <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/40 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <UserCheck className="h-4 w-4 text-emerald-600" />
            <span>Peer Listeners</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-950 font-[family-name:var(--font-display)]">
            {stats.peers}
          </p>
          <span className="text-[10px] text-emerald-700">Trained student support</span>
        </div>

        <div className="rounded-2xl border border-blue-200/60 bg-blue-50/40 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
            <Stethoscope className="h-4 w-4 text-blue-600" />
            <span>Clinical Experts</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-950 font-[family-name:var(--font-display)]">
            {stats.experts}
          </p>
          <span className="text-[10px] text-blue-700">Faculty psychologists</span>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-purple-200/60 bg-purple-50/40 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800">
            <Shield className="h-4 w-4 text-purple-600" />
            <span>Admins</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-purple-950 font-[family-name:var(--font-display)]">
            {stats.admins}
          </p>
          <span className="text-[10px] text-purple-700">CEAPS platform coordinators</span>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Refresh */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--calm-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, reg number, email, course..."
            className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-4 py-2 text-xs sm:text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/70 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--calm-lavender-pale)]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "ALL", label: "All Users" },
            { id: "STUDENT", label: "Students" },
            { id: "PEER", label: "Peers" },
            { id: "EXPERT", label: "Experts" },
            { id: "ADMIN", label: "Admins" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setRoleFilter(f.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                roleFilter === f.id
                  ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                  : "bg-[var(--calm-lavender-pale)]/50 text-[var(--color-text-secondary)] hover:bg-[var(--calm-lavender-pale)]"
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => fetchUsers()}
            disabled={loading}
            title="Refresh database records"
            aria-label="Refresh user list"
            className="ml-2 inline-flex items-center gap-1 rounded-lg border border-[var(--calm-border-soft)] p-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-slate-50 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-[var(--color-brand-primary)]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Users Table / Directory */}
      <div className="overflow-hidden rounded-2xl border border-[var(--calm-border-soft)] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/40 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <tr>
                <th className="px-4 py-3 sm:px-6">User & Identity</th>
                <th className="px-4 py-3">Account Type</th>
                <th className="hidden md:table-cell px-4 py-3">Department / Course</th>
                <th className="hidden lg:table-cell px-4 py-3">Contact</th>
                <th className="px-4 py-3 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--calm-border-soft)]">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-[var(--color-text-secondary)]">
                    <RefreshCw className="mx-auto h-5 w-5 animate-spin text-[var(--color-brand-primary)] mb-2" />
                    Connecting to Supabase user database...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-[var(--color-text-secondary)]">
                    No users found matching &quot;{searchQuery}&quot; in role filter &quot;{roleFilter}&quot;.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const displayName = user.full_name || user.name || user.username || "Registered User";
                  const roleString = (user.type || user.role || "STUDENT").toUpperCase();
                  const regDisplay = user.registration_number || user.student_id || "—";
                  const courseDisplay = user.course || user.department || "SGT University";

                  return (
                    <tr key={user.id} className="hover:bg-[var(--calm-white-warm)]/70 transition">
                      {/* User & Identity */}
                      <td className="px-4 py-3.5 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--calm-lavender-pale)] text-xs font-bold text-[var(--color-brand-primary)] ring-2 ring-white shadow-xs">
                            {displayName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-[var(--color-text-primary)]">
                              {displayName}
                            </div>
                            <div className="text-[11px] text-[var(--calm-text-muted)]">
                              Reg: <span className="font-mono">{regDisplay}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Account Type */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getBadgeColor(
                            roleString
                          )}`}
                        >
                          {roleString === "ADMIN" && <Shield className="h-3 w-3" />}
                          {roleString === "EXPERT" && <Stethoscope className="h-3 w-3" />}
                          {(roleString === "PEER" || roleString === "PEER_LISTENER") && (
                            <UserCheck className="h-3 w-3" />
                          )}
                          {roleString === "STUDENT" && <GraduationCap className="h-3 w-3" />}
                          <span>{roleString}</span>
                        </span>
                      </td>

                      {/* Department / Course */}
                      <td className="hidden md:table-cell px-4 py-3.5 text-xs text-[var(--color-text-secondary)]">
                        <div className="max-w-[180px] truncate" title={courseDisplay}>
                          {courseDisplay}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="hidden lg:table-cell px-4 py-3.5 text-xs text-[var(--calm-text-muted)]">
                        <div className="flex flex-col gap-0.5">
                          {user.email && (
                            <span className="flex items-center gap-1 text-[11px]">
                              <Mail className="h-3 w-3" /> {user.email}
                            </span>
                          )}
                          {(user.phone || user.phone_number) && (
                            <span className="flex items-center gap-1 text-[11px]">
                              <Phone className="h-3 w-3" /> {user.phone || user.phone_number}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Administrative Action */}
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            const current = (user.type || user.role || "STUDENT").toUpperCase();
                            setNewSelectedRole(
                              current === "PEER_LISTENER" ? "PEER" : current
                            );
                            setModalFeedback(null);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--calm-border-soft)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition"
                        >
                          <Shield className="h-3.5 w-3.5" />
                          <span>Change Role</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Modal (Reproducing Android UserTypeModal.tsx) */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">Manage User Role</h3>
                  <p className="text-xs text-[var(--calm-text-muted)]">
                    Canonical Supabase RBAC synchronization
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-1 text-[var(--calm-text-muted)] hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 rounded-xl bg-[var(--calm-white-warm)] p-3 text-xs">
              <div className="font-semibold text-[var(--color-text-primary)]">
                {selectedUser.full_name || selectedUser.name || "User"}
              </div>
              <div className="text-[var(--color-text-secondary)]">Email: {selectedUser.email}</div>
              <div className="text-[var(--calm-text-muted)]">
                Registration: {selectedUser.registration_number || selectedUser.student_id || "N/A"}
              </div>
            </div>

            {modalFeedback && (
              <div
                className={`mb-4 flex items-start gap-2 rounded-xl p-3 text-xs ${
                  modalFeedback.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {modalFeedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                )}
                <span>{modalFeedback.text}</span>
              </div>
            )}

            <form onSubmit={handleRoleChangeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Select New Account Type
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: "STUDENT",
                      title: "Student",
                      desc: "Self-care toolkits, private journaling, anonymous reflections, booking peer/expert support.",
                      icon: GraduationCap,
                    },
                    {
                      id: "PEER",
                      title: "Peer Listener",
                      desc: "Trained student counselor. Manages peer availability schedule and client support bookings.",
                      icon: UserCheck,
                    },
                    {
                      id: "EXPERT",
                      title: "Clinical Expert",
                      desc: "Faculty mental health professional. Clinical consultations, schedule slots & notifications.",
                      icon: Stethoscope,
                    },
                    {
                      id: "ADMIN",
                      title: "Administrator",
                      desc: "Full administrative authority: user role management, community moderation, platform metrics.",
                      icon: Shield,
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition ${
                        newSelectedRole === option.id
                          ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)]/50 ring-1 ring-[var(--color-brand-primary)]"
                          : "border-[var(--calm-border-soft)] hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="account-role"
                        value={option.id}
                        checked={newSelectedRole === option.id}
                        onChange={(e) => setNewSelectedRole(e.target.value)}
                        className="mt-0.5 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-primary)]">
                          <option.icon className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                          <span>{option.title}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[var(--color-text-secondary)] leading-tight">
                          {option.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--calm-border-soft)]">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  disabled={updatingUserId !== null}
                  className="rounded-xl border border-[var(--calm-border-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingUserId !== null}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 disabled:opacity-50"
                >
                  {updatingUserId ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Updating Database...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Confirm Role Change</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
