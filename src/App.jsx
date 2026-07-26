import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import useReveal from './hooks/useReveal';
import useSeo from './hooks/useSeo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Formulary from './components/Formulary';
import Specialties from './components/Specialties';
import Achievements from './components/Achievements';
import Coverage from './components/Coverage';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CV from './pages/CV';

function Home() {
  const { language, t } = useLanguage();
  useReveal();
  useSeo({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    path: '/',
    image: '/og/portada.png',
    language
  });

  return (
    <>
      <Navbar />
      <div className="full-page">
        <main id="main">
          <Hero />
          <About />
          <Timeline />
          <Formulary />
          <Specialties />
          <Achievements />
          <Coverage />
          <References />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </LanguageProvider>
  );
}
