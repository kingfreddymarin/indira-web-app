import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const credentials = t('hero.credentials');

  return (
    <section className="c-hero" id="hero" aria-labelledby="hero-title">
      <div className="c-hero__grid">
        <div className="c-stack">
          <h1 className="c-hero__title" id="hero-title" data-ix="load-right">
            {t('hero.displayLine1')}
            <br />
            <em>{t('hero.displayLine2')}</em>
          </h1>

          <p className="lede measure-wide" data-ix="load-left">
            {t('hero.subtitlePrefix')}
            <strong>{t('hero.subtitleName')}</strong>
            {t('hero.subtitleBody')}
          </p>

          <div className="c-button-group" data-ix="load-under">
            <a href="#contact" className="c-button">
              {t('hero.ctaContact')}
            </a>
            <a href="#formulary" className="c-button-outline">
              {t('hero.ctaExperience')}
            </a>
          </div>

          {Array.isArray(credentials) && (
            <ul className="c-credentials" data-ix="load-under">
              {credentials.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="c-hero__media" data-ix="staggar-load-2">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/portrait-480.webp 480w, /images/portrait-720.webp 720w, /images/portrait-1080.webp 1080w"
              sizes="(min-width: 900px) 45vw, 100vw"
            />
            <img
              className="c-hero__portrait"
              src="/images/portrait-720.jpg"
              srcSet="/images/portrait-480.jpg 480w, /images/portrait-720.jpg 720w, /images/portrait-1080.jpg 1080w"
              sizes="(min-width: 900px) 45vw, 100vw"
              alt="Licda. Indira Perea Milán"
              width="1083"
              height="1452"
              fetchpriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
