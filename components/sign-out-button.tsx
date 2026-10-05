"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    const { error } = await createSupabaseBrowserClient().auth.signOut();
    if (!error) {
      router.push("/");
      router.refresh();
    }
    setIsSigningOut(false);
  }

  return <button type="button" onClick={signOut} disabled={isSigningOut} className="mt-2 text-sm text-[var(--color-muted)] underline decoration-[var(--color-border)] underline-offset-4 disabled:opacity-60">{isSigningOut ? "Signing out..." : "Sign out"}</button>;
}
