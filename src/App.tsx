import React, { useState, useEffect } from 'react';
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
import { Language } from './types';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('es');

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
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
