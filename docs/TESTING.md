# Calm Spaces Testing Strategy

## Required checks

- auth flow
- protected routes
- mood tracking
- journal editing and deletion
- booking and cancellation rules
- resource browsing
- AI assistant safety messaging
- buddy support flows
- expert chat access
- unauthorized access denials

## Test categories

- unit tests for validation and permission helpers
- component tests for forms and dashboards
- integration tests for Supabase queries and role paths
- end-to-end smoke tests for critical user journeys

## Security matrix expectations

- User A cannot read User B mood history
- User A cannot edit User B appointments
- User A cannot read User B journal entries
- user access must be denied unless explicitly permitted by policy
