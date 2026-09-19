import { detectIdentity, seedFrom } from './identity.js';
import {
  blank,
  bold,
  box,
  dim,
  hideCursor,
  inner,
  print,
  red,
  showCursor,
  sleep,
  wrap,
  yellow,
} from './style.js';

const BOOT = [
  'receiving application from the void',
  'parsing whatever npx just sent',
  'extracting keywords',
  'scoring culture fit',
  'waiting for a human',
];

const reasonPool = (identity) => {
  const pool = [
    'keyword density insufficient',
    'installed a resume instead of submitting one',
    `did not mention ${identity.company} in the first 12 words`,
    'cover letter parsed as "npx"',
    'years of experience with Greenhouse: 0',
    'failed culture add (ran a CLI)',
    'resume was a person',
  ];
  if (identity.cwd) {
    pool.push(`working directory "${identity.cwd}" is not a synonym for synergy`);
  }
  if (identity.username) {
    pool.push(`unix user "${identity.username}" is not an approved ATS field`);
  }
  return pool;
};

const pickReasons = (identity, count = 2) => {
  const pool = reasonPool(identity);
  const seed = seedFrom(identity);
  const picked = [];
  for (let i = 0; i < count && pool.length; i += 1) {
    const index = Math.abs(seed + i * 17) % pool.length;
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
};

export const printTrap = async ({ animate = true } = {}) => {
  const identity = detectIdentity();
  const reasons = pickReasons(identity);
  const to = identity.email || identity.username;
  const company = identity.company === 'your team' ? 'this role' : identity.company;

  if (animate) {
    hideCursor();
    try {
      print(dim('  Greenhouse Applicant Center'));
      blank();
      for (const [index, line] of BOOT.entries()) {
        print(`  ${dim(`[${index + 1}/${BOOT.length}]`)} ${line}`);
        await sleep(160);
      }
      print(`  ${dim('[5/5]')} human not found`);
      await sleep(220);
    } finally {
      showCursor();
    }
    blank();
  }

  print(
    box([
      dim('FROM     Greenhouse <no-reply@not-a-human.com>'),
      dim(`TO       ${identity.name} <${to}>`),
      dim(`SUBJECT  Your application for Senior Engineer`),
      '',
      ...wrap(
        `Thank you for your interest in ${company}. After careful consideration of your application, we will not be moving forward.`,
        inner(),
      ),
      '',
      `${bold(red('RESULT'))}    ${bold('REJECTED')}`,
      `${dim('reason')}    ${reasons[0]}`,
      ...(reasons[1] ? [`${dim('also')}      ${reasons[1]}`] : []),
      `${dim('elapsed')}   0.40s`,
      `${dim('next')}      we will keep your resume on file. we will not.`,
    ]),
  );

  blank();
  print(`  ${dim('that was not a company.')}`);
  print(`  ${dim('that was the market, in your own terminal.')}`);
  blank();
  print(`  ${dim('anyway. here is an engineer who debugs silent production failures.')}`);
};

export const printCompanyReject = (letter) => {
  if (!letter) return;

  blank();
  print(
    box([
      dim(`FROM     ${letter.from}`),
      dim(`TO       ${letter.to}`),
      dim(`SUBJECT  ${letter.subject}`),
      '',
      ...wrap(
        letter.result === 'REJECTED'
          ? 'Thank you for your interest in my labor. After careful consideration of your job description, I will not be moving forward.'
          : 'Thank you for your interest in my labor. Your posting has been held for review. Fix the warnings and resubmit.',
        inner(),
      ),
      '',
      `${bold(red('RESULT'))}    ${bold(letter.result === 'REJECTED' ? red(letter.result) : yellow(letter.result))}`,
      `${dim('reason')}    ${letter.reasons[0] || 'failed the human compiler'}`,
      ...(letter.reasons[1] ? [`${dim('also')}      ${letter.reasons[1]}`] : []),
      `${dim('elapsed')}   0.40s`,
      `${dim('next')}      we will keep your posting on file. we will not.`,
    ]),
  );

  blank();
  print(`  ${dim('that was not a recruiter.')}`);
  print(`  ${dim('that was you, finally answering.')}`);
};
