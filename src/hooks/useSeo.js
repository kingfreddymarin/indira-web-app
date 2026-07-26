import { useEffect } from 'react';

const SITE = 'https://indira-perea.web.app';

/** Create the tag if it isn't in index.html yet, then set its content. */
function setMeta(selector, attr, key, content) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function setLink(rel, href, extra = {}) {
  const selector = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    Object.entries(extra).forEach(([k, v]) => node.setAttribute(k, v));
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
}

/**
 * Keeps the document head in sync with the current route and language.
 *
 * index.html carries the Spanish tags so crawlers and social scrapers that do
 * not run JavaScript still get a complete, correct head. This hook updates
 * them for client-side navigation and for the language switch.
 */
export default function useSeo({ title, description, path = '/', image = '/og/portada.png', language = 'es' }) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const imageUrl = `${SITE}${image}`;
    const locale = language === 'es' ? 'es_NI' : 'en_US';

    document.title = title;
    document.documentElement.setAttribute('lang', language);

    setMeta('meta[name="description"]', 'name', 'description', description);

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', locale);

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    setLink('canonical', url);
    setLink('alternate', url, { hreflang: 'es' });
    setLink('alternate', url, { hreflang: 'en' });
    setLink('alternate', url, { hreflang: 'x-default' });
  }, [title, description, path, image, language]);
}
