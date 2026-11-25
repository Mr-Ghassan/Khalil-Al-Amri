# Gaps & approvals record

Live list of what blocks a production launch. `npm run launch-gate` checks the machine-verifiable items.
Decision IDs refer to Decision Log 08 in the Website Foundation Pack.

| ID | Item | Owner (per log 08) | Effect today | Needed to close |
|---|---|---|---|---|
| OPEN-01 | khalilprop.com DNS is parked at Hostinger (A → 2.57.91.91). Ownership/registrar access, email MX not confirmed | PM / IT | Site reachable only on the Coolify preview URL | Point `@` A → 76.13.219.20 and `www` CNAME → khalilprop.com (or A → 76.13.219.20) in Hostinger DNS |
| KHA-004 | Phone +968 76788852 and Instagram Khalil_alamrii not operationally tested | Khalil | Shown (identity data), flagged unverified in config | Test call + profile check; set `verified: true` in `src/config/site.ts` |
| OPEN-01/09 | info@khalilprop.com mailbox not proven | IT | `mailto:` links present | Send/receive test; then flag verified |
| OPEN-04 | WhatsApp Business on the number unconfirmed | Khalil | **No WhatsApp link anywhere** (draft note only) | Confirm, then enable `contact.whatsapp` |
| OPEN-02 | Public wording of WUSOOL for Investment's support | Management + Khalil | Draft note in footer (preview only); no logo, no claim | Approved sentence (AR/EN) |
| OPEN-03 | Biography (experience, focus, licence) from a recorded interview | Khalil + identity owner | About page uses only verified quotes; bio fields listed as drafts in preview, hidden in production | Interview transcript approved by Khalil |
| OPEN-05/06 | Privacy policy & terms legal review (controller, retention, rights channel, Omani law) | Legal / compliance | Pages describe the current, true state; marked draft | Approved text |
| OPEN-05/07/09 | Live lead intake: data owner, follow-up owner and hours, storage, SMTP, backups | Ops / tech | Form is a **non-submitting prototype**; it says so before and after "submit" | Decisions + implement `docs/contracts/lead-intake.openapi.yaml` + staging tests |
| OPEN-08 | AqarCRM integration | Tech | None (optional by design) | API contract, scopes, tenant mapping |
| OPEN-12/15/17 | Web licence for Al Jazeera / Thmanyah Serif Display | Production | OFL stand-ins (IBM Plex Sans Arabic, Markazi Text) | Licensed web files or official hosting route; drop into `public/fonts/licensed/` + `PUBLIC_LICENSED_FONTS=1` |
| CONTENT | 8 insights adapted from verified campaign items; web expansions + all English copy are new | Content owner + Khalil | Published in preview with "pending approval" tags; excluded from production builds | Set `publishState: published` per entry after review |
| COPY | Web microcopy without a campaign source (section titles, service descriptions) | Content owner | Live in preview | Editorial review (list in `docs/CONTENT_SOURCES.md`) |
| REPO | GitHub repo `Mr-Ghassan/Khalil-Al-Amri` is **public** and personal, not under WUSOOL-Tech (OPEN-14) | Tech | Code only; no photos or brand vectors committed | Decide owner/visibility; transfer if needed |
| MEDIA | Web media bundle (7.6 MB) is in the Drive delivery folder as 3 parts shared by link (approved 25 Nov) | Tech | The build downloads + checksums it | Rotate links if the folder is reorganised (`docs/HANDOFF.md` §3) |
| PHOTO | Portrait usage rights for the web (photographer licence / model release) | Production | Assumed from the identity package; not documented | Written confirmation |

## Approvals needed to switch `PUBLIC_SITE_MODE=production`

1. DNS + email + phone verification (OPEN-01, KHA-004). 2. Biography and WUSOOL wording (OPEN-02/03).
3. Legal text (OPEN-05/06). 4. Content approval of at least the insights you want public.
5. Font licence route (or explicit acceptance of the OFL stand-ins as permanent). 6. Decision on live intake (or keep the form as "contact us directly" only).
