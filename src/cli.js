import { createInterface } from 'node:readline';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdin } from 'node:process';

import { menu } from './data.js';
import { lintResult } from './lint.js';
import { printTrap } from './reject.js';
import {
  blank,
  clear,
  dim,
  print,
  showCursor,
} from './style.js';
import {
  printHeader,
  printHelp,
  printHire,
  printLandingTeaser,
  printLintReport,
  printLooking,
  printMenu,
  printRant,
  printSignature,
  printSkills,
  printWho,
  printWork,
  toJson,
} from './screens.js';

const pkg = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf8'),
);

const COMMANDS = {
  who: printWho,
  about: printWho,
  looking: printLooking,
  jobs: printLooking,
  rant: printRant,
  market: printRant,
  work: printWork,
  proof: printWork,
  experience: printWork,
  skills: printSkills,
  hire: printHire,
  h: printHire,
  links: printHire,
  contact: printHire,
};

const ask = (rl, prompt) =>
  new Promise((resolve) => {
    rl.question(prompt, resolve);
  });

const readStdin = async () => {
  const chunks = [];
  for await (const chunk of stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
};

const readPaste = async (rl) => {
  blank();
  print(dim('  paste a job description. empty line to lint.'));
  blank();
  const lines = [];
  while (true) {
    const line = await ask(rl, dim('  '));
    if (line === '') break;
    lines.push(line);
  }
  return lines.join('\n');
};

const resolveCommand = (input) => {
  const value = String(input).trim().toLowerCase();
  if (!value) return null;
  if (value === 'q' || value === 'quit' || value === 'exit') return 'quit';
  if (value === 'help') return 'help';
  if (value === 'lint' || value === 'l') return 'lint';
  const fromMenu = menu.find((item) => item.key === value || item.command === value);
  if (fromMenu) return fromMenu.command;
  if (COMMANDS[value]) return value;
  return null;
};

const runCommand = (command) => {
  const render = COMMANDS[command];
  if (!render) return false;
  render();
  return true;
};

const showResume = () => {
  printHeader();
  printSignature();
  printLandingTeaser();
  printMenu();
};

const interactive = async ({ trap }) => {
  if (process.stdout.isTTY) clear();
  if (trap) {
    await printTrap({ animate: true });
    blank();
  }
  showResume();

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    while (true) {
      const answer = await ask(rl, dim('  jobless> '));
      const command = resolveCommand(answer);

      if (!command) {
        print(`  ${dim('unknown. try 1–5, l to lint, h to hire, or q.')}`);
        continue;
      }
      if (command === 'help') {
        if (process.stdout.isTTY) clear();
        printHelp();
        printMenu();
        continue;
      }
      if (command === 'lint') {
        const text = await readPaste(rl);
        if (process.stdout.isTTY) clear();
        printHeader();
        printLintReport(lintResult(text, 'paste'));
        printMenu();
        continue;
      }
      if (command === 'quit') {
        blank();
        print(dim('  still jobless. still shipping.'));
        print(dim('  yonalem21@gmail.com'));
        blank();
        break;
      }

      if (process.stdout.isTTY) clear();
      printHeader();
      runCommand(command);
      printMenu();
    }
  } finally {
    rl.close();
    showCursor();
  }
};

const parse = (argv) => {
  const flags = new Set();
  const rest = [];
  for (const arg of argv) {
    if (arg.startsWith('-')) flags.add(arg);
    else rest.push(arg);
  }
  return { flags, rest };
};

const runLintCli = async (files, { json = false } = {}) => {
  let source = 'stdin';
  let text = '';

  if (files[0]) {
    source = files[0];
    text = readFileSync(files[0], 'utf8');
  } else if (!stdin.isTTY) {
    text = await readStdin();
  } else {
    printHelp();
    blank();
    print(dim('  lint needs a file, a pipe, or an interactive paste: npx jobless lint posting.txt'));
    process.exitCode = 1;
    return;
  }

  const report = lintResult(text, source);
  if (!report.ok) process.exitCode = 1;

  if (json) {
    print(JSON.stringify(report, null, 2));
    return;
  }

  printLintReport(report);
  blank();
  print(dim('  more: npx jobless   ·   npx jobless hire'));
};

export const run = async (argv = []) => {
  process.stdout.on('error', (error) => {
    if (error.code === 'EPIPE') process.exit(0);
  });

  const { flags, rest } = parse(argv);
  const verb = rest[0] ? rest[0].toLowerCase() : '';

  if (flags.has('-h') || flags.has('--help') || verb === 'help') {
    printHelp();
    return;
  }

  if (flags.has('-v') || flags.has('--version')) {
    print(pkg.version);
    return;
  }

  if (verb === 'lint' || verb === 'l') {
    await runLintCli(rest.slice(1), { json: flags.has('--json') });
    return;
  }

  if (flags.has('--json')) {
    print(toJson());
    return;
  }

  const skipTrap = flags.has('--resume') || flags.has('--skip-trap') || flags.has('--no-trap');
  const command = verb ? resolveCommand(verb) : null;

  if (command && command !== 'quit' && command !== 'help' && command !== 'lint') {
    printHeader();
    runCommand(command);
    blank();
    print(dim('  more: npx jobless   ·   npx jobless hire   ·   npx jobless --help'));
    return;
  }

  if (!process.stdout.isTTY) {
    if (!skipTrap) await printTrap({ animate: false });
    blank();
    printHeader();
    printSignature();
    printHire({ copy: false });
    return;
  }

  process.on('SIGINT', () => {
    showCursor();
    process.stdout.write('\n');
    process.exit(0);
  });

  await interactive({ trap: !skipTrap });
};
