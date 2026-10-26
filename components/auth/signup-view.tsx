"use client";

import { useState, useMemo, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Building2,
  BadgeHelp,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const FACULTY_OPTIONS = [
  "Faculty of Behavioral Sciences (Psychology)",
  "Faculty of Medicine & Health Sciences",
  "Faculty of Engineering & Technology",
  "Faculty of Dental Sciences",
  "Faculty of Nursing",
  "Faculty of Law",
  "Faculty of Commerce & Management",
  "Faculty of Science",
  "Faculty of Education",
  "Faculty of Mass Communication & Media Technology",
  "Other / University Staff",
];

export function SignupView() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(FACULTY_OPTIONS[0]);
  const [studentId, setStudentId] = useState("");
  const [role, setRole] = useState<"STUDENT" | "PEER_LISTENER">("STUDENT");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  // Password Strength Evaluation
  const passwordCriteria = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUpperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (passwordCriteria.minLength) score += 1;
    if (passwordCriteria.hasUpperLower) score += 1;
    if (passwordCriteria.hasNumber) score += 1;
    if (passwordCriteria.hasSpecial) score += 1;
    return score;
  }, [passwordCriteria]);

  const strengthLabel = useMemo(() => {
    if (password.length === 0) return { label: "", color: "bg-slate-200", text: "" };
    if (passwordScore <= 1) return { label: "Weak", color: "bg-rose-500", text: "text-rose-600" };
    if (passwordScore === 2) return { label: "Fair", color: "bg-amber-500", text: "text-amber-600" };
    if (passwordScore === 3) return { label: "Good", color: "bg-blue-500", text: "text-blue-600" };
    return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-600" };
  }, [passwordScore, password.length]);

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    // Validation Checks
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }
    if (!termsAccepted) {
      setErrorMessage("Please accept the student well-being charter and community guidelines to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const emailRedirectTo = `${origin}/auth/callback`;

      const normalizedEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo,
          data: {
            full_name: fullName.trim(),
            name: fullName.trim(),
            role: role,
            type: role.toLowerCase(),
            department: department,
            course: department,
            student_id: studentId.trim() || null,
          },
        },
      });

      if (error) {
        console.warn("[Auth Signup] error:", error.message);
        if (error.message.toLowerCase().includes("user already registered")) {
          setErrorMessage("An account with this email already exists. Please sign in instead.");
        } else {
          setErrorMessage(error.message || "Failed to create account. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      // If session was immediately established (auto-confirm turned on in Supabase)
      if (data.session && data.user) {
        // Upsert canonical profile record
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: normalizedEmail,
            name: fullName.trim(),
            full_name: fullName.trim(),
            role: role,
            type: role,
            department: department,
            course: department,
            student_id: studentId.trim() || null,
          });
        } catch (profileErr) {
          console.warn("[Auth Signup] profile upsert error:", profileErr);
        }

        router.push("/dashboard");
        router.refresh();
        return;
      }

      // Email confirmation is required
      setConfirmedEmail(normalizedEmail);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err) {
      console.error("[Auth Signup] unexpected error:", err);
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  // Success Confirmation State
  if (isSuccess) {
    return (
      <div className="w-full rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 sm:p-10 shadow-[0_12px_40px_rgba(34,18,51,0.06)] text-center animate-fadeIn">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <Mail className="h-8 w-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-bold text-emerald-800 mb-3">
          <Check className="h-3.5 w-3.5" />
          <span>Verification Email Dispatched</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
          Welcome, {fullName.split(" ")[0]}!
        </h2>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm mx-auto">
          We&apos;ve sent a confidential verification link to{" "}
          <strong className="text-[var(--color-text-primary)] font-semibold">{confirmedEmail}</strong>.
        </p>
        <div className="my-6 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/50 p-4 text-xs text-[var(--calm-text-muted)] text-left space-y-2">
          <div className="flex items-center gap-2 font-bold text-[var(--color-brand-primary)]">
            <ShieldCheck className="h-4 w-4" />
            <span>Next Simple Steps:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li>Open the confirmation email in your inbox.</li>
            <li>Click &quot;Confirm your email&quot; link.</li>
            <li>You will be redirected straight to your Calm Spaces dashboard.</li>
          </ol>
        </div>
        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--color-brand-primary-hover)] transition"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-xs font-semibold text-[var(--calm-text-muted)] hover:text-[var(--color-brand-primary)] underline underline-offset-4"
          >
            Entered wrong email? Go back and re-enter
          </button>
        </div>
      </div>
    );
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
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-3">
          <Sparkles className="h-3 w-3" />
          <span>Student & Peer Registration</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
          Create Your Calm Space
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Join your campus mental health hub. Free, confidential, and safe for all SGT University students and staff.
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

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <User className="h-4 w-4" />
            </div>
            <input
              id="signup-name"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Priyanshu Sharma"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@sgtuniversity.ac.in or personal email"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
            />
          </div>
          <p className="mt-1 text-[11px] text-[var(--calm-text-muted)]">
            Institutional SGT email or personal email are both supported.
          </p>
        </div>

        {/* Department / Faculty & Student ID Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Department */}
          <div>
            <label
              htmlFor="signup-department"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
            >
              Faculty / Department
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
                <Building2 className="h-4 w-4" />
              </div>
              <select
                id="signup-department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-3 py-2.5 text-xs sm:text-sm text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
              >
                {FACULTY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student ID / Reg No */}
          <div>
            <label
              htmlFor="signup-studentid"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
            >
              Student / Reg ID <span className="text-[10px] lowercase font-normal text-[var(--calm-text-muted)]">(optional)</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
                <GraduationCap className="h-4 w-4" />
              </div>
              <input
                id="signup-studentid"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. SGT2024881"
                disabled={isLoading}
                className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Primary Purpose / Role Option */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5">
            I am joining as:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`rounded-2xl border p-2.5 text-left transition ${
                role === "STUDENT"
                  ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] shadow-xs"
                  : "border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--calm-white-warm)]"
              }`}
            >
              <div className="text-xs font-bold">Student</div>
              <div className="text-[10px] opacity-75">Access wellness resources & support</div>
            </button>
            <button
              type="button"
              onClick={() => setRole("PEER_LISTENER")}
              className={`rounded-2xl border p-2.5 text-left transition ${
                role === "PEER_LISTENER"
                  ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] shadow-xs"
                  : "border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--calm-white-warm)]"
              }`}
            >
              <div className="text-xs font-bold">Peer Listener Volunteer</div>
              <div className="text-[10px] opacity-75">Trained to support fellow students</div>
            </button>
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="signup-password"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
          >
            Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              disabled={isLoading}
              className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] pl-10 pr-11 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--calm-lavender-pale)] transition disabled:opacity-60"
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

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--calm-text-muted)]">Password Strength:</span>
                <span className={`font-bold ${strengthLabel.text}`}>{strengthLabel.label}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden flex gap-1">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    passwordScore >= 1 ? strengthLabel.color : "bg-transparent"
                  } w-1/4`}
                />
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    passwordScore >= 2 ? strengthLabel.color : "bg-transparent"
                  } w-1/4`}
                />
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    passwordScore >= 3 ? strengthLabel.color : "bg-transparent"
                  } w-1/4`}
                />
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    passwordScore >= 4 ? strengthLabel.color : "bg-transparent"
                  } w-1/4`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="signup-confirmpassword"
            className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
          >
            Confirm Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--calm-text-muted)]">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="signup-confirmpassword"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type your password"
              disabled={isLoading}
              className={`w-full rounded-2xl border pl-10 pr-10 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--calm-text-muted)]/60 focus:bg-white focus:outline-none focus:ring-4 transition disabled:opacity-60 ${
                confirmPassword.length > 0 && confirmPassword !== password
                  ? "border-rose-300 bg-rose-50/50 focus:border-rose-500 focus:ring-rose-100"
                  : confirmPassword.length > 0 && confirmPassword === password
                  ? "border-emerald-300 bg-emerald-50/30 focus:border-emerald-500 focus:ring-emerald-100"
                  : "border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] focus:border-[var(--color-brand-primary)] focus:ring-[var(--calm-lavender-pale)]"
              }`}
            />
            {confirmPassword.length > 0 && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                {confirmPassword === password ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="h-4 w-4 text-rose-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Terms and Community Guidelines */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[var(--color-text-secondary)] leading-normal select-none">
            <input
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[var(--calm-border-soft)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]/20"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="font-semibold text-[var(--color-brand-primary)] hover:underline">
                Community Guidelines
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" className="font-semibold text-[var(--color-brand-primary)] hover:underline">
                Privacy Charter
              </Link>
              . I understand my personal data is held in strict student confidentiality.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--color-brand-primary-hover)] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[var(--calm-purple-primary)]/25 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Create My Confidential Account</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Switcher to Sign In */}
      <div className="mt-6 pt-5 border-t border-[var(--calm-border-soft)] text-center">
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[var(--color-brand-primary)] hover:text-[var(--calm-purple-deep)] hover:underline transition"
          >
            Sign in to Calm Spaces
          </Link>
        </p>
      </div>
    </div>
  );
}
