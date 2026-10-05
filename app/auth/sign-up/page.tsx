import Link from "next/link";
import { Heart } from "lucide-react";
import { AuthForm } from "@/components/auth-form";

export default function SignUpPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-12"><div className="w-full"><Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-2 text-sm font-medium text-[var(--color-text)]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-sage)] text-white"><Heart className="h-4 w-4" /></span>Calm Spaces</Link><AuthForm mode="sign-up" /></div></main>;
}
