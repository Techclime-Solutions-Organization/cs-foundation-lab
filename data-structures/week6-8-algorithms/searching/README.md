# Weeks 4–6 — Searching

## What it is

**Linear search** scans each element until a match. **Binary search** repeatedly halves a sorted range by comparing the midpoint.

## When to use it

- Linear: unsorted or tiny collections; one-off scans.
- Binary: large sorted arrays, dictionaries, lower/upper bound queries.

## When NOT to use it

- Binary search on unsorted data (wrong answers).
- Linear search as the hot path on huge unsorted data—consider hashing/indexing.
- Floating equality without tolerance when comparing continuous values.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| linearSearch | O(1) | O(n) | O(n) | Match at front vs scan all |
| binarySearch | O(1) | O(log n) | O(log n) | Requires sorted input |

## What I learned

Binary search’s logarithmic speed is paid for by the sorting invariant. Off-by-one errors in `lo`/`hi` updates are the classic bug. Linear search remains the right tool when preprocessing (sorting) costs more than a single scan.
