import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Preloader } from './components/Preloader';
import { ConstellationCanvas } from './components/ConstellationCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { Projects } from './components/Projects';
import { GithubExplorer } from './components/GithubExplorer';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceEducation } from './components/ExperienceEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { ScrollProgress } from './components/ScrollProgress';
import { Language } from './types';

import { setLenisInstance } from './utils/smoothScroll';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('es');
  const lenisRef = useRef<Lenis | null>(null);

  // Safety fallback: guaranteed reveal after 1.2s max
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis Cinematic Smooth Scroll safely
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      setLenisInstance(lenis);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } catch (err) {
      console.warn("Lenis initialization bypassed:", err);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        lenis?.destroy();
      } catch {
        // ignore
      }
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // Lock smooth scroll when CV modal is active
  useEffect(() => {
    if (isCvOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isCvOpen]);

  // Load language preference if stored
  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio_lang') as Language;
    if (savedLang === 'es' || savedLang === 'en') {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang: Language = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
    localStorage.setItem('portfolio_lang', nextLang);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#E2E8F0] relative overflow-x-hidden selection:bg-[#2EE6A0] selection:text-black">
      {/* Minimalist Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Milan Compain Preloader */}
      {!isLoaded && (
        <Preloader
          onComplete={() => setIsLoaded(true)}
          language={language}
        />
      )}

      {/* Interactive Constellation Canvas */}
      <ConstellationCanvas />

      {/* Subtle Glow Cursor */}
      <CustomCursor />

      {/* Main Content Layout */}
      <div className="relative z-10 opacity-100">
        <Navbar
          language={language}
          onToggleLanguage={toggleLanguage}
          onOpenCv={() => setIsCvOpen(true)}
        />

        <main>
          <Hero
            language={language}
            onOpenCv={() => setIsCvOpen(true)}
          />

          <Metrics language={language} />

          <Projects language={language} />

          <GithubExplorer language={language} />

          <SkillsMatrix language={language} />

          <ExperienceEducation language={language} />

          <ContactSection language={language} />
        </main>

        <Footer language={language} />
      </div>

      {/* Printable / Downloadable CV Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        language={language}
      />
    </div>
  );
}

export default App;
