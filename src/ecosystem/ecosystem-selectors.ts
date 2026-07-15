/**
 * Selectors/generators — the ONLY way public surfaces read the registry.
 * Components and templates never filter the registry themselves.
 */
import { ECOSYSTEM_REGISTRY } from './ecosystem-registry.ts';
import { STATUS_PRESENTATION } from './ecosystem-status.ts';
import type { EcosystemEnvironment, Orientation } from './ecosystem-types.ts';

export interface NavItem {
  label: string;
  href: string;
  sourceEnvironmentId: string | null;
}

const publiclyVisible = (e: EcosystemEnvironment): boolean =>
  e.visibility === 'public' && STATUS_PRESENTATION[e.status].showInPublicNavigation;

export const getEnvironment = (id: string): EcosystemEnvironment => {
  const env = ECOSYSTEM_REGISTRY.find((e) => e.id === id);
  if (!env) throw new Error(`Unknown environment id: ${id}`);
  return env;
};

export const getBySlug = (slug: string): EcosystemEnvironment | undefined =>
  ECOSYSTEM_REGISTRY.find((e) => e.slug === slug);

/** All environments a public visitor may see, in canonical order. */
export const getPublicEnvironments = (): EcosystemEnvironment[] =>
  ECOSYSTEM_REGISTRY.filter(publiclyVisible).sort((a, b) => a.publicOrder - b.publicOrder || a.publicName.localeCompare(b.publicName));

export const getFeaturedEnvironments = (): EcosystemEnvironment[] =>
  getPublicEnvironments().filter((e) => e.featured);

export const getRelatedEnvironments = (env: EcosystemEnvironment): EcosystemEnvironment[] =>
  env.relatedEnvironmentIds.map(getEnvironment).filter(publiclyVisible);

export const statusBadge = (env: EcosystemEnvironment) => STATUS_PRESENTATION[env.status];

/** Primary (desktop + mobile) navigation. Environment-backed items come from the registry. */
export function getPrimaryNavigation(): NavItem[] {
  const envItem = (id: string): NavItem => {
    const e = getEnvironment(id);
    if (!publiclyVisible(e) || !e.frontDoorPath) throw new Error(`Environment ${id} is not publicly navigable`);
    return { label: e.navLabel ?? e.publicName, href: e.frontDoorPath, sourceEnvironmentId: e.id };
  };
  return [
    { label: 'About', href: '/', sourceEnvironmentId: 'bridge-builders-collective' },
    { label: 'Ecosystem', href: '/ecosystem/', sourceEnvironmentId: null },
    envItem('programs'),
    envItem('bridgebuilders-academy'),
    envItem('living-archive'),
    envItem('public-knowledge'),
    envItem('contribution'),
  ];
}

/** Footer navigation groups, generated from the registry + canonical site routes. */
export function getFooterGroups(): { heading: string; items: NavItem[] }[] {
  const toItem = (e: EcosystemEnvironment): NavItem => ({
    label: e.publicName,
    href: e.frontDoorPath ?? `/ecosystem/${e.slug}/`,
    sourceEnvironmentId: e.id,
  });
  const pub = getPublicEnvironments();
  return [
    { heading: 'Ecosystem', items: pub.filter((e) => e.featured && e.id !== 'bridge-builders-collective').map(toItem) },
    {
      heading: 'Participate',
      items: [
        ...pub.filter((e) => ['programs', 'community-stewardship', 'contribution'].includes(e.id)).map(toItem),
        { label: 'All environments', href: '/ecosystem/', sourceEnvironmentId: null },
      ],
    },
    {
      heading: 'Trust',
      items: [
        { label: 'Principles', href: '/principles/', sourceEnvironmentId: null },
        { label: 'Trust Center', href: '/trust/', sourceEnvironmentId: null },
        { label: 'Accessibility', href: '/accessibility/', sourceEnvironmentId: null },
        { label: 'Sitemap', href: '/sitemap/', sourceEnvironmentId: null },
      ],
    },
  ];
}

/** Broad participation orientation surface: Discover / Learn / Participate / Preserve / Steward. */
export function getOrientationPathways(): { orientation: Orientation; label: string; pathways: { env: EcosystemEnvironment; label: string; href: string | null; availableNow: boolean }[] }[] {
  const labels: Record<Orientation, string> = {
    discover: 'Discover',
    learn: 'Learn',
    participate: 'Participate',
    preserve: 'Preserve',
    steward: 'Steward',
  };
  const groups: Record<Orientation, { env: EcosystemEnvironment; label: string; href: string | null; availableNow: boolean }[]> =
    { discover: [], learn: [], participate: [], preserve: [], steward: [] };
  for (const env of getPublicEnvironments()) {
    for (const p of env.participationPathways) {
      groups[p.orientation].push({ env, label: p.label, href: p.href, availableNow: p.availableNow });
    }
  }
  return (Object.keys(labels) as Orientation[]).map((o) => ({ orientation: o, label: labels[o], pathways: groups[o] }));
}

/** Canonical site routes (non-environment pages) + environment pages → sitemap + route tests. */
export function getAllPublicPaths(): { path: string; title: string }[] {
  const site: { path: string; title: string }[] = [
    { path: '/', title: 'Bridge Builders Collective' },
    { path: '/ecosystem/', title: 'Ecosystem' },
    { path: '/principles/', title: 'Principles' },
    { path: '/programs/', title: 'Programs' },
    { path: '/community/', title: 'Community' },
    { path: '/stewardship/', title: 'Stewardship' },
    { path: '/public-knowledge/', title: 'Public Knowledge' },
    { path: '/research/', title: 'Research' },
    { path: '/contribute/', title: 'Contribute' },
    { path: '/academy/', title: 'BridgeBuilders Academy' },
    { path: '/archive/', title: 'The Living Archive' },
    { path: '/rosetta/', title: 'System Rosetta Stone' },
    { path: '/sophia/', title: 'SOPHIA' },
    { path: '/trust/', title: 'Trust Center' },
    { path: '/accessibility/', title: 'Accessibility' },
    { path: '/sitemap/', title: 'Sitemap' },
  ];
  const envPages = getPublicEnvironments()
    .map((e) => ({ path: e.frontDoorPath ?? `/ecosystem/${e.slug}/`, title: e.publicName }))
    .filter((p) => !site.some((s) => s.path === p.path));
  return [...site, ...envPages];
}
