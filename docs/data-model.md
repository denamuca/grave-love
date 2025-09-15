# Data Model (MVP → v1.0)

This outlines core entities, fields, and relationships. Use as a guide for PostgreSQL tables (or Supabase), or adapt to NoSQL as needed.

## Entities

User
- id (uuid, pk)
- email, phone (unique, nullable if SSO-only)
- display_name
- roles (derived via RoleAssignment)
- created_at, updated_at

Profile
- id (uuid, pk, = user.id)
- avatar_url
- address: line1, line2, city, state, postal_code, country
- notification_prefs (jsonb: push/email toggles)

RoleAssignment
- id (uuid, pk)
- user_id (fk User)
- role (enum: family, partner, admin)
- org_id (nullable, fk ProviderOrg for partner membership)
- created_at

Memorial
- id (uuid, pk)
- slug (unique)
- created_by (fk User)
- name_full, date_birth, date_death
- bio (text), story (text)
- cemetery_id (fk Cemetery, nullable)
- plot_id (fk Plot, nullable)
- public_settings (jsonb: allow_guest_messages: bool, show_visit_log: bool)
- cover_image_url (nullable)
- created_at, updated_at

FamilyMembership
- id (uuid, pk)
- memorial_id (fk Memorial)
- user_id (fk User)
- role (enum: admin, editor, viewer)
- created_at

Cemetery
- id (uuid, pk)
- name
- address fields + geo (lat, lng)
- contact_info (jsonb)

Plot
- id (uuid, pk)
- cemetery_id (fk Cemetery)
- section, row, plot_number (text)
- geo (point/latlng, nullable)

QRTag
- id (uuid, pk)
- memorial_id (fk Memorial)
- code (string unique)
- nfc_uid (string unique, nullable)
- status (enum: active, lost, replaced)
- created_at, replaced_by_tag_id (nullable)

Visit
- id (uuid, pk)
- memorial_id (fk Memorial)
- user_id (nullable, fk User for signed-in visitors)
- note (short text, nullable)
- source (enum: qr_scan, deep_link, direct)
- device_info (jsonb: platform, app_ver)
- created_at

ServiceType
- id (uuid, pk)
- key (enum: cleaning_basic, cleaning_deep, flowers_standard, flowers_premium, custom)
- name, description
- base_price_cents, currency
- requires_photos (bool)

ServiceOrder
- id (uuid, pk)
- memorial_id (fk Memorial)
- ordered_by (fk User)
- service_type_id (fk ServiceType)
- notes (text)
- scheduled_date (date), time_window (text)
- status (enum: created, scheduled, in_progress, completed, delivered, canceled, disputed)
- payment_id (fk Payment)
- assigned_to (nullable, fk ProviderUser or ProviderOrg)
- created_at, updated_at

ServiceTaskProof
- id (uuid, pk)
- order_id (fk ServiceOrder)
- type (enum: before, after, delivery)
- media_id (fk Media)
- captured_at (timestamp)
- gps (lat, lng, accuracy_m, nullable)

Subscription
- id (uuid, pk)
- memorial_id (fk Memorial)
- created_by (fk User)
- plan_key (enum: flowers_monthly, cleaning_seasonal)
- cadence (enum: monthly, quarterly, custom)
- next_run (date)
- status (enum: active, paused, canceled)
- billing_customer_id (string, Stripe)
- payment_method_id (string, Stripe)

Payment
- id (uuid, pk)
- provider (enum: stripe)
- provider_payment_intent_id (string)
- amount_cents, currency
- status (enum: requires_payment, succeeded, failed, refunded)
- receipt_url
- created_at

Media
- id (uuid, pk)
- owner_user_id (fk User)
- memorial_id (nullable, fk Memorial)
- url, thumb_url
- type (enum: image, video)
- exif (jsonb, scrubbed)
- moderation_status (enum: pending, approved, rejected)
- created_at

Post
- id (uuid, pk)
- memorial_id (fk Memorial)
- user_id (fk User, nullable for public guest)
- type (enum: story, photo, video, candle, message)
- text (nullable), media_id (nullable)
- visibility (enum: public, family_only)
- status (enum: active, hidden, reported)
- created_at

Reminder
- id (uuid, pk)
- memorial_id (fk Memorial)
- user_id (fk User) — recipient
- type (enum: birthday, passing_anniv, religious)
- schedule (jsonb: rule, timezone)
- channels (jsonb: push: bool, email: bool)
- active (bool)

Notification
- id (uuid, pk)
- user_id (fk User)
- type (enum: order_update, reminder, post_comment, moderation)
- payload (jsonb)
- read_at (timestamp nullable)
- created_at

ProviderOrg
- id (uuid, pk)
- name, verified (bool)
- address, contact
- payout_account_id (string, Stripe Connect)

Payout
- id (uuid, pk)
- org_id (fk ProviderOrg)
- amount_cents, currency, period_start, period_end
- status (enum: pending, paid, failed)
- created_at

## Relationships & Indexing
- Memorial: unique `slug`; index `(created_by)`.
- FamilyMembership: unique `(memorial_id, user_id)`.
- ServiceOrder: index `(memorial_id, status)`, `(assigned_to, status)`.
- Media: partial index on `(moderation_status = 'pending')` for moderation queue.
- Visit: index `(memorial_id, created_at DESC)`.

## Permissions Overview
- Family Admin: manage memorial, invite/remove members, moderate posts, order services, manage subscriptions.
- Family Editor: edit memorial content, create posts, order services.
- Family Viewer: view private content, post messages if enabled.
- Public: view public content; post if enabled.
- Partner: view assigned jobs and required memorial details for fulfillment; upload proofs.
- Admin: global moderation and provider management.

