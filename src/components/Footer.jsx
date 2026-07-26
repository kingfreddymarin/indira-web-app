import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/cvData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('formulary.eyebrow'), href: '#formulary' },
    { name: t('nav.specialties'), href: '#specialties' },
    { name: t('nav.coverage'), href: '#coverage' }
  ];

  return (
    <footer className="c-footer">
      <div className="c-footer__inner">
        <p className="c-footer__statement">{t('footer.tagline')}</p>

        <div className="c-footer__cols">
          <div className="c-footer-column">
            <span className="c-title">{t('footer.contactTitle')}</span>
            <a href={`mailto:${personalInfo.email}`} className="c-footer-link">
              {personalInfo.email}
            </a>
            <a href={`tel:+${personalInfo.rawPhone}`} className="c-footer-link">
              {personalInfo.phone}
            </a>
            <span className="c-footer-text">Managua, Nicaragua</span>
          </div>

          <div className="c-footer-column">
            <span className="c-title">{t('footer.navTitle')}</span>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="c-footer-link">
                {link.name}
              </a>
            ))}
          </div>

          <div className="c-footer-column">
            <span className="c-title">{t('footer.profileTitle')}</span>
            <Link to="/cv" className="c-footer-link">
              {t('cv.linkLabel')}
            </Link>
            <a href="#references" className="c-footer-link">
              {t('footer.linkReferences')}
            </a>
            <a href="#achievements" className="c-footer-link">
              {t('nav.achievements')}
            </a>
            <a
              href={`https://wa.me/${personalInfo.rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="c-footer-link"
            >
              WhatsApp
            </a>
          </div>

          <div className="c-footer-column">
            <span className="c-title">{language === 'es' ? 'Idioma' : 'Language'}</span>
            <span className="c-footer-text">{t('footer.credential')}</span>
          </div>
        </div>
      </div>

      <div className="c-footer-bottom-2">
        <span>
          © {new Date().getFullYear()} Licda. Indira Perea Milán. {t('footer.rights')}
        </span>
        <span>{t('footer.credential')}</span>
      </div>
    </footer>
  );
}
