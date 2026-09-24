import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { selectionSort, insertionSort, mergeSort } from './sorting.js';

const cases = [
  [],
  [1],
  [2, 1],
  [3, 1, 2, 1, 3],
  [5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5],
];

function assertSorted(fn) {
  for (const input of cases) {
    const expected = [...input].sort((a, b) => a - b);
    assert.deepEqual(fn(input), expected);
    assert.deepEqual(input, input, 'input should remain usable');
  }
}

describe('sorting', () => {
  it('selectionSort', () => assertSorted(selectionSort));
  it('insertionSort', () => assertSorted(insertionSort));
  it('mergeSort', () => assertSorted(mergeSort));

  it('does not mutate original for mergeSort', () => {
    const input = [3, 2, 1];
    const copy = [...input];
    mergeSort(input);
    assert.deepEqual(input, copy);
  });
});
