# ADR-002 — Arabic-first routing · ADR-003 — Typography licensing

## ADR-002 Routing (Accepted)
Arabic at `/` (default locale, `dir="rtl"`), English at `/en/` (`dir="ltr"`). Same slugs in both locales; every page has an equivalent; the language switch maps to the counterpart page (`alternatePath`, unit-tested). `hreflang` ar / en / x-default=ar on every page and in `sitemap.xml`. Logical CSS properties throughout; numbers, phone numbers, handles and URLs are isolated LTR runs.

## ADR-003 Typography (Accepted for preview; production pending OPEN-12/15/17)
| Role | Approved | Served now | Licence |
|---|---|---|---|
| Latin | Schibsted Grotesk | Schibsted Grotesk (self-hosted, @fontsource) | SIL OFL 1.1 ✔ |
| Arabic text | KHA Jazeera / Al Jazeera | IBM Plex Sans Arabic | SIL OFL 1.1 (stand-in) |
| Arabic display | Thmanyah Serif Display | Markazi Text | SIL OFL 1.1 (stand-in) |

Approved names stay first in each `font-family` stack. The Al Jazeera TTF in Drive (`91 — الخطوط المعتمدة`) is **not** used: no web-embedding licence is documented, and Thmanyah's owner restricts third-party hosting. To switch: place licensed WOFF2 + `fonts.css` in `public/fonts/licensed/` (git-ignored) and build with `PUBLIC_LICENSED_FONTS=1`.

## ADR-004 Media outside Git (Accepted)
The repository is public. Portrait derivatives and signature vectors are excluded from Git and supplied to the build as a private bundle (`MEDIA_BUNDLE_URL`). Original photographs never leave Drive. Background removal for cut-outs was done locally (rembg, isnet-general-use model) — no third-party image service received the photographs.
