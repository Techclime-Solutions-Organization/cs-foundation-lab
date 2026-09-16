# Weeks 4–6 — Graph Traversal

## What it is

**BFS** explores neighbors layer by layer using a queue. **DFS** explores deeply using recursion (or a stack). On unweighted graphs, BFS yields shortest paths.

## When to use it

- BFS: shortest path in unweighted graphs, level-order processing.
- DFS: connectivity, cycle detection, topological themes, maze/backtracking.
- Both: reachability and component discovery.

## When NOT to use it

- Weighted shortest paths (Dijkstra/Bellman-Ford).
- Extremely wide frontiers without memory budget (BFS can balloon).
- Assuming DFS order equals shortest path—it does not.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| bfs | O(V+E) | O(V+E) | O(V+E) | Queue + visited set |
| dfs | O(V+E) | O(V+E) | O(V+E) | Recursion depth O(V) |
| shortestPath | O(V+E) | O(V+E) | O(V+E) | BFS parents |

## What I learned

Traversal choice encodes the question you ask of the graph. BFS’s queue invariant guarantees minimal hop count. Parent pointers reconstruct paths without storing all distances separately. Visited sets prevent infinite loops on cyclic undirected graphs.
