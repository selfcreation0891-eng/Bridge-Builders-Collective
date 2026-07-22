/**
 * Observation queues — one logical queue per Permanent Steward Post.
 * Authority: docs/stewardship/OBSERVATION_ONLY_OPERATING_PROTOCOL.md and
 * docs/stewardship/STEWARD_OBSERVATION_WORKFLOW.md.
 *
 * A queue accepts privacy-safe records, preserves uncertainty, and prepares
 * review packets. It never auto-closes, never auto-approves, and never
 * executes a recommendation. Overdue items are shown as overdue; their
 * decision status does not change because time passed. While a post's vacancy
 * coverage awaits a human decision, its items simply remain unresolved — the
 * queue does not invent a receiver.
 *
 * There is no engagement scoring, no human ranking, no candidate scoring, no
 * steward ranking, and no gamified performance score anywhere in this model.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';
import type { OperationalRecord, RecordUrgency } from './operations-records.ts';
import { ageInDays, isOverdue, validateOperationalRecord } from './record-validation.ts';
import { validatePrivateBoundary } from './private-record-boundary.ts';
import { coverageStateFor } from './steward-operations-registry.ts';

export interface ObservationQueue {
  post: StewardPostId;
  /** Open (non-closed) records addressed to this post, oldest first. */
  items: readonly OperationalRecord[];
}

export type EnqueueResult =
  | { accepted: true; record: OperationalRecord }
  | { accepted: false; errors: readonly string[] };

/**
 * Validate a record for queue entry. Acceptance is preservation, not approval:
 * an accepted record is stored awaiting human attention, nothing more.
 */
export function validateForQueue(record: OperationalRecord): EnqueueResult {
  const errors = [...validateOperationalRecord(record), ...validatePrivateBoundary(record)];
  if (!(STEWARD_POST_IDS as readonly string[]).includes(record.receivingAuthority))
    errors.push(
      `[${record.id}] observation queues belong to the five posts; "${record.receivingAuthority}" is not a post queue`,
    );
  return errors.length ? { accepted: false, errors } : { accepted: true, record };
}

/** The queue for one post, derived from a record set. Pure selection — never mutation. */
export function queueFor(post: StewardPostId, records: readonly OperationalRecord[]): ObservationQueue {
  if (!(STEWARD_POST_IDS as readonly string[]).includes(post))
    throw new Error(`unknown post "${post}"`);
  return {
    post,
    items: records
      .filter((r) => r.receivingAuthority === post && r.status !== 'closed')
      .slice()
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id)),
  };
}

export interface QueueSummary {
  post: StewardPostId;
  openCount: number;
  byUrgency: Readonly<Record<RecordUrgency, number>>;
  overdueCount: number;
  oldestOpenAgeDays: number;
  awaitingHumanDecisionCount: number;
  unresolvedQuestionCount: number;
  /** True while the post's vacancy coverage awaits a human decision — items rest here unresolved. */
  coverageAwaitingHumanDecision: boolean;
}

export function summarizeQueue(queue: ObservationQueue, asOfIsoDate: string): QueueSummary {
  const byUrgency: Record<RecordUrgency, number> = {
    routine: 0,
    'time-sensitive': 0,
    serious: 0,
    'urgent-safety': 0,
  };
  let overdue = 0;
  let awaiting = 0;
  let questions = 0;
  let oldest = 0;
  for (const item of queue.items) {
    byUrgency[item.urgency] += 1;
    if (isOverdue(item, asOfIsoDate)) overdue += 1;
    if (
      item.humanDecisionStatus === 'awaiting-human-decision' ||
      item.humanDecisionStatus === 'human-review-requested'
    )
      awaiting += 1;
    questions += item.unresolvedQuestions.length;
    oldest = Math.max(oldest, ageInDays(item, asOfIsoDate));
  }
  return {
    post: queue.post,
    openCount: queue.items.length,
    byUrgency,
    overdueCount: overdue,
    oldestOpenAgeDays: oldest,
    awaitingHumanDecisionCount: awaiting,
    unresolvedQuestionCount: questions,
    coverageAwaitingHumanDecision: coverageStateFor(queue.post) === 'awaiting-human-decision',
  };
}

/**
 * Human acknowledgment of a queue item. Returns a NEW record — queues never
 * mutate. The acknowledger is a human reference; SOPHIA is rejected upstream
 * by record validation. Acknowledgment is receipt, not approval.
 */
export function acknowledgeRecord(
  record: OperationalRecord,
  acknowledgedByRef: string,
  atIso: string,
): OperationalRecord {
  if (/sophia/i.test(acknowledgedByRef))
    throw new Error('SOPHIA cannot acknowledge a record — acknowledgment is a human act');
  return {
    ...record,
    acknowledgment: 'acknowledged-by-human',
    acknowledgedByRef,
    status: record.status === 'open' ? 'acknowledged' : record.status,
    updatedAt: atIso,
  };
}

/** Review-preparation output: what a human reviewer needs, with nothing decided for them. */
export interface QueueReviewPacket {
  post: StewardPostId;
  asOf: string;
  summary: QueueSummary;
  overdueItems: readonly OperationalRecord[];
  awaitingHumanDecision: readonly OperationalRecord[];
  openUncertainties: readonly string[];
  draftRecommendations: readonly { recordId: string; recommendation: string }[];
  note: 'Recommendations listed here are drafts. None is a decision; each awaits recorded human authority.';
}

export function prepareQueueReviewPacket(
  queue: ObservationQueue,
  asOfIsoDate: string,
): QueueReviewPacket {
  return {
    post: queue.post,
    asOf: asOfIsoDate,
    summary: summarizeQueue(queue, asOfIsoDate),
    overdueItems: queue.items.filter((r) => isOverdue(r, asOfIsoDate)),
    awaitingHumanDecision: queue.items.filter(
      (r) =>
        r.humanDecisionStatus === 'awaiting-human-decision' ||
        r.humanDecisionStatus === 'human-review-requested',
    ),
    openUncertainties: queue.items.flatMap((r) => (r.uncertainty ? [`${r.id}: ${r.uncertainty}`] : [])),
    draftRecommendations: queue.items.flatMap((r) =>
      r.recommendation ? [{ recordId: r.id, recommendation: r.recommendation }] : [],
    ),
    note: 'Recommendations listed here are drafts. None is a decision; each awaits recorded human authority.',
  };
}
