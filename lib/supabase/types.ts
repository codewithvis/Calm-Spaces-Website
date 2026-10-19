// =============================================================================
// C.A.L.M Spaces · Supabase Database Types
// Auto-maps to the schema in docs/supabase_schema.sql
// =============================================================================

export type UserRole =
  | "STUDENT"
  | "PEER_LISTENER"
  | "EXPERT"
  | "CONTENT_EDITOR"
  | "EVENT_MANAGER"
  | "ADMIN"
  | "SUPER_ADMIN";

export type ContentStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
export type EventStatus =
  | "UPCOMING"
  | "REGISTRATION_OPEN"
  | "FULL"
  | "COMPLETED"
  | "CANCELLED";

// --------------------------------------------------------------------------
// profiles
// --------------------------------------------------------------------------
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  student_id: string | null;
  department: string | null;
  year_of_study: string | null;
  role: UserRole;
  avatar_url: string | null;
  bio: string | null;
  is_verified_listener: boolean;
  is_expert: boolean;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// mood_entries
// --------------------------------------------------------------------------
export interface MoodEntry {
  id: string;
  user_id: string;
  user_type: string;
  mood_emoji: string;
  mood_label: string;
  entry_date: string;
  entry_time: string;
  scheduled_label: string;
  schedule_key: string;
  notes: string | null;
  created_at: string;
}

export type MoodEntryInsert = Omit<MoodEntry, "id" | "created_at">;

// --------------------------------------------------------------------------
// initiatives
// --------------------------------------------------------------------------
export interface Initiative {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string | null;
  description: string;
  full_description: string | null;
  status: ContentStatus;
  cover_image_url: string | null;
  pillars: string[];
  schedule: string | null;
  location: string | null;
  highlights: string[];
  department_affiliation: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// events
// --------------------------------------------------------------------------
export interface Event {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  full_description: string | null;
  event_date: string;
  event_time: string;
  location: string;
  facilitator: string;
  facilitator_role: string | null;
  capacity: number;
  registered_count: number;
  status: EventStatus;
  cover_image_url: string | null;
  tags: string[];
  department_affiliation: string;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// event_registrations
// --------------------------------------------------------------------------
export interface EventRegistration {
  id: string;
  event_id: string;
  student_name: string;
  student_email: string;
  student_id: string;
  faculty_department: string;
  notes: string | null;
  user_id: string | null;
  created_at: string;
}

export type EventRegistrationInsert = Omit<EventRegistration, "id" | "created_at">;

// --------------------------------------------------------------------------
// resources
// --------------------------------------------------------------------------
export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;
  resource_type: string;
  read_time: string | null;
  summary: string;
  author: string;
  author_role: string | null;
  department_affiliation: string;
  published_date: string;
  status: ContentStatus;
  tags: string[];
  content: string[];
  key_takeaways: string[];
  download_url: string | null;
  external_url: string | null;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// contact_submissions
// --------------------------------------------------------------------------
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  subject: string;
  message: string;
  status: string;
  internal_notes: string | null;
  created_at: string;
}

export type ContactSubmissionInsert = Omit<ContactSubmission, "id" | "created_at" | "status" | "internal_notes">;

// --------------------------------------------------------------------------
// newsletter_subscriptions
// --------------------------------------------------------------------------
export interface NewsletterSubscription {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

// --------------------------------------------------------------------------
// audit_logs
// --------------------------------------------------------------------------
export interface AuditLog {
  id: string;
  actor: string;
  actor_id: string | null;
  action: string;
  entity: string;
  entity_id: string;
  details: string | null;
  created_at: string;
}

// --------------------------------------------------------------------------
// Generic DB response helpers
// --------------------------------------------------------------------------
export type DbResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string; code?: string } };

export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
};
