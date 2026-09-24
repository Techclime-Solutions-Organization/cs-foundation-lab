import { linearSearch, binarySearch } from '../searching/src/searching.js';
import { selectionSort, insertionSort, mergeSort } from '../sorting/src/sorting.js';

/**
 * Runnable Big-O timing benchmark across growing input sizes.
 * Prints a comparison table to stdout.
 */

/** @param {() => void} fn */
function timeMs(fn) {
  const start = process.hrtime.bigint();
  fn();
  const end = process.hrtime.bigint();
  return Number(end - start) / 1e6;
}

function randomArray(n) {
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = Math.floor(Math.random() * n);
  return a;
}

function sortedArray(n) {
  return Array.from({ length: n }, (_, i) => i);
}

const sizes = [200, 400, 800, 1600];

console.log('CS Foundation Lab — Algorithm Timing Benchmarks');
console.log('Times in milliseconds (lower is faster)\n');

console.log('=== Searching (target missing → full work) ===');
console.log(
  'n'.padStart(6),
  'linear'.padStart(12),
  'binary'.padStart(12),
  'notes',
);
for (const n of sizes) {
  const sorted = sortedArray(n);
  const target = n + 1;
  const linear = timeMs(() => {
    for (let i = 0; i < 50; i++) linearSearch(sorted, target);
  });
  const binary = timeMs(() => {
    for (let i = 0; i < 50; i++) binarySearch(sorted, target);
  });
  console.log(
    String(n).padStart(6),
    linear.toFixed(3).padStart(12),
    binary.toFixed(3).padStart(12),
    'binary ~ O(log n), linear ~ O(n)',
  );
}

console.log('\n=== Sorting (random arrays) ===');
console.log(
  'n'.padStart(6),
  'selection'.padStart(12),
  'insertion'.padStart(12),
  'merge'.padStart(12),
);
for (const n of sizes) {
  const base = randomArray(n);
  const selection = timeMs(() => selectionSort(base));
  const insertion = timeMs(() => insertionSort(base));
  const merge = timeMs(() => mergeSort(base));
  console.log(
    String(n).padStart(6),
    selection.toFixed(3).padStart(12),
    insertion.toFixed(3).padStart(12),
    merge.toFixed(3).padStart(12),
  );
}

console.log('\nObserved growth:');
console.log('- Linear search times roughly double when n doubles (O(n)).');
console.log('- Binary search grows slowly (O(log n)).');
console.log('- Selection/insertion grow ~4× when n doubles (O(n²)).');
console.log('- Merge sort grows closer to ~2×+ (O(n log n)).');
