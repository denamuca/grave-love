# API Outline

This describes a pragmatic REST API suitable for a Node/Nest or Supabase Edge Functions backend. Use JWT auth; attach role claims; all write endpoints idempotent via `Idempotency-Key` header where payments/orders are involved.

## Auth
- POST `/auth/sign-in` — email/phone + code/SSO exchange → JWT
- GET `/auth/me` — profile + roles
- PATCH `/profiles/:id` — update profile, notification prefs

## Memorials
- POST `/memorials` — create memorial
- GET `/memorials/:id` — get memorial (public view respects settings)
- PATCH `/memorials/:id` — update memorial (family editor/admin)
- POST `/memorials/:id/invite` — invite family member
- GET `/memorials/:id/visits` — paginated

## QR / Visits
- POST `/qr-tags` — generate new tag (code minted server-side)
- POST `/qr-tags/:code/link` — link to memorial
- GET `/qr/:code` — resolve to memorial (public, no auth)
- POST `/memorials/:id/visit` — anonymous or authed visit check-in

## Posts / Media
- POST `/media/upload-url` — returns signed URL (PUT) + metadata id
- POST `/posts` — create post or candle/message
- GET `/memorials/:id/posts` — paginated timeline
- PATCH `/posts/:id` — hide/delete (family admin), report
- POST `/posts/:id/report` — public report

## Services
- GET `/service-types` — catalog
- POST `/orders` — create service order
- GET `/orders/:id` — order status/details
- PATCH `/orders/:id` — cancel by family (when allowed)

Provider
- GET `/provider/jobs?filter=today|upcoming` — assigned jobs
- GET `/provider/jobs/:id` — job detail
- POST `/provider/jobs/:id/proofs` — upload proof refs (media ids) + timestamps + optional GPS
- POST `/provider/jobs/:id/complete` — mark done

## Subscriptions (v1.0)
- POST `/subscriptions` — create subscription
- GET `/subscriptions/:id`
- PATCH `/subscriptions/:id` — pause/resume/cancel
- POST `/subscriptions/:id/skip` — skip next

## Reminders
- GET `/memorials/:id/reminders` — current user’s reminders
- POST `/memorials/:id/reminders` — create/update
- DELETE `/reminders/:id`

## Notifications
- GET `/notifications` — list, unread first
- POST `/notifications/:id/read`

## Moderation (v1.0)
- GET `/moderation/queue` — pending items
- POST `/moderation/items/:id/approve`
- POST `/moderation/items/:id/reject`

## Payments & Webhooks
- POST `/payments/intent` — create Stripe PaymentIntent for order
- POST `/webhooks/stripe` — handle payment events (idempotent)
- POST `/webhooks/media-moderation` — optional provider callback

## Request/Response Examples

POST /orders
- body: { memorial_id, service_type_id, scheduled_date, time_window, notes, payment_intent_id }
- response: { id, status: "created" | "scheduled", summary }

POST /provider/jobs/:id/complete
- body: { proofs: [{ type: "before"|"after"|"delivery", media_id, captured_at, gps? }], notes }
- response: { id, status: "completed", delivered_at }

Security
- JWT with role claims; verify resource access via ownership/membership.
- Signed URLs for media upload/download; scrub EXIF on ingest; virus scan if feasible.
- Idempotency-Key required for POSTs that create orders or charges.

