/**
 * Internal link integrity validation over the built site (dist/).
 * Fails if any internal href/src points at a page or asset that was not built.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const failures: string[] = [];
let checked = 0;
for await (const file of walk(dist)) {
  if (!file.endsWith('.html')) continue;
  const html = await readFile(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    if (!url.startsWith('/')) { failures.push(`${file}: non-root-relative internal URL "${url}"`); continue; }
    const clean = url.split('#')[0];
    const target = clean.endsWith('/') ? join(dist, clean, 'index.html') : join(dist, clean);
    checked++;
    try { await stat(target); } catch { failures.push(`${file}: broken internal link "${url}"`); }
  }
}
if (failures.length) {
  console.error(`Link validation FAILED (${failures.length}):`);
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}
console.log(`Link validation passed: ${checked} internal references resolve.`);
