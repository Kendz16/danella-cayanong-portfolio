import React, { useState } from 'react';
import { Download, Search, Trash2, Mail, CheckCircle, Clock, Calendar, ArrowLeft, Filter, RefreshCw, PlusCircle, Building, Users } from 'lucide-react';
import { LeadSubmission, DANELLA_PROFILE } from '../data/danellaData';

interface AdminLeadsViewProps {
  leads: LeadSubmission[];
  onUpdateLeadStatus: (id: string, status: LeadSubmission['status']) => void;
  onDeleteLead: (id: string) => void;
  onResetSeedLeads: () => void;
  onClose: () => void;
}

export const AdminLeadsView: React.FC<AdminLeadsViewProps> = ({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  onResetSeedLeads,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [sizeFilter, setSizeFilter] = useState('ALL');

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesQuery =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.workEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTopic = topicFilter === 'ALL' || lead.exploringTopic === topicFilter;
    const matchesSize = sizeFilter === 'ALL' || lead.companySize === sizeFilter;

    return matchesQuery && matchesTopic && matchesSize;
  });

  // Export leads to CSV
  const exportToCsv = () => {
    if (leads.length === 0) return;
    const headers = ['Date', 'Full Name', 'Company', 'Work Email', 'Company Size', 'Exploring Topic', 'Status', 'Message'];
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.workEmail.replace(/"/g, '""')}"`,
      `"${l.companySize}"`,
      `"${l.exploringTopic}"`,
      `"${l.status}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `danella_salary_com_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'New').length;
  const enterpriseCount = leads.filter((l) => l.companySize === '501-1000' || l.companySize === '1000+').length;

  return (
    <div className="min-h-screen bg-[#061120] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
                title="Return to Portfolio"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Admin Leads Portal
              </h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                Salary.com BDR Tracking
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Logged submissions from Danella Cayanong's personal prospecting page. Notifications routed to <span className="text-slate-200 font-mono">{DANELLA_PROFILE.primaryLeadEmail}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={exportToCsv}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              title="Download CSV for CRM import"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onResetSeedLeads}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Add sample leads"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Samples</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              Return to Site
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#091a33] border border-slate-800">
            <div className="text-xs font-medium text-slate-400">Total Inquiries</div>
            <div className="text-2xl font-black text-white mt-1">{totalCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">All tracked submissions</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#091a33] border border-slate-800">
            <div className="text-xs font-medium text-blue-400">Needs Follow-Up (New)</div>
            <div className="text-2xl font-black text-blue-300 mt-1">{newCount}</div>
            <div className="text-[11px] text-blue-400/70 mt-0.5">Ready for initial BDR connection</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#091a33] border border-slate-800">
            <div className="text-xs font-medium text-emerald-400">Enterprise Scale (500+)</div>
            <div className="text-2xl font-black text-emerald-300 mt-1">{enterpriseCount}</div>
            <div className="text-[11px] text-emerald-400/70 mt-0.5">High-priority comp team prospects</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 rounded-2xl bg-[#091a33] border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name, company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Topic:</span>
            </div>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">All Topics</option>
              <option value="Market Pricing">Market Pricing</option>
              <option value="Pay Equity">Pay Equity</option>
              <option value="Job Architecture">Job Architecture</option>
              <option value="Merit Planning / Comp Review">Merit Planning</option>
              <option value="Just Exploring">Just Exploring</option>
            </select>

            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">All Company Sizes</option>
              <option value="1-100">1-100</option>
              <option value="101-500">101-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="rounded-2xl bg-[#091a33] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Prospect Name</th>
                  <th className="py-3 px-4">Company &amp; Size</th>
                  <th className="py-3 px-4">Work Email</th>
                  <th className="py-3 px-4">Interest / Topic</th>
                  <th className="py-3 px-4">Message Note</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No leads match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const formattedDate = new Date(lead.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });

                    return (
                      <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                          {formattedDate}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                          {lead.fullName}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-200">{lead.companyName}</div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-500" />
                            <span>{lead.companySize} emp</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono">
                          <a
                            href={`mailto:${lead.workEmail}?subject=${encodeURIComponent(
                              `Salary.com inquiry follow-up - Danella Cayanong`
                            )}`}
                            className="text-blue-400 hover:underline"
                          >
                            {lead.workEmail}
                          </a>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 font-medium text-[11px]">
                            {lead.exploringTopic}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          {lead.message ? (
                            <p className="line-clamp-2 text-slate-300 text-[11px] italic" title={lead.message}>
                              "{lead.message}"
                            </p>
                          ) : (
                            <span className="text-slate-500 text-[11px]">-</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                              lead.status === 'New'
                                ? 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                                : lead.status === 'Contacted'
                                ? 'bg-blue-950/60 text-blue-300 border-blue-700/60'
                                : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Meeting Booked">Meeting Booked</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`mailto:${lead.workEmail}?subject=${encodeURIComponent(
                                `Salary.com exploration - ${lead.companyName}`
                              )}`}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                              title="Email prospect"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => onDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-900/80 text-slate-400 hover:text-rose-200 transition-colors cursor-pointer"
                              title="Delete lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
