// =============================================================================
// C.A.L.M Spaces · useData — Client-side hook for Supabase-first data fetching
// Tries server actions, falls back to local mock data seamlessly.
// =============================================================================
"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { getEvents, EventItem } from "@/lib/data/events";
import { getInitiatives, Initiative as LocalInitiative } from "@/lib/data/initiatives";
import { getResources, ResourceItem } from "@/lib/data/resources";
import { getEventsFromDB } from "@/lib/actions/events";
import { getInitiativesFromDB } from "@/lib/actions/initiatives";
import { getResourcesFromDB } from "@/lib/actions/resources";
import type { Event, Initiative, Resource } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// Helper: convert DB Event → local EventItem shape for the UI
// ---------------------------------------------------------------------------
function dbEventToLocal(e: Event): EventItem {
  const statusMap: Record<string, EventItem["status"]> = {
    UPCOMING: "Upcoming",
    REGISTRATION_OPEN: "Registration Open",
    FULL: "Full",
    COMPLETED: "Past",
    CANCELLED: "Past",
  };

  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    category: (e.category as EventItem["category"]) || "Workshop",
    description: e.description,
    fullDescription: e.full_description || e.description,
    date: e.event_date,
    formattedDate: e.event_date,
    time: e.event_time,
    location: e.location,
    facilitator: e.facilitator,
    facilitatorRole: e.facilitator_role || "CEAPS Team",
    capacity: e.capacity,
    registeredCount: e.registered_count,
    status: (statusMap[e.status] ?? "Upcoming") as EventItem["status"],
    coverImage: e.cover_image_url || "/botanical-motif.svg",
    tags: e.tags ?? [],
    departmentAffiliation: e.department_affiliation,
  };
}

// ---------------------------------------------------------------------------
// Helper: convert DB Initiative → local Initiative shape for the UI
// ---------------------------------------------------------------------------
function dbInitiativeToLocal(i: Initiative): LocalInitiative {
  const statusMap: Record<string, LocalInitiative["status"]> = {
    PUBLISHED: "Active",
    REVIEW: "Upcoming",
    ARCHIVED: "Completed",
    DRAFT: "Upcoming",
  };

  return {
    id: i.id,
    slug: i.slug,
    title: i.title,
    category: (i.category as LocalInitiative["category"]) || "Expressive Arts",
    tagline: i.tagline || "",
    description: i.description,
    fullDescription: i.full_description || i.description,
    status: (statusMap[i.status] ?? "Active") as LocalInitiative["status"],
    coverImage: i.cover_image_url || "/botanical-motif.svg",
    pillars: (i.pillars ?? ["Awareness", "Lightness", "Movement"]) as LocalInitiative["pillars"],
    schedule: i.schedule || "Regular schedule",
    location: i.location || "CEAPS Hall",
    highlights: i.highlights ?? [],
    departmentAffiliation: i.department_affiliation,
  };
}

// ---------------------------------------------------------------------------
// Helper: convert DB Resource → local ResourceItem shape for the UI
// ---------------------------------------------------------------------------
function dbResourceToLocal(r: Resource): ResourceItem {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: (r.category as ResourceItem["category"]) || "Mental Health Awareness",
    type: (r.resource_type as ResourceItem["type"]) || "Article",
    readTime: r.read_time || "5 min read",
    summary: r.summary,
    author: r.author,
    authorRole: r.author_role || "CEAPS Counselor",
    departmentAffiliation: r.department_affiliation,
    publishedDate: r.published_date,
    tags: r.tags ?? [],
    content: r.content ?? [],
    keyTakeaways: r.key_takeaways ?? [],
    externalUrl: r.external_url ?? undefined,
    downloadUrl: r.download_url ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Fetch events from Supabase → local fallback.
 */
export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [source, setSource] = useState<"loading" | "supabase" | "local">("loading");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const dbEvents = await getEventsFromDB();
        if (!cancelled && dbEvents.length > 0) {
          setEvents(dbEvents.map(dbEventToLocal));
          setSource("supabase");
          return;
        }
      } catch {
        // Supabase not configured — fall through
      }
      if (!cancelled) {
        setEvents(getEvents());
        setSource("local");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { events, source };
}

/**
 * Fetch initiatives from Supabase → local fallback.
 */
export function useInitiatives() {
  const [initiatives, setInitiatives] = useState<LocalInitiative[]>([]);
  const [source, setSource] = useState<"loading" | "supabase" | "local">("loading");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const dbItems = await getInitiativesFromDB();
        if (!cancelled && dbItems.length > 0) {
          setInitiatives(dbItems.map(dbInitiativeToLocal));
          setSource("supabase");
          return;
        }
      } catch {
        // fall through
      }
      if (!cancelled) {
        setInitiatives(getInitiatives());
        setSource("local");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { initiatives, source };
}

/**
 * Fetch resources from Supabase → local fallback.
 */
export function useResources() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [source, setSource] = useState<"loading" | "supabase" | "local">("loading");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const dbItems = await getResourcesFromDB();
        if (!cancelled && dbItems.length > 0) {
          setResources(dbItems.map(dbResourceToLocal));
          setSource("supabase");
          return;
        }
      } catch {
        // fall through
      }
      if (!cancelled) {
        setResources(getResources());
        setSource("local");
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { resources, source };
}
