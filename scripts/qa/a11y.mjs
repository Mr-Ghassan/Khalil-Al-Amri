/**
 * Accessibility audit with axe-core (WCAG 2.0/2.1/2.2 A + AA rules) on every built route,
 * in a real Chromium. Fails on any violation of impact "serious" or "critical".
 */
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { ROUTES } from './routes.mjs';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const port = 4341;
const server = spawn('node', ['node_modules/astro/astro.js', 'preview', '--port', String(port), '--host', '127.0.0.1'], { stdio: 'pipe', detached: true });
await new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('server timeout')), 30000); server.stdout.on('data', (d) => { if (String(d).includes(String(port))) { clearTimeout(t); res(); } }); });

const browser = await chromium.launch();
let serious = 0;
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    for (const r of ROUTES) {
      await page.goto(`http://127.0.0.1:${port}${r}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in')));
      await page.addScriptTag({ content: axeSource });
      const res = await page.evaluate(async () => (window).axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }));
      for (const v of res.violations) {
        const flag = v.impact === 'serious' || v.impact === 'critical';
        if (flag) serious++;
        console.log(`${flag ? '✗' : '·'} ${r} @${width} [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}) e.g. ${v.nodes[0]?.target.join(' ')}`);
      }
    }
    await page.close();
  }
} finally { await browser.close(); try { process.kill(-server.pid); } catch { server.kill(); } }
console.log(serious ? `a11y: ${serious} serious/critical violation group(s)` : 'a11y: no serious or critical axe violations');
process.exit(serious ? 1 : 0);
