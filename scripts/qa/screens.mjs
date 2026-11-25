/**
 * Visual QA: renders every route of the built site in a real browser (Chromium via the
 * pre-installed Playwright) at 320 / 390 / 768 / 1440 px and saves full-page screenshots.
 * Usage: node scripts/qa/screens.mjs [--routes /,/en/] [--widths 390,1440] [--out qa-output/screens]
 * Requires `npm run build` first. Starts `astro preview` on a free port and stops it afterwards.
 */
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

import { ROUTES } from './routes.mjs';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > -1 ? process.argv[i + 1] : def; };
const routes = arg('routes', ROUTES.join(',')).split(',');
const widths = arg('widths', '320,390,768,1440').split(',').map(Number);
const out = arg('out', 'qa-output/screens');
const port = Number(arg('port', '4329'));
mkdirSync(out, { recursive: true });

const server = spawn('node', ['node_modules/astro/astro.js', 'preview', '--port', String(port), '--host', '127.0.0.1'], { stdio: 'pipe', detached: true });
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('preview server did not start')), 30000);
  server.stdout.on('data', (d) => { if (String(d).includes(String(port))) { clearTimeout(t); res(); } });
});

const browser = await chromium.launch();
const issues = [];
try {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, deviceScaleFactor: w < 800 ? 2 : 1, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error') issues.push(`${w}px console error: ${m.text()}`); });
    for (const r of routes) {
      const res = await page.goto(`http://127.0.0.1:${port}${r}`, { waitUntil: 'networkidle' });
      if (!res || (res.status() >= 400 && !r.includes('404'))) issues.push(`${r} → HTTP ${res?.status()}`);
      // Scroll through so reveal-on-scroll content is in its final state.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 90)); }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForTimeout(1200);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) issues.push(`${r} @${w}px horizontal overflow ${overflow}px`);
      const name = `${r.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home-ar'}@${w}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: true });
      if (w === widths[widths.length - 1] || w >= 1280) {
        await page.screenshot({ path: `${out}/${name.replace('.png', '-fold.png')}`, fullPage: false });
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  try { process.kill(-server.pid); } catch { server.kill(); }
}
console.log(issues.length ? `ISSUES:\n${issues.join('\n')}` : 'No HTTP, console or overflow issues detected.');
process.exit(issues.length ? 1 : 0);
