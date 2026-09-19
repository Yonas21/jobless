export const profile = {
  name: 'Yonas Alem',
  title: 'Senior Software Engineer',
  location: 'Addis Ababa, Ethiopia',
  availability: 'Open to remote senior roles',
  currently: 'TPK Synergy Limited',
  study: 'BSc Software Engineering, Addis Ababa University',
  email: 'yonalem21@gmail.com',
  phone: '+251 936 972 697',
  website: 'https://yonasalem.vercel.app',
  github: 'https://github.com/Yonas21',
  repo: 'https://github.com/Yonas21/jobless',
  linkedin: 'https://www.linkedin.com/in/yonasalem21/',
  instagram: 'https://www.instagram.com/its_yon_21/',
  resume: 'https://yonasalem.vercel.app/assets/resume.pdf',
};

export const hireMailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  'npx jobless — Yonas Alem',
)}&body=${encodeURIComponent('I ran npx jobless. I want to talk about a role.\n')}`;

export const stats = [
  { value: '5+', label: 'years in production' },
  { value: '35%', label: 'infra cost cut' },
  { value: '~30%', label: 'performance gain' },
  { value: '3B+', label: 'ETB payment volume' },
];

export const signature = {
  title: 'The deploy that killed 17 cron jobs',
  lines: [
    'Recurring Amazon sync jobs silently stopped after every deploy.',
    'Traced it through BullMQ, ioredis, the Node process lifecycle, and the Railway scheduler.',
    'Then added explicit shutdown handling across 17 cron processes.',
    'I debug silent production failures. That is the job.',
  ],
};

export const about = [
  'I build and fix production systems across payments, gaming, ecommerce, advertising, and government services — from PostgreSQL and backend services through React, AWS, and the last mile of production debugging.',
  'I have cut infrastructure spend by about 35% (roughly $100K a year), improved platform performance around 30%, and integrated payment rails that have handled more than 3 billion ETB in transaction volume.',
  'Day to day I work across the stack: schema design, APIs, React frontends, AWS infrastructure, and the kind of debugging that starts with a silent failure and ends with a safer system.',
];

export const lookingFor = {
  roles: [
    'Senior Software Engineer',
    'Senior Full-Stack Engineer',
    'Backend-leaning full-stack (Node.js, PostgreSQL, AWS)',
  ],
  setup: ['Remote-first', 'Serious hybrid if the team is actually good'],
  wants: [
    'Production ownership. Real incidents, real systems, real users.',
    'Teams that read PRs and ship, not teams that post carousels about shipping.',
    'Work in payments, marketplace, SaaS, data-heavy backends, or infra that has to stay up.',
    'Managers who can say no to a 7-round interview for a role they already understand.',
  ],
  no: [
    'Take-homes that are just your Q3 roadmap with a Sunday deadline.',
    '"Entry-level." Must have 5 years, 12 frameworks, and a personal brand.',
    'Culture surveys longer than the product spec.',
    'Interviews that secretly grade my guess at their coffee order.',
  ],
};

export const rants = [
  {
    title: 'LinkedIn: 40% more thought leadership, 0% more jobs',
    body: "LinkedIn used to be a jobs board that accidentally had a feed. Now it is a feed that accidentally has jobs. Everyone is humbled. Everyone is announcing. Everyone is a thought leader on a Tuesday. The algorithm loves a carousel called '10 habits of senior engineers' from someone who has never been on-call. It does not love the person who actually kept production up. I did not open this app to like your new chapter. I opened it because I can build the thing you are posting about.",
  },
  {
    title: 'I applied for 30 minutes. The bot needed 400ms',
    body: 'The modern application is unpaid data entry with extra steps. Upload the PDF. Then type the PDF into twelve boxes the parser already filled wrong. Then salary in USD, GBP, and emotional damage. Then a culture quiz written by someone who has never been in the culture. Then "why this company?" as if Greenhouse is going to light a candle and read it. Submit. Rejected in 400ms. Sometimes the no arrives before the confirmation. Five years in production, $100K pulled out of infra, payment rails that moved billions — filtered out because I did not write "synergy" enough times. Cool product. Would not ship it.',
  },
  {
    title: 'They booked the call so they had something to cancel',
    body: 'Favorite genre of fiction: the recruiter calendar invite. "Loved your profile. Thursday 10am?" I clear the morning. I make tea. I put on a shirt with buttons. 9:58am: "we\'ve decided to move forward with other candidates." Which other candidates. The ones you have not scheduled yet? Or they just never show, and the Google Calendar event is the last proof a human existed. If ghosting is the process, skip the theater. Do not put a working engineer on your Greenhouse stage so the pipeline looks busy. I debug silent failures for a living. Yours is not that silent.',
  },
  {
    title: 'I do not know their coffee, their mug, or their stars',
    body: "The job posting said TypeScript, PostgreSQL, and 'excellent communication.' The actual exam is telepathy. What is on the recruiter's mind at 10:02am. Oat milk or 'just black, I ship.' What color is the mug. Company merch that says world-class talent, or the chipped navy one from a 2019 conference that still has a lipstick ghost. What is their star sign. A Virgo who will reject you for a missing Oxford comma. A Gemini who double-booked you with someone named also-Yonas. A Scorpio who already decided during the handshake. I can trace a silent cron death across 17 processes. I cannot see into their mug. Apparently that was the seniority gap. Next round I will bring a natal chart, a color swatch, and a cortado. Or we could talk about the actual system.",
  },
];

export const experience = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'TPK Synergy Limited',
    dates: 'Dec 2025 – Present',
    place: 'Remote',
    points: [
      'Amazon seller analytics: marketplace analytics, FBA, finance, PPC, and inventory.',
      'Traced recurring sync jobs that silently died after every deploy; added explicit shutdown handling across 17 cron processes.',
      'Integrated Amazon SP-API and Ads auth end to end: OAuth, LWA, encrypted credentials.',
      'Extended the platform to UK and EU marketplaces with VAT-aware margins.',
    ],
    stack: ['Node.js', 'PostgreSQL', 'BullMQ', 'Redis', 'React', 'Amazon SP-API'],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Mereb Technologies',
    dates: 'Apr 2022 – Nov 2025',
    place: 'Addis Ababa',
    points: [
      'Owned a real-money gaming platform: loyalty, payouts, fraud, reporting, infra.',
      'Improved platform performance ~30% with indexing, caching, and read/write separation.',
      'Cut infrastructure cost ~35%, about $100K a year.',
      'Dropped report generation on ~1M-row datasets from 2 hours to under 30 minutes.',
      'Mentored 3 junior engineers.',
    ],
    stack: ['PostgreSQL', 'gRPC', 'PHP', 'React', 'AWS', 'Datadog'],
  },
  {
    role: 'Full Stack Developer (Contract)',
    company: 'Affiliate.com',
    dates: 'Feb 2023 – Aug 2023',
    place: 'Remote',
    points: [
      'Migrated a legacy PHP API to Node.js and tRPC without breaking the React UI.',
      'Cut report generation time ~40% by moving it onto Google Cloud Storage.',
      'Rebuilt validation in Zod and reached ~85% test coverage on migrated code.',
    ],
    stack: ['Node.js', 'tRPC', 'Prisma', 'React', 'Zod', 'GCS'],
  },
  {
    role: 'Frontend Developer',
    company: 'Eaglelion Systems Technology',
    dates: 'Feb 2021 – Apr 2022',
    place: 'Addis Ababa',
    points: [
      'Integrated Mastercard, Visa, Telebirr, and bank APIs into products with 100K+ downloads.',
      'Payment workflows across 3B+ ETB in transaction volume: callbacks, retries, reconciliation.',
      'Raised GTmetrix from 45 to 97 and cut page load ~25%.',
    ],
    stack: ['React', 'Next.js', 'Tailwind', 'Payment APIs'],
  },
];

export const work = [
  {
    title: 'Amazon seller analytics platform',
    company: 'TPK Synergy Limited',
    blurb: 'Production reliability, Amazon integrations, and the data path behind the dashboard.',
  },
  {
    title: 'Real-money gaming platform',
    company: 'Mereb Technologies',
    blurb: 'Loyalty, payouts, fraud, reporting, and the infrastructure underneath it.',
  },
  {
    title: 'Government constituent platform',
    company: 'Autobridge Systems',
    blurb: 'Complaints, document approvals, access control, encryption, 10x faster email ingest.',
  },
  {
    title: 'Upplai',
    company: 'AI resume platform',
    blurb: 'Resume generation and ATS feedback with OpenAI and Gemini, plus per-resume cost tracking.',
  },
  {
    title: 'Nedaj payments',
    company: 'Eaglelion',
    blurb: 'Fuel-purchase payments for 100K+ downloads: Mastercard, Visa, Telebirr, bank APIs.',
  },
];

export const skills = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python', 'PHP', 'SQL'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'Prisma', 'gRPC', 'tRPC', 'REST', 'BullMQ'] },
  { name: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Material UI'] },
  { name: 'Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions', 'Datadog'] },
  { name: 'Integrations', items: ['Amazon SP-API', 'Mastercard', 'Visa', 'Telebirr', 'OAuth 2.0', 'OpenAI'] },
];

export const quotes = [
  { name: 'Dan Warner', role: 'AppLand Inc', text: 'Yonas did a great job! I would work with him again on a larger project.' },
  { name: 'Muly Oved', role: '', text: 'Excellent freelancer, dedicated, hard worker, was joy to work with.' },
  {
    name: 'Mekidem Getaneh',
    role: '',
    text: 'He goes above and beyond for solving a problem and to find optimal solutions.',
  },
];

export const menu = [
  { key: '1', command: 'work', label: 'proof of work' },
  { key: '2', command: 'who', label: 'who I am' },
  { key: '3', command: 'looking', label: 'roles I want' },
  { key: '4', command: 'skills', label: 'the stack' },
  { key: '5', command: 'rant', label: 'the market, with jokes' },
  { key: 'l', command: 'lint', label: 'lint a job post' },
  { key: 'h', command: 'hire', label: 'hire me' },
  { key: 'q', command: 'quit', label: 'leave the void' },
];
