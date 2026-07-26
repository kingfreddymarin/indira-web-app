import React, { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function PlusIcon() {
  return (
    <svg className="close-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Entry({ item, isOpen, onToggle, labels }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);
  const baseId = useId().replace(/:/g, '');
  const panelId = `panel-${baseId}`;
  const buttonId = `trigger-${baseId}`;

  // Measure so the panel animates to its true height and re-measures when the
  // language switch swaps the copy or the viewport reflows it.
  useEffect(() => {
    const measure = () => setHeight(isOpen && bodyRef.current ? bodyRef.current.scrollHeight : 0);
    measure();

    if (!isOpen || !bodyRef.current) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(bodyRef.current);
    return () => observer.disconnect();
  }, [isOpen, item]);

  return (
    <div className="faq-p">
      <h3>
        <button
          type="button"
          id={buttonId}
          className="faq"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq__period">{item.period}</span>
          <span className="toggle-text">{item.company}</span>
          <PlusIcon />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-body"
        data-open={isOpen}
        style={{ height: `${height}px` }}
      >
        <div className="faq-body-cont faq-body-cont__indent" ref={bodyRef}>
          <p className="faq-role">{item.role}</p>
          <p>{item.description}</p>

          <div className="faq-field">
            <span className="faq-field__label">{labels.coverage.replace(/:\s*$/, '')}</span>
            <span>{item.location}</span>
          </div>

          <div className="faq-field">
            <span className="faq-field__label">{labels.products}</span>
            <div className="faq-meta">
              {item.products.map((product) => (
                <span key={product} className="c-label">
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div className="faq-field">
            <span className="faq-field__label">{labels.achievements}</span>
            <ul className="faq-list">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const items = t('experience.items');

  const labels = {
    coverage: t('experience.coverageLabel'),
    products: t('experience.productsLabel'),
    achievements: t('experience.achievementsLabel')
  };

  return (
    <section id="experience" className="c-section" aria-labelledby="experience-title">
      <div className="c-section__content left">
        <span className="c-eyebrow" data-ix="load-under">
          {t('experience.badge')}
        </span>

        <h2 id="experience-title" data-ix="load-right">
          {t('experience.titlePrefix')}
          {t('experience.titleHighlight')}
        </h2>

        <p className="lede measure-wide" data-ix="load-left">
          {t('experience.subtitle')}
        </p>

        <div className="c-accordion" data-ix="staggar-load">
          {Array.isArray(items) &&
            items.map((item, index) => (
              <Entry
                key={item.company + item.period}
                item={item}
                labels={labels}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
