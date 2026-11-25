# ADR-001 — Astro static site, nginx container on Coolify

Status: Accepted (implementation) · 2026-11-25

**Context.** Foundation doc 06 proposed Astro + TypeScript (WEB-004), independence from AqarCRM, minimal JS, and hosting managed by WUSOOL. A Coolify instance (coolify.aqarcrm.com) is available.

**Decision.** Astro 5 static output (no server runtime), TypeScript strictest, Astro content collections for insights, no UI framework. Five small inline scripts (header, reveal, intent tabs, library filter, form) — no client framework. Served by `nginx:1.27-alpine` with a build-generated CSP and security headers, deployed on Coolify in its own project.

**Consequences.** No server to patch for the site itself; lead intake will be a separate small service when approved (contract in `docs/contracts`). Pinned versions: astro 5.18.2, vitest 3.2.7, typescript 5.9.3 (newer majors exist; upgrade deliberately).
