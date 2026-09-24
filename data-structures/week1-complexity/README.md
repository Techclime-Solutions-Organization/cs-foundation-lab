# Week 1 — Dynamic Arrays & Complexity

## What it is

A **dynamic array** is a contiguous growable buffer. When capacity is exhausted, a larger buffer is allocated (typically 2×) and elements are copied. Random access by index stays O(1); push is amortized O(1).

## When to use it

- You need index-based random access and mostly push/pop from the end workloads.
- Cache locality matters (contiguous memory).
- You want a simple ordered collection without frequent mid-list inserts/deletes.

## When NOT to use it

- Frequent insert/delete in the middle (O(n) shifts).
- Unbounded growth with tight memory budgets and unpredictable sizes.
- Prefer linked lists for heavy splice workloads, or hash maps for key lookup.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| get(i) / set(i) | O(1) | O(1) | O(1) | Direct index into backing store |
| push | O(1) | O(1) amortized | O(n) | Worst case is a resize + copy |
| pop | O(1) | O(1) | O(1) | No shrink in this implementation |
| insert(i) | O(1) | O(n) | O(n) | Must shift elements right |
| removeAt(i) | O(1) | O(n) | O(n) | Must shift elements left |
| indexOf | O(1) | O(n) | O(n) | Linear scan |
| resize | O(n) | O(n) | O(n) | Copy all live elements |

## What I learned

Doubling capacity keeps the **amortized** cost of append O(1): most pushes are cheap; occasional O(n) copies are rare enough that the average stays constant. Mid-array mutations pay for contiguity—every insert/delete may move half the array. Understanding Big-O means distinguishing worst-case single operations from amortized and average-case behavior under realistic workloads.
