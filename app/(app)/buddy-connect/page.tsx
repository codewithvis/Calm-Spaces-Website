import { AppShell } from "@/components/site-shell";

export default function BuddyConnectPage() {
  return (
    <AppShell role="Student">
      <div className="grid gap-6 md:grid-cols-2">
        {["Peer listener availability", "Support circles", "Social check-in", "Matching preferences"].map((item) => (
          <div key={item} className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{item}</h3>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
