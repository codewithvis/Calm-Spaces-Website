import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetView } from "@/components/auth/reset-view";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Reset Password · Calm Spaces · SGT University",
  description:
    "Reset your password for Calm Spaces, SGT University. Secure and confidential account recovery.",
};

export default function ResetPage() {
  return (
    <AuthLayout mode="reset">
      <Suspense
        fallback={
          <div className="flex h-64 w-full items-center justify-center rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-brand-primary)]" />
          </div>
        }
      >
        <ResetView />
      </Suspense>
    </AuthLayout>
  );
}
