# Visual audit & creative direction — "At Eye Level" · على مستوى النظر

Khalil Al Amri website · v1 · 25 November 2026 · author: Claude (creative owner under decision WEB-CREATIVE-2026-10-27)

## 1. What was audited

| Source | Status | Used for |
|---|---|---|
| Brand Package **v1.2 FINAL** (approved 27 Oct 2026; supersedes the v1.1 FINAL named in the brief) | read (README) | identity rules, contact line, colour world, personality |
| Design System **v1.1 FINAL** tokens (`design-tokens.json` / `.resolved.json`) | downloaded, copied verbatim to `src/tokens/` | every colour, ambient recipe, spacing, radius, shadow, contrast value |
| Motion System **v1.1 FINAL** tokens (`motion-tokens.css`) | downloaded | durations, easings, sequence delays; reduced-motion rule |
| v7d signature — Primary / Compact / Mark (05_SVG/Web, PrimaryColor + OnDark) | downloaded | served byte-for-byte; never redrawn or recoloured |
| CBO Omani Rial symbol (DS-26, `KHA_OMR_Symbol_Medium.svg`) | downloaded | budget bands in the interest form |
| Portrait library `90 — الصور الشخصية المرجعية` (21 photos, IMG_0420–0441) | downloaded | 7 cut-outs + 7 rectangular crops |
| Five references REF-01…05 (folder 09) | viewed | composition lessons only |
| Website Foundation Pack 00–08, 14, 15, 16 | read | IA, content, leads, engineering, QA, decisions |
| Campaign content DB `KHA_C90_Content_Database_v1.1.json` (163 items) | read | every Khalil quote on the site (VERIFIED + EVERGREEN + not blocked) |
| PDFs (Brand book, DS book, Motion book, Photography Direction) | **not read page-by-page** — rules were taken from READMEs, tokens and the web contract (doc 03) | — |

## 2. What the five references teach (and what they don't)

All five share one device: **a single atmospheric light source placed behind a cut-out person, oversized type beside him, and a numbered service rail.** That is worth keeping. What is *not* kept: their red/orange/green identities, glossy glass UI, fake avatars/"+100 clients" counters, logo walls and testimonial cards — none exist for Khalil and inventing them would break the brief.

## 3. The idea

Khalil's colour names already describe a coastline: **Ufuq** (horizon), **Mawj** (wave), **Zabad** (foam), **Bahr** (sea), **Sarooj** (the land/mortar), **Qalam Ink** (depth). The brand's positioning is *"beside the client, not across the table."*

So the site is built on one quiet structural line: **a horizon drawn at Khalil's eye level.** You meet him eye-to-eye — not looking up at an authority, not looking down at a salesman. The hairline passes *behind* him (portrait layer z-30, line z-10), exactly through his measured eye line (0.097–0.139 of each cut-out's height, measured on the masters), and the same line later becomes the axis of the consultation timeline.

The page then **descends from the surface to the depth**: daylight Zabad at the top (the studio photographs' own backdrop matches it, so Khalil arrives in natural light), Paper and Sarooj for reading, Bahr for the analytical "seven questions" and the honest "when I say no", and Qalam Ink at the anchor, where the reference-board lighting finally appears — an Ufuq glow *behind* him on a night field. Understanding deepens as you scroll; the decision is anchored at the bottom.

## 4. Decisions (Visual Decision Record)

| # | Decision | Why |
|---|---|---|
| VDR-01 | Hero H1 is the **v7d signature itself** (alt text = name + descriptor), the brand sentence «أنا ما أقرر عنك. أنا أخليك تفهم قرارك.» is the display line | The person is the brand; the signature is far more distinctive than a typeset name. |
| VDR-02 | Horizon line at eye level, behind the portrait | Expresses "beside, not across" structurally instead of with a slogan. |
| VDR-03 | Cut-outs made by background removal (rembg/isnet, local) — no retouching, no feature change | DS v1.1 portrait layer model: glows go behind the person; nothing overlaps him. Edges checked at 100% on kumma and shoulders. |
| VDR-04 | Body is cropped by a soft fade at mid-torso; **head + kumma never cropped**, generous headroom | KHA-006. |
| VDR-05 | IMG_0430 (Khalil standing behind an *empty chair*) illustrates "beside you" | The chair is the client's seat — the brief's principle made visible without words. |
| VDR-06 | No testimonials, logos, counters or invented stats; the trust section is «ثلاث حالات أقول فيها: لا تشتري» | Real, verified, more persuasive than fake social proof. |
| VDR-07 | Insight covers are typographic (keyword + Mawj lines), not stock photos | No licensed property imagery exists; avoids implying a real location. |
| VDR-08 | Contact line laid out physically LTR (Instagram · website · phone) on one baseline; stacks under 540 px | Brand rule is physical; web adaptation per doc 03 §6. |
| VDR-09 | Motion: one calm reveal (Motion tokens: enter ease, 900 ms, 120 ms sequence, 16 px), whole blocks only, off under `prefers-reduced-motion` | Motion System principles 2, 4, 8. No parallax on portraits. |
| VDR-10 | Mawj accent switches to Bahr on Sarooj surfaces | Mawj on Sarooj is 4.45:1 — under AA for small text (found by the axe audit). |

## 5. Typography (see ADR-003)

Approved: Al Jazeera / KHA Jazeera (Arabic text), Thmanyah Serif Display (large Arabic headlines, WEB-008), Schibsted Grotesk (Latin). Schibsted Grotesk is SIL OFL and is self-hosted. The two Arabic families have **no documented web licence route yet** (OPEN-12/15/17), so previews use OFL stand-ins — IBM Plex Sans Arabic (text) and Markazi Text (display) — placed *after* the approved names in every stack, so a licensed install takes over without code changes (`PUBLIC_LICENSED_FONTS=1`).

## 6. Rejected directions

- **Dark, cinematic full-bleed hero (closest to the references).** Strong, but it would put Khalil in night lighting while his only photography is high-key daylight studio work; it would also make the first impression "agency", not "friend beside you". The dark treatment is kept for the anchor instead.
- **A/B split hero (Concept 01).** Non-binding history; it divided the person from the message — the opposite of the idea.
- **Property-listing patterns** (cards, prices, filters as the main hero). Out of scope and against the charter.
