# Roadmap (MVP → v1.0)

## Milestone 0 — Foundations (1–2 weeks)
- Choose backend approach (Supabase vs Node). Set up repo, CI, envs.
- Auth flow (OTP/SSO), role selection, ToS/Privacy consent.
- Base navigation, theming, error reporting.

## Milestone 1 — Memorials & QR (1–2 weeks)
- Create memorial flow and public memorial screen.
- QR generation + deep link handling; basic visitor check-in.
- Gallery: image upload to storage with thumbnails.

## Milestone 2 — Services (2–3 weeks)
- Service catalog + order flow + Stripe payment.
- Order status tracking and notifications.
- Provider view: jobs list + job detail + proof upload + complete.

## Milestone 3 — Digital Memorial & Timeline (1–2 weeks)
- Posts: candles/messages/photos with report button.
- Family moderation (hide/remove), basic public visibility controls.

## Milestone 4 — Reminders (1 week)
- User-level reminders (birthday, passing anniversary, selected religious dates).
- Push/email preferences; daily cron to dispatch reminders.

MVP Launch Criteria
- End-to-end order fulfilled with photo proof and notifications.
- QR scan opens memorial; visit log records check-ins.
- Digital memorial timeline usable and moderated by family.

## v1.0 Enhancements (3–5 weeks)
- Subscriptions: plan selection, billing, scheduling; pause/resume/skip.
- Trust signals: before/after photo sets, optional GPS-at-service, worker profile on order.
- Moderation queue for public posts/media; admin tools.
- Provider payouts ledger (Stripe Connect basic integration).

## Risks & Mitigations
- Provider supply: start invite-only partners; manual assignment fallback.
- Location privacy: GPS optional + coarse; never show exact locations publicly.
- Content safety: phase-in AI moderation; begin with manual review + rate limits.
- Physical tags: test print + adhesive durability; provide re-issue flow.

