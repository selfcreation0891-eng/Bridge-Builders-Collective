/**
 * Page content for the canonical front door.
 * Environment data always comes from the registry via selectors.
 */
import {
  getPublicEnvironments, getFeaturedEnvironments, getEnvironment, getBySlug,
  getOrientationPathways, getAllPublicPaths, STATUS_PRESENTATION,
} from '../ecosystem/index.ts';
import type { EcosystemEnvironment, EnvironmentStatus } from '../ecosystem/index.ts';
import { page, environmentPage, environmentCard, esc, badgeHtml, REPOSITORY_URL } from './html.ts';

const PRINCIPLES: string[] = [
  'Stability before stimulation.',
  'Clarity before complexity.',
  'Trust before scale.',
  'Continuity before growth.',
  'Stewardship before authority.',
  'Preservation before extraction.',
  'Regulation before engagement optimization.',
  'Support, not help.',
  'Orientation gained, not information delivered.',
  'Equal creative opportunity, not equal outcomes.',
  'Every presence is a gift.',
  'Open participation does not mean unrestricted authority.',
  'Human stewardship remains responsible for consequential decisions.',
];

function homePage(): string {
  const root = getEnvironment('bridge-builders-collective');
  const featured = getFeaturedEnvironments().filter((e) => e.id !== root.id);
  const developing = getPublicEnvironments().filter((e) => e.status === 'planned').slice(0, 6);
  const body = `
<h1>Bridge Builders Collective</h1>
<p>${esc(root.shortDescription)}</p>
<p>It is being built as durable, public-interest human infrastructure — living archives, stewardship
systems, governance you can read, and continuity architecture — for individuals, families, young people,
elders, communities, educators, creators, stewards, organizations, and institutions.</p>

<p>
  <a class="cta" href="/ecosystem/">Explore the ecosystem</a>
  <a class="cta secondary" href="/principles/">Read the principles</a>
  <a class="cta secondary" href="/contribute/">Share interest</a>
</p>

<h2>What you can do now</h2>
<ul>
  <li><a href="/ecosystem/">Explore every environment</a> and its honest status.</li>
  <li><a href="/principles/">Read the principles</a> the ecosystem is governed by.</li>
  <li><a href="/trust/">Read the trust documents</a> — privacy, consent, licensing, accessibility.</li>
  <li><a href="/contribute/">Share interest or ask a question</a> through a pathway that works today.</li>
</ul>

<h2>The ecosystem</h2>
<ul class="cards">
${featured.map(environmentCard).join('\n')}
</ul>
<p><a href="/ecosystem/">See all environments →</a></p>

<h2>Current status, honestly</h2>
<div class="notice" role="note"><strong>Where things stand:</strong> ${esc(root.accessNotice ?? '')}</div>
<p>Environments still being designed include:</p>
<ul>
${developing.map((e) => `<li><a href="${esc(e.frontDoorPath ?? '/ecosystem/' + e.slug + '/')}">${esc(e.publicName)}</a> — ${esc(STATUS_PRESENTATION[e.status].label.toLowerCase())}</li>`).join('\n')}
</ul>
<p>Every status on this site follows the public <a href="/trust/">Environment Status Standard</a>:
nothing is described as operational without evidence.</p>

<h2>Why trust this ecosystem</h2>
<p>${esc(root.trustNotice ?? '')} Its governance, consent requirements, archive protections, and the
boundaries on its advisory AI (<a href="/sophia/">SOPHIA</a>) are written down, versioned, and public —
before the software, not after. Read them in the <a href="/trust/">Trust Center</a>.</p>

<h2>What happens after you participate</h2>
<ul class="continuity">
  <li>Participation</li>
  <li>Informed orientation</li>
  <li>Consent where required</li>
  <li>Learning or contribution</li>
  <li>Steward review where required</li>
  <li>Preservation where authorized</li>
  <li>Community benefit</li>
  <li>Continuity</li>
</ul>
`;
  return page({ path: '/', title: 'Bridge Builders Collective', description: root.shortDescription, body });
}

