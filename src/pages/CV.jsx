import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/cvData';
import { useLanguage } from '../context/LanguageContext';
import useScrollSpy from '../hooks/useScrollSpy';
import useSeo from '../hooks/useSeo';
import '../styles/cv.css';

const SECTION_KEYS = [
  'profile',
  'experience',
  'education',
  'skills',
  'areas',
  'awards',
  'coverage',
  'references'
];

function PlusIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ExperienceEntry({ item, isOpen, onToggle, labels, index }) {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);
  const panelId = `cv-exp-panel-${index}`;
  const triggerId = `cv-exp-trigger-${index}`;

  useEffect(() => {
    const measure = () => setHeight(isOpen && panelRef.current ? panelRef.current.scrollHeight : 0);
    measure();
    if (!isOpen || !panelRef.current) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [isOpen, item]);

  return (
    <div className="cv-entry">
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={triggerId}
          className="cv-entry__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="cv-entry__years">{item.period}</span>
          <span className="cv-entry__company">{item.company}</span>
          <span className="cv-entry__role">{item.role}</span>
          <PlusIcon className="cv-entry__icon" />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="cv-entry__panel"
        style={{ height: `${height}px` }}
      >
        <div className="cv-entry__inner" ref={panelRef}>
          <p>{item.description}</p>

          <div className="cv-field">
            <span className="cv-field__label">{labels.zone}</span>
            <span>{item.location}</span>
          </div>

          <div className="cv-field">
            <span className="cv-field__label">{labels.brands}</span>
            <ul className="cv-taglist">
              {item.products.map((product) => (
                <li className="cv-tag" key={product}>
                  {product}
                </li>
              ))}
            </ul>
          </div>

          <div className="cv-field">
            <span className="cv-field__label">{labels.tasks}</span>
            <ul className="cv-list">
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

export default function CV() {
  const { language, toggleLanguage, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const sectionIds = SECTION_KEYS.map((key) => `cv-${key}`);
  const activeId = useScrollSpy(sectionIds, 140);

  const experience = t('experience.items') || [];
  const education = t('about.educationItems') || [];
  const skills = t('about.skillsList') || [];
  const specialties = t('specialties.items') || [];
  const awards = t('achievements.items') || [];
  const coverage = t('coverage.items') || [];
  const references = t('references.quotes') || [];

  const labels = {
    zone: t('cv.zoneLabel'),
    brands: t('cv.brandsLabel'),
    tasks: t('cv.tasksLabel')
  };

  useSeo({
    title: t('seo.cv.title'),
    description: t('seo.cv.description'),
    path: '/cv',
    image: '/og/portada-cv.png',
    language
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const section = (key, meta, children) => (
    <section className="cv-section" id={`cv-${key}`} aria-labelledby={`cv-${key}-title`} key={key}>
      <div className="cv-section__head">
        <h2 className="cv-section__title" id={`cv-${key}-title`}>
          {t(`cv.sections.${key}`)}
        </h2>
        {meta && <span className="cv-section__meta">{meta}</span>}
      </div>
      {children}
    </section>
  );

  return (
    <div className="cv">
      <div className="cv-bar">
        <Link to="/" className="cv-bar__back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 2L4 8l6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('cv.backLabel')}
        </Link>

        <div className="cv-bar__actions">
          <button
            type="button"
            className="cv-lang"
            onClick={toggleLanguage}
            lang={language === 'es' ? 'en' : 'es'}
          >
            {language === 'es' ? 'English' : 'Español'}
          </button>
          <button type="button" className="cv-print" onClick={() => window.print()}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4.5 6V2h7v4M4.5 12H3V7h10v5h-1.5M4.5 10h7v4h-7z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            {t('cv.printLabel')}
          </button>
        </div>
      </div>

      <div className="cv-layout">
        <header className="cv-masthead">
          <div className="cv-masthead__head">
            <div>
              <span className="cv-masthead__doc">{t('cv.documentLabel')}</span>
              <h1 className="cv-masthead__name">{personalInfo.fullName}</h1>
            </div>
            <picture>
              <source
                type="image/webp"
                srcSet="/images/portrait-480.webp 480w, /images/portrait-720.webp 720w"
                sizes="(min-width: 40em) 9rem, 5.5rem"
              />
              <img
                className="cv-portrait"
                src="/images/portrait-480.jpg"
                alt={personalInfo.fullName}
                width="1083"
                height="1452"
              />
            </picture>
          </div>
          <p className="cv-masthead__role">
            {language === 'es'
              ? 'Especialista en adopción farmacéutica y relacionamiento médico'
              : 'Pharmaceutical adoption and physician relations specialist'}
          </p>

          <dl className="cv-contact">
            <div>
              <dt>{t('cv.phone')}</dt>
              <dd>
                <a href={`tel:+${personalInfo.rawPhone}`}>{personalInfo.phone}</a>
              </dd>
            </div>
            <div>
              <dt>{t('cv.email')}</dt>
              <dd>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t('cv.address')}</dt>
              <dd>{personalInfo.location}</dd>
            </div>
            <div>
              <dt>{t('cv.vehicle')}</dt>
              <dd>{t('about.mobilitySub')}</dd>
            </div>
          </dl>
        </header>

        <nav className="cv-index" aria-label={t('cv.indexLabel')}>
          <ul className="cv-index__list">
            {SECTION_KEYS.map((key) => (
              <li key={key}>
                <a
                  href={`#cv-${key}`}
                  aria-current={activeId === `cv-${key}` ? 'true' : undefined}
                >
                  {t(`cv.sections.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="cv-body">
          {section(
            'profile',
            null,
            <div className="cv-prose">
              <p>{t('about.philosophyText1')}</p>
              <p>{t('about.philosophyText2')}</p>
              <div className="cv-field" style={{ marginTop: '0.5rem' }}>
                <span className="cv-field__label">{t('cv.objectiveTitle')}</span>
                <p>{t('cv.objectiveText')}</p>
              </div>
            </div>
          )}

          {section(
            'experience',
            `${experience.length}`,
            <div className="cv-records">
              {experience.map((item, index) => (
                <ExperienceEntry
                  key={item.company + item.period}
                  item={item}
                  index={index}
                  labels={labels}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          )}

          {section(
            'education',
            `${education.length}`,
            <div className="cv-records">
              {education.map((item) => (
                <div className="cv-record" key={item.year + item.title}>
                  <span className="cv-record__year">{item.year}</span>
                  <span className="cv-record__title">{item.title}</span>
                  <span className="cv-record__sub">{item.sub}</span>
                </div>
              ))}
            </div>
          )}

          {section(
            'skills',
            null,
            <ul className="cv-skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          )}

          {section(
            'areas',
            `${specialties.length}`,
            <div className="cv-records">
              {specialties.map((item) => (
                <div className="cv-record" key={item.id}>
                  <span className="cv-record__year">{item.products.length}</span>
                  <span className="cv-record__title">{item.name}</span>
                  <span className="cv-record__sub">{item.description}</span>
                  <ul className="cv-taglist" style={{ marginTop: '0.5rem' }}>
                    {item.products.map((product) => (
                      <li className="cv-tag plain" key={product}>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {section(
            'awards',
            `${awards.length}`,
            <div className="cv-records">
              {awards.map((item) => (
                <div className="cv-record" key={item.id}>
                  <span className="cv-record__year">{item.year}</span>
                  <span className="cv-record__title">{item.title}</span>
                  <span className="cv-record__sub">{item.entity}</span>
                  <p className="cv-record__body">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {section(
            'coverage',
            `${coverage.length}`,
            <div className="cv-records">
              {coverage.map((item) => (
                <div className="cv-record" key={item.region}>
                  <span className="cv-record__year">{item.badge}</span>
                  <span className="cv-record__title">{item.region}</span>
                  <span className="cv-record__sub">{item.details}</span>
                  <ul className="cv-list" style={{ marginTop: '0.5rem' }}>
                    {item.keyLocations.map((location) => (
                      <li key={location}>{location}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {section(
            'references',
            `${references.length}`,
            <>
              <div className="cv-records">
                {references.map((quote) => (
                  <div className="cv-record" key={quote.name}>
                    <span className="cv-record__year">{quote.phone}</span>
                    <span className="cv-record__title">{quote.name}</span>
                    <span className="cv-record__sub">
                      {quote.role} · {quote.location}
                    </span>
                  </div>
                ))}
              </div>
              <p className="cv-note">{t('cv.referenceNote')}</p>
            </>
          )}
        </main>

        <div className="cv-foot">
          <span>
            © {new Date().getFullYear()} {personalInfo.fullName}
          </span>
          <span>{t('footer.credential')}</span>
        </div>
      </div>
    </div>
  );
}
