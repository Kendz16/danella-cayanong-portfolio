import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowICanHelpSection } from './components/HowICanHelpSection';
import { WhySalaryComSection } from './components/WhySalaryComSection';
import { CtaSection } from './components/CtaSection';
import { InquiryFormSection } from './components/InquiryFormSection';
import { Footer } from './components/Footer';
import { ExploringTopic } from './data/danellaData';

const LEGACY_LEADS_STORAGE_KEY = 'danella_salary_leads_v1';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<ExploringTopic>('Just Exploring');

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_LEADS_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to remove legacy leads from localStorage', err);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTopicFromCard = (topic: ExploringTopic) => {
    setSelectedTopic(topic);
    scrollToSection('inquiry');
  };

  return (
    <div className="min-h-screen bg-[#061120] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar with Danella's title and inquiry shortcut */}
      <Navbar
        onInquiryClick={() => scrollToSection('inquiry')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onInquiryClick={() => scrollToSection('inquiry')}
        />

        {/* How I Can Help Section (3 cards) */}
        <HowICanHelpSection
          onSelectTopic={handleSelectTopicFromCard}
        />

        {/* Why Teams Look at Salary.com Section */}
        <WhySalaryComSection
          onInquiryClick={() => scrollToSection('inquiry')}
        />

        {/* Inquiry CTA */}
        <CtaSection
          onInquiryClick={() => scrollToSection('inquiry')}
        />

        {/* Functional Lead Capture & Inquiry Section */}
        <InquiryFormSection
          selectedTopic={selectedTopic}
        />
      </main>

      {/* Footer with Mandatory Employer Compliance Disclaimer */}
      <Footer />
    </div>
  );
}
