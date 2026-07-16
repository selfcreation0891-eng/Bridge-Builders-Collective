import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderAllPages } from '../src/site/pages.ts';
import { getPublicEnvironments, statusBadge } from '../src/ecosystem/index.ts';

const REQUIRED_ROUTES = [
  '/', '/ecosystem/', '/principles/', '/academy/', '/archive/', '/rosetta/', '/sophia/',
  '/programs/', '/community/', '/stewardship/', '/public-knowledge/', '/research/',
  '/contribute/', '/trust/', '/accessibility/', '/sitemap/',
];

const pages = renderAllPages();

test('all required routes render non-empty documents', () => {
  for (const route of REQUIRED_ROUTES) {
    const html = pages.get(route);
    assert.ok(html, `missing route ${route}`);
    assert.ok((html as string).length > 1500, `route ${route} looks empty`);
    assert.match(html as string, /<h1>/, `route ${route} missing h1`);
  }
});

test('every page has lang, title, description, skip link, main landmark, nav', () => {
  for (const [path, html] of pages) {
    assert.match(html, /<html lang="en">/, path);
    assert.match(html, /<title>[^<]+<\/title>/, path);
    assert.match(html, /<meta name="description" content="[^"]+">/, path);
    assert.match(html, /class="skip-link" href="#main"/, path);
    assert.match(html, /<main id="main">/, path);
    assert.match(html, /aria-label="Primary"/, path);
  }
});

test('heading order: exactly one h1, no h3 before an h2', () => {
  for (const [path, html] of pages) {
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    assert.equal(h1s.length, 1, `${path} must have exactly one h1`);
    const firstH2 = html.indexOf('<h2');
    const firstH3 = html.indexOf('<h3');
    if (firstH3 !== -1) assert.ok(firstH2 !== -1 && firstH2 < firstH3, `${path} h3 precedes h2`);
  }
});

test('environment pages show truthful status labels and access notices', () => {
  for (const env of getPublicEnvironments()) {
    const html = pages.get(env.frontDoorPath ?? `/ecosystem/${env.slug}/`) as string;
    assert.ok(html.includes(statusBadge(env).label), `${env.id} missing status label`);
    if (env.accessNotice) {
      const escaped = env.accessNotice.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      assert.ok(html.includes(escaped), `${env.id} missing access notice text`);
    }
  }
});

test('no unsupported claims or placeholder text appear on public pages', () => {
  const banned = ['production-ready', 'Join now', 'Start program', 'Submit story', 'Donate', 'TODO', 'FIXME', 'lorem ipsum', '[INSERT'];
  for (const [path, html] of pages) {
    for (const term of banned) {
      assert.ok(!html.toLowerCase().includes(term.toLowerCase()), `${path} contains banned term "${term}"`);
    }
  }
});

test('status is never conveyed by color alone (badges carry text labels)', () => {
  for (const [path, html] of pages) {
    for (const m of html.matchAll(/<span class="badge"[^>]*>([^<]*)<\/span>/g)) {
      assert.ok(m[1].trim().length > 0, `${path} has an empty status badge`);
    }
  }
});
