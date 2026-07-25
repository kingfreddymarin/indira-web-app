import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, MapPin, Pill, Award, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const { t } = useLanguage();

  const timelineItems = t('experience.items');

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" style={{ padding: '6.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="badge">
            <Briefcase size={14} /> {t('experience.badge')}
          </span>
          <h2 className="section-title">
            {t('experience.titlePrefix')}
            <span className="text-gradient-emerald">{t('experience.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Timeline List */}
        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Center Line */}
          <div style={{
            position: 'absolute',
            left: '28px',
            top: '30px',
            bottom: '30px',
            width: '3px',
            background: 'linear-gradient(to bottom, var(--accent-emerald), var(--accent-teal), rgba(255,255,255,0.1))',
            zIndex: 0
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {Array.isArray(timelineItems) && timelineItems.map((item, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div key={index} style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    className="glass-card"
                    style={{
                      marginLeft: '55px',
                      padding: '1.5rem 1.75rem',
                      cursor: 'pointer',
                      borderColor: isExpanded ? 'var(--accent-emerald)' : 'var(--border-color)',
                      boxShadow: isExpanded ? 'var(--shadow-glow)' : 'none'
                    }}
                    onClick={() => toggleExpand(index)}
                  >
                    {/* Node Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-55px',
                      top: '24px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isExpanded ? 'var(--accent-emerald)' : 'var(--bg-secondary)',
                      border: `3px solid ${isExpanded ? '#fff' : 'var(--accent-emerald)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      color: isExpanded ? '#fff' : 'var(--accent-emerald)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
                    }}>
                      <Briefcase size={14} />
                    </div>

                    {/* Timeline Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
                            {item.company}
                          </h3>
                          <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                            {item.badge}
                          </span>
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                          {item.role}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                          <Calendar size={15} color="var(--accent-teal)" />
                          <span>{item.period}</span>
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>
                          {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                        </div>
                      </div>
                    </div>

                    {/* Summary line */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      <MapPin size={14} color="var(--accent-gold)" />
                      <span>{t('experience.coverageLabel')} <strong>{item.location}</strong></span>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div style={{
                        marginTop: '1.25rem',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--border-color)',
                        animation: 'fadeIn 0.3s ease-out'
                      }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.96rem' }}>
                          {item.description}
                        </p>

                        {/* Promoted Products Pills */}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Pill size={15} color="var(--accent-emerald)" />
                            <span>{t('experience.productsLabel')}</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {item.products.map((prod, pIdx) => (
                              <span key={pIdx} style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.25)',
                                color: 'var(--accent-emerald)',
                                padding: '0.3rem 0.75rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.82rem',
                                fontWeight: '600'
                              }}>
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Award size={15} color="var(--accent-gold)" />
                            <span>{t('experience.achievementsLabel')}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {item.achievements.map((ach, aIdx) => (
                              <div key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{ach}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
