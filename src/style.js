import { stdout } from 'node:process';

const CSI = '\x1b[';
const RESET = `${CSI}0m`;
const OSC = '\x1b]8;;';
const BEL = '\x07';

const hasColor = () => {
  if (process.env.NO_COLOR) return false;
  if (process.env.FORCE_COLOR === '0') return false;
  if (process.env.FORCE_COLOR) return true;
  return Boolean(stdout.isTTY);
};

const paint =
  (codes) =>
  (value) => {
    if (!hasColor()) return String(value);
    return `${CSI}${codes}m${value}${RESET}`;
  };

export const bold = paint('1');
export const dim = paint('2');
export const red = paint('31');
export const green = paint('32');
export const yellow = paint('33');
export const magenta = paint('35');
export const cyan = paint('36');
export const white = paint('37');
export const brightRed = paint('91');

export const width = () => {
  const columns = stdout.columns || 80;
  return Math.min(Math.max(columns, 56), 86);
};

export const inner = () => width() - 4;

export const wrap = (text, max = width() - 8) => {
  const paragraphs = String(text).split('\n');
  const lines = [];

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('');
      continue;
    }

    const words = paragraph.split(/\s+/);
    let line = '';

    for (const word of words) {
      if (!line) {
        line = word;
        continue;
      }
      if (line.length + 1 + word.length > max) {
        lines.push(line);
        line = word;
      } else {
        line += ` ${word}`;
      }
    }

    if (line) lines.push(line);
  }

  return lines;
};

export const link = (label, url) => {
  if (!stdout.isTTY || process.env.NO_HYPERLINK) return label;
  return `${OSC}${url}${BEL}${label}${OSC}${BEL}`;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const hideCursor = () => {
  if (stdout.isTTY) stdout.write(`${CSI}?25l`);
};

export const showCursor = () => {
  if (stdout.isTTY) stdout.write(`${CSI}?25h`);
};

export const clear = () => {
  if (stdout.isTTY) stdout.write(`${CSI}2J${CSI}H`);
};

const visibleLength = (text) =>
  String(text)
    .replace(/\x1b\]8;;[^\x07]*\x07/g, '')
    .replace(/\x1b\]8;;\x07/g, '')
    .replace(/\x1b\[[0-9;]*m/g, '').length;

export const pad = (text, size = inner(), align = 'left') => {
  const length = visibleLength(text);
  const space = Math.max(size - length, 0);
  if (align === 'center') {
    const left = Math.floor(space / 2);
    return `${' '.repeat(left)}${text}${' '.repeat(space - left)}`;
  }
  if (align === 'right') return `${' '.repeat(space)}${text}`;
  return `${text}${' '.repeat(space)}`;
};

export const box = (lines, { title } = {}) => {
  const max = inner();
  const topInner = title ? `─ ${title} ${'─'.repeat(Math.max(max - title.length - 3, 0))}` : '─'.repeat(max);
  const top = dim(`┌${topInner}┐`);
  const bottom = dim(`└${'─'.repeat(max)}┘`);
  const body = lines.map((line) => `${dim('│')} ${pad(line, max)} ${dim('│')}`);
  return [top, ...body, bottom].join('\n');
};

export const banner = () => {
  const max = inner();
  return box(
    [
      bold(brightRed(pad('JOBLESS', max, 'center'))),
      dim(pad('a terminal resume for a broken job market', max, 'center')),
    ],
    { title: 'npx jobless' },
  );
};

export const print = (text = '') => {
  stdout.write(`${text}\n`);
};

export const blank = () => print('');

export const section = (title) => {
  print(bold(cyan(title)));
};

export const bullet = (text, color = white) => {
  for (const [index, line] of wrap(text).entries()) {
    print(index === 0 ? `  ${dim('•')} ${color(line)}` : `    ${color(line)}`);
  }
};

export const kv = (key, value) => {
  print(`  ${dim(pad(`${key}`, 12))}${value}`);
};
