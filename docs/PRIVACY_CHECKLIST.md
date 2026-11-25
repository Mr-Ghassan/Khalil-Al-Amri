# Form, data & privacy checklist

## True today (verified in this build)
- [x] No cookies, no analytics, no tracking pixels, no third-party scripts, fonts or CDNs (all assets self-hosted).
- [x] CSP `default-src 'self'`, hashed inline scripts only, `frame-ancestors 'none'`, `form-action 'self'`.
- [x] Interest form transmits nothing: `submit` is intercepted; the validated payload is discarded; the result screen says "valid — but not sent".
- [x] Required fields only: name, phone, intent, contact consent. Marketing consent separate, optional, never pre-ticked.
- [x] No ID, bank or date-of-birth fields; hint text warns not to type them in details.
- [x] Honeypot + minimum fill time (2.5 s) anti-spam; server must add rate limiting.
- [x] Phone normalised to E.164 (+968 default, Arabic-Indic digits accepted); unknown option values rejected.
- [x] Errors: blur-first, linked with `aria-describedby`, error summary with links, focus moved to the summary.
- [x] WhatsApp not offered anywhere (OPEN-04).
- [x] Preview builds are `noindex` (meta + robots.txt `Disallow: /`).
- [x] Images are web derivatives with EXIF/GPS metadata stripped.

## Before live intake (blocking)
- [ ] Data controller/processor named; retention period; deletion and rights-request channel (OPEN-05/06).
- [ ] Consent wording legally reviewed; `CONSENT_VERSION` bumped; consent record (version, timestamp, page) stored.
- [ ] Intake API per `docs/contracts/lead-intake.openapi.yaml`, with idempotency, rate limits, server-side validation.
- [ ] Lead store encrypted at rest, backups tested, access by role with 2FA.
- [ ] Notifications without PII in logs; dead-letter alert on delivery failure.
- [ ] Follow-up owner and service hours agreed (OPEN-07); success text promises only what exists.
- [ ] Staging uses synthetic data only; test scenarios from Leads & CRM §10 run and recorded.
