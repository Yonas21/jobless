import { execFileSync } from 'node:child_process';

import {
  about,
  bootLines,
  experience,
  lookingFor,
  menu,
  profile,
  quotes,
  rants,
  skills,
  stats,
  work,
} from './data.js';
import {
  banner,
  blank,
  bold,
  box,
  bullet,
  cyan,
  dim,
  green,
  hideCursor,
  inner,
  kv,
  link,
  magenta,
  pad,
  print,
  red,
  section,
  showCursor,
  sleep,
  wrap,
  yellow,
} from './style.js';

const copyToClipboard = (text) => {
  try {
    if (process.platform === 'darwin') {
      execFileSync('pbcopy', { input: text });
      return true;
    }
    if (process.platform === 'win32') {
      execFileSync('clip', { input: text, windowsHide: true });
      return true;
    }
    execFileSync('xclip', ['-selection', 'clipboard'], { input: text });
    return true;
  } catch {
    return false;
  }
};

export const printHeader = () => {
  print(banner());
  blank();
  print(`  ${bold(cyan(profile.name))}`);
  print(`  ${profile.title}`);
  print(`  ${dim(`${profile.location}  ·  ${profile.availability}`)}`);
  blank();
  const statLine = (items) =>
    items.map((item) => `${bold(green(item.value))} ${dim(item.label)}`).join(dim('   '));
  print(`  ${statLine(stats.slice(0, 2))}`);
  print(`  ${statLine(stats.slice(2))}`);
  blank();
  print(
    `  ${link(profile.email, `mailto:${profile.email}`)}${dim('  ·  ')}${link(profile.website, profile.website)}${dim('  ·  ')}${link(profile.github.replace('https://', ''), profile.github)}`,
  );
};

export const printBoot = async () => {
  hideCursor();
  try {
    print(dim('  applying to a role that was closed in 2022...'));
    blank();
    for (const [index, line] of bootLines.entries()) {
      print(`  ${dim(`[${String(index + 1)}/5]`)} ${line}`);
      await sleep(180);
    }
    blank();
    print(`  ${bold(red('RESULT'))}     ${bold('REJECTED')}`);
    print(`  ${dim('reason')}     guessed white mug. it was navy. also a Virgo.`);
    print(`  ${dim('elapsed')}    0.40s  (personal best)`);
    print(`  ${dim('note')}       the loading bar is the joke. the rejection is documentary.`);
  } finally {
    showCursor();
  }
};

export const printWho = () => {
  blank();
  section('WHO');
  blank();
  for (const paragraph of about) {
    bullet(paragraph);
    blank();
  }
  kv('Now', profile.currently);
  kv('Study', profile.study);
  kv('Site', link(profile.website, profile.website));
};

export const printLooking = () => {
  blank();
  section('WHAT I WANT');
  blank();
  print(`  ${dim('roles')}`);
  for (const role of lookingFor.roles) bullet(role, green);
  blank();
  print(`  ${dim('setup')}`);
  for (const item of lookingFor.setup) bullet(item);
  blank();
  print(`  ${dim('yes')}`);
  for (const item of lookingFor.wants) bullet(item);
  blank();
  print(`  ${dim('hard no')}`);
  for (const item of lookingFor.no) bullet(item, yellow);
};

export const printRant = () => {
  blank();
  section('THE MARKET');
  blank();
  for (const line of wrap(
    'The feed is thriving. Hiring is a lore page. The recruiter\'s coffee order is a senior requirement.',
  )) {
    print(`  ${dim(line)}`);
  }
  for (const rant of rants) {
    blank();
    print(box([bold(yellow(rant.title)), '', ...wrap(rant.body, inner())]));
  }
  blank();
  print(`  ${dim('Still here? Congrats. You already outperformed the ATS.')}`);
};

export const printWork = () => {
  blank();
  section('PROOF');
  blank();
  for (const job of experience) {
    print(`  ${bold(job.role)}`);
    print(`  ${cyan(job.company)}  ${dim(`${job.dates}  ·  ${job.place}`)}`);
    blank();
    for (const point of job.points) bullet(point);
    print(`  ${dim(job.stack.join('  ·  '))}`);
    blank();
  }
  print(`  ${dim('selected work')}`);
  blank();
  for (const item of work) {
    print(`  ${bold(item.title)}  ${dim(item.company)}`);
    for (const line of wrap(item.blurb)) print(`  ${line}`);
    blank();
  }
  print(`  ${dim('people who were not bots')}`);
  blank();
  for (const quote of quotes) {
    print(`  ${magenta(`"${quote.text}"`)}`);
    print(`  ${dim(`— ${quote.name}${quote.role ? `, ${quote.role}` : ''}`)}`);
    blank();
  }
};

export const printSkills = () => {
  blank();
  section('STACK');
  blank();
  for (const group of skills) {
    print(`  ${bold(group.name)}`);
    print(`  ${group.items.join(dim('  ·  '))}`);
    blank();
  }
};

export const printHire = ({ copy = true } = {}) => {
  blank();
  section('HIRE ME');
  blank();
  print(`  ${dim('Skip the 47-field form. This is the whole application.')}`);
  blank();
  kv('Email', link(profile.email, `mailto:${profile.email}`));
  kv('Phone', link(profile.phone, `tel:${profile.phone.replace(/\s+/g, '')}`));
  kv('Site', link(profile.website, profile.website));
  kv('GitHub', link(profile.github, profile.github));
  kv('LinkedIn', link(profile.linkedin, profile.linkedin));
  kv('Resume', link(profile.resume, profile.resume));
  blank();
  if (copy && process.stdout.isTTY && copyToClipboard(profile.email)) {
    print(`  ${green('copied')} ${profile.email} ${dim('to clipboard')}`);
  }
  blank();
  print(`  ${dim('If you got this far, you already did more than most ATS pipelines.')}`);
};

export const printMenu = () => {
  blank();
  print(
    box(
      menu.map((item) => `${bold(cyan(pad(item.key, 3)))} ${item.label}`),
      { title: 'open a door' },
    ),
  );
  blank();
};

export const printHelp = () => {
  print(banner());
  blank();
  print(`  ${bold('npx jobless')}              interactive`);
  print(`  ${bold('npx jobless who')}          bio`);
  print(`  ${bold('npx jobless looking')}      roles`);
  print(`  ${bold('npx jobless rant')}         the market`);
  print(`  ${bold('npx jobless work')}         experience`);
  print(`  ${bold('npx jobless skills')}       stack`);
  print(`  ${bold('npx jobless hire')}         links + email`);
  print(`  ${bold('npx jobless --json')}       machine readable`);
  print(`  ${bold('npx jobless --no-anim')}    skip the ATS joke`);
  blank();
  print(`  ${dim('Built because the feed would not shut up.')}`);
  print(`  ${dim(profile.website)}`);
};

export const printLandingTeaser = () => {
  blank();
  print(`  ${yellow('LinkedIn is a content farm with a jobs tab. This is the profile.')}`);
  print(`  ${dim('Applications take 30 minutes. The no takes 400ms.')}`);
  print(`  ${dim('Recruiters book the call so they have something to cancel.')}`);
  print(`  ${dim('I still do not know their coffee, their mug, or their star sign.')}`);
};

export const toJson = () =>
  JSON.stringify(
    {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      availability: profile.availability,
      contact: {
        email: profile.email,
        phone: profile.phone,
        website: profile.website,
        github: profile.github,
        linkedin: profile.linkedin,
        resume: profile.resume,
      },
      lookingFor,
      rants,
      stats,
      experience,
      skills,
    },
    null,
    2,
  );
