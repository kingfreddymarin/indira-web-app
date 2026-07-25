import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Navigation, Building, CheckCircle2 } from 'lucide-react';

export default function Coverage() {
  const [activeRegion, setActiveRegion] = useState(0);
  const { t } = useLanguage();

  const coverageItems = t('coverage.items');

  return (
    <section id="coverage" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="badge">
            <MapPin size={14} /> {t('coverage.badge')}
          </span>
          <h2 className="section-title">
            {t('coverage.titlePrefix')}
            <span className="text-gradient-emerald">{t('coverage.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('coverage.subtitle')}
          </p>
        </div>

        {/* Region Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {Array.isArray(coverageItems) && coverageItems.map((item, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                padding: '2rem',
                borderLeft: activeRegion === index ? '4px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveRegion(index)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: 'var(--accent-emerald)',
                    padding: '0.65rem',
                    borderRadius: '12px'
                  }}>
                    <Navigation size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{item.region}</h3>
                </div>

                <span className="badge" style={{ fontSize: '0.75rem' }}>
                  {item.badge}
                </span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {item.details}
              </p>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building size={15} color="var(--accent-teal)" /> {t('coverage.keyLocationsLabel')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.keyLocations.map((loc, lIdx) => (
                    <div key={lIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobility Callout Banner */}
        <div className="glass-card" style={{
          padding: '2rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div>
            <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              {t('coverage.bannerTitle')}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
              {t('coverage.bannerSubtitle')}
            </p>
          </div>

          <a href="#contact" className="btn btn-primary" style={{ flexShrink: 0 }}>
            <span>{t('coverage.bannerBtn')}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
