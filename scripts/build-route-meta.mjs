/**
 * Static head tags per route.
 *
 * The site is a single-page app, so every URL is served the same index.html.
 * Google renders JavaScript and would see the tags useSeo sets at runtime, but
 * social scrapers (WhatsApp, Facebook, LinkedIn, X) do not — they read the raw
 * HTML. Without this step, sharing /cv would show the home page's card.
 *
 * After the Vite build, this writes dist/<route>/index.html with that route's
 * Spanish title, description, canonical and Open Graph image baked in. Firebase
 * serves those files directly and only falls back to the SPA rewrite for URLs
 * that have no file, so the client-side router still handles everything else.
 */

import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://indira-perea.web.app';
const DIST = path.resolve('dist');

const routes = [
  {
    path: 'cv',
    title: 'Curriculum Vitae | Licda. Indira Perea Milán, Visitadora Médica en Nicaragua',
    description:
      'Curriculum vitae completo de la Licda. Indira Perea Milán: 15 años de experiencia en visita médica, marcas promovidas, formación académica, reconocimientos y referencias verificables en Nicaragua.',
    image: '/og/portada-cv.png'
  }
];

const source = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

/** Replace the content of a meta/title tag without touching the rest of the head. */
function swap(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`build-route-meta: pattern not found — ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

for (const route of routes) {
  const url = `${SITE}/${route.path}`;
  let html = source;

  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);

  html = swap(
    html,
    /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
    `$1${route.description}$2`
  );

  html = swap(
    html,
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${url}$2`
  );

  html = swap(
    html,
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${url}$2`
  );

  html = swap(
    html,
    /(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/,
    `$1${route.title}$2`
  );

  html = swap(
    html,
    /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
    `$1${route.description}$2`
  );

  html = swap(
    html,
    /(<meta property="og:image" content=")[^"]*(")/,
    `$1${SITE}${route.image}$2`
  );

  html = swap(
    html,
    /(<meta name="twitter:image" content=")[^"]*(")/,
    `$1${SITE}${route.image}$2`
  );

  html = swap(
    html,
    /(<meta\s+name="twitter:title"\s+content=")[\s\S]*?(")/,
    `$1${route.title}$2`
  );

  html = swap(
    html,
    /(<meta\s+name="twitter:description"\s+content=")[\s\S]*?(")/,
    `$1${route.description}$2`
  );

  // hreflang alternates point at this route, not the home page
  html = html.replace(
    /<link rel="alternate" hreflang="([^"]+)" href="[^"]*" \/>/g,
    `<link rel="alternate" hreflang="$1" href="${url}" />`
  );

  const dir = path.join(DIST, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`build-route-meta: wrote dist/${route.path}/index.html`);
}
