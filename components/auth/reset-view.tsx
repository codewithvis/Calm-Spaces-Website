"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, ArrowRight, AlertCircle, CheckCircle2, Loader2, Sparkles, KeyRound } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ResetView() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleReset(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const redirectTo = `${origin}/auth/callback?next=/settings`;

      const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo,
      });

      if (error) {
        setErrorMessage(error.message || "Unable to send password reset link. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage(
        `If an account exists for ${trimmedEmail}, a password recovery link has been sent. Please check your inbox and spam folder.`
      );
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 sm:p-10 shadow-[0_12px_40px_rgba(34,18,51,0.06)] relative backdrop-blur-sm">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-3">
          <KeyRound className="h-3 w-3" />
          <span>Account Recovery</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
          Reset Your Password
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Enter the email associated with your Calm Spaces account and we will send you a secure link to create a new password.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs sm:text-sm text-rose-900 animate-fadeIn"
        >
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs sm:text-sm text-emerald-900 animate-fadeIn"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
        </div>
      )}

      <form onSubmit={handleReset} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="reset-email"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2"
          >
            Registered Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="reset-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@sgtuniversity.ac.in"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--color-brand-primary-hover)] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[var(--calm-purple-primary)]/25 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending recovery link...</span>
            </>
          ) : (
            <>
              <span>Send Recovery Link</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--calm-border-soft)] text-center">
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--color-brand-primary)] hover:text-[var(--calm-purple-deep)] hover:underline transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
