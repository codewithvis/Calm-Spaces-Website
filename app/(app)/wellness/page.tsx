"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/site-shell";

type Activity = "breathe" | "ground" | "focus" | "reflect";

const activities: { id: Activity; title: string; description: string }[] = [
  { id: "breathe", title: "Breathe", description: "A four-minute breath reset." },
  { id: "ground", title: "Ground", description: "Notice what is around you." },
  { id: "focus", title: "Focus", description: "Make the next ten minutes lighter." },
  { id: "reflect", title: "Reflect", description: "A small prompt for this moment." },
];

const groundingSteps = ["Name five things you can see.", "Notice four things you can feel.", "Listen for three sounds.", "Notice two scents.", "Name one thing you need."];

export default function WellnessPage() {
  const [active, setActive] = useState<Activity>("breathe");
  const [seconds, setSeconds] = useState(240);
  const [isRunning, setIsRunning] = useState(false);
  const [groundingIndex, setGroundingIndex] = useState(0);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [isRunning, seconds]);

  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return (
    <AppShell role="Student">
      <div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Wellness space</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">Take a moment.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">Choose something simple. You can stop whenever you need to.</p></div><div className="grid gap-3 sm:grid-cols-4">{activities.map((activity) => <button type="button" key={activity.id} onClick={() => setActive(activity.id)} className={`min-h-24 rounded-2xl border p-4 text-left ${active === activity.id ? "border-[var(--color-brand-primary)] bg-[var(--color-mood-calm)]" : "border-[var(--color-border-default)] bg-[var(--color-surface-primary)]"}`}><span className="block text-xl text-[var(--color-text-primary)]">{activity.title}</span><span className="mt-1 block text-sm text-[var(--color-text-secondary)]">{activity.description}</span></button>)}</div><section className="max-w-3xl rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-8 text-center shadow-[var(--shadow-sm)]">{active === "breathe" ? <><p className="text-sm text-[var(--color-muted)]">Follow the pace that feels comfortable.</p><div className={`mx-auto my-10 flex h-48 w-48 items-center justify-center rounded-full bg-[var(--color-mood-calm)] text-4xl text-[var(--color-text-primary)] ${isRunning ? "animate-pulse" : ""}`}>{seconds === 0 ? "Done" : `${minutes}:${remainingSeconds}`}</div><p className="text-xl text-[var(--color-text-primary)]">{seconds === 0 ? "You made space for yourself." : isRunning ? "Breathe out slowly" : "Ready when you are"}</p><div className="mt-6 flex justify-center gap-3"><button type="button" onClick={() => setIsRunning((current) => !current)} className="min-h-11 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white">{isRunning ? "Pause" : "Begin"}</button><button type="button" onClick={() => { setSeconds(240); setIsRunning(false); }} className="min-h-11 rounded-full border border-[var(--color-border-default)] px-6 py-3 text-sm font-medium text-[var(--color-text-primary)]">Reset</button></div></> : active === "ground" ? <><p className="text-sm text-[var(--color-muted)]">A five-senses reset</p><h3 className="mt-8 text-3xl text-[var(--color-text-primary)]">{groundingSteps[groundingIndex]}</h3><button type="button" onClick={() => setGroundingIndex((current) => (current + 1) % groundingSteps.length)} className="mt-8 min-h-11 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white">Next step</button></> : active === "focus" ? <><p className="text-sm text-[var(--color-muted)]">For the next ten minutes</p><h3 className="mt-8 text-3xl text-[var(--color-text-primary)]">Choose one small thing. Let the rest wait.</h3><button type="button" onClick={() => setActive("breathe")} className="mt-8 min-h-11 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white">Take a breath first</button></> : <><p className="text-sm text-[var(--color-muted)]">A prompt for now</p><h3 className="mt-8 text-3xl text-[var(--color-text-primary)]">What would make this moment feel 1% gentler?</h3><button type="button" onClick={() => setActive("reflect")} className="mt-8 min-h-11 rounded-full border border-[var(--color-border-default)] px-6 py-3 text-sm font-medium text-[var(--color-text-primary)]">Stay with the question</button></>}</section></div>
    </AppShell>
  );
}
