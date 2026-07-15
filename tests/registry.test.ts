import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ECOSYSTEM_REGISTRY, validateRegistry, getPublicEnvironments,
  getPrimaryNavigation, getFooterGroups, getAllPublicPaths, getRelatedEnvironments, getEnvironment,
} from '../src/ecosystem/index.ts';
import type { EcosystemEnvironment } from '../src/ecosystem/index.ts';

test('canonical registry is valid', () => {
  assert.deepEqual(validateRegistry(ECOSYSTEM_REGISTRY), []);
});

test('core environments are registered', () => {
  for (const id of ['bridge-builders-collective', 'system-rosetta-stone', 'bridgebuilders-academy', 'living-archive', 'sophia']) {
    assert.ok(ECOSYSTEM_REGISTRY.some((e) => e.id === id), `missing core environment ${id}`);
  }
});

test('no environment invents a destination', () => {
  for (const e of ECOSYSTEM_REGISTRY) {
    assert.ok(e.destination === null || e.destination === 'internal' || /^https:\/\//.test(e.destination), e.id);
  }
});

test('statuses are honest at v0.1.0: nothing claims public availability', () => {
  // Evidence rule: no deployment exists yet, so no environment may claim `public`/`public-preview` with an external destination.
  for (const e of ECOSYSTEM_REGISTRY) {
    assert.notEqual(e.status, 'public', `${e.id} claims public availability without deployment evidence`);
  }
});

test('relationships resolve and exclude self-reference', () => {
  for (const e of ECOSYSTEM_REGISTRY) {
    for (const rel of e.relatedEnvironmentIds) {
      assert.notEqual(rel, e.id);
      assert.ok(getEnvironment(rel));
    }
    for (const r of getRelatedEnvironments(e)) assert.equal(r.visibility, 'public');
  }
});

function clone(e: EcosystemEnvironment): EcosystemEnvironment { return JSON.parse(JSON.stringify(e)); }

test('validation rejects duplicate ids and slugs', () => {
  const bad = [clone(ECOSYSTEM_REGISTRY[0]), clone(ECOSYSTEM_REGISTRY[0])];
  const errs = validateRegistry(bad);
  assert.ok(errs.some((x) => x.includes('duplicate id')));
  assert.ok(errs.some((x) => x.includes('duplicate slug')));
});

test('validation rejects unrecognized status, bad references, self-reference', () => {
  const a = clone(ECOSYSTEM_REGISTRY[0]);
  a.status = 'launching-soon' as never;
  a.parentEnvironmentId = 'does-not-exist';
  a.relatedEnvironmentIds = [a.id, 'ghost'];
  const errs = validateRegistry([a]);
  assert.ok(errs.some((x) => x.includes('unrecognized status')));
  assert.ok(errs.some((x) => x.includes('invalid parent reference')));
  assert.ok(errs.some((x) => x.includes('relationship self-reference')));
  assert.ok(errs.some((x) => x.includes('invalid relationship reference')));
});

test('validation rejects duplicate destinations and missing owner/descriptions', () => {
  const a = clone(ECOSYSTEM_REGISTRY[1]); const b = clone(ECOSYSTEM_REGISTRY[2]);
  a.destination = 'https://example.org/x'; b.destination = 'https://example.org/x';
  b.canonicalOwner = ''; b.shortDescription = '';
  const errs = validateRegistry([a, b]);
  assert.ok(errs.some((x) => x.includes('duplicate destination')));
  assert.ok(errs.some((x) => x.includes('missing canonical owner')));
  assert.ok(errs.some((x) => x.includes('missing required descriptions')));
});

test('validation enforces internal invisibility and archived/featured rules', () => {
  const a = clone(ECOSYSTEM_REGISTRY[5]);
  a.status = 'internal'; a.visibility = 'public';
  const b = clone(ECOSYSTEM_REGISTRY[6]);
  b.status = 'archived'; b.featured = true; b.id = 'b2'; b.slug = 'b2';
  const errs = validateRegistry([a, b]);
  assert.ok(errs.some((x) => x.includes('internal status requires internal visibility')));
  assert.ok(errs.some((x) => x.includes('may not be internal/archived')));
});

test('validation requires access notices where the status standard demands them', () => {
  const a = clone(ECOSYSTEM_REGISTRY[3]);
  a.status = 'invitation-required'; a.accessNotice = null;
  const errs = validateRegistry([a]);
  assert.ok(errs.some((x) => x.includes('requires an access notice')));
});

test('internal environments are excluded from all public surfaces', () => {
  const pub = getPublicEnvironments();
  assert.ok(pub.every((e) => e.visibility === 'public' && e.status !== 'internal' && e.status !== 'archived'));
  const surfaced = new Set([
    ...getPrimaryNavigation().map((i) => i.sourceEnvironmentId),
    ...getFooterGroups().flatMap((g) => g.items.map((i) => i.sourceEnvironmentId)),
  ]);
  for (const id of surfaced) {
    if (id) assert.notEqual(getEnvironment(id).status, 'internal');
  }
});

test('every public claim in the registry cites a source authority', () => {
  for (const e of ECOSYSTEM_REGISTRY) assert.ok(e.sourceAuthority.length > 0, e.id);
});

test('public paths are unique and well-formed', () => {
  const paths = getAllPublicPaths();
  const set = new Set(paths.map((p) => p.path));
  assert.equal(set.size, paths.length);
  for (const p of paths) assert.match(p.path, /^\/([a-z0-9-]+\/)*$/);
});
