// =============================================================================
// C.A.L.M Spaces · Unified Supabase Database Types
// Auto-maps to the unified schema in supabase/migrations/20261019000000_unified_schema.sql
// Supports both Next.js Web Client & React Native / Android Client
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

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

// --------------------------------------------------------------------------
// 1. profiles (Canonical cross-platform user profile)
// --------------------------------------------------------------------------
export interface Profile {
  id: string;
  email: string;
  name: string | null;                     // Android primary
  full_name: string | null;                // Web primary
  username: string | null;
  role: UserRole;                          // Web enum
  type: string;                            // Android string representation
  student_id: string | null;               // Web format
  registration_number: number | null;      // Android format
  department: string | null;               // Web format
  course: string | null;                   // Android format
  year_of_study: string | null;
  phone_number: number | null;
  phone: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  profile_picture_index: number | null;
  bio: string | null;
  is_verified_listener: boolean;
  is_expert: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// 2. mood_entries
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
// 3. journal_entries (Cloud synchronized)
// --------------------------------------------------------------------------
export interface JournalEntry {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  prompt: string | null;
  tags: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export type JournalEntryInsert = Omit<JournalEntry, "id" | "created_at" | "updated_at">;

// --------------------------------------------------------------------------
// 4. community_post
// --------------------------------------------------------------------------
export interface CommunityPost {
  id: string;
  user_id: string;
  prompt: string | null;
  body: string;
  author_alias: string;
  is_anonymous: boolean;
  is_flagged: boolean;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// 5. messaging
// --------------------------------------------------------------------------
export interface Conversation {
  id: string;
  participant_one: string;
  participant_two: string;
  conversation_type: "PEER" | "EXPERT";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

// --------------------------------------------------------------------------
// 6. scheduling & bookings
// --------------------------------------------------------------------------
export interface ExpertSchedule {
  id: string;
  expert_id: string;
  expert_registration_number: number | null;
  expert_name: string;
  date: string;
  start_time: string;
  end_time: string;
  mode: string;
  is_booked: boolean;
  created_at: string;
}

export interface StudentSchedule {
  id: string;
  peer_id: string;
  peer_registration_number: number | null;
  peer_name: string;
  date: string;
  start_time: string;
  end_time: string;
  mode: string;
  is_booked: boolean;
  created_at: string;
}

export interface BookRequest {
  id: string;
  user_id: string;
  provider_id: string;
  provider_type: "EXPERT" | "PEER";
  slot_id: string;
  booking_date: string;
  booking_time: string;
  mode: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// 7. notifications & push tokens
// --------------------------------------------------------------------------
export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  category: string;
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface PushToken {
  id: string;
  user_id: string;
  token: string;
  platform: "ANDROID" | "IOS" | "WEB";
  created_at: string;
  updated_at: string;
}

// --------------------------------------------------------------------------
// 8. initiatives
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
// 9. events & registrations
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

// --------------------------------------------------------------------------
// 10. resources
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
// 11. contact & newsletter
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

export interface NewsletterSubscription {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

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

export type EventRegistrationInsert = Omit<EventRegistration, "id" | "created_at">;

export type ContactSubmissionInsert = Omit<ContactSubmission, "id" | "created_at" | "status" | "internal_notes"> & {
  status?: string;
  internal_notes?: string | null;
};

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

