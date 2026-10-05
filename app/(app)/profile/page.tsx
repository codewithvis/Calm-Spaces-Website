"use client";

import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";
import { getCurrentProfile, normalizeUserRole, updateCurrentProfile, type ProfileRecord } from "@/lib/auth/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("Loading your profile...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentProfile().then(({ profile: nextProfile }) => {
      setProfile(nextProfile);
      setName(nextProfile?.name ?? "");
      setUsername(nextProfile?.username ?? "");
      setStatus(nextProfile ? "Your profile is up to date." : "Your profile is being prepared.");
    }).catch((caughtError) => {
      setError(caughtError instanceof Error ? caughtError.message : "We couldn’t load your profile right now.");
      setStatus("Profile unavailable");
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const updated = await updateCurrentProfile({ name, username });
      setProfile(updated);
      setStatus("Your changes are saved.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We couldn’t save your profile right now.");
    }
  }

  return <AppShell role={normalizeUserRole(profile?.type)}><form onSubmit={handleSubmit} className="max-w-2xl space-y-6"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Profile</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">A few details about you.</h2><p className="mt-3 text-sm text-[var(--color-muted)]">{status}</p></div><div className="space-y-5 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6"><label className="block text-sm font-medium text-[var(--color-text-primary)]">Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 text-base outline-none" /></label><label className="block text-sm font-medium text-[var(--color-text-primary)]">Username<input value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 text-base outline-none" /></label><div className="grid gap-4 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2"><p>Role<br /><strong className="text-[var(--color-text-primary)]">{normalizeUserRole(profile?.type)}</strong></p><p>Email<br /><strong className="text-[var(--color-text-primary)]">{profile?.email ?? "Available after sign in"}</strong></p></div><button type="submit" className="min-h-11 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white">Save changes</button>{error ? <p role="alert" className="rounded-xl bg-[var(--color-error-bg)] p-3 text-sm text-[var(--color-error)]">{error}</p> : null}</div></form></AppShell>;
}
