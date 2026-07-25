import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, ShieldCheck, HeartHandshake, Car, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const skills = t('about.skillsList');

  return (
    <section id="about" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge">
            <Sparkles size={14} /> {t('about.badge')}
          </span>
          <h2 className="section-title">
            {t('about.titlePrefix')}
            <span className="text-gradient-emerald">{t('about.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'stretch' }} className="about-grid">
          
          {/* Left: Biography & Philosophy */}
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '0.6rem',
                  borderRadius: '12px',
                  color: 'var(--accent-emerald)'
                }}>
                  <HeartHandshake size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>{t('about.philosophyTitle')}</h3>
              </div>

              <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '1.02rem', lineHeight: '1.7' }}>
                {t('about.philosophyText1')}
              </p>

              <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '1.02rem', lineHeight: '1.7' }}>
                {t('about.philosophyText2')}
              </p>
            </div>

            {/* Academic Tile */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                padding: '0.75rem',
                borderRadius: '50%',
                color: 'var(--accent-gold)',
                flexShrink: 0
              }}>
                <GraduationCap size={28} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>
                  {t('about.degreeTitle')}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {t('about.degreeSub')}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Strengths & Operational Specs */}
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  background: 'rgba(6, 182, 212, 0.15)',
                  padding: '0.6rem',
                  borderRadius: '12px',
                  color: 'var(--accent-teal)'
                }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>{t('about.skillsTitle')}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {Array.isArray(skills) && skills.map((skill, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2 size={20} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.96rem', color: 'var(--text-main)' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobility & Logistics */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Car size={24} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{t('about.mobilityTitle')}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t('about.mobilitySub')}</div>
                </div>
              </div>
              <span className="badge" style={{ fontSize: '0.75rem' }}>{t('about.mobilityBadge')}</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
