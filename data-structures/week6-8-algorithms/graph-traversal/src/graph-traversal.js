/**
 * Breadth-first search traversal order from start.
 * @param {Record<string, string[]>} adj
 * @param {string} start
 * @returns {string[]}
 */
export function bfs(adj, start) {
  if (!(start in adj)) throw new RangeError(`Unknown vertex: ${start}`);
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const v = queue.shift();
    order.push(v);
    for (const n of adj[v] ?? []) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }
  return order;
}

/**
 * Depth-first search traversal order from start (recursive).
 * @param {Record<string, string[]>} adj
 * @param {string} start
 * @returns {string[]}
 */
export function dfs(adj, start) {
  if (!(start in adj)) throw new RangeError(`Unknown vertex: ${start}`);
  const visited = new Set();
  const order = [];
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
 * Unweighted shortest path via BFS.
 * @param {Record<string, string[]>} adj
 * @param {string} start
 * @param {string} goal
 * @returns {string[] | null}
 */
export function shortestPath(adj, start, goal) {
  if (!(start in adj) || !(goal in adj)) {
    throw new RangeError('Unknown vertex');
  }
  if (start === goal) return [start];
  const prev = new Map([[start, null]]);
  const queue = [start];
  while (queue.length) {
    const v = queue.shift();
    for (const n of adj[v] ?? []) {
      if (!prev.has(n)) {
        prev.set(n, v);
        if (n === goal) {
          const path = [];
          let cur = goal;
          while (cur !== null) {
            path.push(cur);
            cur = prev.get(cur);
          }
          return path.reverse();
        }
        queue.push(n);
      }
    }
  }
  return null;
}
