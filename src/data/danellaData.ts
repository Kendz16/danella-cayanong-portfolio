import danellaHeadshot from '../assets/images/Ella.jpg';

export type CompanySize = '1-100' | '101-500' | '501-1000' | '1000+';
export type ExploringTopic =
  | 'Market Pricing'
  | 'Pay Equity'
  | 'Job Architecture'
  | 'Merit Planning / Comp Review'
  | 'Just Exploring';

export const DANELLA_PROFILE = {
  name: 'Danella Cayanong',
  role: 'Business Development Representative',
  company: 'Salary.com',
  titleSnippet: 'Business Development Representative @ Salary.com',
  tagline: 'Helping HR & Comp Teams Explore Smarter Compensation Decisions',
  bio: 'As a Business Development Representative at Salary.com, I connect mid-market and enterprise HR leaders with our team of compensation experts to explore the Salary.com platform — built for pay transparency, equity, and defensibility.',
  photo: danellaHeadshot,
  workEmailCc: 'danella.cayanong@salary.com',
  officialSalaryComUrl: 'https://www.salary.com',
  linkedinUrl: 'https://www.linkedin.com/in/danella-cayanong-695a48403/',
  location: 'United States',
  disclaimer:
    'This site is a personal professional page created by Danella Cayanong to support her role as a Business Development Representative at Salary.com. This is not an official Salary.com corporate website. All product names, logos, and trademarks are the property of Salary.com, LLC. For official information, please visit www.salary.com.'
};

export const HOW_I_CAN_HELP_CARDS = [
  {
    id: 'spreadsheets',
    title: 'Need to move off spreadsheets?',
    subtitle: 'Streamline Compensation Reviews',
    description:
      'Manual spreadsheets create version control headaches, formula errors, and security concerns during annual merit cycles.',
    outcome:
      'I can connect you to our Account Executives and Solutions Consultants for a proper demo and assessment. Quick, no-pressure intro.',
    badge: 'Efficiency & Automation',
    painPoints: [
      'Fragile manual spreadsheets and calculation errors',
      'Slow, disconnected manager review workflows',
      'Difficulty modeling merit increases vs. salary budget caps'
    ]
  },
  {
    id: 'market-pricing',
    title: 'Exploring market pricing?',
    subtitle: 'Reliable, HR-Reported Salary Benchmarks',
    description:
      'Ensure your organization pays competitively to attract and retain top talent across changing geographic markets.',
    outcome:
      'I can connect you to our Account Executives and Solutions Consultants for a proper demo and assessment. Quick, no-pressure intro.',
    badge: 'Verified Data',
    painPoints: [
      'Unreliable crowdsourced data from job boards',
      'Matching niche or modern hybrid job roles accurately',
      'Staying updated with geographic cost-of-labor differentials'
    ]
  },
  {
    id: 'pay-equity',
    title: 'Navigating pay equity & transparency?',
    subtitle: 'Stay Ahead of Legislative Requirements',
    description:
      'New state salary disclosure laws and ESG standards require structured salary ranges and defensible pay policies.',
    outcome:
      'I can connect you to our Account Executives and Solutions Consultants for a proper demo and assessment. Quick, no-pressure intro.',
    badge: 'Compliance & Equity',
    painPoints: [
      'Publishing required salary ranges on job postings',
      'Detecting and remedying unexplained gender/race pay gaps',
      'Defending compensation decisions to leadership and boards'
    ]
  }
];

export const SALARY_COM_CAPABILITIES = [
  {
    title: 'HR-Reported Market Benchmark Data',
    category: 'Market Intelligence',
    description:
      'Access reliable compensation benchmarks derived directly from verified employer HR reports, covering 15,000+ job titles across 225+ industries and localized geographic differentials.',
    impact: 'Defensible salary offers backed by verifiable data rather than anonymous employee guesses.'
  },
  {
    title: 'Job Architecture & Benchmark Matching',
    category: 'Structure & Leveling',
    description:
      'Establish standardized job descriptions, family groupings, and career leveling frameworks to eliminate title inflation and clarify internal career paths.',
    impact: 'Consistent job hierarchy that supports fair career progression and straightforward market pricing.'
  },
  {
    title: 'Merit Planning & Incentive Modeling (CompXL)',
    category: 'Compensation Management',
    description:
      'Empower managers to allocate salary adjustments, performance bonuses, and equity grants with real-time budget guardrails and executive sign-off workflows.',
    impact: 'Eliminates broken formulas and email thread approvals during high-stakes annual comp cycles.'
  },
  {
    title: 'Pay Equity Analysis & Transparency (CompAnalyst)',
    category: 'Equity & Regulatory Compliance',
    description:
      'Run rigorous statistical regression models to identify unexplained pay disparities across gender, ethnicity, and tenure, generating audit-ready compliance reports.',
    impact: 'Proactively resolve pay gaps and meet evolving pay transparency posting mandates with confidence.'
  }
];
