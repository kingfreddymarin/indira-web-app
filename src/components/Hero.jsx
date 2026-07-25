import React from 'react';
import { personalInfo } from '../data/cvData';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Award, ArrowRight, Download, Building2, Stethoscope, MapPin } from 'lucide-react';

export default function Hero() {
  const { language, t } = useLanguage();

  const iconMap = {
    Award: <Award size={22} color="var(--accent-emerald)" />,
    Building2: <Building2 size={22} color="var(--accent-teal)" />,
    Stethoscope: <Stethoscope size={22} color="var(--accent-gold)" />,
    MapPin: <MapPin size={22} color="var(--accent-blue)" />
  };

  const metrics = [
    { label: t('hero.metrics.years'), value: "15+", icon: "Award" },
    { label: t('hero.metrics.labs'), value: "6", icon: "Building2" },
    { label: t('hero.metrics.specialties'), value: "6+", icon: "Stethoscope" },
    { label: t('hero.metrics.zones'), value: "3", icon: "MapPin" }
  ];

  return (
    <section id="hero" style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Glow Effects in Background */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} className="animate-glow" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Content */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge">
                <ShieldCheck size={16} /> {t('hero.badge')}
              </span>
            </div>

            <h1 style={{ fontSize: '3rem', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              {t('hero.headlinePrefix')}
              <span className="text-gradient-emerald">{t('hero.headlineYears')}</span>
              {t('hero.headlineMiddle')}
              <span className="text-gradient-gold">{t('hero.headlineCountry')}</span>.
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '580px' }}>
              {t('hero.subtitlePrefix')}
              <strong style={{ color: 'var(--text-main)' }}>{t('hero.subtitleName')}</strong>
              {t('hero.subtitleBody')}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#contact" className="btn btn-primary">
                <span>{t('hero.ctaContact')}</span>
                <ArrowRight size={18} />
              </a>

              <a href="#experience" className="btn btn-secondary">
                <span>{t('hero.ctaExperience')}</span>
              </a>

              <a 
                href={`https://wa.me/${personalInfo.rawPhone}?text=${language === 'es' ? 'Estimada%20Licda.%20Indira,%20solicito%20su%20Curriculum%20Vitae%20y%20presentaci%C3%B3n.' : 'Dear%20Licda.%20Indira,%20I%20would%20like%20to%20request%20your%20CV%20and%20credentials.'}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}
              >
                <Download size={18} color="var(--accent-gold)" />
                <span>{t('hero.ctaCv')}</span>
              </a>
            </div>

            {/* Key Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              {metrics.map((metric, idx) => (
                <div key={idx} style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    {iconMap[metric.icon]}
                    <span style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                      {metric.value}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Container */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img
                src="/images/indira_portrait.jpg"
                alt="Licda. Indira Perea Milán"
                style={{
                  width: '100%',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  borderRadius: 'calc(var(--radius-lg) - 6px)',
                  display: 'block'
                }}
              />

              {/* Floating Glass Badge Bottom */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }} className="animate-float">
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>
                    Licda. Indira Perea Milán
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>
                    {t('hero.floatingBadgeRole')}
                  </div>
                </div>
                <div className="badge badge-gold" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                  <Award size={14} /> {t('hero.floatingBadgeLabs')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
