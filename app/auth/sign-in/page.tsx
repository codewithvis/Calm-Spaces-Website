import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginView } from "@/components/auth/login-view";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In · Calm Spaces · SGT University",
  description:
    "Sign in to access your confidential student well-being dashboard, daily mood check-ins, journal reflections, and clinical appointments at SGT University.",
};

export default function SignInPage() {
  return (
    <AuthLayout mode="login">
      <Suspense
        fallback={
          <div className="flex h-64 w-full items-center justify-center rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-brand-primary)]" />
          </div>
        }
      >
        <LoginView />
      </Suspense>
    </AuthLayout>
  );
}
