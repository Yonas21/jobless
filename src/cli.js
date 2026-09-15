import { createInterface } from 'node:readline';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { menu } from './data.js';
import {
  blank,
  clear,
  dim,
  print,
  showCursor,
} from './style.js';
import {
  printBoot,
  printHeader,
  printHelp,
  printHire,
  printLandingTeaser,
  printLooking,
  printMenu,
  printRant,
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
  experience: printWork,
  skills: printSkills,
  hire: printHire,
  links: printHire,
  contact: printHire,
};

const ask = (rl, prompt) =>
  new Promise((resolve) => {
    rl.question(prompt, resolve);
  });

const resolveCommand = (input) => {
  const value = String(input).trim().toLowerCase();
  if (!value) return null;
  if (value === 'q' || value === 'quit' || value === 'exit') return 'quit';
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

const interactive = async ({ animate }) => {
  if (process.stdout.isTTY) clear();
  printHeader();
  if (animate) {
    blank();
    await printBoot();
  }
  printLandingTeaser();
  printMenu();

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    while (true) {
      const answer = await ask(rl, dim('  jobless> '));
      const command = resolveCommand(answer);

      if (!command) {
        print(`  ${dim('unknown. try 1–6 or q.')}`);
        continue;
      }
      if (command === 'quit') {
        blank();
        print(dim('  still jobless. still shipping.'));
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
  const flags = new Set(argv.filter((arg) => arg.startsWith('-')));
  const rest = argv.filter((arg) => !arg.startsWith('-')).map((arg) => arg.toLowerCase());
  return { flags, rest };
};

export const run = async (argv = []) => {
  const { flags, rest } = parse(argv);

  if (flags.has('-h') || flags.has('--help')) {
    printHelp();
    return;
  }

  if (flags.has('-v') || flags.has('--version')) {
    print(pkg.version);
    return;
  }

  if (flags.has('--json')) {
    print(toJson());
    return;
  }

  const animate = process.stdout.isTTY && !flags.has('--no-anim');
  const command = rest[0] ? resolveCommand(rest[0]) : null;

  if (command && command !== 'quit') {
    printHeader();
    runCommand(command);
    blank();
    print(dim('  more: npx jobless   or   npx jobless --help'));
    return;
  }

  if (!process.stdout.isTTY) {
    printHeader();
    printWho();
    printLooking();
    printRant();
    printHire({ copy: false });
    return;
  }

  process.on('SIGINT', () => {
    showCursor();
    process.stdout.write('\n');
    process.exit(0);
  });

  await interactive({ animate });
};
