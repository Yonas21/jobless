import { execFileSync } from 'node:child_process';
import os from 'node:os';

const CONSUMER_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
  'live.com',
  'me.com',
  'aol.com',
  'local',
  'localhost',
]);

const git = (key) => {
  try {
    return execFileSync('git', ['config', '--get', key], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 800,
    }).trim();
  } catch {
    return '';
  }
};

const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const companyFromDomain = (domain) => {
  if (!domain || CONSUMER_DOMAINS.has(domain.toLowerCase())) return 'your team';
  const slug = domain.split('.')[0].replace(/[-_]+/g, ' ');
  return slug
    .split(' ')
    .filter(Boolean)
    .map(titleCase)
    .join(' ');
};

export const detectIdentity = () => {
  const username = os.userInfo()?.username || process.env.USER || process.env.USERNAME || 'candidate';
  const email = git('user.email') || `${username}@local`;
  const name = git('user.name') || titleCase(username);
  const domain = email.includes('@') ? email.split('@')[1] : 'local';
  const cwd = process.cwd().split(/[/\\]/).filter(Boolean).at(-1) || 'unknown';

  return {
    name,
    email,
    username,
    domain,
    company: companyFromDomain(domain),
    cwd,
    host: os.hostname() || 'localhost',
  };
};

export const seedFrom = (identity) =>
  [...`${identity.email}|${identity.username}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
