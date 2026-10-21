# C.A.L.M Spaces — Supabase Setup & Operations Guide

## 1. Project Configuration Overview

The C.A.L.M Spaces ecosystem utilizes a single Supabase project acting as the source of truth for Web, Mobile, and Administration.

* **Database Engine**: PostgreSQL 15+ with `pgcrypto` and `uuid-ossp` extensions.
* **Schema Migration**: `supabase/migrations/20261019000000_unified_schema.sql` contains the complete idempotent database DDL.

---

## 2. Environment Variables Specification

Place these environment variables in your deployment environments (`.env.local` for local development, Vercel for production, React Native / Android `.env`):

### Web Application (`.env.local`)
```env
# Supabase Core Connection (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Privileged Administrative Operations (Server-Side Only - NEVER expose to browser)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application Metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Mobile Application (`android/app/build.gradle` or `.env`)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3. Authentication Settings

In the **Supabase Dashboard -> Authentication -> Settings**:

1. **Email Auth**:
   * Enable Email Signup: `ON`
   * Confirm email: Recommended `ON` for production; `OFF` for instant campus registration.
   * Secure email change: `ON`
2. **Redirect URLs**:
   * Web: `http://localhost:3000/auth/callback`, `https://calmspaces.sgtuniversity.ac.in/auth/callback`
   * Mobile: `calmspaces://auth-callback`
3. **Password Requirements**:
   * Minimum length: 8 characters
4. **Trigger for Profile Generation**:
   * The migration automatically provisions `public.on_auth_user_created` trigger on `auth.users` to generate a canonical `public.profiles` row upon signup with the default role `STUDENT`.

---

## 4. Storage Buckets & Policies

Create the following three buckets in **Supabase Dashboard -> Storage**:

| Bucket Name | Public Access | Allowed MIME Types | Max Size | Purpose |
|---|---|---|---|---|
| `avatars` | **Public** | `image/png`, `image/jpeg`, `image/webp` | 5 MB | Student, listener, and expert profile photos |
| `resources` | **Public** | `application/pdf`, `image/*`, `audio/*` | 50 MB | Well-being articles, guides, and audio tracks |
| `journals` | **Private** | `image/*`, `application/pdf` | 10 MB | Sensitive journal voice notes & attachments |

### Storage Security Policies:
* **Avatars**: Anyone can view (`SELECT`). Authenticated users can insert/update only within their folder: `(auth.uid() = (storage.foldername(name))[1]::uuid)`.
* **Resources**: Anyone can view (`SELECT`). Only users with `role IN ('ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR')` can insert or delete.
* **Journals**: Only the owner `(auth.uid() = (storage.foldername(name))[1]::uuid)` can read or write.

---

## 5. Realtime Configuration

The following tables are added to the `supabase_realtime` publication:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post;
ALTER PUBLICATION supabase_realtime ADD TABLE public.book_request;
```

### Realtime Channels:
* `realtime:notifications:user_id=eq.{USER_UUID}`: Realtime alerts on peer appointments and replies.
* `realtime:community_post:all`: Instant live reflection wall updates.
* `realtime:events:id=eq.{EVENT_ID}`: Realtime capacity counter on workshop registration.

---

## 6. Supabase Edge Functions

For high-privilege operations and scheduled tasks:

* **`notify-fcm`**: Triggered via database webhook on `public.notifications` INSERT; looks up `public.push_tokens` and dispatches via Firebase Cloud Messaging.
* **`appointment-reminder`**: Scheduled cron checking `public.book_request` where `booking_date = CURRENT_DATE` and delivering reminders to students and counselors.
