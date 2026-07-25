import React, { useState } from 'react';
import { personalInfo } from '../data/cvData';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: t('contact.subjects.rep'),
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Build custom WhatsApp link with form contents
    const text = language === 'es'
      ? `Hola Licda. Indira Perea,%0A%0AMi nombre es: ${encodeURIComponent(formData.name)}%0ACorreo/Tel: ${encodeURIComponent(formData.email || formData.phone)}%0AAsunto: ${encodeURIComponent(formData.subject)}%0AMensaje: ${encodeURIComponent(formData.message)}`
      : `Hello Licda. Indira Perea,%0A%0AMy name is: ${encodeURIComponent(formData.name)}%0AContact: ${encodeURIComponent(formData.email || formData.phone)}%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/${personalInfo.rawPhone}?text=${text}`, '_blank');
    }, 800);
  };

  return (
    <section id="contact" style={{ padding: '6.5rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="badge">
            <MessageSquare size={14} /> {t('contact.badge')}
          </span>
          <h2 className="section-title">
            {t('contact.titlePrefix')}
            <span className="text-gradient-emerald">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="section-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem' }} className="contact-grid">
          
          {/* Left Info Panel */}
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                {t('contact.infoTitle')}
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.96rem', lineHeight: 1.6 }}>
                {t('contact.infoSubtitle')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: 'var(--accent-emerald)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t('contact.phoneLabel')}</div>
                    <a href={`tel:${personalInfo.rawPhone}`} style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', textDecoration: 'none' }}>
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--accent-teal)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t('contact.emailLabel')}</div>
                    <a href={`mailto:${personalInfo.email}`} style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', textDecoration: 'none' }}>
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: 'var(--accent-gold)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t('contact.addressLabel')}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: 1.4 }}>
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Box */}
            <div style={{
              background: 'rgba(37, 211, 102, 0.1)',
              border: '1px solid rgba(37, 211, 102, 0.3)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {t('contact.waBoxTitle')}
              </div>
              <a
                href={`https://wa.me/${personalInfo.rawPhone}?text=${language === 'es' ? 'Hola%20Licda.%20Indira,%20quisiera%20agendar%20una%20reuni%C3%B3n.' : 'Hello%20Licda.%20Indira,%20I%20would%20like%20to%20schedule%20a%20meeting.'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <PhoneCall size={18} />
                <span>{t('contact.waBoxBtn')}</span>
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              {t('contact.formTitle')}
            </h3>

            {formSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
                animation: 'fadeIn 0.4s ease-out'
              }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-emerald)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justify: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {t('contact.successTitle')}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '1.5rem' }}>
                  {t('contact.successSub')}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn btn-secondary"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {t('contact.emailOrPhoneLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.emailOrPhonePlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    {t('contact.subjectLabel')}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  >
                    <option value={t('contact.subjects.rep')}>{t('contact.subjects.rep')}</option>
                    <option value={t('contact.subjects.training')}>{t('contact.subjects.training')}</option>
                    <option value={t('contact.subjects.refs')}>{t('contact.subjects.refs')}</option>
                    <option value={t('contact.subjects.other')}>{t('contact.subjects.other')}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder={t('contact.messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.95rem 1.5rem', marginTop: '0.5rem' }}>
                  <Send size={18} />
                  <span>{t('contact.submitBtn')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
