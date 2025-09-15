# Architecture & Stack

## Frontend (Mobile)
- Expo React Native (TypeScript)
- Expo Router for navigation and deep link handling
- Expo Camera (QR) and optional NFC API
- Expo Notifications for push; background tasks for scheduled local reminders
- React Query or SWR for data fetching; Zustand/Context for light state

## Backend Option A (Fastest: Supabase)
- Supabase Postgres + Row Level Security (RLS) for permissions
- Supabase Auth (email/phone, Apple/Google)
- Supabase Storage for media (with public/private buckets)
- Edge Functions for business logic (orders, webhooks, moderation)
- Cron for reminders + subscription scheduling
- Stripe for payments (PaymentIntent) and Stripe Connect for provider payouts (v1.0)

Pros: shipping speed, built-in auth/storage, SQL access, cron. Cons: vendor coupling, custom RLS needed.

## Backend Option B (Custom Node)
- Node.js + NestJS/Express, Postgres (via Prisma/TypeORM)
- S3-compatible storage (e.g., Backblaze/S3) + CloudFront CDN
- Redis for jobs/rate limiting; BullMQ for queues
- Stripe (payments + Connect)
- Cloud scheduler/cron (e.g., Cloud Run + Cloud Scheduler)

Pros: full control. Cons: more infra to manage.

## Key Flows

Auth
- Sign in via email/phone OTP or SSO. On first login, require role selection.
- Token contains role claims. Expo Router guards route groups.

QR/NFC Scanning
- Physical tag encodes universal link `https://app.gravelove.com/m/:slug`.
- App handles link and routes to `/(family|public)/memorial/[id]`.
- On scan, show “I visited” check-in; if provider with assigned job for this memorial on this day → deep link to job.

Orders & Proof
- Family places order → Stripe PaymentIntent created → confirm/authorize.
- Provider sees assigned job; must upload required before/after photos; optional GPS captured at proof time.
- Completion updates order status; family receives notification with photo proof.

Subscriptions (v1.0)
- Billing via Stripe subscriptions or scheduled PaymentIntents.
- Cron enqueues next service task; provider assignment created; notifications sent.

Reminders
- Per-user schedules stored; daily cron computes today’s reminders by timezone and pushes notifications.

Moderation (v1.0)
- All media/messages default to approved for family; public posts go to pending or soft-allow with report/flag.
- Queue for admin review; automated nudity/violence filters optional (e.g., AWS Rekognition, Hive).

Trust & Privacy
- EXIF scrubbing on media ingest; store only minimal capture time and optional GPS for proof-only media.
- Signed URLs; short-lived; thumbnails via transform service if available.
- Audit logs for moderation and provider actions.

## Mobile Project Structure (Expo Router)
- `app/(auth)/*` — onboarding, sign-in, role
- `app/(family)/*` — family tabs & memorial flows
- `app/(partner)/*` — provider tabs & jobs
- `app/(common)/*` — scan, notifications, settings, payments
- `components/*` — UI primitives (ThemedView/Text, etc.)
- `lib/api/*` — typed API client
- `lib/store/*` — lightweight state (e.g., auth, role)
- `lib/utils/*` — formatting, dates, permissions helpers

## Observability
- Error tracking: Sentry
- Analytics: first-party (Amplitude/Expo Analytics), track scans → conversions
- Logging: API structured logs; request IDs; idempotency keys

