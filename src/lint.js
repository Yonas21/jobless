const hasMoney = (text) =>
  /\$|€|£|\bUSD\b|\bEUR\b|\bGBP\b|\b\d{2,3}\s?k\b|\b\d{1,3}(,\d{3})+\b/i.test(text);

const roundCount = (text) => {
  const matches = [...text.matchAll(/(\d+)\s*\+?\s*(interview\s+)?(rounds?|stages?|steps?)\b/gi)];
  return matches.reduce((max, match) => Math.max(max, Number(match[1])), 0);
};

export const rules = [
  {
    id: 'no-fake-salary',
    level: 'error',
    message: 'salary described as competitive / attractive / market-rate, with no number',
    test: (text) =>
      /\b(competitive|attractive|market[- ]rate)\b/i.test(text) &&
      /\b(salary|compensat|pay|package)\b/i.test(text) &&
      !hasMoney(text),
  },
  {
    id: 'no-salary-range',
    level: 'error',
    message: 'no salary range anywhere in the posting',
    test: (text) => !hasMoney(text) && !/\bsalary range\b|\bcompensation range\b/i.test(text),
  },
  {
    id: 'max-rounds',
    level: 'error',
    message: 'too many interview rounds',
    test: (text) => roundCount(text) >= 5 || /\b(six|seven|eight)\s+(interview\s+)?rounds\b/i.test(text),
  },
  {
    id: 'unpaid-takehome',
    level: 'error',
    message: 'take-home that looks like unpaid work',
    test: (text) => {
      const stripped = text.replace(/\b(no|without|not a|paid)\s+(take[- ]home|takehome)s?\b/gi, '');
      return /\b(take[- ]home|takehome|homework|unpaid (assignment|project)|weekend (project|assignment))\b/i.test(
        stripped,
      );
    },
  },
  {
    id: 'entry-needs-years',
    level: 'error',
    message: 'entry-level / junior role asking for years of experience',
    test: (text) =>
      /\b(entry[- ]level|junior)\b/i.test(text) &&
      /\b([3-9]|[1-9]\d)\+?\s+years?\b/i.test(text),
  },
  {
    id: 'means-understaffed',
    level: 'warn',
    message: '"fast-paced" / "wear many hats" / "do more with less"',
    test: (text) =>
      /\bfast[- ]paced\b|\bwear many hats\b|\bdo more with less\b|\bhustle\b|\blean team\b/i.test(text),
  },
  {
    id: 'rockstar-ninja',
    level: 'warn',
    message: 'rockstar / ninja / 10x / guru',
    test: (text) => /\b(rockstar|ninja|10x|guru|superstar|wizard|code monkey)\b/i.test(text),
  },
  {
    id: 'we-are-family',
    level: 'warn',
    message: 'we are a family',
    test: (text) => /\b(we['’]re a family|we are a family|our family|work family)\b/i.test(text),
  },
  {
    id: 'unlimited-pto',
    level: 'warn',
    message: 'unlimited PTO (often means unused PTO)',
    test: (text) => /\bunlimited (pto|vacation|time off)\b/i.test(text),
  },
  {
    id: 'nights-and-weekends',
    level: 'error',
    message: 'nights, weekends, or crunch as a requirement',
    test: (text) => /\b(nights and weekends|crunch|weekends required|on[- ]call 24)\b/i.test(text),
  },
  {
    id: 'passion-tax',
    level: 'warn',
    message: 'looking for passion instead of paying for labor',
    test: (text) => /\b(passionate about|must love|looking for passion)\b/i.test(text),
  },
];

export const lintJobPost = (raw) => {
  const text = String(raw || '').trim();
  if (!text) {
    return { text, findings: [{ id: 'empty', level: 'error', message: 'no job description provided' }] };
  }

  const findings = rules.filter((rule) => rule.test(text)).map(({ id, level, message }) => ({ id, level, message }));
  return { text, findings };
};

export const summarizeLint = (findings) => {
  const errors = findings.filter((item) => item.level === 'error').length;
  const warnings = findings.filter((item) => item.level === 'warn').length;
  return { errors, warnings };
};