function ecosystemPage(): string {
  const envs = getPublicEnvironments();
  const order: EnvironmentStatus[] = ['public', 'public-preview', 'invitation-required', 'steward-pilot', 'in-development', 'planned'];
  const groups = order
    .map((s) => ({ status: s, envs: envs.filter((e) => e.status === s) }))
    .filter((g) => g.envs.length > 0);
  const body = `
<h1>The ecosystem</h1>
<p>Every environment of Bridge Builders Collective, from one canonical registry, with its honest status.
Statuses follow the <a href="/trust/">Environment Status Standard</a>; destinations are never invented.</p>
${groups
  .map(
    (g) => `
<h2>${esc(STATUS_PRESENTATION[g.status].label)}</h2>
<p>${esc(STATUS_PRESENTATION[g.status].publicMeaning)}</p>
<ul class="cards">
${g.envs.map(environmentCard).join('\n')}
</ul>`,
  )
  .join('\n')}
`;
  return page({ path: '/ecosystem/', title: 'Ecosystem', description: 'Every environment of Bridge Builders Collective with its honest status.', body });
}

function principlesPage(): string {
  const body = `
<h1>Principles</h1>
<p>These principles are constitutional: no environment, program, or implementation may weaken them.
They are elaborated in the <a href="/trust/">Trust Center</a> and enforced through governance.</p>
<ol>
${PRINCIPLES.map((p) => `<li>${esc(p)}</li>`).join('\n')}
</ol>
<h2>What these mean in practice</h2>
<p>No manipulative engagement systems. No addiction-oriented design. No notification pressure.
No exaggerated claims. No institutional claims without evidence. Archives are preservation assets,
not extractive content. Consent is explicit, revocable, documented, and understandable.
Human stewards — not automated systems — make consequential decisions.</p>
<p><a href="/trust/">Read the full governance and trust documents →</a></p>
`;
  return page({ path: '/principles/', title: 'Principles', description: 'The constitutional principles of Bridge Builders Collective.', body });
}

function stewardshipPage(): string {
  const community = getEnvironment('community-stewardship');
  const relationship = getEnvironment('relationship-stewardship');
  const groups = getOrientationPathways();
  const steward = groups.find((g) => g.orientation === 'steward');
  const body = `
<h1>Stewardship</h1>
<p>Stewardship is accountable, long-term care of people, archives, and systems — prioritized over
authority and extraction. Stewards are trained community caretakers responsible for safety and
continuity; their responsibilities and escalation duties are public documents in the
<a href="/trust/">Trust Center</a>.</p>
<h2>Stewardship environments</h2>
<ul class="cards">
${[community, relationship].map(environmentCard).join('\n')}
</ul>
<h2>Becoming a steward</h2>
<p>Stewardship formation will run through <a href="/academy/">BridgeBuilders Academy</a> (planned).
${steward && steward.pathways.length ? '' : 'There is no open stewardship application yet — that is stated plainly rather than hidden behind a form that goes nowhere.'}
You can <a href="/contribute/">share interest now</a>; stewards will follow up as pathways open.</p>
<h2>How participation flows</h2>
<ul>
${groups.map((g) => `<li><strong>${esc(g.label)}</strong>: ${g.pathways.filter((p) => p.availableNow && p.href).slice(0, 3).map((p) => `<a href="${esc(p.href as string)}">${esc(p.label)}</a>`).join(' · ') || 'pathways are being prepared'}</li>`).join('\n')}
</ul>
`;
  return page({ path: '/stewardship/', title: 'Stewardship', description: 'How Bridge Builders Collective practices accountable, long-term care.', body });
}

