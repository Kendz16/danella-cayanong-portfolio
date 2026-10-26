import React from 'react';
import { Mail, Clock, CheckCircle2 } from 'lucide-react';

interface CtaSectionProps {
  onInquiryClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onInquiryClick,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#061120] to-[#08172e] border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Let’s Connect</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Interested in exploring your compensation priorities? Send me an inquiry and I’ll help connect you with the right team at Salary.com.
        </h2>

        {/* Benefits bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-snug">
              <strong className="text-white block font-semibold mb-0.5">Low-Pressure Discovery</strong>
              Understand where your comp process feels manual or uncertain.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-snug">
              <strong className="text-white block font-semibold mb-0.5">Right-Fit Matching</strong>
              Connect you directly with the right Account Executive and Solutions Consultant.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-snug">
              <strong className="text-white block font-semibold mb-0.5">Focused On Your Priorities</strong>
              Whether market pricing, pay equity laws, or merit cycle automation.
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onInquiryClick}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-98 rounded-xl transition-all shadow-lg shadow-blue-600/30 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Inquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
