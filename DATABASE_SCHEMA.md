# C.A.L.M Spaces — Unified Database Schema Specification

## 1. Schema Overview

The database is built on PostgreSQL 15 within Supabase. The migration script located at:
`supabase/migrations/20261019000000_unified_schema.sql` establishes a single source of truth accommodating:
- Next.js Web Application
- Native Android / React Native Reference Client
- Admin & Faculty Clinical Dashboards
- Peer & Expert Workspaces

---

## 2. Table Definitions & Column Mappings

### 2.1 `public.profiles`
Canonical user profile table linked 1:1 with `auth.users.id`. Accommodates both Web and Mobile column conventions through an automated bidirectional trigger.

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | No | PK, FK `auth.users(id)` ON DELETE CASCADE | Canonical User UUID |
| `email` | `TEXT` | No | UNIQUE | User institutional or personal email |
| `name` | `TEXT` | Yes | NULL | Primary field for Android / React Native |
| `full_name` | `TEXT` | Yes | NULL | Primary field for Web application |
| `username` | `TEXT` | Yes | UNIQUE | Public display alias |
| `role` | `user_role` (ENUM) | No | `'STUDENT'` | Canonical role: `STUDENT`, `PEER_LISTENER`, `EXPERT`, `CONTENT_EDITOR`, `EVENT_MANAGER`, `ADMIN`, `SUPER_ADMIN` |
| `type` | `TEXT` | No | `'student'` | Mobile representation of user role |
| `student_id` | `TEXT` | Yes | NULL | Web student identification string |
| `registration_number` | `BIGINT` | Yes | NULL | Mobile registration numeric ID |
| `department` | `TEXT` | Yes | NULL | Academic department (Web) |
| `course` | `TEXT` | Yes | NULL | Degree or program name (Mobile) |
| `year_of_study` | `TEXT` | Yes | NULL | Year of study (e.g. "Year 2", "Semester 4") |
| `phone_number` | `BIGINT` | Yes | NULL | Mobile phone number format |
| `phone` | `TEXT` | Yes | NULL | Web E.164 phone string |
| `date_of_birth` | `DATE` | Yes | NULL | User date of birth |
| `avatar_url` | `TEXT` | Yes | NULL | URL to uploaded avatar in `avatars` bucket |
| `profile_picture_index`| `INTEGER` | Yes | 0 | Avatar asset selector index for mobile app |
| `bio` | `TEXT` | Yes | NULL | Personal bio / listener qualifications |
| `is_verified_listener` | `BOOLEAN` | No | `FALSE` | Peer listener certification flag |
| `is_expert` | `BOOLEAN` | No | `FALSE` | Psychological expert / faculty counselor flag |
| `is_active` | `BOOLEAN` | No | `TRUE` | Account operational status |
| `created_at` | `TIMESTAMPTZ`| No | `NOW()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ`| No | `NOW()` | Automatic touch timestamp |

---

### 2.2 `public.mood_entries`
Daily mood check-ins across mobile and web.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` (PK) | Auto-generated UUID |
| `user_id` | `UUID` (FK) | Reference to `profiles(id)` ON DELETE CASCADE |
| `user_type` | `TEXT` | User type at time of check-in (`student`, `peer`, etc.) |
| `mood_emoji` | `TEXT` | Mood representation character (e.g. `😊`, `😔`, `🧘`) |
| `mood_label` | `TEXT` | Categorical label (`Calm`, `Reflective`, `Overwhelmed`, `Grounded`) |
| `entry_date` | `DATE` | Date of submission |
| `entry_time` | `TIME` | Time of submission |
| `scheduled_label` | `TEXT` | Slot period (`Morning`, `Afternoon`, `Evening`) |
| `schedule_key` | `TEXT` | Composite key for scheduling |
| `notes` | `TEXT` | Optional personal notes |
| `created_at` | `TIMESTAMPTZ`| Check-in timestamp |

---

### 2.3 `public.journal_entries`
Cloud-synchronized private reflections replacing local-only AsyncStorage/localStorage.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` (PK) | Auto-generated UUID |
| `user_id` | `UUID` (FK) | Reference to `profiles(id)` ON DELETE CASCADE |
| `title` | `TEXT` | Optional journal prompt or title |
| `content` | `TEXT` | Encrypted/Private reflection text |
| `prompt` | `TEXT` | Suggested mindfulness question |
| `tags` | `TEXT[]` | Tags (e.g. `['Gratitude', 'Academic']`) |
| `is_favorite` | `BOOLEAN` | Starred reflection |
| `created_at` | `TIMESTAMPTZ`| Timestamp |
| `updated_at` | `TIMESTAMPTZ`| Auto-updated timestamp |

