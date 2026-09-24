# Week 3 — Binary Search Trees

## What it is

A **binary search tree (BST)** stores ordered keys so that left descendants are less than the node and right descendants are greater-or-equal (duplicates go right here). Search, insert, and delete follow comparisons down a path.

## When to use it

- Dynamic ordered data with frequent lookups.
- Need in-order traversal (sorted iteration).
- Building block for maps/sets before balancing.

## When NOT to use it

- Sorted inserts that unbalance into a linked list (prefer AVL/Red-Black or skip lists).
- Pure unordered key-value needs where average O(1) hash maps win.
- Fixed sorted arrays with rare updates (binary search on array).

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| insert | O(1) | O(log n) | O(n) | Skewed tree |
| contains | O(1) | O(log n) | O(n) | Path length |
| remove | O(1) | O(log n) | O(n) | Successor finding |
| min / max | O(1) | O(log n) | O(n) | Walk left/right spine |
| inOrder | O(n) | O(n) | O(n) | Visit all nodes |

## What I learned

BST power comes from ordered branching; BST weakness is shape dependence. Deletion with two children via in-order successor preserves the invariant. In-order traversal yields sorted output without an extra sort—useful for validating structure and for range queries later.
