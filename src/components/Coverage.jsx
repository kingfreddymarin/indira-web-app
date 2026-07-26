import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Coverage() {
  const { language, t } = useLanguage();
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
            <div className="c-button-group">
              <a href="#contact" className="c-button">
                {t('coverage.bannerBtn')}
              </a>
            </div>
          </div>
          <div className="c-media-frame" data-ix="staggar-load-2">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/engagement-480.webp 480w, /images/engagement-720.webp 720w, /images/engagement-1080.webp 1080w"
                sizes="(min-width: 900px) 40vw, 100vw"
              />
              <img
                src="/images/engagement-720.jpg"
                srcSet="/images/engagement-480.jpg 480w, /images/engagement-720.jpg 720w, /images/engagement-1080.jpg 1080w"
                sizes="(min-width: 900px) 40vw, 100vw"
                alt={
                  language === 'es'
                    ? 'Profesional de la salud consultando disponibilidad de cobertura desde su móvil'
                    : 'Healthcare professional checking coverage availability from her phone'
                }
                width="1086"
                height="1448"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
