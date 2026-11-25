/**
 * Launch gate — lists what blocks a production launch. Informational by default (exit 0);
 * `--strict` exits 1 while any blocker is open (use in the production pipeline).
 * Source of truth for the items: docs/GAPS_AND_APPROVALS.md and Decision Log 08 (OPEN-xx).
 */
import { readFileSync } from 'node:fs';

const site = readFileSync('src/config/site.ts', 'utf8');

const insights = (await import('node:fs')).readdirSync('src/content/insights/ar').map((f) => readFileSync(`src/content/insights/ar/${f}`, 'utf8'));
const unpublished = insights.filter((t) => !/publishState:\s*published/.test(t)).length;

const checks = [
  ['OPEN-01', 'Domain/DNS/email ownership confirmed and www.khalilprop.com points at the host', /website: \{[^}]*verified: true/.test(site)],
  ['KHA-004', 'Phone and Instagram operationally tested', /phone: \{[^}]*verified: true/.test(site) && /instagram: \{[^}]*verified: true/s.test(site)],
  ['OPEN-01/09', 'info@khalilprop.com mailbox receives mail', /email: \{[^}]*verified: true/.test(site)],
  ['OPEN-02', 'Approved wording for the WUSOOL for Investment relationship', false],
  ['OPEN-03', 'Khalil’s biography from a recorded interview, approved by him', false],
  ['OPEN-05/06', 'Privacy policy & terms reviewed by a legal adviser', false],
  ['OPEN-12/15', 'Licensed web delivery for Al Jazeera / Thmanyah Serif Display', /PUBLIC_LICENSED_FONTS=1/.test(process.env.PUBLIC_LICENSED_FONTS === '1' ? 'PUBLIC_LICENSED_FONTS=1' : '')],
  ['CONTENT', `Insights approved for publication (${insights.length - unpublished}/${insights.length} published)`, unpublished === 0],
  ['OPEN-05/07/09', 'Live lead intake (data owner, follow-up owner, SMTP/storage) — form stays a prototype until then', false],
];

const open = checks.filter(([, , ok]) => !ok);
console.log('Launch gate');
for (const [id, label, ok] of checks) console.log(`${ok ? '✓' : '✗'} ${id.padEnd(12)} ${label}`);
console.log(open.length ? `\n${open.length} item(s) open — keep PUBLIC_SITE_MODE=preview (noindex, labelled drafts).` : '\nAll clear for PUBLIC_SITE_MODE=production.');
if (process.argv.includes('--strict') && open.length) process.exit(1);
