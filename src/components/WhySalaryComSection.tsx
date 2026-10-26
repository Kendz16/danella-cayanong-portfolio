import React from 'react';
import { Database, Layers, BarChart3, ShieldCheck, Mail } from 'lucide-react';
import { SALARY_COM_CAPABILITIES } from '../data/danellaData';

interface WhySalaryComSectionProps {
  onInquiryClick: () => void;
}

export const WhySalaryComSection: React.FC<WhySalaryComSectionProps> = ({ onInquiryClick }) => {
  const getFeatureIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Database className="w-5 h-5 text-blue-400" />;
      case 1:
        return <Layers className="w-5 h-5 text-sky-400" />;
      case 2:
        return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      case 3:
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      default:
        return <Database className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 border-t border-slate-800/80 bg-[#061120]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <span>Platform Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Why Teams Look at Salary.com
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Organizations evaluate Salary.com to replace guesswork with verified employer-reported market data and enterprise compensation software. Here is an overview of the platform capabilities our team can demonstrate for your organization.
          </p>
        </div>

        {/* 2x2 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SALARY_COM_CAPABILITIES.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#091830] border border-slate-800/90 p-6 sm:p-7 space-y-4 hover:border-blue-500/60 transition-all shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-900/60">
                  {getFeatureIcon(idx)}
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs text-blue-300/90 flex items-start gap-2">
                <span className="font-semibold text-blue-400 shrink-0">Impact:</span>
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Walkthrough Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-950/80 via-[#0a1e3d] to-slate-900 border border-blue-800/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Interested in seeing these platform capabilities live?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Send me an inquiry and I can connect you with our Account Executives and Solutions Consultants to discuss your organization's needs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onInquiryClick}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              <span>Send an Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
