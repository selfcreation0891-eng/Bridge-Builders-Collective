# Steward Observation Workflow

Status: Adopted as implementation standard — subordinate to canon
Authority: subordinate to `OBSERVATION_ONLY_OPERATING_PROTOCOL.md`, the
Charter, and the handoff and escalation protocol. Last updated: 2026-07-22

## The shape of an observation

Every operational record keeps eight things separate, in order, and never
collapses them (`src/stewardship/operations-records.ts`):

1. **Observed evidence** — what happened, factually. Required, always.
2. **Interpretation** — what the observer thinks it may mean. Labeled.
3. **Detected pattern** — across observations, if any.
4. **Uncertainty** — what remains unknown. Preserved, never converted into
   false certainty.
5. **Recommendation** — drafted, optional. A recommendation is not an
   approval and validation rejects decision language inside one.
6. **Requested human review** — what the observer asks a human to look at.
7. **Human decision status** — none required, requested, awaiting, recorded
   (with reference), or declined.
8. **Action status** — nothing consequential without a recorded human
   decision reference.

## The queue lifecycle

```
observe → record (validated) → queue of the receiving post → human acknowledgment
        → (optional) handoff / escalation → review packet → recorded human decision
        → closure by human authority
```

- Acceptance into a queue is preservation, not approval
  (`validateForQueue`).
- Queues never auto-close, never auto-approve, never execute a
  recommendation. There is no code path that changes a record's decision
  status without a human reference.
- Overdue items are displayed as overdue; lateness changes nothing else.
- While vacancy coverage is `awaiting-human-decision`, items rest in the
  queue unresolved — the queue does not invent a receiver.
- Closure requires human acknowledgment plus a named human closure
  authority. SOPHIA can do neither.

## Writing privacy-safe records

Records on public surfaces carry summaries and references, never personal
content. Before writing, ask: could this text identify a person or reveal
private circumstances? If yes, put the content in the appropriate restricted
or private system and reference it. `detectProhibitedFields` and
`validateReferencePrivacy` catch the common failures; they do not replace
judgment.

## Templates

Use `docs/stewardship/templates/STEWARD_OBSERVATION_RECORD_TEMPLATE.md`
(existing) for the human-readable record;
`STEWARD_EVIDENCE_PACKET_TEMPLATE.md` for bundled evidence;
`STEWARD_RECOMMENDATION_PACKET_TEMPLATE.md` for recommendations prepared for
human review. What is a queue in code is a review packet on paper — the same
separation of evidence, uncertainty, and recommendation applies in both.
