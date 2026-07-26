import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { value: '15+', label: t('hero.metrics.years') },
    { value: '6', label: t('hero.metrics.labs') },
    { value: '6', label: t('hero.metrics.specialties') },
    { value: '3', label: t('hero.metrics.zones') }
  ];

  return (
    <>
      <section id="about" className="c-section green" aria-labelledby="about-title">
        <div className="c-section__content left">
          <span className="c-eyebrow" data-ix="load-under">
            {t('about.badge')}
          </span>

          <h2 id="about-title" className="measure" data-ix="load-right">
            {t('about.titlePrefix')}
            {t('about.titleHighlight')}
          </h2>

          <p className="lede measure-wide is-cream" data-ix="load-left">
            {t('about.subtitle')}
          </p>

          <div className="c-stats" data-ix="staggar-load">
            {stats.map((stat) => (
              <div className="c-stat" key={stat.label}>
                <span className="c-stat__value">{stat.value}</span>
                <span className="c-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="c-section tight" aria-labelledby="philosophy-title">
        <div className="c-split">
          <div className="c-stack">
            <span className="c-eyebrow" data-ix="load-under">
              {t('about.philosophyTitle')}
            </span>
            <h2 id="philosophy-title" data-ix="load-right">
              {t('about.skillsTitle')}
            </h2>
          </div>

          <div className="c-stack" data-ix="load-left">
            <p className="lede">{t('about.philosophyText1')}</p>
            <p>{t('about.philosophyText2')}</p>

            <ul className="c-card__list" style={{ width: '100%' }}>
              {(t('about.skillsList') || []).map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>

            <p className="c-eyebrow">{t('about.degreeTitle')}</p>
            <p className="c-card__text">{t('about.degreeSub')}</p>
          </div>
        </div>
      </section>

      <div className="c-image-full-width" role="presentation" data-ix="staggar-load" />
    </>
  );
}
