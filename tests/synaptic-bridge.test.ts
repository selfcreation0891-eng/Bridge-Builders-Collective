import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ECOSYSTEM_REGISTRY, validateRegistry } from '../src/ecosystem/index.ts';

const CORE_IDS = [
  'bridge-builders-collective', 'system-rosetta-stone', 'bridgebuilders-academy',
  'living-archive', 'sophia',
];

test('Synaptic Bridge is registered as a program under Programs (SD-2026-07-28-02)', () => {
  const sb = ECOSYSTEM_REGISTRY.find((e) => e.id === 'synaptic-bridge');
  if (!sb) throw new Error('synaptic-bridge entry missing');
  assert.equal(sb.parentEnvironmentId, 'programs', 'parent is the Programs environment');
  assert.equal(sb.canonicalName, 'Synaptic Bridge');
  assert.equal(sb.status, 'public-preview');
  assert.ok(sb.destination && sb.destination.startsWith('https://bridgebuilderscollective.com/'), 'destination is on the canonical domain (SD-2026-07-27-02)');
  assert.equal(sb.featured, false, 'a program is an access point, not a core surface');
});

test('program registration leaves the five core environments intact', () => {
  for (const id of CORE_IDS) {
    assert.ok(ECOSYSTEM_REGISTRY.some((e) => e.id === id), `core environment present: ${id}`);
  }
  assert.ok(!CORE_IDS.includes('synaptic-bridge'), 'Synaptic Bridge is not a core environment');
});

test('registry remains valid with the program registered', () => {
  assert.deepEqual(validateRegistry(ECOSYSTEM_REGISTRY), []);
});

test('Synaptic Bridge language stays claims-safe', () => {
  const sb = ECOSYSTEM_REGISTRY.find((e) => e.id === 'synaptic-bridge');
  const text = JSON.stringify(sb).toLowerCase();
  for (const banned of ['guarantee', 'therap', 'clinical', 'certified', 'production-ready']) {
    assert.ok(!text.includes(banned), `no "${banned}" claim in the program entry`);
  }
});
