# Week 3 — Doubly Linked Lists

## What it is

A **doubly linked list** stores elements in nodes with both `prev` and `next` pointers. Head and tail ends support O(1) append/prepend, and you can walk or unlink in either direction.

## When to use it

- Frequent insert/delete at both ends (deques, LRU-style structures).
- You already hold a node reference and need O(1) removal.
- Bidirectional traversal matters (editors, playlists, browser history).

## When NOT to use it

- You need O(1) random access by index (use arrays).
- Memory is tight — two pointers per node add overhead vs singly linked lists.
- Mostly append-only forward scans where a singly linked list is enough.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| append | O(1) | O(1) | O(1) | Tail pointer |
| prepend | O(1) | O(1) | O(1) | Head pointer |
| get(i) | O(1) | O(n) | O(n) | Walk nearer end |
| insertAt(i) | O(1) | O(n) | O(n) | Locate + relink |
| removeAt(i) | O(1) | O(n) | O(n) | Locate + unlink |
| remove(value) | O(1) | O(n) | O(n) | Scan then unlink |
| toArray / reverse | O(n) | O(n) | O(n) | Full traversal |

## What I learned

The second pointer buys reverse traversal and simpler unlinking: no need to hunt for a predecessor once you have the node. Index-based ops are still O(n), but starting from the nearer end cuts average walk length in half. Head/tail edge cases (empty list, single node) still need careful invariant maintenance — now on both directions.
