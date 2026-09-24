# Week 3 — Graphs (Adjacency List)

## What it is

A **graph** models vertices and edges. An **adjacency list** stores, for each vertex, the set of neighbors. This undirected implementation adds edges in both directions.

## When to use it

- Sparse graphs (edges ≪ V²) — adjacency lists save memory vs matrices.
- Social networks, routing, dependency graphs, BFS/DFS workloads.
- Dynamic add-vertex / add-edge patterns.

## When NOT to use it

- Dense graphs needing O(1) edge checks at scale (adjacency matrix may win).
- Weighted/shortest-path needs without extending the model (need edge weights).
- Strictly hierarchical data better modeled as trees.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| addVertex | O(1) | O(1) | O(1) | Map insert |
| addEdge | O(1) | O(1) | O(1) | Set insert both sides |
| hasEdge | O(1) | O(1) | O(1) | Set lookup |
| neighbors | O(deg(v)) | O(deg(v)) | O(V) | Copy set |
| BFS / DFS | O(V+E) | O(V+E) | O(V+E) | Visit each once |

## What I learned

Representation choice dominates asymptotics for graphs. Adjacency lists shine when degree is small. BFS discovers shortest unweighted paths; DFS explores depth and is natural for connectivity/cycle detection. Isolating traversal from storage keeps both testable.
