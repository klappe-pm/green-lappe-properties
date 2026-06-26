import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import gpm from '../src/design-system/gpm-design-tokens.js';

const root = process.cwd();
const failures = [];

const requiredFiles = [
  'DESIGN.md',
  'src/design-system/gpm-design-tokens.js',
  'src/styles/green-pm-tokens.css',
  'src/styles/modes.css',
  'tailwind.config.js',
];

const requiredMarkers = [
  'Clay = click',
  'Seven primitives',
  'Use semantic tokens',
  'Audience Modes',
  'Review Checklist',
];

const allowedHex = new Set(
  [
    ...Object.values(gpm.primitives),
    ...Object.values(gpm.derivedNeutrals),
    ...Object.values(gpm.systemColors),
  ].map((value) => value.toLowerCase()),
);

const tokenHexFiles = new Set([
  'src/design-system/gpm-design-tokens.js',
  'src/styles/green-pm-tokens.css',
  'tailwind.config.js',
]);

const clayAllowedFiles = new Set([
  'src/components/Button.astro',
  'src/components/Header.astro',
  'src/design-system/gpm-design-tokens.js',
  'src/styles/green-pm-tokens.css',
  'tailwind.config.js',
]);

const sourceExtensions = new Set(['.astro', '.css', '.js', '.ts']);

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function exists(path) {
  try {
    statSync(join(root, path));
    return true;
  } catch {
    return false;
  }
}

function walk(dir) {
  const abs = join(root, dir);
  const entries = [];
  for (const name of readdirSync(abs)) {
    if (['node_modules', 'dist', '.astro', '.git', 'coverage'].includes(name)) {
      continue;
    }
    const full = join(abs, name);
    const rel = relative(root, full);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      entries.push(...walk(rel));
    } else {
      entries.push(rel);
    }
  }
  return entries;
}

function extension(path) {
  const match = path.match(/\.[^.]+$/);
  return match ? match[0] : '';
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    fail(`Missing required design-system file: ${file}`);
  }
}

if (exists('DESIGN.md')) {
  const design = read('DESIGN.md');
  for (const marker of requiredMarkers) {
    if (!design.includes(marker)) {
      fail(`DESIGN.md missing required marker: ${marker}`);
    }
  }
}

for (const [name, hex] of Object.entries(gpm.primitives)) {
  const css = read('src/styles/green-pm-tokens.css');
  if (!css.includes(`--color-${name}:`) || !css.toLowerCase().includes(hex.toLowerCase())) {
    fail(`CSS token layer missing primitive ${name} (${hex}).`);
  }
}

const sourceFiles = walk('src').filter((file) => sourceExtensions.has(extension(file)));
for (const file of sourceFiles) {
  const text = read(file);
  const hexes = [...text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((match) => match[0].toLowerCase());
  if (!tokenHexFiles.has(file) && hexes.length > 0) {
    fail(`${file} contains raw hex ${[...new Set(hexes)].join(', ')}. Use tokens instead.`);
  }
  if (tokenHexFiles.has(file)) {
    for (const hex of hexes) {
      if (!allowedHex.has(hex)) {
        fail(`${file} contains non-token hex ${hex}. Additions require design review.`);
      }
    }
  }
  if (
    !clayAllowedFiles.has(file) &&
    /\b(?:bg|text|border)-clay\b|var\(--color-clay\)|var\(--color-action\)/.test(text)
  ) {
    fail(`${file} uses Clay outside approved CTA/button surfaces.`);
  }
}

const tailwind = read('tailwind.config.js');
const tailwindHexes = [...tailwind.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((match) =>
  match[0].toLowerCase(),
);
for (const hex of tailwindHexes) {
  if (!allowedHex.has(hex)) {
    fail(`tailwind.config.js contains non-token hex ${hex}.`);
  }
}

const pages = walk('src/pages').filter((file) => file.endsWith('.astro'));
for (const page of pages) {
  const text = read(page);
  if (!text.includes('<BaseLayout')) {
    fail(`${page} does not use BaseLayout.`);
  }
  if (!/audience=\{?["'][a-z-]+["']/.test(text)) {
    fail(`${page} does not declare an audience mode.`);
  }
}

const blockedCopyFiles = sourceFiles.filter(
  (file) =>
    file.startsWith('src/pages/') ||
    file.startsWith('src/components/') ||
    file.startsWith('src/features/') ||
    file.startsWith('src/layouts/'),
);
for (const file of blockedCopyFiles) {
  const text = read(file).toLowerCase();
  for (const word of gpm.wordsToAvoid) {
    const pattern = new RegExp(
      `(^|[^a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`,
      'i',
    );
    if (pattern.test(text)) {
      fail(`${file} contains blocked brand word: ${word}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Design system check failed:');
  for (const item of failures) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log('Design system check passed.');
