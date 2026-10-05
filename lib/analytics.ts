const allowedEvents = new Set([
  "feature_discovered",
  "onboarding_completed",
  "resource_opened",
  "wellness_started",
  "appointment_started",
  "appointment_confirmed",
]);

export type ProductEvent = typeof allowedEvents extends Set<infer Event> ? Event : never;

export function trackProductEvent(event: string) {
  if (!allowedEvents.has(event)) return;
  // Integrate an approved privacy-conscious provider here. Never pass journal, chat, mood notes, or profile content.
  return { event, recorded: false };
}
