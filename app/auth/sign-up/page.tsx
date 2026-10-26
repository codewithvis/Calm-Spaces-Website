import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupView } from "@/components/auth/signup-view";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account · Calm Spaces · SGT University",
  description:
    "Join Calm Spaces, the official student emotional and academic well-being platform of SGT University. Free, confidential, and safe.",
};

export default function SignUpPage() {
  return (
    <AuthLayout mode="signup">
      <Suspense
        fallback={
          <div className="flex h-64 w-full items-center justify-center rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-brand-primary)]" />
          </div>
        }
      >
        <SignupView />
      </Suspense>
    </AuthLayout>
  );
}
