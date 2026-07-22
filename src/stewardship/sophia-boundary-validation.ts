/**
 * SOPHIA boundary validation — rejects advisory output that claims authority.
 * Authority: Bridge Builders Constitution §9 and
 * docs/stewardship/SOPHIA_STEWARD_OPERATIONS_STANDARD.md.
 */

import type { SophiaAdvisoryOutput } from './sophia-advisory-operations.ts';
import { SOPHIA_ADVISORY_NOTICE, SOPHIA_CONTRIBUTION_KINDS } from './sophia-advisory-operations.ts';
import { isValidRecordId } from './record-identifiers.ts';

/**
 * Claims SOPHIA output may never make. Each pattern names an act reserved to
 * recorded human authority.
 */
const FORBIDDEN_CLAIMS: readonly { pattern: RegExp; act: string }[] = [
  { pattern: /\b(i|sophia)\s+(hereby\s+)?approve[sd]?\b/i, act: 'approval' },
  { pattern: /\bapproved\b/i, act: 'approval' },
  { pattern: /\bratif(y|ies|ied|ication)\b/i, act: 'ratification' },
  { pattern: /\bappoint(s|ed|ment is made)?\b/i, act: 'appointment' },
  { pattern: /\b(i|sophia)\s+(have|has)\s+(the\s+)?authority\b/i, act: 'authority claim' },
  { pattern: /\bfinal determination\b/i, act: 'final determination' },
  { pattern: /\bcertif(y|ies|ied|ication granted)\b/i, act: 'certification' },
  { pattern: /\bescalation (is )?closed\b/i, act: 'escalation closure' },
  { pattern: /\bclos(e|es|ing) this escalation\b/i, act: 'escalation closure' },
  { pattern: /\bauthoriz(e|es|ed) (the )?deploy(ment)?\b/i, act: 'deployment authorization' },
  { pattern: /\bdeployment (is )?authorized\b/i, act: 'deployment authorization' },
  { pattern: /\bpublication (is )?authorized\b/i, act: 'publication authorization' },
  { pattern: /\bauthoriz(e|es|ed) publication\b/i, act: 'publication authorization' },
  { pattern: /\badopted decision\b/i, act: 'representing advisory output as an adopted decision' },
  { pattern: /\bthis decision is (now )?in effect\b/i, act: 'representing advisory output as an adopted decision' },
] as const;

export function validateSophiaOutput(output: SophiaAdvisoryOutput): string[] {
  const errors: string[] = [];
  const at = `[${output.id || '?'}:${output.kind}]`;

  if (!isValidRecordId(output.id)) errors.push(`${at} malformed advisory output id`);
  if (!(SOPHIA_CONTRIBUTION_KINDS as readonly string[]).includes(output.kind))
    errors.push(`${at} unknown SOPHIA contribution kind — SOPHIA's contributions are enumerated and bounded`);

  if (output.requiredNotice !== SOPHIA_ADVISORY_NOTICE)
    errors.push(
      `${at} the required advisory notice must appear verbatim: "${SOPHIA_ADVISORY_NOTICE}"`,
    );

  if (!output.observedEvidence.trim())
    errors.push(`${at} advisory output must state the evidence it observed`);
  if (!output.advisoryInterpretation.trim())
    errors.push(`${at} advisory output must label its interpretation`);
  if (!output.recommendedHumanReview.trim())
    errors.push(`${at} advisory output must state what human review it recommends`);

  const textFields: readonly [string, string | null][] = [
    ['observedEvidence', output.observedEvidence],
    ['detectedPattern', output.detectedPattern],
    ['uncertainty', output.uncertainty],
    ['advisoryInterpretation', output.advisoryInterpretation],
    ['recommendedHumanReview', output.recommendedHumanReview],
    ...output.recommendationOptions.map(
      (o, i) => [`recommendationOptions[${i}]`, o] as [string, string],
    ),
  ];
  for (const [field, text] of textFields) {
    if (!text) continue;
    for (const { pattern, act } of FORBIDDEN_CLAIMS) {
      if (pattern.test(text)) {
        errors.push(`${at} ${field} claims ${act} — SOPHIA may never claim this; it is reserved to recorded human authority`);
        break;
      }
    }
  }

  // Advisory output never carries a decided status of its own.
  if ((output.humanDecisionStatus as string) === 'decided' || (output.humanDecisionStatus as string) === 'approved')
    errors.push(`${at} advisory output cannot hold a decided status — decisions are recorded by humans elsewhere`);

  return errors;
}
