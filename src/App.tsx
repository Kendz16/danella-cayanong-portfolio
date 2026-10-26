import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowICanHelpSection } from './components/HowICanHelpSection';
import { WhySalaryComSection } from './components/WhySalaryComSection';
import { CtaSection } from './components/CtaSection';
import { InquiryFormSection } from './components/InquiryFormSection';
import { AdminLeadsView } from './components/AdminLeadsView';
import { Footer } from './components/Footer';
import { LeadSubmission, INITIAL_SEED_LEADS } from './data/danellaData';

const LEADS_STORAGE_KEY = 'danella_salary_leads_v1';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Just Exploring');
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved leads from localStorage', err);
    }
    return INITIAL_SEED_LEADS;
  });

  // Check URL path or hash for /admin on initial mount and popstate
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin') {
        setIsAdminView(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Save leads to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (err) {
      console.warn('Failed to save leads to localStorage', err);
    }
  }, [leads]);

  const handleOpenAdmin = () => {
    setIsAdminView(true);
    window.location.hash = 'admin';
  };

  const handleCloseAdmin = () => {
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (isAdminView) {
      setIsAdminView(false);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTopicFromCard = (topic: string) => {
    setSelectedTopic(topic);
    scrollToSection('inquiry');
  };

  const handleLeadSubmitted = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const handleResetSeedLeads = () => {
    setLeads(INITIAL_SEED_LEADS);
  };

  // If Admin View is active, render the dedicated leads dashboard
  if (isAdminView) {
    return (
      <AdminLeadsView
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
        onResetSeedLeads={handleResetSeedLeads}
        onClose={handleCloseAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#061120] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar with Danella's title and inquiry shortcut */}
      <Navbar
        onInquiryClick={() => scrollToSection('inquiry')}
        onOpenAdmin={handleOpenAdmin}
        isAdminActive={isAdminView}
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
          onLeadSubmitted={handleLeadSubmitted}
          selectedTopic={selectedTopic}
        />
      </main>

      {/* Footer with Mandatory Employer Compliance Disclaimer */}
      <Footer onOpenAdmin={handleOpenAdmin} />
    </div>
  );
}
