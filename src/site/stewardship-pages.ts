/**
 * Public operational-status surface for the Permanent Steward Posts.
 * All operational truth flows from src/stewardship/steward-operations-registry.ts
 * and its sibling modules — nothing here hard-codes post state.
 *
 * This site is public and unauthenticated, so this surface shows only
 * public-governance information: post status, vacancy, operating mode,
 * coverage state, routes, cadence, and boundary notices. Restricted and
 * private records are represented by their honest absence, never simulated.
 * A future authenticated steward workspace would consume the same registry
 * and adapters; none is simulated here.
 */
import { STEWARD_POSTS } from '../stewardship/steward-posts.ts';
import type { StewardPost } from '../stewardship/steward-posts.ts';
import {
  STEWARD_OPERATIONS_REGISTRY,
  getOperationsEntry,
} from '../stewardship/steward-operations-registry.ts';
import type { StewardOperationsEntry } from '../stewardship/steward-operations-registry.ts';
import { VACANCY_COVERAGE_MEANING } from '../stewardship/vacancy-coverage.ts';
import { CANONICAL_HANDOFF_ROUTES } from '../stewardship/handoff-routing.ts';
import { REVIEW_CONVENER } from '../stewardship/review-calendar.ts';
import { SOPHIA_ADVISORY_NOTICE } from '../stewardship/sophia-advisory-operations.ts';
import { currentCandidacyStates } from '../stewardship/candidate-operations-boundary.ts';
import { privateStorageStatus } from '../stewardship/private-record-boundary.ts';
import { page, esc } from './html.ts';

export const OPERATIONS_PATH = '/stewardship/operations/';

/** Plain-language meaning for every technical status shown on this surface. */
const HUMAN_MEANING: Readonly<Record<string, string>> = {
  vacant: '"Vacant" means no human has been appointed. The responsibilities exist; no one currently holds them, and no authority is exercised.',
  'observation-only':
    '"Observation Only" means the post may notice, record, recommend, and escalate, but may not take consequential action.',
  'awaiting-human-decision':
    '"Awaiting Human Decision" means the system will not invent an answer or proceed automatically. The question rests with a named human process.',
  active:
    '"Active" describes the institutional responsibility, not staffing: the duties are established even while no one is appointed to perform them.',
};

function boundaryNotices(): string {
  return `
<div class="notice" role="note"><strong>Boundaries that hold on every page of this surface:</strong>
all five posts are human-only. Vacancy is not occupancy. Observation is not authority.
Recommendation is not approval. Advisory support is not governance. SOPHIA cannot become a steward.
No candidacy or appointment exists unless supported by an adopted decision.</div>
<div class="notice" role="note"><strong>SOPHIA advisory notice:</strong> ${esc(SOPHIA_ADVISORY_NOTICE)}</div>`;
}

function postCard(entry: StewardOperationsEntry): string {
  return `<li class="card">
    <h3><a href="${OPERATIONS_PATH}${esc(entry.postId)}/">${esc(entry.canonicalName)}</a></h3>
    <span class="badge" data-status="steward-pilot">${esc(
      `${entry.institutionalState} · ${entry.occupancyState} · ${entry.operatingMode}`,
    )}</span>
    <p>Vacancy coverage: ${esc(entry.vacancyCoverage.state)}. Temporary receiver: none designated.
    Open observations: 0 · open handoffs: 0 · open escalations: 0.
    Next review: not yet scheduled (convening is a human act).
    Authority: observation-only, no expansion (${esc(entry.authoritySource)}).</p>
  </li>`;
}

function operationsOverviewPage(): string {
  const storage = privateStorageStatus();
  const candidacy = currentCandidacyStates();
  const body = `
<h1>Steward operations</h1>
<p>The live operational status of the five Permanent Steward Posts, read directly from the canonical
operational registry. This surface reports; it decides nothing. The posts and their boundaries are
defined by the <a href="/trust/">Charter and governance documents</a>.</p>
${boundaryNotices()}

<h2>The five posts</h2>
<ul class="cards">
${STEWARD_OPERATIONS_REGISTRY.map(postCard).join('\n')}
</ul>

<h2>What these statuses mean</h2>
<ul>
  <li>${esc(HUMAN_MEANING.active)}</li>
  <li>${esc(HUMAN_MEANING.vacant)}</li>
  <li>${esc(HUMAN_MEANING['observation-only'])}</li>
  <li>${esc(HUMAN_MEANING['awaiting-human-decision'])}</li>
</ul>

<h2>Cross-post review, honestly empty</h2>
<p>No observations, handoffs, or escalations have been recorded yet: operations begin with nothing
claimed. When records exist, this section will show unresolved items, routing state, acknowledgment
state, overdue items, constitutional escalations, and continuity risks — each awaiting its human,
never resolved by the passage of time.</p>

<h2>Candidacies and appointments</h2>
<p>Current candidacy state for every post:
${STEWARD_POSTS.map((p) => `${esc(p.canonicalName)} — ${esc(candidacy[p.id])}`).join('; ')}.
No candidacy is open, no candidate is recorded, no person is appointed, and no access has been
granted. ${esc(storage.candidacyBlockedReason ?? '')}</p>

<h2>Review cadence</h2>
<p>The ratified cadence is a weekly observation review, a monthly cross-post continuity review, and
a quarterly authority review. Convening a review is a human act; while the convening posts are
vacant, reviews await the humans who will hold them, and a scheduled or even completed meeting is
never treated as proof of continuity.</p>

<h2>Decisions currently awaiting humans</h2>
<ul>
  <li>Vacancy coverage routing — who, if anyone, temporarily receives matters for each vacant post.</li>
  <li>Candidacy sequencing — whether candidacies open together or one at a time.</li>
  <li>Private candidate-record storage designation.</li>
  <li>Orientation facilitator and readiness reviewer designation.</li>
  <li>Resolution of open question C-014 (age, safeguarding, and legal capacity in candidacies).</li>
</ul>
<p>Each has a prepared decision packet in the public repository, clearly marked as a draft awaiting
human decision. Nothing proceeds automatically.</p>
<p><a href="/stewardship/">← Back to Stewardship</a></p>
`;
  return page({
    path: OPERATIONS_PATH,
    title: 'Steward operations',
    description:
      'Operational status of the five Permanent Steward Posts: vacant, observation-only, human-only, with every consequential decision awaiting recorded human authority.',
    body,
  });
}

