# Khalil Al Amri — official website · خليل العامري

Arabic-first (RTL) and English (LTR) personal website for **Khalil Al Amri — Real Estate Consultant**.
Static site built with **Astro 5 + TypeScript**, served by nginx. No cookies, no analytics, no third-party requests.

> **Status: PREVIEW.** `PUBLIC_SITE_MODE=preview` (the default) is `noindex`, shows a preview bar and labels every
> unapproved item as *Draft*. The interest form is a **non-submitting prototype** — it validates in the browser and
> sends nothing. See `docs/GAPS_AND_APPROVALS.md` and `npm run launch-gate` before switching to production.

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install dependencies (Node ≥ 20). |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Regenerate web tokens from the approved DS tokens, then build to `dist/`. |
| `npm run test` | Unit tests (lead validation, phone normalisation, routing, publication gate). |
| `npm run check` | Astro + TypeScript type check (strictest). |
| `npm run qa:links` | Internal link check on `dist/`. |
| `npm run qa:a11y` | axe-core WCAG 2.2 AA audit of every route at 1440 and 390 px in Chromium. |
| `npm run qa:screens` | Full-page screenshots of every route at 320 / 390 / 768 / 1440 px → `qa-output/screens/`. |
| `npm run launch-gate` | Lists open launch blockers (`--strict` fails while any is open). |
| `npm run verify` | check + test + build + links + a11y + launch gate. |
| `npm run media` | Rebuild web image derivatives from `assets-private/` (originals are not in Git). |

## Structure

```
src/
  config/site.ts          fixed identity data, channel verification flags, site mode
  i18n/                   routes (AR at /, EN at /en/) and interface strings
  copy/                   page copy per locale (with campaign Content ID sources)
  content/insights/{ar,en}  insight articles (Markdown + typed frontmatter, publication state)
  components/brand/       Signature (v7d masters, untouched), Portrait, ContactRow, OmaniRial
  components/sections/    hero, intent chooser, seven questions, consultation steps, anchor CTA …
  lib/leads/              lead-intake contract: validation, E.164 phone normalisation, consent
  styles/                 tokens.generated.css (from DS v1.1), base.css (web layer), fonts.css
  views/                  page views shared by both locales
scripts/                  tokens, media, CSP, QA and launch-gate scripts
deploy/ + Dockerfile      nginx image with strict security headers and a generated CSP
docs/                     creative direction, decisions, contracts, QA report, handoff
```

## Deployment

`Dockerfile` builds the site and serves it with nginx (port 80, `/healthz`). It is deployed on Coolify;
see `docs/HANDOFF.md` for the DNS change at Hostinger and the production switch.
