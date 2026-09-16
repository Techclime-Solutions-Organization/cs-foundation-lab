# Week 3 — Recursion & Iterative DFS

## What it is

**Recursion** solves a problem by calling the same function on smaller inputs. **DFS** explores as deep as possible before backtracking. An **iterative DFS** replaces the call stack with an explicit stack while preserving the same exploration idea.

## When to use it

- Tree/graph traversal, backtracking, divide-and-conquer.
- Prefer recursive form for clarity on shallow structures.
- Prefer iterative form when depth may exceed call-stack limits.

## When NOT to use it

- Extremely deep recursion without tail-call guarantees in JS.
- Problems better solved with BFS (shortest unweighted paths).
- Simple loops that do not need a stack of deferred work.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| dfsRecursive | O(V+E) | O(V+E) | O(V+E) | Call stack O(V) |
| dfsIterative | O(V+E) | O(V+E) | O(V+E) | Explicit stack O(V) |
| visit vertex | O(1) | O(1) | O(1) | Mark + record |
| expand neighbors | O(deg) | O(deg) | O(V) | Push unseen |

## What I learned

Recursion is stack discipline made implicit. Converting to an iterative stack makes memory limits and neighbor push order visible—pushing neighbors in reverse preserves left-to-right visit order matching many recursive implementations. Understanding both forms is essential before tackling backtracking and graph algorithms.