function contributeExtra(): string {
  return `
<h2>Share interest or ask a question — available now</h2>
<p>Bridge Builders Collective does not yet publish a contact email or run submission forms:
consent capture, data retention, and follow-up ownership are not in place yet, and we will not
collect your information before they are (see the <a href="/trust/">Trust Center</a>).</p>
<p>What works today is the public project conversation:</p>
<p>
  <a class="cta" href="${REPOSITORY_URL}/issues" rel="external">Open a public conversation (GitHub)</a>
  <a class="cta secondary" href="${REPOSITORY_URL}" rel="external">Read the public repository</a>
</p>
<div class="notice" role="note"><strong>Before you post:</strong> conversations there are public.
Please do not share sensitive personal, health, family, or cultural material through this pathway —
the Living Archive's consent-protected intake is the future home for that, and it is not open yet.</div>
`;
}

function trustAreaRow(area: { name: string; protects: string; appliesTo: string; summary: string; source: string; sourceLabel: string; status: string }): string {
  return `<section>
<h2>${esc(area.name)}</h2>
<p><strong>What it protects:</strong> ${esc(area.protects)}</p>
<p><strong>Who it applies to:</strong> ${esc(area.appliesTo)}</p>
<p>${esc(area.summary)}</p>
<p><strong>Current effective status:</strong> ${esc(area.status)} · <strong>Last reviewed:</strong> 2026-07-15 ·
<a href="${esc(area.source)}" rel="external">Full document: ${esc(area.sourceLabel)}</a></p>
</section>`;
}

