# Calm Spaces Web Audit

## Executive summary

The Android implementation is the source of truth for product behavior. It includes a production-oriented architecture centered on Supabase Auth, PostgreSQL, RLS, Storage, Edge Functions, and role-based workflows for Student, Peer Listener, and Expert users. The web app must preserve those workflows, not invent a new backend model.

## Source repository audited

- Android reference repo: `Calm-Spaces-Android-Reference`
- Confirmed stack: React Native + Expo Router + TypeScript + TanStack Query + Supabase + Edge Functions + React Context
- Security posture: RLS hardening migrations, storage security migrations, usage of `send-push` and `delete-user-auth` edge functions

## Verified feature inventory

### Student / user experience

- Login, signup, session persistence, password reset, account deletion
- Profile management and role-aware dashboard
- Mood tracking and daily check-ins
- Mood calendar and trend analysis
- Journal entries with privacy protections
- Wellness toolkit: breathing, grounding, focus, movement, gratitude, support
- Creative tools: mandala editor, doodling
- Learning resources and media library
- Bookings with experts and peers
- Peer support / buddy connect
- AI support and chat
- Community posts and moderation patterns
- Emergency / SOS flows
- Notifications and settings

### Peer Listener experience

- Listener dashboard
- Availability / schedule management
- Assigned clients / sessions
- Peer support conversation flows
- Session history and case tracking
- Support workflow and escalation patterns

### Expert experience

- Expert dashboard
- Consultation management
- Client conversations
- Schedule management and availability
- Student / peer support workflows
- Community and notification tools
- Role-specific settings and account management

### Admin experience

- Admin home and management flows
- User listing and type changes
- Platform controls and moderation patterns

## Screen and route inventory from Android app

### Public / auth

- Login and registration flows
- Password reset
- Terms and privacy screens

### Student routes

- `student-home`
- `student-calm`
- `journal`
- `support`
- `message`
- `buddy-connect`
- `peer-screen`
- `peer-schedule`
- `peer-clients`
- `learning`
- `mood-playlists`
- `toolkit-*` activities
- `emergency`
- `student-setting`
- `change-password`

### Expert routes

- `expert-home`
- `expert-client`
- `consultation`
- `expert-chat`
- `schedule`
- `learning`
- `support`
- `mood-playlists`
- `emergency`
- `expert-setting`
- `change-password`

### Admin routes

- `admin-home`
- `admin-setting`
- `location`
- `change-password`

## Backend assets reused

### Databases and RLS patterns

- `profiles`
- `mood_entries`
- `messages`
- `notifications`
- `community_post`
- `expert_schedule`
- `student_schedule`
- `expert_peer_slots`
- `book_request`
- `push_tokens`
- `learning_resources` or equivalent resource tables

### Supabase functions

- `send-push`
- `delete-user-auth`
- booking workflows and legacy API functions such as `book_legacy_session`

### Storage usage

- User media uploads for community content
- User-owned file cleanup before account deletion
- Storage bucket security checks

## Security findings

The Android app includes explicit security hardening guidance and migration files, including:

- production security hardening
- community privacy fix for UUID-based identities
- storage security requirements
- RLS enforcement around mood data, profile data, session access, and messages

The web app must not bypass these protections. The client is untrusted and all sensitive operations must be enforced server-side.

## Missing in this web workspace

This repository did not yet contain the live Calm Spaces app code, Supabase config, or production database credentials. The web implementation therefore must:

1. Use the Android repo as the functional truth set.
2. Reuse the same role model and resource boundaries.
3. Provide a typed web shell that can be connected to the existing Supabase backend.
4. Avoid creating a parallel or fake backend.

## Recommended architecture for the web implementation

- Next.js app router
- Supabase client + typed service layer
- TanStack Query for cache and invalidation
- Role-aware dashboards
- Public marketing pages and authenticated app shell
- Database-first security model with RLS preserved
- Edge Functions reused for push and account deletion workflows

## Conclusion

The web platform is not a visual port of the Android app. It is a second client of the same Supabase backend. The web app should preserve behavior, privacy boundaries, and role protections while improving navigation, clarity, responsiveness, accessibility, and operational readiness.
