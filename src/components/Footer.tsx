import React from 'react';
import { ExternalLink, Linkedin, Mail, ShieldAlert, ArrowUp, Database } from 'lucide-react';
import { DANELLA_PROFILE } from '../data/danellaData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050d18] border-t border-slate-800/80 pt-12 pb-16 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm sm:text-base">
                {DANELLA_PROFILE.name}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-400 text-xs sm:text-sm font-medium">
                {DANELLA_PROFILE.role}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Connecting HR &amp; Compensation Leaders with the Salary.com Specialist Team
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href={DANELLA_PROFILE.officialSalaryComUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Official Salary.com Site</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href={DANELLA_PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${DANELLA_PROFILE.workEmailCc}`}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Email</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Admin Leads Dashboard"
            >
              <Database className="w-3 h-3 text-slate-500" />
              <span>Admin Leads</span>
            </button>

            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer ml-2"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Required Employer Compliance Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-[11px] uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            <span>Compliance &amp; Professional Attribution Disclaimer</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {DANELLA_PROFILE.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
