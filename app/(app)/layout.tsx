import { AppShell } from "@/components/site-shell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="Student">{children}</AppShell>;
}
