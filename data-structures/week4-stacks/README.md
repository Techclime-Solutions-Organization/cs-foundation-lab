# Week 2 — Stacks

## What it is

A **stack** is a Last-In-First-Out (LIFO) collection. Only the top element is accessible for push, pop, and peek.

## When to use it

- Undo/redo, expression evaluation, DFS with an explicit stack.
- Nested scopes, call-stack simulation, balanced parentheses.
- Depth-first traversal when recursion depth is a concern.

## When NOT to use it

- You need FIFO ordering (use a queue).
- You need random access or search by value as a primary operation.
- Priority-based scheduling (use a heap/priority queue).

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| push | O(1) | O(1) amortized | O(n) | Array growth rare |
| pop | O(1) | O(1) | O(1) | End of array |
| peek | O(1) | O(1) | O(1) | Read last index |
| size / isEmpty | O(1) | O(1) | O(1) | Length field |
| toArray | O(n) | O(n) | O(n) | Copy |

## What I learned

Stacks encode control flow: the most recent unfinished work is always next. Implementing with an array end keeps operations O(1) and preserves locality. Guarding empty pop/peek prevents silent `undefined` bugs that hide algorithm errors.
