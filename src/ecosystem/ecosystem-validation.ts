/**
 * Registry validation — enforces docs/canonical/ECOSYSTEM_REGISTRY_STANDARD.md invariants.
 * Returns a list of human-readable violations; an empty list means the registry is valid.
 */
import { ENVIRONMENT_STATUSES, STATUS_PRESENTATION } from './ecosystem-status.ts';
import type { EcosystemEnvironment } from './ecosystem-types.ts';

export function validateRegistry(registry: EcosystemEnvironment[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const destinations = new Map<string, string>();
  const allIds = new Set(registry.map((e) => e.id));

  for (const env of registry) {
    const at = `[${env.id || '?'}]`;

    if (!env.id) errors.push(`${at} missing id`);
    if (ids.has(env.id)) errors.push(`${at} duplicate id`);
    ids.add(env.id);

    if (!env.slug) errors.push(`${at} missing slug`);
    if (slugs.has(env.slug)) errors.push(`${at} duplicate slug "${env.slug}"`);
    slugs.add(env.slug);

    if (!(ENVIRONMENT_STATUSES as readonly string[]).includes(env.status))
      errors.push(`${at} unrecognized status "${env.status}"`);

    if (env.parentEnvironmentId !== null) {
      if (!allIds.has(env.parentEnvironmentId))
        errors.push(`${at} invalid parent reference "${env.parentEnvironmentId}"`);
      if (env.parentEnvironmentId === env.id) errors.push(`${at} parent self-reference`);
    }

    for (const rel of env.relatedEnvironmentIds) {
      if (!allIds.has(rel)) errors.push(`${at} invalid relationship reference "${rel}"`);
      if (rel === env.id) errors.push(`${at} relationship self-reference`);
    }

    if (typeof env.destination === 'string' && env.destination !== 'internal') {
      const prior = destinations.get(env.destination);
      if (prior) errors.push(`${at} duplicate destination "${env.destination}" (also ${prior})`);
      destinations.set(env.destination, env.id);
      if (!/^https?:\/\//.test(env.destination))
        errors.push(`${at} destination must be an absolute URL or null/'internal'`);
    }

    if (!env.shortDescription || !env.fullDescription) errors.push(`${at} missing required descriptions`);
    if (!env.canonicalOwner) errors.push(`${at} missing canonical owner`);
    if (!env.sourceAuthority) errors.push(`${at} missing source authority (public claims must cite authority)`);
    if (!env.lastReviewed) errors.push(`${at} missing lastReviewed date`);

    if ((env.status === 'public' || env.status === 'public-preview') &&
        (env.destination === null || env.destination === 'internal') && env.frontDoorPath === null)
      errors.push(`${at} status "${env.status}" requires a public destination or front-door path`);

    if (env.status === 'invitation-required' && !env.accessNotice)
      errors.push(`${at} invitation-required requires an access notice`);

    if (env.status === 'planned' && !env.accessNotice)
      errors.push(`${at} planned environments require an access notice (honesty about non-existence)`);

    if (env.status === 'internal' && env.visibility !== 'internal')
      errors.push(`${at} internal status requires internal visibility (may not appear publicly)`);

    if (!STATUS_PRESENTATION[env.status as keyof typeof STATUS_PRESENTATION] &&
        (ENVIRONMENT_STATUSES as readonly string[]).includes(env.status))
      errors.push(`${at} status missing presentation mapping`);

    if (env.featured) {
      if (env.visibility !== 'public') errors.push(`${at} featured requires public visibility`);
      if (env.status === 'internal' || env.status === 'archived')
        errors.push(`${at} featured environments may not be internal/archived`);
      if (!env.shortDescription || env.frontDoorPath === null)
        errors.push(`${at} featured requires valid public presentation data (description + front-door path)`);
    }

    if (env.status === 'archived' && env.featured) errors.push(`${at} archived may not be featured`);

    for (const p of env.participationPathways) {
      if (p.availableNow && !p.href) errors.push(`${at} pathway "${p.label}" claims availability without an href`);
    }
  }
  return errors;
}
