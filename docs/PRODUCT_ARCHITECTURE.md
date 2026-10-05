# Calm Spaces Product Architecture

## Personas

- **Student/member:** wants a private place to check in, reflect, learn, and reach support.
- **Peer listener:** offers human support within clear availability, privacy, and escalation boundaries.
- **Expert:** provides professional consultations, resources, and scheduled support.
- **Administrator:** moderates and manages the platform without unnecessary access to sensitive personal wellbeing data.

## Experience hierarchy

### Public

Home, About, How it works, Features, For students, For institutions, For professionals, Resources, Help center, Safety, Privacy, Terms, Contact, and Community guidelines.

### Authenticated member

- **Your space:** Home, Check-in, Your patterns, Journal.
- **Explore:** Wellness, Create, Explore/Resources, Community, Saved.
- **Support:** Talk Space, Buddy Connect, Experts, Appointments.
- **More:** Notifications, Settings, Safety.

### Role extensions

Peer listeners and experts retain the same calm shell but receive role-specific work areas for availability, conversations, appointments, and support workflows. Admin routes remain a separate management experience.

## Core journeys

### First visit

1. Arrive at a welcoming emotional statement.
2. Try an optional mood choice without authentication.
3. Choose what would feel helpful: talk, slow down, understand, create, learn, or guided discovery.
4. Learn what Calm Spaces is and how privacy works.
5. Join or continue exploring.

### Returning member

1. Open **Your space**.
2. See a warm greeting and optional check-in.
3. Continue an unfinished journal, resource, or activity.
4. Receive one optional recommendation.
5. Reach peer or expert support without hunting through a feature list.

### Support discovery

1. Choose human, peer, expert, or reflective support.
2. See availability and boundaries clearly.
3. Select a simple appointment or conversation path.
4. Preserve cancellation and privacy expectations.

## Information architecture principles

- Organize around user needs, not backend tables.
- Keep private data in its own contextual surfaces.
- Treat discovery as a global product capability.
- Keep safety one step away from every major experience.
- Use optional language and avoid diagnostic inference.
- Keep future institution and localization support possible without coupling UI to one role.
