/**
 * Build the canonical front door into dist/ from the canonical registry.
 * Zero dependencies: runs on Node 22+ (native TypeScript type-stripping).
 *
 *   node scripts/build-site.ts
 *
 * PUBLIC_APP_URL (optional): absolute canonical origin, e.g. https://example.org
 *   — required for sitemap.xml generation; without it the XML sitemap is skipped
 *     (never generated with an invented domain) and the build says so.
 */
import { mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderAllPages } from '../src/site/pages.ts';
import { ECOSYSTEM_REGISTRY, validateRegistry, getAllPublicPaths } from '../src/ecosystem/index.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const errors = validateRegistry(ECOSYSTEM_REGISTRY);
if (errors.length) {
  console.error('Registry validation failed:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const pages = renderAllPages();
let count = 0;
for (const [path, html] of pages) {
  const file = path.endsWith('.html') ? join(dist, path) : join(dist, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  count++;
}

await writeFile(join(dist, 'styles.css'), await readFile(join(root, 'src/site/styles.css')));

const appUrl = process.env.PUBLIC_APP_URL?.replace(/\/$/, '');
if (appUrl) {
  const urls = getAllPublicPaths()
    .map((p) => `  <url><loc>${appUrl}${p.path}</loc></url>`)
    .join('\n');
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${appUrl}/sitemap.xml\n`);
  console.log(`sitemap.xml + robots.txt generated for ${appUrl}`);
} else {
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n`);
  console.log('PUBLIC_APP_URL not set: XML sitemap skipped (domains are never invented). HTML sitemap at /sitemap/ is built.');
}

// Generated ecosystem artifact (machine-readable public registry snapshot).
const genDir = join(root, 'src/ecosystem/generated');
await mkdir(genDir, { recursive: true });
await writeFile(
  join(genDir, 'ecosystem-summary.json'),
  JSON.stringify(
    {
      generatedFrom: 'src/ecosystem/ecosystem-registry.ts',
      generatedAt: new Date().toISOString().slice(0, 10),
      environments: ECOSYSTEM_REGISTRY.filter((e) => e.visibility === 'public').map((e) => ({
        id: e.id, publicName: e.publicName, slug: e.slug, status: e.status,
        destination: e.destination, frontDoorPath: e.frontDoorPath, shortDescription: e.shortDescription,
      })),
    },
    null,
    2,
  ) + '\n',
);
await writeFile(join(dist, 'ecosystem.json'), await readFile(join(genDir, 'ecosystem-summary.json')));

console.log(`Built ${count} pages into dist/`);
