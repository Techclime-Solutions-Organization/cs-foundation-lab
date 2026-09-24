import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dsRoot = path.join(root, 'data-structures');

/**
 * Recursively collect *.test.js files under dir.
 * @param {string} dir
 * @returns {string[]}
 */
function collectTests(dir) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectTests(full));
    } else if (entry.isFile() && entry.name.endsWith('.test.js')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * @param {string} s
 */
function normalize(s) {
  return s.toLowerCase().replace(/[_\s]+/g, '-');
}

/**
 * Topic tokens derived from a test file path relative to data-structures/.
 * Avoids `linked-lists` accidentally matching `doubly-linked-lists`.
 * @param {string} rel
 * @returns {string[]}
 */
function topicsFor(rel) {
  const parts = normalize(rel).split(/[/\\]/);
  const top = parts[0] ?? '';
  /** @type {string[]} */
  const topics = [top];

  const weekTopic = top.match(/^week[\d-]+-(.+)$/);
  if (weekTopic) topics.push(weekTopic[1]);

  const weekOnly = top.match(/^(week\d+(?:-\d+)*)/);
  if (weekOnly) topics.push(weekOnly[1]);

  // e.g. week6-8-algorithms/searching/...
  if (parts[1] && parts[1] !== 'src') topics.push(parts[1]);

  return topics;
}

function usage(available) {
  console.error(`Usage: pnpm test:<kind>   or   pnpm test:ds -- <kind>

Examples:
  pnpm test:stacks
  pnpm test:doubly-linked-lists
  pnpm test:ds -- searching
  pnpm test:ds -- week4

Available kinds:
  ${available.join('\n  ')}`);
}

function main() {
  const kind = process.argv[2];
  const allTests = collectTests(dsRoot);

  const kinds = [
    'complexity',
    'linked-lists',
    'doubly-linked-lists',
    'stacks',
    'queues',
    'hash-maps',
    'trees',
    'graphs',
    'recursion',
    'searching',
    'sorting',
    'graph-traversal',
    'week1',
    'week2',
    'week3',
    'week4',
    'week5',
    'week6-8',
    'algorithms',
  ];

  if (!kind) {
    usage(kinds);
    process.exit(1);
  }

  const needle = normalize(kind);
  const matched = allTests.filter((file) => {
    const rel = path.relative(dsRoot, file);
    return topicsFor(rel).includes(needle);
  });

  if (!matched.length) {
    console.error(`No data-structures tests matched kind "${kind}".\n`);
    usage(kinds);
    process.exit(1);
  }

  console.log(`Running ${matched.length} test file(s) for "${kind}":`);
  for (const file of matched) {
    console.log(`  - ${path.relative(root, file)}`);
  }
  console.log('');

  const result = spawnSync(process.execPath, ['--test', ...matched], {
    stdio: 'inherit',
    cwd: root,
  });

  process.exit(result.status ?? 1);
}

main();
