import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, GraduationCap, FileCheck, ExternalLink, X } from 'lucide-react';

export default function Achievements() {
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const { t } = useLanguage();

  const achievementsItems = t('achievements.items');

  return (
    <section id="achievements" style={{ padding: '6.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="badge badge-gold">
            <Award size={14} /> {t('achievements.badge')}
          </span>
          <h2 className="section-title">
            {t('achievements.titlePrefix')}
            <span className="text-gradient-gold">{t('achievements.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('achievements.subtitle')}
          </p>
        </div>

        {/* Diplomas Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {Array.isArray(achievementsItems) && achievementsItems.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                cursor: 'pointer',
                borderColor: selectedDiploma?.id === item.id ? 'var(--accent-gold)' : 'var(--border-color)'
              }}
              onClick={() => setSelectedDiploma(item)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: 'var(--accent-gold)',
                    padding: '0.65rem',
                    borderRadius: '12px'
                  }}>
                    {item.category.includes('University') || item.category.includes('Título') ? <GraduationCap size={26} /> : <Award size={26} />}
                  </div>

                  <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                    {item.badge}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                  {item.year} • {item.category}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                  {item.title}
                </h3>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>
                  {item.entity}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>

              <div style={{
                marginTop: '1.25rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                fontSize: '0.82rem',
                color: 'var(--accent-gold)',
                fontWeight: '600'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FileCheck size={14} /> {t('achievements.viewCredential')}
                </span>
                <ExternalLink size={14} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Lightbox for Diplomas */}
      {selectedDiploma && (
        <div className="modal-overlay" onClick={() => setSelectedDiploma(null)}>
          <div
            className="glass-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              background: 'var(--bg-secondary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDiploma(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'var(--text-main)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                <Award size={14} /> {t('achievements.modalBadge')}
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {selectedDiploma.title}
              </h3>
              <p style={{ color: 'var(--accent-emerald)', fontWeight: '600', fontSize: '1rem' }}>
                {selectedDiploma.entity} • {selectedDiploma.year}
              </p>
            </div>

            {/* Visual Certificate Mockup */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
              border: '2px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700', marginBottom: '0.75rem' }}>
                {selectedDiploma.category}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem' }}>
                Licda. Indira María Perea Milán
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                "{selectedDiploma.description}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.15)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('achievements.issuedBy')}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>{selectedDiploma.entity}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('achievements.yearRecorded')}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>{selectedDiploma.year}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedDiploma(null)} className="btn btn-secondary">
                {t('achievements.closeModal')}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
