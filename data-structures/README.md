# Data Structures & Algorithms

Index of Weeks 1–8 deliverables. Each folder contains `src/` (implementation + tests) and a README with operation-cost tables and learning notes.

## Run tests

From the repo root (everything):

```bash
pnpm test
```

Run one data-structures topic (`test:<kind>`):

```bash
pnpm test:stacks
pnpm test:doubly-linked-lists
pnpm test:searching
pnpm test:week4
```

Or pass any kind dynamically:

```bash
pnpm test:ds -- queues
pnpm test:ds -- hash-maps
```

Kinds match folder topics (e.g. `stacks`, `doubly-linked-lists`, `week3`, `algorithms`).

## Benchmarks

```bash
pnpm benchmark
```

## Folders

| Folder | Topic |
| --- | --- |
| [week1-complexity](week1-complexity/) | Dynamic arrays & Big-O |
| [week2-linked-lists](week2-linked-lists/) | Singly linked lists |
| [week3-doubly-linked-lists](week3-doubly-linked-lists/) | Doubly linked lists |
| [week4-stacks](week4-stacks/) | Stacks (LIFO) |
| [week4-queues](week4-queues/) | Queues (FIFO) |
| [week5-hash-maps](week5-hash-maps/) | Hash maps (chaining) |
| [week5-trees](week5-trees/) | Binary search trees |
| [week5-graphs](week5-graphs/) | Graphs (adjacency list) |
| [week5-recursion](week5-recursion/) | Recursive & iterative DFS |
| [week6-8-algorithms/searching](week6-8-algorithms/searching/) | Linear & binary search |
| [week6-8-algorithms/sorting](week6-8-algorithms/sorting/) | Selection, insertion, merge sort |
| [week6-8-algorithms/graph-traversal](week6-8-algorithms/graph-traversal/) | BFS, DFS, shortest path |
| [week6-8-algorithms/benchmarks](week6-8-algorithms/benchmarks/) | Timing / Big-O demo |
