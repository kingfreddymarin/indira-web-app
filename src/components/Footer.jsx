import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      position: 'relative'
    }}>
      <div className="container">
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: '#fff',
                fontWeight: '800',
                fontSize: '1.1rem'
              }}>
                IP
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
                Licda. Indira Perea Milán
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '480px' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp size={16} color="var(--accent-emerald)" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Licda. Indira Perea Milán. {t('footer.rights')}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={14} color="var(--accent-emerald)" />
            <span>{t('footer.credential')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
