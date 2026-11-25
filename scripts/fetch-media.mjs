/**
 * Build-time download of the private web media bundle (portraits + brand vectors are not in Git).
 * MEDIA_BUNDLE_URLS   space-separated URLs of the bundle parts, in order (concatenated = .tgz)
 * MEDIA_BUNDLE_SHA256 expected SHA-256 of the concatenated bundle — the build fails on mismatch.
 */
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const urls = (process.env.MEDIA_BUNDLE_URLS ?? '').split(/\s+/).filter(Boolean);
const expected = (process.env.MEDIA_BUNDLE_SHA256 ?? '').trim().toLowerCase();
if (!urls.length || !expected) {
  console.error('MEDIA_BUNDLE_URLS and MEDIA_BUNDLE_SHA256 are required (see docs/HANDOFF.md §3).');
  process.exit(1);
}
const parts = [];
for (const u of urls) {
  const res = await fetch(u, { redirect: 'follow' });
  if (!res.ok) { console.error(`download failed (${res.status}) for part ${parts.length}`); process.exit(1); }
  parts.push(Buffer.from(await res.arrayBuffer()));
}
const bundle = Buffer.concat(parts);
const got = createHash('sha256').update(bundle).digest('hex');
if (got !== expected) { console.error(`media bundle checksum mismatch: ${got}`); process.exit(1); }
writeFileSync('/tmp/media.tgz', bundle);
console.log(`media bundle OK: ${urls.length} part(s), ${bundle.length} bytes`);
