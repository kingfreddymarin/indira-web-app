import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Specialties() {
  const { t } = useLanguage();
  const items = t('specialties.items');

  return (
    <section id="specialties" className="c-section green tight" aria-labelledby="specialties-title">
      <div className="c-section__content left">
        <span className="c-eyebrow" data-ix="load-under">
          {t('specialties.badge')}
        </span>

        <h2 id="specialties-title" data-ix="load-right">
          {t('specialties.titlePrefix')}
          {t('specialties.titleHighlight')}
        </h2>

        <p className="lede measure-wide is-cream" data-ix="load-left">
          {t('specialties.subtitle')}
        </p>

        <div className="c-grid roomy" data-ix="staggar-load">
          {Array.isArray(items) &&
            items.map((item) => (
              <article className="c-specialty" key={item.id}>
                <span className="c-specialty__count">
                  {item.products.length} {t('formulary.countLabel')}
                </span>
                <h3 className="c-specialty__name">{item.name}</h3>
                <p className="c-card__text">{item.description}</p>
                <div className="c-specialty__brands">
                  {item.products.map((product) => (
                    <span className="c-specialty__brand" key={product}>
                      {product}
                    </span>
                  ))}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
