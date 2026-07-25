import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Phone, UserCheck } from 'lucide-react';

export default function References() {
  const { t } = useLanguage();
  const referencesQuotes = t('references.quotes');

  return (
    <section id="references" style={{ padding: '6.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="badge badge-gold">
            <UserCheck size={14} /> {t('references.badge')}
          </span>
          <h2 className="section-title">
            {t('references.titlePrefix')}
            <span className="text-gradient-gold">{t('references.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('references.subtitle')}
          </p>
        </div>

        {/* References Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
          {Array.isArray(referencesQuotes) && referencesQuotes.map((ref, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{
                  color: 'var(--accent-gold)',
                  opacity: 0.8,
                  marginBottom: '1rem'
                }}>
                  <Quote size={36} />
                </div>

                <p style={{
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  fontSize: '0.96rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  "{ref.quote}"
                </p>
              </div>

              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {ref.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '600', marginBottom: '0.1rem' }}>
                  {ref.role}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {ref.location}
                </div>

                <a
                  href={`tel:${ref.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: 'rgba(245, 158, 11, 0.1)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(245, 158, 11, 0.25)'
                  }}
                >
                  <Phone size={14} />
                  <span>{ref.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
