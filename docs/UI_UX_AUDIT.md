# Calm Spaces UI/UX Audit

## Current strengths

- The app already has a coherent Next.js App Router foundation and a shared shell.
- Public pages and authenticated route placeholders exist across the major product areas.
- The Android reference and Supabase security model are documented as the functional source of truth.
- The current build is stable and statically generates the existing route set.

## Main experience gaps

### 1. The homepage feels like a feature-led SaaS landing page
The current hero leads with mood tracking, peer support, and mental wellness as product categories. It does not begin with recognition, emotional permission, or a low-pressure way to explore.

**Redesign response:** lead with “A little space for you,” an optional public mood check-in, and “What would feel helpful right now?” discovery.

### 2. The visual language is too purple and dashboard-like
The existing CSS relies on a violet primary and generic white cards. The design notes also describe deep indigo/violet as the primary, which conflicts with the new brief’s warmer natural direction.

**Redesign response:** move to sage, warm sand, muted lavender-blue, and deep green charcoal; reserve color for meaning rather than decoration.

### 3. The app shell exposes a flat list of features
Home, mood, journal, wellness, AI, buddy support, experts, appointments, profile, settings, and safety are presented as one undifferentiated list. This increases cognitive load and makes the product feel like a collection of modules.

**Redesign response:** group navigation into Your space, Explore, Support, and More. Use “Your space” and human copy instead of “dashboard.”

### 4. The current dashboard overemphasizes metrics
Metric cards and a chart make the authenticated experience feel operational rather than personal. The user’s next emotional need is not immediately clear.

**Redesign response:** use an emotionally framed home with a check-in, gentle weekly pattern, a single recommendation, continuation, and clear human support.

### 5. Discovery is not yet a first-class interaction
The current public pages require users to understand the feature taxonomy before choosing a path.

**Redesign response:** add time-based and need-based discovery paths that route to existing feature surfaces without requiring login.

### 6. Mobile navigation and accessibility are incomplete
The shared shell currently has a desktop-only sidebar and no mobile bottom navigation. Focus, reduced motion, theme preferences, and semantic interactive states are not yet represented in the shared system.

**Redesign response:** add responsive bottom navigation, visible focus styles, reduced-motion tokens, and accessible labels while preserving route semantics.

## Priority order

1. Shared tokens, typography, buttons, surfaces, and navigation.
2. Homepage emotional flow and public discovery.
3. Authenticated “Your space” home.
4. Mood, journal, wellness, explore, support, and safety interaction states.
5. Public information architecture, help center, community guidelines, and professional/institution pages.
6. Supabase auth/data wiring and role-specific production workflows.

## Non-negotiables

- Do not imply diagnosis or clinical conclusions.
- Do not expose private journal, mood, or support data in global search or analytics.
- Do not replace existing Supabase, RLS, Storage, or Edge Function contracts.
- Do not add streaks, leaderboards, guilt-based reminders, or fake trust claims.
- Keep urgent safety access available without making the whole interface alarming.
