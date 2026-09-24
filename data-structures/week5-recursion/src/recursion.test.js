import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dfsRecursive, dfsIterative } from './recursion.js';

const adj = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['E'],
  D: [],
  E: [],
  Z: [],
};

describe('recursion DFS', () => {
  it('recursive DFS visits reachable nodes', () => {
    const order = dfsRecursive(adj, 'A');
    assert.equal(order[0], 'A');
    assert.deepEqual(order.sort(), ['A', 'B', 'C', 'D', 'E']);
  });

  it('iterative DFS visits same set', () => {
    const rec = new Set(dfsRecursive(adj, 'A'));
    const iter = new Set(dfsIterative(adj, 'A'));
    assert.deepEqual([...iter].sort(), [...rec].sort());
  });

  it('iterative matches recursive order for linear chain', () => {
    const chain = { 1: ['2'], 2: ['3'], 3: [] };
    assert.deepEqual(dfsRecursive(chain, '1'), dfsIterative(chain, '1'));
  });

  it('single vertex', () => {
    assert.deepEqual(dfsRecursive(adj, 'Z'), ['Z']);
    assert.deepEqual(dfsIterative(adj, 'Z'), ['Z']);
  });

  it('unknown start throws', () => {
    assert.throws(() => dfsRecursive(adj, 'missing'), RangeError);
    assert.throws(() => dfsIterative(adj, 'missing'), RangeError);
  });
});
