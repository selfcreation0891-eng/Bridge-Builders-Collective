import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  STEWARD_POSTS,
  STEWARD_POST_IDS,
  CHARTER_STATUS,
  CURRENT_POST_MODE,
  validateStewardPosts,
} from '../src/stewardship/steward-posts.ts';
import type { StewardPost } from '../src/stewardship/steward-posts.ts';

test('steward post registry honors the Charter invariants', () => {
  assert.deepEqual(validateStewardPosts(STEWARD_POSTS), []);
});

test('five and only five Permanent Steward Posts are established', () => {
  assert.equal(STEWARD_POSTS.length, 5);
  for (const id of ['orientation', 'continuity', 'vocabulary', 'product', 'institutional']) {
    assert.ok(STEWARD_POSTS.some((p) => p.id === id), `missing post ${id}`);
  }
  assert.equal(STEWARD_POST_IDS.length, 5);
});

test('every post is explicitly human-held and begins observation-only', () => {
  for (const p of STEWARD_POSTS) {
    assert.equal(p.humanOnly, true, `${p.id} must be human-only`);
    assert.equal(p.initialMode, 'observation-only', `${p.id} must begin observation-only`);
  }
});

test('SOPHIA advises all five posts and holds no decision authority', () => {
  for (const p of STEWARD_POSTS) {
    assert.equal(p.sophiaSupportAllowed, true, `${p.id}: SOPHIA support extends to all posts`);
    assert.equal(p.sophiaDecisionAuthority, false, `${p.id}: SOPHIA decision authority is always false`);
  }
});

test('Institutional Steward is not SOPHIA and routes to founding stewards', () => {
  const institutional = STEWARD_POSTS.find((p) => p.id === 'institutional');
  assert.ok(institutional, 'institutional post exists');
  assert.match(institutional.purpose, /SOPHIA must never occupy/);
  assert.ok(institutional.handoffTargets.includes('founding-steward'));
  assert.ok(institutional.prohibitedActions.includes('override-constitution'));
});

test('every post has at least one handoff route', () => {
  for (const p of STEWARD_POSTS) {
    assert.ok(p.handoffTargets.length >= 1, `${p.id} has no handoff route`);
  }
});

test('observation-only mode prohibits autonomous consequential execution', () => {
  const consequential = [
    'publish', 'approve', 'reject', 'merge', 'deploy',
    'change-canonical-definitions', 'change-public-status',
    'appoint-steward', 'remove-steward', 'self-certify',
    'represent-recommendation-as-decision',
  ];
  for (const p of STEWARD_POSTS) {
    for (const action of consequential) {
      assert.ok(
        p.prohibitedActions.includes(action),
        `${p.id} must prohibit unilateral "${action}"`,
      );
      assert.ok(
        !p.permittedActions.includes(action),
        `${p.id} must not permit unilateral "${action}"`,
      );
    }
  }
});

test('pre-ratification: Charter is pending and all posts are inactive', () => {
  // Phase 14 requirement: the build does not self-ratify. If this assertion
  // fails, a ratification decision must exist per CHANGE_AUTHORITY.md.
  assert.equal(CHARTER_STATUS, 'pending-ratification');
  assert.equal(CURRENT_POST_MODE, 'inactive');
});

test('validator rejects contradictory role definitions', () => {
  const broken: StewardPost[] = STEWARD_POSTS.map((p) =>
    p.id === 'institutional'
      ? ({ ...p, humanOnly: true, sophiaDecisionAuthority: false, handoffTargets: [] } as StewardPost)
      : p,
  );
  const errors = validateStewardPosts(broken);
  assert.ok(errors.some((e) => e.includes('handoff route')), 'missing handoff route must be rejected');

  const sixth = [...STEWARD_POSTS, { ...STEWARD_POSTS[0]!, id: 'orientation' } as StewardPost];
  assert.ok(validateStewardPosts(sixth).length > 0, 'a sixth/duplicate post must be rejected');
});
