/**
 * Central environment type for the canonical ecosystem registry.
 * Authority: docs/canonical/ECOSYSTEM_REGISTRY_STANDARD.md
 */
import type { EnvironmentStatus } from './ecosystem-status.ts';

export type Audience =
  | 'individuals'
  | 'families'
  | 'young-people'
  | 'elders'
  | 'communities'
  | 'educators'
  | 'creators'
  | 'stewards'
  | 'organizations'
  | 'institutions';

export type Orientation = 'discover' | 'learn' | 'participate' | 'preserve' | 'steward';

export interface ParticipationPathway {
  /** Public label, e.g. "Explore the ecosystem" */
  label: string;
  /** Which broad orientation this pathway serves. */
  orientation: Orientation;
  /** Front-door path or external URL. Null when no honest pathway exists yet. */
  href: string | null;
  /** True only when the pathway works today, end to end. */
  availableNow: boolean;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface EcosystemEnvironment {
  /** Stable machine id (kebab-case). */
  id: string;
  /** Canonical name per docs/canonical/CANONICAL_VOCABULARY.md */
  canonicalName: string;
  /** Name shown to the public (usually identical to canonicalName). */
  publicName: string;
  /** Optional short label for crowded navigation surfaces; falls back to publicName. */
  navLabel?: string;
  /** URL-safe slug, unique. */
  slug: string;
  shortDescription: string;
  fullDescription: string;
  status: EnvironmentStatus;
  /**
   * External destination URL. Null when none exists — destinations are never invented.
   * 'internal' marks an explicitly internal destination state.
   */
  destination: string | null | 'internal';
  /** Path of this environment's page on the canonical front door, if any. */
  frontDoorPath: string | null;
  audiences: Audience[];
  /** What exists or will exist, phrased per PUBLIC_CLAIMS_STANDARD.md. */
  capabilities: string[];
  /** What is honestly still developing. */
  developing: string[];
  participationPathways: ParticipationPathway[];
  relatedEnvironmentIds: string[];
  parentEnvironmentId: string | null;
  /** Ascending sort order for public presentation. */
  publicOrder: number;
  featured: boolean;
  /** Required for statuses whose standard demands it. */
  accessNotice: string | null;
  trustNotice: string | null;
  canonicalOwner: string;
  /** Which authority established this entry (constitution, steward decision, document). */
  sourceAuthority: string;
  /** ISO date of last steward review. */
  lastReviewed: string;
  visibility: 'public' | 'internal';
  callToAction: CallToAction | null;
  /** Optional visual reference (emoji or icon key); never load-bearing for meaning. */
  icon: string | null;
}
