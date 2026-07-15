/**
 * HTML rendering helpers for the canonical front door.
 * All ecosystem data flows in from src/ecosystem selectors — never hardcode
 * environment names, descriptions, statuses, or destinations here.
 */
import { getPrimaryNavigation, getFooterGroups, statusBadge, getRelatedEnvironments } from '../ecosystem/index.ts';
import type { EcosystemEnvironment } from '../ecosystem/index.ts';

export const REPOSITORY_URL = 'https://github.com/selfcreation0891-eng/Bridge-Builders-Collective';

export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function badgeHtml(env: EcosystemEnvironment): string {
  const b = statusBadge(env);
  return `<span class="badge" data-status="${esc(env.status)}">${esc(b.label)}</span>`;
}

export function environmentCard(env: EcosystemEnvironment): string {
  const href = env.frontDoorPath ?? `/ecosystem/${env.slug}/`;
  return `<li class="card">
    <h3><a href="${esc(href)}">${env.icon ? esc(env.icon) + ' ' : ''}${esc(env.publicName)}</a></h3>
    ${badgeHtml(env)}
    <p>${esc(env.shortDescription)}</p>
  </li>`;
}

export function noticeHtml(kind: 'access' | 'trust', text: string): string {
  const label = kind === 'access' ? 'Access notice' : 'Trust notice';
  return `<div class="notice" role="note"><strong>${label}:</strong> ${esc(text)}</div>`;
}

function navHtml(currentPath: string): string {
  const items = getPrimaryNavigation();
  const li = items
    .map((i) => `<li><a href="${esc(i.href)}"${i.href === currentPath ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`)
    .join('\n');
  return `
  <nav class="primary" aria-label="Primary">
    <ul>
${li}
    </ul>
  </nav>
  <details class="mobile-nav">
    <summary aria-label="Open navigation menu">Menu</summary>
    <nav aria-label="Primary (mobile)"><ul>
${li}
    </ul></nav>
  </details>`;
}

function footerHtml(): string {
  const groups = getFooterGroups()
    .map(
      (g) => `<section aria-label="${esc(g.heading)}"><h2>${esc(g.heading)}</h2><ul>
${g.items.map((i) => `<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`).join('\n')}
      </ul></section>`,
    )
    .join('\n');
  return `<footer class="site">
    <div class="footer-inner">
${groups}
    </div>
    <p class="footer-legal">Bridge Builders Collective — a human-centered ecosystem in development.
      Statuses on this site follow the public <a href="/trust/">Environment Status Standard</a>.
      Source: <a href="${REPOSITORY_URL}" rel="external">public repository</a>.</p>
  </footer>`;
}

export function page(opts: { path: string; title: string; description: string; body: string }): string {
  const fullTitle =
    opts.path === '/' ? 'Bridge Builders Collective' : `${opts.title} — Bridge Builders Collective`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(opts.description)}">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site">
  <div class="header-inner">
    <a class="brand" href="/">Bridge Builders Collective</a>
${navHtml(opts.path)}
  </div>
</header>
<main id="main">
${opts.body}
</main>
${footerHtml()}
</body>
</html>
`;
}

/** Truthful status page template for any environment. */
export function environmentPage(env: EcosystemEnvironment, extra = ''): string {
  const related = getRelatedEnvironments(env);
  const b = statusBadge(env);
  const pathways = env.participationPathways
    .map((p) =>
      p.availableNow && p.href
        ? `<li><a href="${esc(p.href)}">${esc(p.label)}</a> — available now</li>`
        : `<li>${esc(p.label)} — not yet available</li>`,
    )
    .join('\n');
  const body = `
<h1>${env.icon ? esc(env.icon) + ' ' : ''}${esc(env.publicName)}</h1>
<p>${badgeHtml(env)} <span>${esc(b.publicMeaning)}</span></p>
<p>${esc(env.fullDescription)}</p>
${env.accessNotice ? noticeHtml('access', env.accessNotice) : ''}
${env.trustNotice ? noticeHtml('trust', env.trustNotice) : ''}
<h2>What exists now</h2>
${env.capabilities.length ? `<ul>${env.capabilities.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : '<p>Nothing is publicly usable yet. That is stated plainly on purpose.</p>'}
<h2>What is still developing</h2>
<ul>${env.developing.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
<h2>Who it is for</h2>
<p>${env.audiences.map((a) => esc(a.replace(/-/g, ' '))).join(', ')}.</p>
<h2>Participation pathways</h2>
<ul>${pathways}</ul>
${extra}
${related.length ? `<h2>Related environments</h2><ul class="cards">${related.map(environmentCard).join('\n')}</ul>` : ''}
<p><a href="/ecosystem/">← Back to the ecosystem overview</a></p>
`;
  return page({
    path: env.frontDoorPath ?? `/ecosystem/${env.slug}/`,
    title: env.publicName,
    description: env.shortDescription,
    body,
  });
}
