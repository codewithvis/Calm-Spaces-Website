"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSafeNextPath } from "@/lib/auth/redirect";

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next");
  const redirectPath = getSafeNextPath(requestedNext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail || !password) {
        setErrorMessage("Please enter both your email and password.");
        setIsLoading(false);
        return;
      }

      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        console.warn("[Auth Login] error:", error.message);
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setErrorMessage("Incorrect email or password. Please double check your credentials and try again.");
        } else if (error.message.toLowerCase().includes("email not confirmed")) {
          setErrorMessage("Your email address is not verified yet. Please check your inbox for the confirmation email.");
        } else if (error.message.toLowerCase().includes("rate limit")) {
          setErrorMessage("Too many sign in attempts. Please wait a few moments before trying again.");
        } else {
          setErrorMessage(error.message || "Unable to sign in. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        setSuccessMessage("Signed in successfully! Preparing your calm space...");
        
        // Brief moment for pleasant visual feedback before routing
        setTimeout(() => {
          router.push(redirectPath || "/dashboard");
          router.refresh();
        }, 500);
      }
    } catch (err) {
      console.error("[Auth Login] Unexpected exception:", err);
      setErrorMessage(err instanceof Error ? err.message : "A connection error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 sm:p-10 shadow-[0_12px_40px_rgba(34,18,51,0.06)] relative backdrop-blur-sm">
      {/* Mobile Co-branded Logo Banner (hidden on desktop where left panel displays them) */}
      <div className="flex lg:hidden items-center justify-center gap-3 mb-6 pb-6 border-b border-[var(--calm-border-soft)]">
        {/* SGT University Logo */}
        <div className="relative h-9 w-auto rounded-lg bg-white p-1 border border-[var(--calm-border-soft)] shadow-xs flex items-center justify-center shrink-0">
          <Image
            src="/sgt-university-logo.jpg"
            alt="SGT University"
            width={1022}
            height={386}
            className="h-full w-auto max-w-[105px] object-contain"
            priority
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-[var(--calm-border-soft)] shrink-0" aria-hidden="true" />

        {/* Calm Spaces Logo */}
        <div className="relative h-9 w-auto rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs flex items-center justify-center shrink-0">
          <Image
            src="/calm-spaces-official-logo.png"
            alt="C.A.L.M Spaces"
            width={450}
            height={330}
            className="h-full w-auto max-w-[90px] object-contain"
            priority
          />
        </div>
      </div>

      {/* Form Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-3">
          <Sparkles className="h-3 w-3" />
          <span>Student & Faculty Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
          Welcome to Your Space
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Sign in with your SGT University or registered credentials to access your reflections, peer listeners, and bookings.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs sm:text-sm text-rose-900 animate-fadeIn"
        >
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs sm:text-sm text-emerald-900 animate-fadeIn"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5" noValidate>
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="login-email"
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]"
            >
              Password
            </label>
            <Link
              href="/auth/reset"
              className="text-xs font-semibold text-[var(--color-brand-primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] rounded"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-11 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[var(--calm-text-muted)] hover:text-[var(--color-brand-primary)] focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[var(--color-text-secondary)] select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--calm-border-soft)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]/20"
            />
            <span>Keep me signed in on this device</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--color-brand-primary-hover)] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[var(--calm-purple-primary)]/25 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In to Calm Spaces</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Switcher to Sign Up */}
      <div className="mt-8 pt-6 border-t border-[var(--calm-border-soft)] text-center">
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
          First time here?{" "}
          <Link
            href="/signup"
            className="font-bold text-[var(--color-brand-primary)] hover:text-[var(--calm-purple-deep)] hover:underline transition"
          >
            Create your confidential space
          </Link>
        </p>
      </div>
    </div>
  );
}