---

### 2.4 `public.community_post`
Anonymous campus reflection wall.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` (PK) | Auto-generated UUID |
| `user_id` | `UUID` (FK) | Reference to `profiles(id)` ON DELETE SET NULL |
| `prompt` | `TEXT` | Reflection topic |
| `body` | `TEXT` | Post content |
| `author_alias` | `TEXT` | Anonymous pseudonym (e.g. "Warm Meadow", "Quiet River") |
| `likes_count` | `INTEGER` | Heart counter |
| `is_flagged` | `BOOLEAN` | Moderation trigger |
| `flag_reason` | `TEXT` | Reason if flagged |
| `created_at` | `TIMESTAMPTZ`| Post timestamp |

---

### 2.5 `public.book_request` (Appointments)
Unified booking engine for peer support circles and expert clinical consultations.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` (PK) | Auto-generated UUID |
| `user_id` | `UUID` (FK) | Student requesting consultation (`profiles.id`) |
| `provider_id` | `UUID` (FK) | Peer listener or Expert (`profiles.id`) |
| `provider_type` | `TEXT` | `'PEER'` or `'EXPERT'` |
| `slot_id` | `TEXT` | Specific schedule slot identifier |
| `booking_date` | `DATE` | Scheduled date |
| `booking_time` | `TEXT` | Slot time window (e.g. "14:00 - 14:45") |
| `mode` | `TEXT` | `'online'` or `'offline'` (CEAPS Hall, SGT University) |
| `status` | `TEXT` | `'PENDING'`, `'CONFIRMED'`, `'CANCELLED'`, `'COMPLETED'` |
| `notes` | `TEXT` | Private session intake notes |
| `created_at` | `TIMESTAMPTZ`| Submission timestamp |

---

### 2.6 Schedules & Messaging
* **`public.expert_schedule`**: Faculty counselor working windows and weekly availability.
* **`public.student_schedule`**: Certified peer listener listening circle slots.
* **`public.conversations` & `public.messages`**: 1:1 secure peer chat sessions.
* **`public.notifications`**: Cross-platform system and session alerts.
* **`public.push_tokens`**: Mobile FCM token registry for background push notifications.

---

### 2.7 CMS & Administrative Tables
* **`public.initiatives`**: Campus mental health programs (Colour the Chaos, Mindful Mornings, etc.).
* **`public.events` & `public.event_registrations`**: Interactive workshop listings and capacity tracking.
* **`public.resources`**: Psychological articles, decompression audio guides, and toolkits.
* **`public.contact_submissions`**: External student & faculty inquiries.
* **`public.newsletter_subscriptions`**: Email digest recipients.
* **`public.audit_logs`**: Administrative action trail for compliance.

---

## 3. Database Functions & Triggers

### 3.1 Dual-Field Synchronization Trigger (`sync_profile_dual_fields`)
Executes `BEFORE INSERT OR UPDATE` on `public.profiles`:
```sql
CREATE OR REPLACE FUNCTION sync_profile_dual_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Synchronize Name
  IF NEW.full_name IS NOT NULL AND NEW.name IS NULL THEN
    NEW.name := NEW.full_name;
  ELSIF NEW.name IS NOT NULL AND NEW.full_name IS NULL THEN
    NEW.full_name := NEW.name;
  END IF;

  -- Synchronize Role <-> Type
  IF NEW.role IS NOT NULL AND NEW.type IS NULL THEN
    NEW.type := LOWER(NEW.role::text);
  ELSIF NEW.type IS NOT NULL AND NEW.role IS NULL THEN
    NEW.role := UPPER(NEW.type)::user_role;
  END IF;

  -- Synchronize Course <-> Department
  IF NEW.department IS NOT NULL AND NEW.course IS NULL THEN
    NEW.course := NEW.department;
  ELSIF NEW.course IS NOT NULL AND NEW.department IS NULL THEN
    NEW.department := NEW.course;
  END IF;

  -- Synchronize Student ID <-> Registration Number
  IF NEW.registration_number IS NOT NULL AND NEW.student_id IS NULL THEN
    NEW.student_id := NEW.registration_number::text;
  ELSIF NEW.student_id IS NOT NULL AND NEW.registration_number IS NULL THEN
    IF NEW.student_id ~ '^[0-9]+$' THEN
      NEW.registration_number := NEW.student_id::bigint;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 3.2 Automated Auth User Provisioning (`handle_new_user`)
Executes `AFTER INSERT` on `auth.users`:
Extracts user metadata and automatically inserts a linked profile row with fallback names and default role `'STUDENT'`.
