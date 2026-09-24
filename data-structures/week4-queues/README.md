# Week 2 — Queues

## What it is

A **queue** is a First-In-First-Out (FIFO) collection. Enqueue at the back; dequeue from the front.

## When to use it

- BFS, task scheduling, request buffering, print queues.
- Producer/consumer patterns where order of arrival must be preserved.
- Level-order tree traversal.

## When NOT to use it

- LIFO needs (use a stack).
- Need to remove arbitrary elements efficiently (use a linked structure with handles or a deque with indexing).
- Priority ordering (use a priority queue).

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| enqueue | O(1) | O(1) | O(1) | Tail pointer |
| dequeue | O(1) | O(1) | O(1) | Head pointer |
| peek | O(1) | O(1) | O(1) | Read head |
| size / isEmpty | O(1) | O(1) | O(1) | Counter |
| toArray | O(n) | O(n) | O(n) | Walk nodes |

## What I learned

A linked-list queue avoids the O(n) `shift()` cost of naively dequeuing from an array front. Head/tail invariants on the last dequeue (clearing both) are easy to get wrong. Queues are the backbone of BFS: frontier expansion naturally preserves distance layers.
