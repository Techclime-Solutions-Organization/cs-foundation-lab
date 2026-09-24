import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { linearSearch, binarySearch } from './searching.js';

describe('linearSearch', () => {
  it('finds values and handles empty', () => {
    assert.equal(linearSearch([], 1), -1);
    assert.equal(linearSearch([1], 1), 0);
    assert.equal(linearSearch([1, 2, 2, 3], 2), 1);
    assert.equal(linearSearch([1, 2, 3], 9), -1);
  });
});

describe('binarySearch', () => {
  it('finds in sorted arrays', () => {
    assert.equal(binarySearch([], 1), -1);
    assert.equal(binarySearch([5], 5), 0);
    assert.equal(binarySearch([1, 3, 5, 7, 9], 7), 3);
    assert.equal(binarySearch([1, 3, 5, 7, 9], 2), -1);
  });

  it('works at ends', () => {
    const arr = [1, 2, 3, 4, 5];
    assert.equal(binarySearch(arr, 1), 0);
    assert.equal(binarySearch(arr, 5), 4);
  });
});
