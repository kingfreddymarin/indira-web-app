import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function References() {
  const { t } = useLanguage();
  const quotes = t('references.quotes');

  return (
    <section id="references" className="c-section light-green-4 tight" aria-labelledby="references-title">
      <div className="c-section__content left">
        <span className="c-eyebrow" data-ix="load-under">
          {t('references.badge')}
        </span>

        <h2 id="references-title" data-ix="load-right">
          {t('references.titlePrefix')}
          {t('references.titleHighlight')}
        </h2>

        <p className="lede measure-wide" data-ix="load-left">
          {t('references.subtitle')}
        </p>

        <div className="c-grid roomy" data-ix="staggar-load">
          {Array.isArray(quotes) &&
            quotes.map((quote) => (
              <figure className="c-quote" key={quote.name}>
                <blockquote className="c-quote__text">{quote.quote}</blockquote>
                <figcaption>
                  <div className="c-quote__name">{quote.name}</div>
                  <div className="c-quote__role">
                    {quote.role} · {quote.location}
                  </div>
                </figcaption>
              </figure>
            ))}
        </div>
      </div>
    </section>
  );
}