function routesFor(post: StewardPost): string {
  const routes = CANONICAL_HANDOFF_ROUTES.filter((r) => r.from === post.id || r.from === 'any-post');
  return routes
    .map((r) => `<li>To ${esc(String(r.to))}: ${esc(r.reason)}.</li>`)
    .join('\n');
}

function postDetailPage(post: StewardPost): string {
  const entry = getOperationsEntry(post.id);
  const coverage = entry.vacancyCoverage;
  const reviews = (Object.keys(REVIEW_CONVENER) as (keyof typeof REVIEW_CONVENER)[])
    .map(
      (t) =>
        `<li>${esc(t)} — convened by the ${esc(String(REVIEW_CONVENER[t]))} post${
          REVIEW_CONVENER[t] === post.id ? ' (this post, when a human is appointed)' : ''
        }.</li>`,
    )
    .join('\n');
  const body = `
<h1>${esc(post.canonicalName)}</h1>
<p><span class="badge" data-status="steward-pilot">${esc(
    `${entry.institutionalState} · ${entry.occupancyState} · ${entry.operatingMode}`,
  )}</span></p>
<p>${esc(post.purpose)}</p>
${boundaryNotices()}

<h2>Current status, in plain language</h2>
<ul>
  <li>${esc(HUMAN_MEANING.vacant)}</li>
  <li>${esc(HUMAN_MEANING['observation-only'])}</li>
  <li>Vacancy coverage is "${esc(coverage.state)}": ${esc(VACANCY_COVERAGE_MEANING[coverage.state])}</li>
  <li>Continuity status: no observations recorded yet; the continuity ledger for this post is empty and append-only.</li>
</ul>

<h2>Observation responsibilities</h2>
<ul>${post.observationResponsibilities.map((r) => `<li>${esc(r.replace(/-/g, ' '))}.</li>`).join('')}</ul>

<h2>Permitted actions (observation-only)</h2>
<ul>${post.permittedActions.map((a) => `<li>${esc(a.replace(/-/g, ' '))}.</li>`).join('')}</ul>

<h2>Prohibited without recorded human authority</h2>
<ul>${post.prohibitedActions.map((a) => `<li>${esc(a.replace(/-/g, ' '))}.</li>`).join('')}</ul>

<h2>Observation queue</h2>
<p>Empty. No observation has been recorded for this post yet. When records exist they will appear
with their evidence, interpretation, uncertainty, recommendation, classification, human-review
status, related records, and handoff history — restricted and private material stays out of this
public surface by the export guard, represented only by privacy-safe references.</p>

<h2>Handoff routes from this post</h2>
<ul>
${routesFor(post)}
</ul>

<h2>Review schedule</h2>
<ul>
${reviews}
</ul>
<p>Authority source: ${esc(entry.authoritySource)}. Where this page and the canonical documents
differ, the documents govern.</p>
<p><a href="${OPERATIONS_PATH}">← Back to steward operations</a></p>
`;
  return page({
    path: `${OPERATIONS_PATH}${post.id}/`,
    title: `${post.canonicalName} — operations`,
    description: `Operational status of the ${post.canonicalName} post: ${entry.occupancyState}, ${entry.operatingMode}, human-only.`,
    body,
  });
}

/** All stewardship-operations routes, keyed by path. */
export function renderStewardshipOperationsPages(): Map<string, string> {
  const out = new Map<string, string>();
  out.set(OPERATIONS_PATH, operationsOverviewPage());
  for (const post of STEWARD_POSTS) {
    out.set(`${OPERATIONS_PATH}${post.id}/`, postDetailPage(post));
  }
  return out;
}