function trustPage(): string {
  const gh = (f: string) => `${REPOSITORY_URL}/blob/main/${f}`;
  const areas = [
    { name: 'Governance', protects: 'Participant safety, accountability, and continuity of decision-making.', appliesTo: 'Everyone who participates, and every steward.', summary: 'How the ecosystem is governed: stewardship over extraction, transparency, consent and safety, continuity and preservation, with founders, stewards, and advisory participants in defined roles.', source: gh('doc/GOVERNANCE.md'), sourceLabel: 'Governance Framework', status: 'Adopted (operational elaboration of the Constitution)' },
    { name: 'Constitution & authority order', protects: 'The identity, principles, and authority boundaries of the whole ecosystem.', appliesTo: 'Every environment, document, repository, and AI agent.', summary: 'One constitutional root defines identity, protected principles, consent, accessibility, archive protections, human authority, and SOPHIA\'s advisory limits; a single authority order resolves all conflicts.', source: gh('docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md'), sourceLabel: 'Bridge Builders Constitution', status: 'Adopted v1.0' },
    { name: 'Privacy', protects: 'Participant data, identity representation, and family memory materials.', appliesTo: 'All participants and contributors.', summary: 'Minimal collection, explicit revocable consent, no sale of personal data, role-based access, and archive materials treated as preservation assets — never extractive content.', source: gh('PRIVACY_POLICY.md'), sourceLabel: 'Privacy Policy', status: 'Draft — effective date pending steward completion' },
    { name: 'Terms of service', protects: 'Safe, lawful, respectful participation.', appliesTo: 'Everyone accessing ecosystem systems.', summary: 'Purpose, eligibility, acceptable use, stewardship conduct, intellectual property, archive participation, availability, liability limits, and safety escalation.', source: gh('TERMS_OF_SERVICE.md'), sourceLabel: 'Terms of Service', status: 'Draft — effective date and contact pending steward completion' },
    { name: 'Informed consent', protects: 'Your right to understand and control participation.', appliesTo: 'All participants; strictly enforced for archive contributions.', summary: 'Consent must be explicit, revocable, documented, and understandable. Consent systems may never be weakened to accelerate release. A dedicated consent-systems document is planned; the Privacy Policy is the current authority.', source: gh('PRIVACY_POLICY.md'), sourceLabel: 'Privacy Policy (consent sections)', status: 'Adopted principle; dedicated document planned' },
    { name: 'Data retention', protects: 'Predictable handling of stored information over time.', appliesTo: 'All operational, safety, archive, and analytics data.', summary: 'Categories, retention approach, user requests (access, correction, deletion, export), secure storage, and deletion procedures. Specific retention periods are pending steward completion.', source: gh('DATA_RETENTION_POLICY.md'), sourceLabel: 'Data Retention Policy', status: 'Draft — retention periods pending' },
    { name: 'Media licensing', protects: 'Contributor ownership of stories, media, and archive materials.', appliesTo: 'Everyone who contributes media or archive material.', summary: 'Contributors retain ownership; permissions are granted per submission; sensitive materials get restricted access; revocation requests are honored where operationally possible.', source: gh('MEDIA_LICENSING_POLICY.md'), sourceLabel: 'Media Licensing Policy', status: 'Draft — effective date pending' },
    { name: 'Accessibility', protects: 'Inclusive participation — including cognitive and emotional accessibility.', appliesTo: 'Every public surface of the ecosystem.', summary: 'WCAG alignment, keyboard access, semantic structure, screen-reader compatibility, and emotional accessibility: no overstimulation or manipulative pressure. This site\'s current review is public.', source: gh('ACCESSIBILITY_STANDARD.md'), sourceLabel: 'Accessibility Standard', status: 'Adopted; release review at /accessibility/' },
    { name: 'Incident response', protects: 'Participants during safety incidents, misuse, or governance breaches.', appliesTo: 'All environments; executed by stewards and administrators.', summary: 'Incident categories, four escalation levels, investigation procedures, confidentiality, and documentation requirements.', source: gh('INCIDENT_RESPONSE_PROTOCOL.md'), sourceLabel: 'Incident Response Protocol', status: 'Draft — effective date pending' },
    { name: 'Steward escalation', protects: 'Proportionate, accountable steward responses.', appliesTo: 'All stewards.', summary: 'Four-tier escalation structure from observation to emergency, documentation requirements, and steward accountability review.', source: gh('STEWARD_ESCALATION_MATRIX.md'), sourceLabel: 'Steward Escalation Matrix', status: 'Draft — effective date pending' },
    { name: 'Archive integrity', protects: 'The Living Archive as preservation, not extraction.', appliesTo: 'All archive materials and contributors.', summary: 'Constitutional protection: contributor ownership, lineage continuity, metadata integrity, restricted-access options, and a permanent bar on converting preservation into extraction.', source: gh('docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md'), sourceLabel: 'Constitution §7', status: 'Adopted v1.0' },
    { name: 'AI & SOPHIA boundaries', protects: 'Human authority over consequential decisions.', appliesTo: 'SOPHIA and any AI agent operating in the ecosystem.', summary: 'SOPHIA is advisory only: no independent publishing, approval, rejection, discipline, diagnosis, or governance decisions — constitutionally, before any implementation exists.', source: gh('docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md'), sourceLabel: 'Constitution §9', status: 'Adopted v1.0' },
    { name: 'Public claims standard', protects: 'You, from exaggerated or unevidenced claims by us.', appliesTo: 'Every public statement of the ecosystem.', summary: 'Ten evidence classes from "documented" to "outcome-supported"; production-readiness, partnerships, user counts, and outcomes are prohibited claims without evidence.', source: gh('docs/canonical/PUBLIC_CLAIMS_STANDARD.md'), sourceLabel: 'Public Claims Standard', status: 'Adopted v1.0' },
    { name: 'Participation & contribution boundaries', protects: 'Contributors and communities, especially around sensitive material.', appliesTo: 'All participation pathways.', summary: 'Open participation never confers authority; sensitive health, trauma, identity, youth, and cultural data are not collected until their safeguards are complete.', source: gh('docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md'), sourceLabel: 'Constitution §11–12', status: 'Adopted v1.0' },
  ];
  const body = `
<h1>Trust Center</h1>
<p>Everything the ecosystem promises, in one place — what each protection covers, who it applies to,
its honest current status, and the full source document. Effective dates and a public contact pathway
are pending steward completion and are marked accordingly; nothing here hides that.</p>
<div class="notice" role="note"><strong>Reporting pathway:</strong> a monitored contact email is pending
steward decision. Until it exists, safety, privacy, and accessibility concerns can be raised through the
<a href="${REPOSITORY_URL}/issues" rel="external">public repository conversation</a> (do not include
sensitive personal details there — it is public).</div>
${areas.map(trustAreaRow).join('\n')}
`;
  return page({ path: '/trust/', title: 'Trust Center', description: 'Governance, privacy, consent, accessibility, and every public protection of Bridge Builders Collective.', body });
}

