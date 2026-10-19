// =============================================================================
// C.A.L.M Spaces · Unified Data Provider
// Tries Supabase when configured, falls back to local mock arrays.
// =============================================================================

import type { Event, Initiative, Resource } from "@/lib/supabase/types";

/**
 * Returns true if Supabase environment variables are set.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );
}

// ---------------------------------------------------------------------------
// Map local mock shapes → DB shapes (best-effort normalisation)
// ---------------------------------------------------------------------------

/**
 * Convert a local EventItem to the DB Event shape.
 */
export function normaliseLocalEvent(e: {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  facilitator: string;
  facilitatorRole: string;
  capacity: number;
  registeredCount: number;
  status: string;
  coverImage: string;
  tags: string[];
  departmentAffiliation: string;
}): Event {
  const statusMap: Record<string, Event["status"]> = {
    Upcoming: "UPCOMING",
    "Registration Open": "REGISTRATION_OPEN",
    Full: "FULL",
    Past: "COMPLETED",
    Cancelled: "CANCELLED",
  };

  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    category: e.category,
    description: e.description,
    full_description: e.fullDescription,
    event_date: e.date,
    event_time: e.time,
    location: e.location,
    facilitator: e.facilitator,
    facilitator_role: e.facilitatorRole,
    capacity: e.capacity,
    registered_count: e.registeredCount,
    status: statusMap[e.status] ?? "UPCOMING",
    cover_image_url: e.coverImage,
    tags: e.tags,
    department_affiliation: e.departmentAffiliation,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Convert a local Initiative to the DB Initiative shape.
 */
export function normaliseLocalInitiative(i: {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  fullDescription: string;
  status: string;
  coverImage: string;
  pillars: string[];
  schedule: string;
  location: string;
  highlights: string[];
  departmentAffiliation: string;
}): Initiative {
  const statusMap: Record<string, Initiative["status"]> = {
    Active: "PUBLISHED",
    Upcoming: "REVIEW",
    Seasonal: "PUBLISHED",
    Completed: "ARCHIVED",
  };

  return {
    id: i.id,
    slug: i.slug,
    title: i.title,
    category: i.category,
    tagline: i.tagline,
    description: i.description,
    full_description: i.fullDescription,
    status: statusMap[i.status] ?? "PUBLISHED",
    cover_image_url: i.coverImage,
    pillars: i.pillars,
    schedule: i.schedule,
    location: i.location,
    highlights: i.highlights,
    department_affiliation: i.departmentAffiliation,
    display_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Convert a local ResourceItem to the DB Resource shape.
 */
export function normaliseLocalResource(r: {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  readTime: string;
  summary: string;
  author: string;
  authorRole: string;
  departmentAffiliation: string;
  publishedDate: string;
  tags: string[];
  content: string[];
  keyTakeaways: string[];
  externalUrl?: string;
  downloadUrl?: string;
}): Resource {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    resource_type: r.type,
    read_time: r.readTime,
    summary: r.summary,
    author: r.author,
    author_role: r.authorRole,
    department_affiliation: r.departmentAffiliation,
    published_date: r.publishedDate,
    status: "PUBLISHED",
    tags: r.tags,
    content: r.content,
    key_takeaways: r.keyTakeaways,
    external_url: r.externalUrl ?? null,
    download_url: r.downloadUrl ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
