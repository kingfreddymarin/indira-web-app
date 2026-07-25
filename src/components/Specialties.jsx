import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Stethoscope, HeartPulse, Sparkles, UserCheck, Activity, ShieldAlert, Scale, Pill } from 'lucide-react';

export default function Specialties() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useLanguage();

  const specialtiesItems = t('specialties.items');

  const iconComponents = {
    cardio: <HeartPulse size={32} color="var(--accent-emerald)" />,
    derma: <Sparkles size={32} color="var(--accent-teal)" />,
    gineco: <UserCheck size={32} color="var(--accent-gold)" />,
    gastro: <Activity size={32} color="var(--accent-blue)" />,
    dolor: <ShieldAlert size={32} color="#ef4444" />,
    hiperlipidemia: <Scale size={32} color="var(--accent-emerald)" />
  };

  const filteredData = activeFilter === 'all' 
    ? specialtiesItems 
    : specialtiesItems.filter(s => s.id === activeFilter);

  return (
    <section id="specialties" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="badge">
            <Stethoscope size={14} /> {t('specialties.badge')}
          </span>
          <h2 className="section-title">
            {t('specialties.titlePrefix')}
            <span className="text-gradient-emerald">{t('specialties.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('specialties.subtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveFilter('all')}
            className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
          >
            {t('specialties.allFilter')} ({specialtiesItems.length})
          </button>
          {Array.isArray(specialtiesItems) && specialtiesItems.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setActiveFilter(spec.id)}
              className={`btn ${activeFilter === spec.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* Grid View */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {Array.isArray(filteredData) && filteredData.map((spec) => (
            <div
              key={spec.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    padding: '0.85rem',
                    borderRadius: '16px'
                  }}>
                    {iconComponents[spec.id]}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  {spec.name}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {spec.description}
                </p>
              </div>

              {/* Products List */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Pill size={14} color="var(--accent-emerald)" /> {t('specialties.productsLabel')}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {spec.products.map((prod, pIdx) => (
                    <span key={pIdx} style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      color: 'var(--accent-teal)',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {prod}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
