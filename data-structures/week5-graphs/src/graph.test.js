import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Graph } from './graph.js';

describe('Graph', () => {
  it('adds vertices and edges', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addVertex('C');
    assert.equal(g.hasEdge('A', 'B'), true);
    assert.equal(g.hasEdge('B', 'A'), true);
    assert.equal(g.hasEdge('A', 'C'), false);
    assert.deepEqual(g.vertices().sort(), ['A', 'B', 'C']);
  });

  it('neighbors and unknown vertex', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    assert.deepEqual(g.neighbors('A').sort(), ['B']);
    assert.throws(() => g.neighbors('Z'), RangeError);
  });

  it('bfs order by layers', () => {
    const g = new Graph();
    g.addEdge('A', 'B');
    g.addEdge('A', 'C');
    g.addEdge('B', 'D');
    const order = g.bfs('A');
    assert.equal(order[0], 'A');
    assert.ok(order.indexOf('B') < order.indexOf('D'));
    assert.ok(order.indexOf('C') < order.indexOf('D') || order.includes('C'));
  });

  it('dfs visits all reachable', () => {
    const g = new Graph();
    g.addEdge('1', '2');
    g.addEdge('2', '3');
    g.addEdge('1', '4');
    const order = g.dfs('1');
    assert.deepEqual(order.sort(), ['1', '2', '3', '4']);
  });

  it('single vertex', () => {
    const g = new Graph();
    g.addVertex('solo');
    assert.deepEqual(g.bfs('solo'), ['solo']);
    assert.deepEqual(g.dfs('solo'), ['solo']);
  });
});
