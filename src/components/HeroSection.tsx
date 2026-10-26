import React from 'react';
import { Mail, ExternalLink, ArrowRight, ShieldCheck, Users, Sparkles, Building2 } from 'lucide-react';
import { DANELLA_PROFILE } from '../data/danellaData';

interface HeroSectionProps {
  onInquiryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onInquiryClick,
}) => {
  return (
    <section className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Subtext */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Personal Prospecting Page</span>
              <span className="text-blue-500">•</span>
              <span className="text-slate-300">BDR @ Salary.com</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Helping HR &amp; Comp Teams Explore{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300">
                Smarter Compensation Decisions
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              As a Business Development Representative at Salary.com, I connect mid-market and enterprise HR leaders with our team of compensation experts to explore the Salary.com platform — built for pay transparency, equity, and defensibility.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onInquiryClick}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-98 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Mail className="w-4 h-4" />
                <span>Send an Inquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href={DANELLA_PROFILE.officialSalaryComUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 active:scale-98 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Learn About Salary.com</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Indicators / Role context strip */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold mb-0.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Direct Intro</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Connect to experienced Solutions Consultants
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>No Pressure</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Learn about your compensation goals
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold mb-0.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Mid &amp; Enterprise</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Tailored to your organization scale
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative accent frames */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600/40 via-sky-500/20 to-blue-900/40 blur-lg opacity-70" />

              <div className="relative rounded-2xl bg-[#0b1b33] border-2 border-slate-700/80 p-4 shadow-2xl overflow-hidden">
                <div className="relative rounded-xl overflow-hidden aspect-[1/1] bg-slate-900">
                  <img
                    src={DANELLA_PROFILE.photo}
                    alt="Danella Cayanong — Business Development Representative @ Salary.com"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b33] via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-3 left-3 right-3 bg-[#071324]/90 backdrop-blur-md rounded-xl p-3 border border-slate-700/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-sm">
                          Danella Cayanong
                        </div>
                        <div className="text-xs text-blue-300 font-medium">
                          Business Development Representative
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300 px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700/50">
                        Salary.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    "My role is to understand your compensation challenges and introduce you to the right Salary.com specialist for a comprehensive walkthrough."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
