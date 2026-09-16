/**
 * Undirected graph via adjacency list.
 */
export class Graph {
  constructor() {
    /** @type {Map<string, Set<string>>} */
    this._adj = new Map();
  }

  /**
   * @param {string} vertex
   */
  addVertex(vertex) {
    if (!this._adj.has(vertex)) {
      this._adj.set(vertex, new Set());
    }
  }

  /**
   * @param {string} a
   * @param {string} b
   */
  addEdge(a, b) {
    this.addVertex(a);
    this.addVertex(b);
    this._adj.get(a).add(b);
    this._adj.get(b).add(a);
  }

  /**
   * @param {string} a
   * @param {string} b
   * @returns {boolean}
   */
  hasEdge(a, b) {
    return this._adj.has(a) && this._adj.get(a).has(b);
  }

  /**
   * @param {string} vertex
   * @returns {string[]}
   */
  neighbors(vertex) {
    if (!this._adj.has(vertex)) {
      throw new RangeError(`Unknown vertex: ${vertex}`);
    }
    return [...this._adj.get(vertex)];
  }

  /** @returns {string[]} */
  vertices() {
    return [...this._adj.keys()];
  }

  /**
   * @param {string} start
   * @returns {string[]}
   */
  bfs(start) {
    if (!this._adj.has(start)) {
      throw new RangeError(`Unknown vertex: ${start}`);
    }
    const visited = new Set([start]);
    const queue = [start];
    const order = [];
    while (queue.length) {
      const v = queue.shift();
      order.push(v);
      for (const n of this._adj.get(v)) {
        if (!visited.has(n)) {
          visited.add(n);
          queue.push(n);
        }
      }
    }
    return order;
  }

  /**
   * @param {string} start
   * @returns {string[]}
   */
  dfs(start) {
    if (!this._adj.has(start)) {
      throw new RangeError(`Unknown vertex: ${start}`);
    }
    const visited = new Set();
    const order = [];
    const walk = (v) => {
      visited.add(v);
      order.push(v);
      for (const n of this._adj.get(v)) {
        if (!visited.has(n)) walk(n);
      }
    };
    walk(start);
    return order;
  }
}
