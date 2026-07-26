import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/cvData';
import { useLanguage } from '../context/LanguageContext';
import useScrollSpy from '../hooks/useScrollSpy';
import useFocusTrap from '../hooks/useFocusTrap';

const SECTION_IDS = ['about', 'experience', 'formulary', 'specialties', 'coverage', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const activeId = useScrollSpy(SECTION_IDS);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const menuRef = useFocusTrap(menuOpen, closeMenu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about', id: 'about' },
    { name: t('nav.experience'), href: '#experience', id: 'experience' },
    { name: t('formulary.eyebrow'), href: '#formulary', id: 'formulary' },
    { name: t('nav.specialties'), href: '#specialties', id: 'specialties' },
    { name: t('nav.coverage'), href: '#coverage', id: 'coverage' }
  ];

  const waHref = `https://wa.me/${personalInfo.rawPhone}?text=${
    language === 'es'
      ? 'Hola%20Licda.%20Indira,%20deseo%20contactarla%20para%20una%20consulta%20profesional.'
      : 'Hello%20Licda.%20Indira,%20I%20would%20like%20to%20connect%20for%20a%20professional%20consultation.'
  }`;

  return (
    <>
      <a className="skip-link" href="#main">
        {language === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <header className={`c-navbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="c-navbar__container">
          <a href="#hero" className="c-navbar__brand">
            <span className="c-navbar__brand-name">Indira Perea</span>
            <span className="c-navbar__brand-sub">
              {language === 'es' ? 'Licda. en Química y Farmacia' : 'B.S. Chemistry & Pharmacy'}
            </span>
          </a>

          <nav className="c-navbar__menu" aria-label={language === 'es' ? 'Principal' : 'Primary'}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="c-navlink"
                aria-current={activeId === link.id ? 'true' : undefined}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="c-navbar__actions">
            <button
              type="button"
              className="c-navlink"
              onClick={toggleLanguage}
              lang={language === 'es' ? 'en' : 'es'}
            >
              {language === 'es' ? 'English' : 'Español'}
            </button>
            <Link to="/cv" className="c-navlink">
              {t('cv.linkLabel')}
            </Link>
            <a href="#contact" className="c-button c-navbar__cta">
              {t('nav.contact')}
            </a>
          </div>

          <button
            type="button"
            aria-label={
              menuOpen
                ? language === 'es' ? 'Cerrar menú' : 'Close menu'
                : language === 'es' ? 'Abrir menú' : 'Open menu'
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={`hamburger-menu${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        ref={menuRef}
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        {...(menuOpen ? {} : { inert: '' })}
      >
        <nav className="mobile-nav-inner" aria-label={language === 'es' ? 'Principal' : 'Primary'}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-mobile"
              aria-current={activeId === link.id ? 'true' : undefined}
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}

          <Link to="/cv" className="nav-link-mobile" onClick={closeMenu}>
            {t('cv.linkLabel')}
          </Link>

          <div className="mobile-nav__footer">
            <a href="#contact" className="c-button" onClick={closeMenu}>
              {t('nav.contact')}
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="c-button-outline">
              {t('nav.whatsapp')}
            </a>
            <button
              type="button"
              className="c-textlink"
              lang={language === 'es' ? 'en' : 'es'}
              onClick={() => {
                toggleLanguage();
                closeMenu();
              }}
            >
              {language === 'es' ? 'Read in English' : 'Ver en español'}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
