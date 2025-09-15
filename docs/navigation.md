# Navigation & Screen Map (Expo Router)

## Route Groups
- (auth): Onboarding, Sign In/Up, role selection, consent.
- (family): Family experience tabs (Home, Memorials, Reminders, Profile).
- (partner): Provider experience tabs (Jobs, Stats/Payouts, Profile).
- (common): Cross-role routes (Scan, Notifications, Settings, Payment Methods).

## Recommended Routes

Auth
- `/onboarding` — email/phone, Apple/Google; ToS/Privacy consent.
- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/role` — choose Family or Partner (role-based UI gates).

Family
- `/(family)/` — Tab container (Home, Scan, Profile)
- `/(family)/home` — list of memorials, active orders, upcoming reminders.
- `/(family)/memorial/create` — create memorial flow.
- `/(family)/memorial/[id]` — memorial detail with nested tabs:
  - `/(family)/memorial/[id]/about` — bio, dates, story, gallery.
  - `/(family)/memorial/[id]/timeline` — posts, candles, messages.
  - `/(family)/memorial/[id]/services` — order one-off service, manage subscriptions.
  - `/(family)/memorial/[id]/qr` — view QR, link/unlink QR/NFC.
  - `/(family)/memorial/[id]/visitors` — recent scan check-ins, notes.
- `/(family)/order/new` — choose service → date/time → notes → pay → status.
- `/(family)/subscription/new` — plan picker → plot/address → billing.
- `/(family)/reminders` — toggle birthday, yahrzeit/All Souls Day, etc. push/email prefs.
- `/(family)/messages` — post, report, share link.

Partner
- `/(partner)/` — Tab container (Jobs, Scan, Profile)
- `/(partner)/jobs` — today/upcoming jobs.
- `/(partner)/jobs/[jobId]` — job detail, navigation to plot, upload photos, mark complete.
- `/(partner)/stats` — basic ledger (payouts, completion stats).

Common
- `/scan` — QR/NFC scanner. If memorial: open memorial. If provider + job assigned: direct to job.
- `/notifications` — notification center.
- `/settings` — profile, privacy, addresses, roles.
- `/payment-methods` — manage cards, billing info.

## Deep Links & QR
- Universal link: `https://app.gravelove.com/m/:slug`
- App scheme: `glove://memorial/:id`
- QR content: the universal link above. If app installed, opens app route; else web landing.

## Navigation Guards
- Auth gate: redirect unauthenticated users to `/auth/sign-in`.
- Role gate: after sign-in, if no role set → `/auth/role`.
- Family routes require role `family` or `both`; Partner routes require `partner` or `both`.
- Feature gates: subscriptions screens hidden until enabled for region.

## Minimal Implementation Order (MVP)
1) Auth + Role selection
2) Family tabs: Home, Memorial Detail (About, Timeline, Services, QR, Visitors)
3) Order flow + Payment
4) Provider tabs: Jobs + Job Detail
5) Scan route and deep link handling
6) Notifications center + Reminders screen

