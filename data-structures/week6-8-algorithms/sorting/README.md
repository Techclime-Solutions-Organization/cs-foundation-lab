# Weeks 4–6 — Sorting

## What it is

**Selection sort** repeatedly selects the minimum of the unsorted suffix. **Insertion sort** builds a sorted prefix by inserting each next element. **Merge sort** divides, sorts halves, and merges.

## When to use it

- Insertion: small or nearly sorted arrays.
- Selection: simple teaching code; minimizes swaps.
- Merge: guaranteed O(n log n); stable sort needs.

## When NOT to use it

- Selection/insertion as general-purpose sorts for large n.
- Merge when memory is extremely tight (needs auxiliary arrays).
- Prefer engineered library sorts (`Array.prototype.sort`) in production unless teaching.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| selectionSort | O(n²) | O(n²) | O(n²) | Always scans suffix |
| insertionSort | O(n) | O(n²) | O(n²) | Best on sorted input |
| mergeSort | O(n log n) | O(n log n) | O(n log n) | Extra O(n) memory |

## What I learned

Asymptotic class is not the whole story: constants, stability, and memory matter. Insertion sort’s adaptive best case explains why hybrid sorts (Timsort) use it on small runs. Merge sort teaches divide-and-conquer recurrence: T(n) = 2T(n/2) + O(n).
