/**
 * Recursive DFS on an adjacency-list graph.
 * @param {Record<string, string[]>} adj
 * @param {string} start
 * @returns {string[]}
 */
export function dfsRecursive(adj, start) {
  if (!(start in adj)) {
    throw new RangeError(`Unknown vertex: ${start}`);
  }
  const visited = new Set();
  const order = [];

  /** @param {string} v */
  const walk = (v) => {
    visited.add(v);
    order.push(v);
    for (const n of adj[v] ?? []) {
      if (!visited.has(n)) walk(n);
    }
  };

  walk(start);
  return order;
}

/**
 * Iterative DFS using an explicit stack (mirrors recursion).
 * @param {Record<string, string[]>} adj
 * @param {string} start
 * @returns {string[]}
 */
export function dfsIterative(adj, start) {
  if (!(start in adj)) {
    throw new RangeError(`Unknown vertex: ${start}`);
  }
  const visited = new Set();
  const order = [];
  const stack = [start];

  while (stack.length) {
    const v = stack.pop();
    if (visited.has(v)) continue;
    visited.add(v);
    order.push(v);
    const neighbors = adj[v] ?? [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const n = neighbors[i];
      if (!visited.has(n)) stack.push(n);
    }
  }

  return order;
}
