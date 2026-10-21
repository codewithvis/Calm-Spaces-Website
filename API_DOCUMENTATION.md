# C.A.L.M Spaces — Centralized REST API Documentation (`/api/v1`)

## 1. Overview & Authentication Specification

All ecosystem clients (Next.js Web Portal, Android / React Native mobile client, and Admin panels) communicate through a unified API layer under `/api/v1`.

### Authentication Methods Supported:
1. **Web**: Next.js encrypted HTTP-only session cookies handled automatically via `@supabase/ssr`.
2. **Mobile / Native**: Standard `Authorization` HTTP header with Bearer token:
   ```http
   Authorization: Bearer <supabase_jwt_access_token>
   ```

### Standard Response Envelope:
* **Success**: HTTP 200/201 with `{ "success": true, ...data }`
* **Unauthorized**: HTTP 401 with `{ "error": "Unauthorized" }`
* **Validation Failure**: HTTP 400 with `{ "error": "<reason>" }`
* **Configuration / Offline Fallback**: HTTP 503 with structured graceful fallback payload.

---

## 2. API Endpoints

### 2.1 Health Check
* **`GET /api/v1/health`**
* **Access**: Public
* **Response**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-10-19T16:16:42.059Z",
    "service": "C.A.L.M Spaces Centralized Unified API",
    "version": "3.0.0",
    "database": "connected"
  }
  ```

---

### 2.2 Profile Management
* **`GET /api/v1/profile`**
  * **Access**: Authenticated (Bearer Token or Web Cookie)
  * **Response**: `{ "success": true, "profile": ProfileObject }`
* **`PUT /api/v1/profile`**
  * **Access**: Authenticated (Owner)
  * **Body**:
    ```json
    {
      "name": "Aarav Sharma",
      "department": "Department of Clinical Psychology",
      "course": "B.Sc. Clinical Psychology",
      "phone": "+91 98765 43210",
      "bio": "Certified Peer Listener & 3rd-year undergraduate",
      "profile_picture_index": 3
    }
    ```
  * **Response**: `{ "success": true, "profile": UpdatedProfileObject }`

---

### 2.3 Mood Check-ins
* **`GET /api/v1/mood?limit=14`**
  * **Access**: Authenticated
  * **Response**: `{ "success": true, "entries": [ MoodEntryObject, ... ] }`
* **`POST /api/v1/mood`**
  * **Access**: Authenticated
  * **Body**:
    ```json
    {
      "mood_emoji": "🧘",
      "mood_label": "Calm",
      "scheduled_label": "Morning",
      "notes": "Starting the day with mindfulness"
    }
    ```
  * **Response**: `{ "success": true, "entry": CreatedMoodEntry }`

---

### 2.4 Journal Reflections
* **`GET /api/v1/journal`**
  * **Access**: Authenticated (Strict RLS: Only user's own reflections)
  * **Response**: `{ "success": true, "entries": [ JournalEntryObject, ... ] }`
* **`POST /api/v1/journal`**
  * **Access**: Authenticated
  * **Body**:
    ```json
    {
      "title": "Unwinding After Midterms",
      "content": "Today felt lighter. Took a long walk near the campus gardens.",
      "prompt": "What brought you unexpected peace today?",
      "tags": ["Gratitude", "Midterms"]
    }
    ```
  * **Response**: `{ "success": true, "entry": CreatedJournalEntry }`
* **`DELETE /api/v1/journal?id={ENTRY_UUID}`**
  * **Access**: Authenticated (Owner only)
  * **Response**: `{ "success": true, "message": "Journal entry deleted" }`

---

### 2.5 Community Wall
* **`GET /api/v1/community?limit=30`**
  * **Access**: Public / Authenticated
  * **Response**: `{ "success": true, "posts": [ CommunityPostObject, ... ] }`
* **`POST /api/v1/community`**
  * **Access**: Authenticated
  * **Body**:
    ```json
    {
      "body": "Remember to take breaks between revision blocks. You are doing enough.",
      "prompt": "A small win worth noticing today",
      "author_alias": "Gentle Forest"
    }
    ```
  * **Response**: `{ "success": true, "post": CreatedPostObject }`

---

### 2.6 Appointments & Consultations
* **`GET /api/v1/appointments`**
  * **Access**: Authenticated (Returns sessions where user is either client or provider)
  * **Response**: `{ "success": true, "appointments": [ BookRequestObject, ... ] }`
* **`POST /api/v1/appointments`**
  * **Access**: Authenticated (Student)
  * **Body**:
    ```json
    {
      "provider_id": "00000000-0000-0000-0000-000000000002",
      "provider_type": "PEER",
      "booking_date": "2026-10-24",
      "booking_time": "14:00 - 14:45",
      "mode": "online",
      "notes": "Stress management discussion"
    }
    ```
  * **Response**: `{ "success": true, "appointment": BookRequestObject }`

---

### 2.7 Notifications
* **`GET /api/v1/notifications`**
  * **Access**: Authenticated (Returns unread and recent notifications for user)
  * **Response**: `{ "success": true, "notifications": [ NotificationObject, ... ] }`
* **`PUT /api/v1/notifications`**
  * **Access**: Authenticated
  * **Body (Single)**: `{ "id": "{NOTIFICATION_UUID}" }`
  * **Body (Bulk)**: `{ "all": true }`
  * **Response**: `{ "success": true, "message": "Notification marked as read" }`
