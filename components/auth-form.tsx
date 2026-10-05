"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthMode = "sign-in" | "sign-up" | "reset";

const copy: Record<AuthMode, { eyebrow: string; title: string; description: string; submit: string }> = {
  "sign-in": { eyebrow: "Welcome back", title: "Come back to your space.", description: "Sign in when you’re ready. Your saved reflections and support options will be here.", submit: "Sign in" },
  "sign-up": { eyebrow: "Start gently", title: "Make a little space for yourself.", description: "Create an account to keep your check-ins, journal, and support options together.", submit: "Create my space" },
  reset: { eyebrow: "Account care", title: "Let’s get you back in.", description: "Enter your email and we’ll send a link to reset your password.", submit: "Send reset link" },
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const content = copy[mode];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      const requestedPath = new URLSearchParams(window.location.search).get("next");
      const redirectPath = requestedPath?.startsWith("/") ? requestedPath : "/dashboard";

      if (mode === "sign-in") {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) throw result.error;
        router.push(redirectPath);
        router.refresh();
      } else if (mode === "sign-up") {
        const result = await supabase.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: redirectTo } });
        if (result.error) throw result.error;
        setMessage("Check your email for a confirmation link, then come back here.");
      } else {
        const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
        if (result.error) throw result.error;
        setMessage("If an account exists for that email, a reset link is on its way.");
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We couldn’t complete that right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_18px_50px_rgba(32,51,43,0.08)] sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">{content.eyebrow}</p>
      <h1 className="mt-4 text-4xl leading-tight text-[var(--color-text)]">{content.title}</h1>
      <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{content.description}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {mode === "sign-up" ? <label className="block text-sm font-medium text-[var(--color-text)]">Your name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-base outline-none" autoComplete="name" /></label> : null}
        <label className="block text-sm font-medium text-[var(--color-text)]">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-base outline-none" autoComplete="email" /></label>
        {mode !== "reset" ? <label className="block text-sm font-medium text-[var(--color-text)]">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-base outline-none" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} /></label> : null}
        {error ? <p role="alert" className="rounded-xl bg-[#f2dfdc] p-3 text-sm leading-6 text-[var(--color-danger)]">{error}</p> : null}
        {message ? <p role="status" className="rounded-xl bg-[var(--color-surface-muted)] p-3 text-sm leading-6 text-[var(--color-text)]">{message}</p> : null}
        <button disabled={isSubmitting} className="min-h-11 w-full rounded-full bg-[var(--color-sage-strong)] px-5 py-3 text-sm font-medium text-white disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "One moment..." : content.submit}</button>
      </form>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-muted)]">
        {mode !== "sign-in" ? <Link href="/auth/sign-in" className="underline underline-offset-4">Sign in</Link> : null}
        {mode !== "sign-up" ? <Link href="/auth/sign-up" className="underline underline-offset-4">Create an account</Link> : null}
        {mode !== "reset" ? <Link href="/auth/reset" className="underline underline-offset-4">Forgot password?</Link> : null}
      </div>
    </div>
  );
}
