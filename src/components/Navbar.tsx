import React from 'react';
import { Mail, Database } from 'lucide-react';
import { DANELLA_PROFILE } from '../data/danellaData';

interface NavbarProps {
  onInquiryClick: () => void;
  onOpenAdmin: () => void;
  isAdminActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onInquiryClick,
  onOpenAdmin,
  isAdminActive,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#071324]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Left: Danella Cayanong • Business Development Representative @ Salary.com */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={DANELLA_PROFILE.photo}
              alt={DANELLA_PROFILE.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-sm shadow-blue-500/20"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#071324] rounded-full"
              title="Active & Available"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-white text-sm sm:text-base tracking-tight truncate">
                {DANELLA_PROFILE.name}
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="text-xs sm:text-sm text-blue-400 font-medium truncate">
                Business Development Representative
              </span>
              <span className="text-xs text-slate-400 font-normal">
                @ <span className="text-white font-medium">Salary.com</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onInquiryClick}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Send Inquiry</span>
          </button>

          {/* Admin toggle icon */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-xl transition-colors cursor-pointer border ${
              isAdminActive
                ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border-slate-800'
            }`}
            title={isAdminActive ? 'Return to Portfolio' : 'Admin Leads Dashboard'}
            aria-label="Admin Dashboard"
          >
            <Database className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
