import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BinarySearchTree } from './binary-search-tree.js';

describe('BinarySearchTree', () => {
  it('starts empty', () => {
    const t = new BinarySearchTree();
    assert.equal(t.size, 0);
    assert.equal(t.contains(1), false);
    assert.equal(t.min(), null);
  });

  it('insert and contains', () => {
    const t = new BinarySearchTree();
    [5, 3, 7, 1, 4].forEach((v) => t.insert(v));
    assert.equal(t.size, 5);
    assert.equal(t.contains(4), true);
    assert.equal(t.contains(9), false);
  });

  it('inOrder is sorted; duplicates allowed on right', () => {
    const t = new BinarySearchTree();
    [2, 1, 3, 2].forEach((v) => t.insert(v));
    assert.deepEqual(t.inOrder(), [1, 2, 2, 3]);
  });

  it('min and max', () => {
    const t = new BinarySearchTree();
    [10, 5, 15, 0, 20].forEach((v) => t.insert(v));
    assert.equal(t.min(), 0);
    assert.equal(t.max(), 20);
  });

  it('remove leaf, one-child, and two-child nodes', () => {
    const t = new BinarySearchTree();
    [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((v) => t.insert(v));
    assert.equal(t.remove(1), true);
    assert.equal(t.remove(6), true);
    assert.equal(t.remove(3), true);
    assert.equal(t.remove(999), false);
    assert.deepEqual(t.inOrder(), [4, 7, 8, 10, 13, 14]);
  });

  it('single node remove', () => {
    const t = new BinarySearchTree();
    t.insert(42);
    assert.equal(t.remove(42), true);
    assert.equal(t.root, null);
    assert.equal(t.size, 0);
  });
});
