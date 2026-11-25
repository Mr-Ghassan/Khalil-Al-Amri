/**
 * Generates a strict Content-Security-Policy for the built site.
 * Astro inlines small scripts, so every inline <script> body in dist/ is hashed (sha256) and allowed
 * individually — no 'unsafe-inline' for scripts. JSON-LD blocks are data, not scripts, and are skipped.
 * Output: build-meta/csp.conf (an nginx `add_header` line), included by deploy/nginx.conf.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const hashes = new Set();
for (const file of walk('dist').filter((f) => f.endsWith('.html'))) {
  for (const m of readFileSync(file, 'utf8').matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/ld\+json/.test(m[1])) continue;
    hashes.add(`'sha256-${createHash('sha256').update(m[2]).digest('base64')}'`);
  }
}
const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(' ')}`,
  "style-src 'self' 'unsafe-inline'", // inline style attributes carry layout variables; no third-party CSS
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');
mkdirSync('build-meta', { recursive: true });
writeFileSync('build-meta/csp.conf', `add_header Content-Security-Policy "${csp}" always;\n`);
console.log(`csp: ${hashes.size} inline script hash(es) → build-meta/csp.conf`);
