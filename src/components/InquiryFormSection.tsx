import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Mail } from 'lucide-react';
import { CompanySize, ExploringTopic } from '../data/danellaData';

interface InquiryFormSectionProps {
  selectedTopic?: ExploringTopic;
}

interface SubmittedInquiry {
  createdAt: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  exploringTopic: ExploringTopic;
}

const FREE_EMAIL_PROVIDERS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'zoho.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'yandex.com'
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqppplvz';

export const InquiryFormSection: React.FC<InquiryFormSectionProps> = ({
  selectedTopic = 'Just Exploring',
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState<CompanySize>('101-500');
  const [exploringTopic, setExploringTopic] = useState<ExploringTopic>(selectedTopic);
  const [message, setMessage] = useState('');
  const [agreedToContact, setAgreedToContact] = useState(true);

  // Anti-spam math challenge
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  // Form states
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedInquiry, setLastSubmittedInquiry] = useState<SubmittedInquiry | null>(null);

  // Update selected topic if prop changes
  React.useEffect(() => {
    if (selectedTopic) {
      setExploringTopic(selectedTopic);
    }
  }, [selectedTopic]);

  const handleEmailChange = (val: string) => {
    setWorkEmail(val);
    if (!val || !val.includes('@')) {
      setEmailWarning(null);
      return;
    }
    const domain = val.split('@')[1]?.toLowerCase().trim();
    if (domain && FREE_EMAIL_PROVIDERS.includes(domain)) {
      setEmailWarning('Please use your work/company email (e.g. name@company.com) so we can align you with the right team.');
    } else {
      setEmailWarning(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !workEmail.trim() || !companyName.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Check company email
    const emailDomain = workEmail.split('@')[1]?.toLowerCase().trim();
    if (emailDomain && FREE_EMAIL_PROVIDERS.includes(emailDomain)) {
      setErrorMessage('Work email is required. Please provide your official company email address.');
      return;
    }

    if (!agreedToContact) {
      setErrorMessage('Please check the box agreeing to be contacted regarding Salary.com solutions.');
      return;
    }

    // Anti-spam validation: 4 + 3 = 7
    if (captchaAnswer.trim() !== '7') {
      setErrorMessage('Anti-spam verification failed. Please answer the math question correctly.');
      return;
    }

    const inquiry: SubmittedInquiry = {
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      workEmail: workEmail.trim(),
      companyName: companyName.trim(),
      exploringTopic,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inquiry.fullName,
          email: inquiry.workEmail,
          company: inquiry.companyName,
          company_size: companySize,
          topic: inquiry.exploringTopic,
          message: message.trim(),
          consent_to_contact: agreedToContact ? 'Yes' : 'No',
          _subject: `New Salary.com inquiry: ${inquiry.companyName}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      setLastSubmittedInquiry(inquiry);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit inquiry to Formspree', error);
      setErrorMessage('Your inquiry could not be sent. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-14 sm:py-20 border-t border-slate-800/80 bg-[#071324] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Interested? Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Fill out the form below and I'll review your compensation priorities to coordinate an introduction with our Account Executives and Solutions Consultants.
          </p>
        </div>

        {/* Card Form Container */}
        <div className="rounded-3xl bg-[#091a33] border-2 border-slate-700/90 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle inner highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />

          {isSubmitted ? (
            /* Success State */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/80 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Inquiry Received!
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Thanks! We'll review your inquiry and Danella will connect you with the right Salary.com team member.
                </p>
              </div>

              {/* Lead Summary confirmation box */}
              {lastSubmittedInquiry && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="font-semibold text-blue-400 flex items-center justify-between">
                    <span>Summary of Submitted Details:</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(lastSubmittedInquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Name:</span>
                      <span className="font-medium text-white">{lastSubmittedInquiry.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Company:</span>
                      <span className="font-medium text-white">{lastSubmittedInquiry.companyName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Work Email:</span>
                      <span className="font-medium text-white truncate block">{lastSubmittedInquiry.workEmail}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Topic:</span>
                      <span className="font-medium text-blue-300">{lastSubmittedInquiry.exploringTopic}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setWorkEmail('');
                    setCompanyName('');
                    setMessage('');
                    setCaptchaAnswer('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Adams"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Work Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={workEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-slate-950/80 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      emailWarning ? 'border-amber-500 focus:border-amber-400' : 'border-slate-700 focus:border-blue-500'
                    }`}
                  />
                  {emailWarning && (
                    <p className="text-[11px] text-amber-400 mt-1 flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{emailWarning}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Company Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Northstar Financial"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Company Size <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="1-100">1-100 employees</option>
                    <option value="101-500">101-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>

              {/* What are you exploring? */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  What are you exploring? <span className="text-rose-400">*</span>
                </label>
                <select
                  value={exploringTopic}
                  onChange={(e) => setExploringTopic(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="Market Pricing">Market Pricing (Salary benchmark surveys & job matching)</option>
                  <option value="Pay Equity">Pay Equity (Transparency compliance & pay gap regression)</option>
                  <option value="Job Architecture">Job Architecture (Job leveling, titles & career paths)</option>
                  <option value="Merit Planning / Comp Review">Merit Planning / Comp Review (Annual review cycles & comp planning)</option>
                  <option value="Just Exploring">Just Exploring (General overview of Salary.com platform)</option>
                </select>
              </div>

              {/* Message / Current Challenge */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
                  <span>Message / Current Challenge</span>
                  <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell me a bit about your current compensation setup or timing for your next review cycle..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Inquiry notifications are sent by Formspree to the email address configured for this form.</span>
              </div>

              {/* Anti-spam Verification challenge */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Anti-Spam Verification: What is 4 + 3?</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Security Check</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter answer (e.g. 7)"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Compliance Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToContact}
                    onChange={(e) => setAgreedToContact(e.target.checked)}
                    className="mt-0.5 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span className="text-xs text-slate-300 leading-snug">
                    I agree to be contacted about Salary.com solutions.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
