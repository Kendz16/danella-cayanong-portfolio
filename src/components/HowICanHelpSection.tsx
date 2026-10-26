import React from 'react';
import { ArrowRight, CheckCircle2, FileSpreadsheet, Compass, Scale, Shield } from 'lucide-react';
import { HOW_I_CAN_HELP_CARDS } from '../data/danellaData';

interface HowICanHelpSectionProps {
  onSelectTopic: (topic: string) => void;
}

export const HowICanHelpSection: React.FC<HowICanHelpSectionProps> = ({ onSelectTopic }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'spreadsheets':
        return <FileSpreadsheet className="w-5 h-5 text-blue-400" />;
      case 'market-pricing':
        return <Compass className="w-5 h-5 text-sky-400" />;
      case 'pay-equity':
        return <Scale className="w-5 h-5 text-cyan-400" />;
      default:
        return <Shield className="w-5 h-5 text-blue-400" />;
    }
  };

  const mapCardToFormTopic = (id: string) => {
    switch (id) {
      case 'spreadsheets':
        return 'Merit Planning / Comp Review';
      case 'market-pricing':
        return 'Market Pricing';
      case 'pay-equity':
        return 'Pay Equity';
      default:
        return 'Just Exploring';
    }
  };

  return (
    <section id="how-i-can-help" className="py-14 sm:py-20 border-t border-slate-800/80 bg-[#07152b]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/40 text-blue-300 text-xs font-semibold">
            <span>Collaborative Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            How I Can Help You
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I can connect you to our Account Executives and Solutions Consultants for a proper demo and assessment. Quick, no-pressure intro.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HOW_I_CAN_HELP_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl bg-[#0a1b35] border border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xl hover:shadow-blue-900/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-800/60 group-hover:scale-105 transition-transform">
                    {getIcon(card.id)}
                  </div>
                  <span className="text-[11px] font-semibold text-blue-300 px-2.5 py-0.5 rounded-full bg-blue-900/50 border border-blue-700/40">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {card.title}
                  </h3>
                  <div className="text-xs font-medium text-blue-300/90 mt-1">
                    {card.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>

                {/* Pain Points breakdown */}
                <div className="pt-2 space-y-2 border-t border-slate-800">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Common Challenges:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {card.painPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => onSelectTopic(mapCardToFormTopic(card.id))}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore this topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
