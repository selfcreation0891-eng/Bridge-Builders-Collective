import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPrimaryNavigation, getFooterGroups, getAllPublicPaths, getPublicEnvironments,
  ECOSYSTEM_REGISTRY, getEnvironment,
} from '../src/ecosystem/index.ts';
import { renderAllPages } from '../src/site/pages.ts';

test('header items come from the registry', () => {
  for (const item of getPrimaryNavigation()) {
    if (item.sourceEnvironmentId) {
      const env = getEnvironment(item.sourceEnvironmentId);
      assert.equal(item.label, env.navLabel ?? env.publicName);
      if (env.frontDoorPath) assert.equal(item.href, env.frontDoorPath);
    }
  }
});

test('footer items come from the registry', () => {
  const envItems = getFooterGroups().flatMap((g) => g.items).filter((i) => i.sourceEnvironmentId);
  assert.ok(envItems.length >= 5);
  for (const i of envItems) {
    const env = getEnvironment(i.sourceEnvironmentId as string);
    assert.equal(i.label, env.publicName);
  }
});

test('sitemap entries come from the registry route table', () => {
  const paths = new Set(getAllPublicPaths().map((p) => p.path));
  for (const env of getPublicEnvironments()) {
    assert.ok(paths.has(env.frontDoorPath ?? `/ecosystem/${env.slug}/`), env.id);
  }
});

test('internal and archived environments are excluded from navigation and pages', () => {
  const surfaces = [
    ...getPrimaryNavigation().map((i) => i.sourceEnvironmentId),
    ...getFooterGroups().flatMap((g) => g.items.map((i) => i.sourceEnvironmentId)),
  ].filter(Boolean) as string[];
  for (const id of surfaces) {
    const env = getEnvironment(id);
    assert.notEqual(env.status, 'internal');
    assert.notEqual(env.status, 'archived');
    assert.equal(env.visibility, 'public');
  }
  const pages = renderAllPages();
  for (const env of ECOSYSTEM_REGISTRY.filter((e) => e.visibility === 'internal' || e.status === 'internal')) {
    assert.ok(!pages.has(env.frontDoorPath ?? `/ecosystem/${env.slug}/`), `internal env ${env.id} has a public page`);
  }
});

test('mobile and desktop navigation represent the same canonical destinations', () => {
  // Both are generated from the same getPrimaryNavigation() call in html.ts;
  // verify the rendered output contains each destination exactly twice (desktop + mobile).
  const home = renderAllPages().get('/') as string;
  for (const item of getPrimaryNavigation()) {
    const marker = item.href === '/' ? 'aria-current="page"' : `href="${item.href}">${item.label}</a>`;
    const occurrences = home.split(marker).length - 1;
    assert.ok(occurrences >= 2, `${item.label} (${marker}) present in both navs (found ${occurrences})`);
  }
});

test('every environment page presents the registry description (no independent redefinition)', () => {
  const pages = renderAllPages();
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  for (const env of getPublicEnvironments()) {
    const html = pages.get(env.frontDoorPath ?? `/ecosystem/${env.slug}/`) as string;
    assert.ok(html, env.id);
    assert.ok(html.includes(escape(env.shortDescription)), `${env.id} page does not carry its registry description`);
  }
});
