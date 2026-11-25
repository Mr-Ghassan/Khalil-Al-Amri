/**
 * Builds web derivatives of the official portrait library + brand vectors.
 *   assets-private/cutouts/*.png  → public/media/<id>-<w>.{avif,webp}      (alpha kept)
 *   assets-private/photos/*.JPG   → public/media/<id>-<w>.{avif,webp,jpg}
 *   assets-private/brand/*.svg    → public/brand/ (copied byte-for-byte, never edited)
 *   OG images                     → public/media/og-<locale>.jpg
 * Writes src/generated/media.json (dimensions only — no imagery is committed).
 * EXIF/GPS metadata is stripped (sharp default). Faces/features are never altered:
 * only resize, background removal (done upstream, see docs/VISUAL_DECISION_RECORD.md) and format conversion.
 */
import { existsSync, mkdirSync, readdirSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const priv = join(root, 'assets-private');
const outMedia = join(root, 'public/media');
const outBrand = join(root, 'public/brand');
const manifestPath = join(root, 'src/generated/media.json');

if (!existsSync(priv)) {
  console.warn('assets-private/ not found — skipping media build. Portraits will render as labelled placeholders.');
  if (!existsSync(manifestPath)) writeFileSync(manifestPath, JSON.stringify({ cutouts: {}, photos: {}, brand: [] }, null, 2));
  process.exit(0);
}
mkdirSync(outMedia, { recursive: true });
mkdirSync(outBrand, { recursive: true });

const manifest = { generated: new Date().toISOString().slice(0, 10), cutouts: {}, photos: {}, brand: [] };
const CUT_W = [400, 640, 960, 1280];
const PHOTO_W = [480, 800, 1200, 1600];

for (const f of readdirSync(join(priv, 'cutouts')).filter((f) => f.endsWith('.png')).sort()) {
  const id = parse(f).name.toLowerCase().replace('img_', 'khalil-cut-');
  const src = sharp(join(priv, 'cutouts', f));
  const { width, height } = await src.metadata();
  const widths = [...new Set([...CUT_W.filter((w) => w <= width), Math.min(width, 1600)])].sort((a, b) => a - b);
  for (const w of widths) {
    const r = sharp(join(priv, 'cutouts', f)).resize({ width: w });
    await r.clone().avif({ quality: 58, effort: 4 }).toFile(join(outMedia, `${id}-${w}.avif`));
    await r.clone().webp({ quality: 80, alphaQuality: 90 }).toFile(join(outMedia, `${id}-${w}.webp`));
  }
  manifest.cutouts[id] = { width, height, widths, source: f };
  console.log('cutout', id, widths.join(','));
}

for (const f of readdirSync(join(priv, 'photos')).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
  const id = parse(f).name.toLowerCase().replace('img_', 'khalil-photo-');
  const base = sharp(join(priv, 'photos', f)).rotate();
  const { width, height } = await base.metadata();
  const widths = PHOTO_W.filter((w) => w <= width);
  for (const w of widths) {
    const r = sharp(join(priv, 'photos', f)).rotate().resize({ width: w });
    await r.clone().avif({ quality: 55, effort: 4 }).toFile(join(outMedia, `${id}-${w}.avif`));
    await r.clone().webp({ quality: 78 }).toFile(join(outMedia, `${id}-${w}.webp`));
    await r.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(join(outMedia, `${id}-${w}.jpg`));
  }
  manifest.photos[id] = { width, height, widths, source: f };
  console.log('photo', id, widths.join(','));
}

for (const f of readdirSync(join(priv, 'brand')).filter((f) => f.endsWith('.svg'))) {
  copyFileSync(join(priv, 'brand', f), join(outBrand, f));
  manifest.brand.push(f);
}

// Open Graph cards (1200 × 630): deep ambient field, glow behind Khalil, signature on dark. No text is set over him.
const cut = join(priv, 'cutouts', 'IMG_0439.png');
const sig = join(priv, 'brand', 'KHA_Signature_Primary_AR_OnDark.min.svg');
if (existsSync(cut) && existsSync(sig)) {
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#081C2E"/><stop offset=".55" stop-color="#0F3B5F"/><stop offset="1" stop-color="#0A2740"/></linearGradient>
      <radialGradient id="r" cx=".74" cy=".42" r=".42"><stop offset="0" stop-color="#7FB3D9" stop-opacity=".55"/><stop offset=".5" stop-color="#2A73A8" stop-opacity=".22"/><stop offset="1" stop-color="#0F3B5F" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#r)"/>
    <line x1="0" y1="190" x2="1200" y2="190" stroke="#7FB3D9" stroke-opacity=".35" stroke-width="1.5"/>
  </svg>`);
  const portrait = await sharp(cut).resize({ height: 600 }).toBuffer();
  const pm = await sharp(portrait).metadata();
  const signature = await sharp(readFileSync(sig), { density: 300 }).resize({ width: 560 }).png().toBuffer();
  const card = await sharp(bg).composite([
    { input: signature, left: 70, top: 230 },
    { input: portrait, left: 1200 - pm.width - 90, top: 630 - 600 + 30 },
  ]).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  writeFileSync(join(outMedia, 'og-default.jpg'), card);
  console.log('og-default.jpg');
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log('media manifest → src/generated/media.json');

// Favicon: the approved Mark (on-dark mono colourway) on a Bahr tile — the avatar treatment.
const markFile = join(priv, 'brand', 'KHA_Signature_Mark_AR_OnDarkMono.min.svg');
if (existsSync(markFile)) {
  const mark = readFileSync(markFile, 'utf8');
  const vb = mark.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number);
  const inner = mark.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  if (vb) {
    const [x, y, w, h] = vb;
    const side = Math.max(w, h) * 1.45;
    const ox = x - (side - w) / 2;
    const oy = y - (side - h) / 2;
    const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ox} ${oy} ${side} ${side}"><rect x="${ox}" y="${oy}" width="${side}" height="${side}" rx="${side * 0.22}" fill="#0F3B5F"/>${inner}</svg>`;
    writeFileSync(join(root, 'public/favicon.svg'), fav);
    console.log('favicon.svg');
  }
}
