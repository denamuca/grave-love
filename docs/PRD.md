# Grave Love — Product Requirements (PRD)

## 1. Overview
Grave Love helps families care for and memorialize loved ones. Families create a digital memorial, order services (cleaning, flowers), and attach a QR/NFC tag to the grave so visitors can scan to view the memorial, check in, and contribute memories. Service providers fulfill tasks and upload proof (before/after photos, timestamps, GPS). The app supports reminders for birthdays, anniversaries, and religious dates, plus optional subscriptions for recurring services.

## 2. Users & Roles
- Family Member: Creates/maintains memorials, orders services, manages reminders/subscriptions, invites family.
- Public Visitor: Scans QR to view public memorial page, can leave guest messages (if enabled).
- Cemetery Partner / Service Provider: Sees assigned jobs, navigates to plots, uploads proof, marks completion.
- Admin/Moderator: Reviews reported content, manages providers, escalates issues.

## 3. MVP Scope
1) Memorials
- Create memorial with bio, dates, story, photos/videos, plot location, cemetery.
- Generate/link a QR/NFC tag. Public link opens memorial; optional visitor check-in.

2) Services (one-off)
- Order cleaning/flowers; pick date/time window; add notes; pay.
- Provider uploads photo proof; family gets status updates + receipts.

3) Digital Memorial
- Public memorial page with bio, gallery, short videos.
- “Light a candle / leave a message” (guestbook-style), with report button.

4) Reminders
- Per-user opt-in reminders for birthday, passing anniversary, religious days (e.g., yahrzeit, All Souls Day).
- Push/email preferences per reminder type.

5) Visit Log
- Scanning QR at gravesite opens memorial; optional “I visited” check-in.

## 4. v1.0 Scope Additions
6) Subscriptions
- Monthly flowers, seasonal cleaning; automatic scheduling + billing + notifications.

7) Provider App View
- Jobs board (today/upcoming), job details, navigation to plot, upload proof, mark complete.

8) Trust Signals
- Before/after photos, GPS-at-service (optional), timestamps, worker profile display.

9) Safety & Moderation
- Roles/permissions for family vs public; media/message moderation queue; report/flag flow.

## 5. Core User Stories with Acceptance Criteria (MVP)

Story: Create Memorial
- As a Family Member, I can create a memorial with required fields: full name, dates, cemetery/plot, story.
- Acceptance: Saving validates required fields; shows a shareable link; provides a QR/NFC tag linkage screen.

Story: Link QR/NFC
- As a Family Member, I can generate a QR code for a memorial and link a physical QR/NFC tag.
- Acceptance: QR displays memorial URL/Deep Link; status shows linked/unlinked; re-link flow available.

Story: Order Service (one-off)
- As a Family Member, I can request cleaning or flowers for a specific date/time window and pay.
- Acceptance: Order moves through statuses (created → scheduled → in-progress → completed → delivered).
- Acceptance: Payment authorized/charged; receipts and notifications are sent.

Story: Provider Completes Job
- As a Provider, I can see today’s jobs, navigate to the plot, upload before/after photos, and mark done.
- Acceptance: Job can only be completed with required proof; completion records timestamps and optional GPS.

Story: Digital Memorial & Candles/Messages
- As a Visitor, I can view the memorial, gallery, and leave a candle/message if allowed.
- Acceptance: Messages/candles appear on timeline; can be reported; family admins can hide/remove items.

Story: Reminders
- As a Family Member, I can enable reminders per memorial for birthday, passing anniversary, and religious days.
- Acceptance: Users receive push/email according to preferences; can snooze/disable per date.

Story: Visit Check-in
- As a Visitor, I can tap “I visited” after scanning; optionally add a short note.
- Acceptance: Visit log records memorial, time, and device/app info; appears in Visitors list.

## 6. v1.0 Additional Stories (selected)
- Subscriptions: choose plan, set delivery cadence, billing, pause/resume, skip next, and cancel.
- Provider profile and trust signals visible on orders and memorial timeline events.
- Moderation queue: review/approve/decline reported media/messages.
- Roles & Permissions: family admins, editors, viewers; public posting settings per memorial.

## 7. Non‑Functional Requirements
- Privacy & Compliance: Consent to ToS/Privacy; GDPR basics; media storage with regional compliance.
- Security: AuthN via email/phone + SSO; role-based AuthZ; scoped storage access; audit logs for admin actions.
- Reliability: 99.9% uptime target for API; at-least-once notification delivery; idempotent order/payment APIs.
- Performance: Memorial page opens < 1.5s on 4G; images responsive with thumbnails; pagination for lists.
- Accessibility: Color contrast, font scaling, VoiceOver/TalkBack support.

## 8. Success Metrics
- Activation: % of memorials with first order placed within 7 days.
- Trust: % of orders with before/after photos viewed by buyer; disputes per 100 orders.
- Engagement: Average memorial visits per month; return rate on reminders; candles/messages posted.
- Growth: QR scans to app installs; scan → account conversion rate.

## 9. Open Questions
- Do cemeteries participate formally, or can any provider fulfill? How are providers vetted?
- Are certain religious/holiday calendars curated per region? Who maintains those lists?
- Shipping physical QR/NFC tags: in-house vs third-party? Lead times and reorders.

