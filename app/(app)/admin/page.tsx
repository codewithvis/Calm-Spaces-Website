"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Sparkles,
  Users,
  Inbox,
  ShieldCheck,
  History,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import { AppShell } from "@/components/site-shell";
import {
  getAdminMetrics,
  getContactSubmissions,
  updateContactSubmissionStatus,
  getAuditLogs,
  recordAuditLog,
  AdminDashboardMetrics,
  ContactSubmission,
  AuditLogEntry,
} from "@/lib/data/cms";
import { Initiative } from "@/lib/data/initiatives";
import { EventItem } from "@/lib/data/events";
import { ResourceItem } from "@/lib/data/resources";
import { getTeamMembers, DetailedTeamMember } from "@/lib/data/team";
import { useEvents, useInitiatives, useResources } from "@/lib/hooks/useData";
import { AdminUserManagement } from "@/components/admin/admin-user-management";
import { AdminCommunityManagement } from "@/components/admin/admin-community-management";

type AdminTab = "dashboard" | "users" | "community" | "initiatives" | "events" | "resources" | "team" | "inbox" | "audit";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [userStats, setUserStats] = useState<{ total: number; students: number; peers: number; experts: number; admins: number } | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [team, setTeam] = useState<DetailedTeamMember[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  // Supabase-first data hooks (fall back to local mock data automatically)
  const { events } = useEvents();
  const { initiatives } = useInitiatives();
  const { resources } = useResources();

  useEffect(() => {
    refreshLocalData();
  }, []);

  function refreshLocalData() {
    setMetrics(getAdminMetrics());
    setSubmissions(getContactSubmissions());
    setAuditLogs(getAuditLogs());
    setTeam(getTeamMembers());
  }

  function handleStatusChange(id: string, status: ContactSubmission["status"]) {
    updateContactSubmissionStatus(id, status);
    refreshLocalData();
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  }

  const tabs: { id: AdminTab; label: string; icon: typeof BarChart3; count?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "User Directory & Roles", icon: Users, count: userStats?.total },
    { id: "community", label: "Campus Reflections", icon: MessageSquare },
    { id: "inbox", label: "Inquiries & Submissions", icon: Inbox, count: metrics?.newContactSubmissionsCount },
    { id: "initiatives", label: "Initiatives", icon: Sparkles, count: metrics?.totalInitiatives },
    { id: "events", label: "Events & Workshops", icon: Calendar, count: metrics?.upcomingEvents },
    { id: "resources", label: "Resource Library", icon: BookOpen, count: metrics?.totalResources },
    { id: "team", label: "Team Members", icon: UserCheck, count: metrics?.teamMembersCount },
    { id: "audit", label: "Audit Log", icon: History },
  ];

  return (
    <AppShell role="Super Admin">
      <div className="space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--calm-border-soft)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>C.A.L.M Spaces Administration &amp; CMS</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              Platform Content &amp; Operations Center
            </h1>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Authorized access for CEAPS faculty coordinators, content managers, and student care desks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--calm-text-muted)]">
              Last synced: <strong>{metrics?.lastUpdated}</strong>
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] transition"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-[var(--calm-text-muted)]" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex overflow-x-auto border-b border-[var(--calm-border-soft)] pb-px gap-2">
          {tabs.map((tab) => {
            const TIcon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                    : "border-transparent text-[var(--color-text-secondary)] hover:border-[var(--calm-border-soft)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <TIcon className="h-4 w-4" />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && tab.count > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      isActive
                        ? "bg-[var(--color-brand-primary)] text-white"
                        : "bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD METRICS */}
        {activeTab === "dashboard" && metrics && (
          <div className="space-y-8">
            {/* Live Metrics Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[var(--calm-text-muted)]">
                  <span>Published Resources</span>
                  <BookOpen className="h-4 w-4 text-[var(--color-brand-primary)]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[var(--color-text-primary)]">
                  {metrics.totalResources}
                </p>
                <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">
                  Psycho-educational guides &amp; resets
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[var(--calm-text-muted)]">
                  <span>Upcoming Workshops</span>
                  <Calendar className="h-4 w-4 text-[#8E4EE4]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[var(--color-text-primary)]">
                  {metrics.upcomingEvents}
                </p>
                <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">
                  Total calendar events: {metrics.totalEvents}
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[var(--calm-text-muted)]">
                  <span>Inquiries &amp; Submissions</span>
                  <Inbox className="h-4 w-4 text-[var(--color-brand-primary)]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[var(--color-text-primary)]">
                  {metrics.contactSubmissionsCount}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-green-700">
                  {metrics.newContactSubmissionsCount} new awaiting response
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[var(--calm-text-muted)]">
                  <span>Community Reach</span>
                  <Sparkles className="h-4 w-4 text-[var(--calm-pink-blush)]" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-[var(--color-text-primary)]">
                  {metrics.estimatedCommunityReach}+
                </p>
                <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">
                  {metrics.newsletterSubscribersCount} subscribed to updates
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Content Summary */}
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Recent Content Table */}
              <div className="lg:col-span-8 rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                    Published Content Overview
                  </h3>
                  <span className="text-xs text-[var(--calm-text-muted)]">
                    {initiatives.length} initiatives · {events.length} events · {resources.length} resources
                  </span>
                </div>

                <div className="mt-4 divide-y divide-[var(--calm-border-soft)] text-xs">
                  {initiatives.slice(0, 3).map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--color-text-primary)]">{item.title}</span>
                        <p className="text-[11px] text-[var(--calm-text-muted)]">{item.category} · Status: {item.status}</p>
                      </div>
                      <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-semibold text-green-700">
                        Initiative
                      </span>
                    </div>
                  ))}

                  {events.slice(0, 3).map((evt) => (
                    <div key={evt.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--color-text-primary)]">{evt.title}</span>
                        <p className="text-[11px] text-[var(--calm-text-muted)]">{evt.formattedDate} · {evt.registeredCount}/{evt.capacity} seats</p>
                      </div>
                      <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--color-brand-primary)]">
                        Event
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles & Permissions Card */}
              <div className="lg:col-span-4 rounded-3xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Role-Based Governance</span>
                </div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Access &amp; Permissions Model
                </h4>
                <div className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                  <div className="rounded-xl border border-[var(--calm-border-soft)] bg-white p-3">
                    <p className="font-bold text-[var(--color-text-primary)]">Super Admin</p>
                    <p className="text-[11px] text-[var(--calm-text-muted)]">Full database access, user roles, security audits (CEAPS Director).</p>
                  </div>
                  <div className="rounded-xl border border-[var(--calm-border-soft)] bg-white p-3">
                    <p className="font-bold text-[var(--color-text-primary)]">Content Editor</p>
                    <p className="text-[11px] text-[var(--calm-text-muted)]">Publish articles, updates, guides, and psycho-educational resources.</p>
                  </div>
                  <div className="rounded-xl border border-[var(--calm-border-soft)] bg-white p-3">
                    <p className="font-bold text-[var(--color-text-primary)]">Event Manager</p>
                    <p className="text-[11px] text-[var(--calm-text-muted)]">Configure workshop cohorts, registration caps, and attendance logs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER DIRECTORY & ROLE MANAGEMENT (Canonical Supabase Profiles) */}
        {activeTab === "users" && (
          <AdminUserManagement onStatsUpdate={setUserStats} />
        )}

        {/* TAB 3: CAMPUS REFLECTIONS & COMMUNITY MODERATION */}
        {activeTab === "community" && (
          <AdminCommunityManagement />
        )}

        {/* TAB 4: INBOX / CONTACT SUBMISSIONS */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                    Confidential Student &amp; Department Inquiries
                  </h3>
                  <p className="text-xs text-[var(--calm-text-muted)]">
                    Submitted via public contact forms. Held under CEAPS privacy standards.
                  </p>
                </div>
                <span className="rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold text-[var(--color-brand-primary)]">
                  {submissions.length} Total Messages
                </span>
              </div>

              <div className="mt-6 divide-y divide-[var(--calm-border-soft)]">
                {submissions.map((sub) => (
                  <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm text-[var(--color-text-primary)]">{sub.name}</span>
                        <span className="rounded-full bg-[var(--calm-white-warm)] border border-[var(--calm-border-soft)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--color-brand-primary)]">
                          {sub.category}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            sub.status === "New"
                              ? "bg-amber-100 text-amber-800"
                              : sub.status === "Responded"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[var(--color-text-primary)]">{sub.subject}</p>
                      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1">{sub.message}</p>
                      <p className="text-[11px] text-[var(--calm-text-muted)]">
                        From: <a href={`mailto:${sub.email}`} className="text-[var(--color-brand-primary)] hover:underline">{sub.email}</a>
                        {sub.phone && ` · Tel: ${sub.phone}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedSubmission(sub)}
                        className="rounded-xl border border-[var(--calm-border-soft)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition"
                      >
                        Read Message
                      </button>
                      <select
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value as ContactSubmission["status"])}
                        className="rounded-xl border border-[var(--calm-border-soft)] bg-white px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] outline-none"
                      >
                        <option value="New">Mark New</option>
                        <option value="In Review">In Review</option>
                        <option value="Responded">Responded</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INITIATIVES MANAGEMENT */}
        {activeTab === "initiatives" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Campus Initiatives</h3>
                <p className="text-xs text-[var(--calm-text-muted)]">Manage signature living programs and workshop categories.</p>
              </div>
              <button
                type="button"
                onClick={() => alert("Initiative authoring modal: Use Supabase backend integration in production or edit data/initiatives.ts")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Add Initiative</span>
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {initiatives.map((init) => (
                <div key={init.id} className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-brand-primary)] uppercase">{init.category}</span>
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      {init.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-[var(--color-text-primary)]">{init.title}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{init.description}</p>
                  <p className="text-[11px] text-[var(--calm-text-muted)]">Schedule: {init.schedule}</p>
                  <div className="border-t border-[var(--calm-border-soft)] pt-3 text-xs flex justify-between items-center text-[var(--color-brand-primary)] font-bold">
                    <Link href={`/initiatives#${init.slug}`} target="_blank" className="hover:underline">
                      View Public Page
                    </Link>
                    <span className="text-[10px] text-gray-400">ID: {init.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS MANAGEMENT */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Events &amp; Workshops</h3>
                <p className="text-xs text-[var(--calm-text-muted)]">Configure workshop cohorts, registration limits, and facilitator details.</p>
              </div>
              <button
                type="button"
                onClick={() => alert("Event scheduling wizard: Connects to Supabase events table")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Event</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {events.map((evt) => (
                <div key={evt.id} className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-brand-primary)] uppercase">{evt.category}</span>
                    <span className="text-xs font-semibold text-gray-600">{evt.status}</span>
                  </div>
                  <h4 className="font-bold text-base text-[var(--color-text-primary)]">{evt.title}</h4>
                  <p className="text-xs text-[var(--calm-text-muted)]">
                    {evt.formattedDate} ({evt.time}) · {evt.location}
                  </p>
                  <div className="rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-3 text-xs flex justify-between">
                    <span>Enrolled: <strong>{evt.registeredCount} / {evt.capacity} seats</strong></span>
                    <span>Facilitator: {evt.facilitator}</span>
                  </div>
                  <div className="border-t border-[var(--calm-border-soft)] pt-3 text-xs flex justify-between items-center text-[var(--color-brand-primary)] font-bold">
                    <Link href={`/events#${evt.slug}`} target="_blank" className="hover:underline">
                      Public View &amp; Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RESOURCES MANAGEMENT */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Educational Resources</h3>
                <p className="text-xs text-[var(--calm-text-muted)]">Manage psycho-educational articles, video guides, and audio breathing exercises.</p>
              </div>
              <button
                type="button"
                onClick={() => alert("Resource drafting studio: Connects to Supabase resources table")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Publish New Guide</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((res) => (
                <div key={res.id} className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-brand-primary)] uppercase">{res.type}</span>
                    <span className="text-[11px] text-[var(--calm-text-muted)]">{res.readTime}</span>
                  </div>
                  <h4 className="font-bold text-base text-[var(--color-text-primary)]">{res.title}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{res.summary}</p>
                  <p className="text-[11px] text-[var(--calm-text-muted)]">Author: {res.author} ({res.authorRole})</p>
                  <div className="border-t border-[var(--calm-border-soft)] pt-3 text-xs flex justify-between items-center text-[var(--color-brand-primary)] font-bold">
                    <Link href={`/resources#${res.slug}`} target="_blank" className="hover:underline">
                      Read Public Article
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TEAM MEMBERS */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Institutional Team Directory</h3>
              <p className="text-xs text-[var(--calm-text-muted)]">Verified profiles, faculty coordinators, and student peer ambassadors.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div key={member.id} className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.name.split(" ").filter(Boolean).slice(-2).map((p) => p[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--color-text-primary)]">{member.name}</h4>
                      <p className="text-xs text-[var(--color-brand-primary)] font-semibold">{member.primaryRole}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--calm-text-muted)]">{member.institutionalRole}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT LOG */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                    Administrative Action Audit Log
                  </h3>
                  <p className="text-xs text-[var(--calm-text-muted)]">
                    Immutable tracking of content updates, status changes, and staff operations. Passwords and sensitive data are strictly excluded.
                  </p>
                </div>
              </div>

              <div className="mt-6 divide-y divide-[var(--calm-border-soft)] text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--color-text-primary)]">{log.actor}</span>
                        <span className="rounded bg-[var(--calm-lavender-pale)] px-2 py-0.5 text-[10px] font-bold text-[var(--color-brand-primary)]">
                          {log.action}
                        </span>
                        <span className="text-[11px] text-[var(--calm-text-muted)]">
                          {log.entity} #{log.entityId}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{log.details}</p>
                    </div>
                    <span className="text-[10px] text-[var(--calm-text-muted)] shrink-0">
                      {new Date(log.timestamp).toLocaleString("en-GB")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submission Detail Modal */}
        {selectedSubmission && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--calm-plum-deep)]/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedSubmission(null)}
          >
            <div
              className="w-full max-w-lg rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  Inquiry Details
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {selectedSubmission.subject}
                </h3>
                <p className="text-xs text-[var(--calm-text-muted)]">
                  Category: <strong>{selectedSubmission.category}</strong> · Status: <strong>{selectedSubmission.status}</strong>
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 text-xs space-y-1">
                <p><strong>From:</strong> {selectedSubmission.name}</p>
                <p><strong>Email:</strong> {selectedSubmission.email}</p>
                {selectedSubmission.phone && <p><strong>Phone:</strong> {selectedSubmission.phone}</p>}
                <p><strong>Date:</strong> {new Date(selectedSubmission.submittedAt).toLocaleString("en-GB")}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-[var(--color-text-primary)]">Message Content:</p>
                <p className="text-xs leading-relaxed text-[var(--color-text-secondary)] whitespace-pre-wrap rounded-xl border bg-gray-50 p-3">
                  {selectedSubmission.message}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <a
                  href={`mailto:${selectedSubmission.email}?subject=Re: ${encodeURIComponent(selectedSubmission.subject)} (C.A.L.M Spaces)`}
                  className="rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-xs font-bold text-white hover:bg-[var(--color-brand-primary-hover)] transition"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
