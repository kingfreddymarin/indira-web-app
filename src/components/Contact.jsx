import React, { useRef, useState } from 'react';
import { personalInfo } from '../data/cvData';
import { useLanguage } from '../context/LanguageContext';

const SUBJECT_KEYS = ['rep', 'training', 'refs', 'other'];

export default function Contact() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', subject: 'rep', message: '' });
  const [errors, setErrors] = useState({});
  const fieldRefs = { name: useRef(null), contact: useRef(null), message: useRef(null) };

  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) next.name = t('contact.errorName');
    if (!values.contact.trim()) next.contact = t('contact.errorContact');
    if (!values.message.trim()) next.message = t('contact.errorMessage');
    return next;
  };

  const update = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    // Clear an error as soon as the person fixes it, rather than on next submit
    if (errors[field] && value.trim()) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);

    if (Object.keys(found).length) {
      setErrors(found);
      const first = ['name', 'contact', 'message'].find((key) => found[key]);
      fieldRefs[first]?.current?.focus();
      return;
    }

    setErrors({});
    setSubmitted(true);

    const subject = t(`contact.subjects.${form.subject}`);
    const lines =
      language === 'es'
        ? [
            'Hola Licda. Indira Perea,',
            '',
            `Mi nombre es: ${form.name}`,
            `Correo/Tel: ${form.contact}`,
            `Asunto: ${subject}`,
            `Mensaje: ${form.message}`
          ]
        : [
            'Hello Licda. Indira Perea,',
            '',
            `My name is: ${form.name}`,
            `Contact: ${form.contact}`,
            `Subject: ${subject}`,
            `Message: ${form.message}`
          ];

    window.open(
      `https://wa.me/${personalInfo.rawPhone}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    );
  };

  const field = (name, label, Element = 'input', extra = {}) => (
    <div className="c-field">
      <label className="c-field__label" htmlFor={`field-${name}`}>
        {label}
      </label>
      <Element
        id={`field-${name}`}
        ref={fieldRefs[name]}
        className="c-form-field"
        name={name}
        value={form[name]}
        onChange={update(name)}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `error-${name}` : undefined}
        {...extra}
      />
      {errors[name] && (
        <p className="c-field__error" id={`error-${name}`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="c-section light-green2" aria-labelledby="contact-title">
      <div className="c-split">
        <div className="c-stack">
          <span className="c-eyebrow" data-ix="load-under">
            {t('contact.badge')}
          </span>

          <h2 id="contact-title" data-ix="load-right">
            {t('contact.titlePrefix')}
            {t('contact.titleHighlight')}
          </h2>

          <p className="lede measure-wide">{t('contact.subtitle')}</p>

          <div className="c-stack" style={{ gap: '1.25rem' }}>
            <div className="c-field">
              <span className="c-field__label">{t('contact.phoneLabel')}</span>
              <a className="c-textlink" href={`tel:+${personalInfo.rawPhone}`}>
                {personalInfo.phone}
              </a>
            </div>
            <div className="c-field">
              <span className="c-field__label">{t('contact.emailLabel')}</span>
              <a className="c-textlink" href={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
              </a>
            </div>
            <div className="c-field">
              <span className="c-field__label">{t('contact.addressLabel')}</span>
              <span className="c-card__text">{personalInfo.location}</span>
            </div>
          </div>
        </div>

        <div data-ix="staggar-load" style={{ width: '100%' }}>
          {submitted ? (
            <div className="success-message" role="status">
              <h3 className="c-card__title">{t('contact.successTitle')}</h3>
              <p className="c-card__text">{t('contact.successSub')}</p>
              <button
                type="button"
                className="c-button-outline"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', contact: '', subject: 'rep', message: '' });
                }}
              >
                {t('contact.sendAnother')}
              </button>
            </div>
          ) : (
            <form className="c-form" onSubmit={handleSubmit} noValidate>
              {field('name', t('contact.nameLabel'), 'input', {
                type: 'text',
                maxLength: 120,
                autoComplete: 'name',
                placeholder: t('contact.namePlaceholder')
              })}

              {field('contact', t('contact.emailOrPhoneLabel'), 'input', {
                type: 'text',
                maxLength: 160,
                placeholder: t('contact.emailOrPhonePlaceholder')
              })}

              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="c-field__label" style={{ padding: 0 }}>
                  {t('contact.subjectLabel')}
                </legend>
                <div className="c-radios-inner" style={{ marginTop: '0.75rem' }}>
                  {SUBJECT_KEYS.map((key) => (
                    <label
                      key={key}
                      className={`c-radio-label${form.subject === key ? ' is-checked' : ''}`}
                    >
                      <input
                        type="radio"
                        name="subject"
                        value={key}
                        checked={form.subject === key}
                        onChange={update('subject')}
                        className="u-visually-hidden"
                      />
                      {t(`contact.subjects.${key}`)}
                    </label>
                  ))}
                </div>
              </fieldset>

              {field('message', t('contact.messageLabel'), 'textarea', {
                rows: 4,
                maxLength: 1200,
                placeholder: t('contact.messagePlaceholder')
              })}

              <div className="c-button-group">
                <button type="submit" className="c-button">
                  {t('contact.submitBtn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
