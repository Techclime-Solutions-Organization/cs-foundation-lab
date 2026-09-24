# Week 2 — Singly Linked Lists

## What it is

A **singly linked list** stores elements in nodes, each pointing to the next. There is no contiguous backing array; size grows one node at a time. With head/tail pointers, append and prepend are O(1).

## When to use it

- Frequent insert/delete at the front (or known node position).
- You do not need random access by index.
- Implementing stacks/queues or adjacency lists where pointer updates matter more than locality.

## When NOT to use it

- You need O(1) index access (use arrays).
- Heavy sequential scans on large data where cache misses dominate.
- Sorted random inserts without an extra index structure.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| append | O(1) | O(1) | O(1) | Tail pointer |
| prepend | O(1) | O(1) | O(1) | Head pointer |
| get(i) | O(1) | O(n) | O(n) | Walk from head |
| insertAt(i) | O(1) | O(n) | O(n) | Locate predecessor |
| removeAt(i) | O(1) | O(n) | O(n) | Locate predecessor |
| indexOf | O(1) | O(n) | O(n) | Linear scan |
| toArray | O(n) | O(n) | O(n) | Full traversal |

## What I learned

Linked lists trade random access for cheap local pointer updates. Keeping a `tail` avoids O(n) append. Edge cases (empty list, single node, remove last) require careful head/tail maintenance. Memory overhead per node (object + pointer) is higher than a dense array, but mid-list splice without shifting can still win for certain patterns.
