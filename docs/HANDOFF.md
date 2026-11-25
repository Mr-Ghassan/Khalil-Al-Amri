# Handoff — hosting, deployment & content editing

## 1. Where things are

| What | Where |
|---|---|
| Source code | GitHub `Mr-Ghassan/Khalil-Al-Amri`, branch `claude/khalil-website-v1` (public repo — code only) |
| Hosting | Coolify at coolify.aqarcrm.com → project **Khalil Al Amri Website** → app `khalil-website` (Dockerfile build, nginx, port 80, health `/healthz`) |
| Preview URL | https://khalil.76.13.219.20.sslip.io (once deployed) |
| Production domains (configured, waiting for DNS) | https://www.khalilprop.com (canonical) · https://khalilprop.com (301 → www) |
| Drive delivery folder | `07 — الموقع الإلكتروني / 17 — تنفيذ الموقع | Website Build v1` |
| Original photos & brand masters | Drive (unchanged). Never committed. |

The app is isolated from AqarCRM: its own Coolify project, no shared database, network or secrets.

## 2. DNS (Hostinger) — needed for khalilprop.com to show the site

Currently `khalilprop.com` is parked at Hostinger (A → 2.57.91.91). In Hostinger → Domains → khalilprop.com → DNS:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 76.13.219.20 | 300 |
| CNAME | www | khalilprop.com | 300 |

Remove the existing parking A record for `@`. Coolify/Traefik issues the Let's Encrypt certificates automatically once DNS resolves (minutes to an hour). Do not touch MX records unless the email provider asks.

## 3. Media bundle (portraits + brand vectors)

Images are not in Git (public repo). The Docker build downloads a checksummed `.tgz` (containing `media/`, `brand/`,
`favicon.svg`) from the Drive delivery folder, split into parts because the Drive connector caps uploads at 4.2 MB:

| Build variable (Coolify) | Value |
|---|---|
| `MEDIA_BUNDLE_URLS` | the part URLs, space-separated, in order — form `https://drive.usercontent.google.com/download?id=<FILE_ID>&export=download&confirm=t` (the plain `uc?export=download` form returns a virus-scan page for archives) |
| `MEDIA_BUNDLE_SHA256` | SHA-256 of the whole bundle |

Current bundle (25 Nov 2026): parts `khalil-web-media.part-0/1/2` in the delivery folder, shared "anyone with the link → viewer",
SHA-256 `a9475b931a1885d4944d9302450e87af0f88804e1a60116abd8e6940850ab5aa`.

To rebuild after photo changes:

```bash
npm run media                                   # needs assets-private/ (originals + cut-outs)
tar -czf khalil-web-media.tgz -C public media brand favicon.svg
split -b 2900000 -d -a 1 khalil-web-media.tgz khalil-web-media.part-
sha256sum khalil-web-media.tgz
```

Upload the parts, share them by link, update both variables, redeploy. Without them the build stops on purpose,
so the site never ships without Khalil's photos.

## 4. Going from preview to production

1. Close the items in `docs/GAPS_AND_APPROVALS.md`; `npm run launch-gate -- --strict` must pass.
2. In Coolify set `PUBLIC_SITE_MODE=production` (build variable) and redeploy. This removes the preview bar, draft notes and every unpublished insight, and allows indexing (robots.txt + sitemap).

## 5. Editing content

| Content | File |
|---|---|
| Contact data, channel verification flags | `src/config/site.ts` |
| Home / About / Advisory / shared blocks copy | `src/copy/*.ts` (Arabic and English side by side) |
| Insights | `src/content/insights/ar/<slug>.md` and `en/<slug>.md` — same slug in both. Set `publishState: published` to include in production. Every entry lists its campaign `sourceIds`. |
| Legal pages | `src/copy/legal.ts` |
| Interface strings | `src/i18n/ui.ts` |

Workflow: edit → `npm run verify` → commit → push → Coolify redeploy (or enable auto-deploy with a GitHub webhook in Coolify).

## 6. Rollback

Coolify keeps previous deployments: Application → Deployments → *Redeploy* an earlier one. Or revert the commit and redeploy.
