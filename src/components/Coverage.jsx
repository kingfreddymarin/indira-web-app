import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Coverage() {
  const { t } = useLanguage();
  const items = t('coverage.items');

  return (
    <section id="coverage" className="c-section blue tight" aria-labelledby="coverage-title">
      <div className="c-section__content left">
        <span className="c-eyebrow" data-ix="load-under">
          {t('coverage.badge')}
        </span>

        <h2 id="coverage-title" data-ix="load-right">
          {t('coverage.titlePrefix')}
          {t('coverage.titleHighlight')}
        </h2>

        <p className="lede measure-wide" data-ix="load-left">
          {t('coverage.subtitle')}
        </p>

        <div className="c-grid" data-ix="staggar-load">
          {Array.isArray(items) &&
            items.map((item) => (
              <article className="c-card" key={item.region}>
                <span className="c-eyebrow">{item.badge}</span>
                <h3 className="c-card__title">{item.region}</h3>
                <p className="c-card__text">{item.details}</p>
                <ul className="c-card__list">
                  {item.keyLocations.map((location) => (
                    <li key={location}>{location}</li>
                  ))}
                </ul>
              </article>
            ))}
        </div>

        <div className="c-split" data-ix="load-under" style={{ alignItems: 'center' }}>
          <div className="c-stack">
            <h3>{t('coverage.bannerTitle')}</h3>
            <p className="c-card__text">{t('coverage.bannerSubtitle')}</p>
          </div>
          <div className="c-button-group">
            <a href="#contact" className="c-button">
              {t('coverage.bannerBtn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
