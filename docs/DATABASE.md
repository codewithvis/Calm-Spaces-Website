# Calm Spaces Database Notes

## Existing backend foundation

The Android implementation uses Supabase as the system of record with direct tables, RLS, storage buckets, and edge functions. The web app must reuse that structure and not create duplicate tables unless a real compatibility gap is identified.

## Tables referenced by the Android app

- profiles
- mood_entries
- messages
- notifications
- community_post
- expert_schedule
- student_schedule
- expert_peer_slots
- book_request
- push_tokens
- storage objects under ownership-scoped bucket rules

## Security constraints to preserve

- RLS on profile and private records
- ownership checks for user data
- session membership validation for conversations
- expert and listener authorization checks
- storage bucket isolation

## Migration discipline

Any changes must be made through SQL migrations and versioned in Supabase. Do not modify production tables manually without a migration.
