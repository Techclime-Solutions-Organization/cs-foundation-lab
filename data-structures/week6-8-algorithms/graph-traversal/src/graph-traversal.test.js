import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { bfs, dfs, shortestPath } from './graph-traversal.js';

const adj = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D'],
  X: [],
};

describe('graph-traversal', () => {
  it('bfs layers', () => {
    const order = bfs(adj, 'A');
    assert.equal(order[0], 'A');
    assert.ok(order.indexOf('B') < order.indexOf('E'));
    assert.ok(order.indexOf('C') < order.indexOf('E'));
  });

  it('dfs visits all reachable', () => {
    assert.deepEqual(dfs(adj, 'A').sort(), ['A', 'B', 'C', 'D', 'E']);
  });

  it('shortestPath', () => {
    assert.deepEqual(shortestPath(adj, 'A', 'E'), ['A', 'B', 'D', 'E']);
    assert.deepEqual(shortestPath(adj, 'A', 'A'), ['A']);
    assert.equal(shortestPath(adj, 'A', 'X'), null);
  });

  it('unknown vertex throws', () => {
    assert.throws(() => bfs(adj, 'missing'), RangeError);
    assert.throws(() => dfs(adj, 'missing'), RangeError);
  });
});
