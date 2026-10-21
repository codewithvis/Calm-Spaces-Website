"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AppNotification } from "@/lib/supabase/types";
import { Bell, CheckCheck, Sparkles } from "lucide-react";

const fallbackNotifications: AppNotification[] = [
  {
    id: "notif-1",
    user_id: "system",
    title: "Welcome to C.A.L.M Spaces",
    message: "Your private wellbeing space is ready. You can record daily check-ins, keep a journal, and explore campus initiatives.",
    category: "general",
    is_read: false,
    action_url: "/dashboard",
    created_at: new Date().toISOString(),
  },
  {
    id: "notif-2",
    user_id: "system",
    title: "Upcoming Campus Workshop",
    message: "Colour the Chaos expressive arts workshop is taking place next Wednesday at 3:30 PM in Room 10, A Block.",
    category: "events",
    is_read: true,
    action_url: "/events",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (!error && data && data.length > 0) {
            setNotifications(data as AppNotification[]);
          } else {
            setNotifications(fallbackNotifications);
          }
        } else {
          setNotifications(fallbackNotifications);
        }
      } catch {
        setNotifications(fallbackNotifications);
      } finally {
        setLoading(false);
      }
    }
    loadNotifications();
  }, []);

  async function markAllAsRead() {
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id);
      }
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    }
  }

  return (
    <AppShell role="Student">
      <div className="max-w-3xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--calm-border-soft)] pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">
              Activity &amp; Updates
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)]">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Gentle reminders for appointments, events, and campus well-being resources.
            </p>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] shrink-0"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="py-12 text-center text-sm text-[var(--color-muted)]">
              Loading notifications...
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-2xl border p-5 transition ${
                  notif.is_read
                    ? "border-[var(--calm-border-soft)] bg-[var(--color-surface-primary)] opacity-85"
                    : "border-[var(--color-brand-primary)]/40 bg-[var(--calm-lavender-pale)]/30"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 rounded-full bg-[var(--color-brand-primary)]/10 p-2 text-[var(--color-brand-primary)] shrink-0">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                        {notif.title}
                      </h3>
                      <span className="text-[10px] text-[var(--color-muted)] shrink-0">
                        {new Date(notif.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
