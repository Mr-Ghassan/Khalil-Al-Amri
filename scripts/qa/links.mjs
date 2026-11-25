/** Internal link check on the built site: every href/src to a local path must resolve to a file in dist/. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const resolve = (u) => {
  const path = decodeURIComponent(u.split('#')[0].split('?')[0]);
  if (!path || path === '/') return existsSync('dist/index.html');
  const p = join('dist', path);
  return existsSync(p) && statSync(p).isFile() ? true : existsSync(join(p, 'index.html'));
};
const broken = [];
let checked = 0;
for (const file of walk('dist').filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const [, attr, url] of html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    const urls = attr === 'srcset' ? url.split(',').map((s) => s.trim().split(/\s+/)[0]) : [url];
    for (const u of urls) {
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      checked++;
      if (!resolve(u)) broken.push(`${file.replace('dist', '')} → ${u}`);
    }
  }
}
console.log(`links: ${checked} internal references checked, ${broken.length} broken`);
if (broken.length) { console.log([...new Set(broken)].join('\n')); process.exit(1); }