function accessibilityPage(): string {
  const body = `
<h1>Accessibility</h1>
<p>Accessibility — including cognitive and emotional accessibility — is a constitutional obligation
of this ecosystem, never a styling preference.</p>
<h2>What this site does now</h2>
<ul>
  <li>Semantic headings and landmarks on every page, with a skip-to-content link.</li>
  <li>Full keyboard navigation with visible focus indicators; no hover-only interactions.</li>
  <li>Status conveyed by text labels, never by color alone.</li>
  <li>Respect for reduced-motion preferences; no autoplaying audio; no flashing content.</li>
  <li>Touch targets sized for mobile; no horizontal overflow at small widths.</li>
  <li>Readable typography and contrast-checked colors; text resizes with browser settings.</li>
  <li>No JavaScript is required to read or navigate any page.</li>
</ul>
<h2>Known limitations</h2>
<ul>
  <li>No human screen-reader audit has been performed yet — only structural checks. This is recorded in the release review.</li>
  <li>Content is currently English-only.</li>
  <li>A dedicated accessibility contact address is pending steward decision.</li>
</ul>
<h2>Reporting accessibility issues</h2>
<p>Until a contact address exists, please use the
<a href="${REPOSITORY_URL}/issues" rel="external">public repository conversation</a>.</p>
<p>The standard itself: <a href="${REPOSITORY_URL}/blob/main/ACCESSIBILITY_STANDARD.md" rel="external">Accessibility Standard</a> ·
the current release review: <a href="${REPOSITORY_URL}/blob/main/docs/ACCESSIBILITY_RELEASE_REVIEW.md" rel="external">Accessibility Release Review</a>.</p>
`;
  return page({ path: '/accessibility/', title: 'Accessibility', description: 'Accessibility commitments, current state, and known limitations of the Bridge Builders front door.', body });
}

function sitemapPage(): string {
  const paths = getAllPublicPaths();
  const body = `
<h1>Sitemap</h1>
<p>Every public page of this site, generated from the canonical registry and route table.</p>
<ul>
${paths.map((p) => `<li><a href="${esc(p.path)}">${esc(p.title)}</a></li>`).join('\n')}
</ul>
`;
  return page({ path: '/sitemap/', title: 'Sitemap', description: 'All public pages of the Bridge Builders Collective front door.', body });
}

/** Full route table: path → rendered HTML. */
export function renderAllPages(): Map<string, string> {
  const out = new Map<string, string>();
  out.set('/', homePage());
  out.set('/ecosystem/', ecosystemPage());
  out.set('/principles/', principlesPage());
  out.set('/stewardship/', stewardshipPage());
  out.set('/trust/', trustPage());
  out.set('/accessibility/', accessibilityPage());
  out.set('/sitemap/', sitemapPage());
  // Environment-backed routes (registry-driven).
  for (const env of getPublicEnvironments()) {
    const path = env.frontDoorPath ?? `/ecosystem/${env.slug}/`;
    if (out.has(path)) continue;
    out.set(path, environmentPage(env, env.id === 'contribution' ? contributeExtra() : ''));
  }
  // Not-found page.
  const nf = page({
    path: '/404/',
    title: 'Page not found',
    description: 'This page does not exist on the Bridge Builders Collective front door.',
    body: `<h1>Page not found</h1><p>This page does not exist. Nothing was hidden — it simply is not here.</p><p><a href="/">Return to the front door</a> or <a href="/sitemap/">see every page</a>.</p>`,
  });
  out.set('/404.html', nf);
  return out;
}
