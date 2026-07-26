import React, { useCallback, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useFocusTrap from '../hooks/useFocusTrap';

function CredentialDialog({ item, onClose, t }) {
  const panelRef = useFocusTrap(true, onClose);

  return (
    <div
      className="c-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="c-modal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="credential-title"
      >
        <button
          type="button"
          className="c-modal__close"
          aria-label={t('achievements.closeModal')}
          onClick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <span className="c-eyebrow">{item.category}</span>
        <h3 id="credential-title">{item.title}</h3>
        <p>{item.description}</p>

        <div className="c-field">
          <span className="c-field__label">{t('achievements.issuedBy')}</span>
          <span>{item.entity}</span>
        </div>

        <div className="c-field">
          <span className="c-field__label">{t('achievements.yearRecorded')}</span>
          <span>{item.year}</span>
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const items = t('achievements.items');
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="achievements" className="c-section tight" aria-labelledby="achievements-title">
      <div className="c-section__content left">
        <span className="c-eyebrow" data-ix="load-under">
          {t('achievements.badge')}
        </span>

        <h2 id="achievements-title" data-ix="load-right">
          {t('achievements.titlePrefix')}
          {t('achievements.titleHighlight')}
        </h2>

        <p className="lede measure-wide" data-ix="load-left">
          {t('achievements.subtitle')}
        </p>

        <div className="c-grid" data-ix="staggar-load">
          {Array.isArray(items) &&
            items.map((item) => (
              <article className="c-card" key={item.id}>
                <span className="c-eyebrow">{item.year}</span>
                <h3 className="c-card__title">{item.title}</h3>
                <p className="c-card__text">{item.entity}</p>
                <div className="c-card__foot">
                  <button
                    type="button"
                    className="c-textlink"
                    onClick={() => setSelected(item)}
                  >
                    {t('achievements.viewCredential')}
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>

      {selected && <CredentialDialog item={selected} onClose={close} t={t} />}
    </section>
  );
}
