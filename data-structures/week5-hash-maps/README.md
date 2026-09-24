# Week 3 — Hash Maps

## What it is

A **hash map** maps keys to values via a hash function into buckets. This implementation uses **separate chaining** (arrays per bucket) and resizes when the load factor is exceeded. It does not use JavaScript's built-in `Map`.

## When to use it

- Average O(1) lookup, insert, and delete by key.
- Counting, indexing, memoization, symbol tables.
- Unordered associative storage.

## When NOT to use it

- You need sorted key order (use a tree map / BST).
- Pathological hash collisions without resizing (degrades toward O(n)).
- Tiny fixed tables where a simple array/object is clearer.

## Operation cost table

| Operation | Best case | Average case | Worst case | Notes |
| --- | --- | --- | --- | --- |
| set | O(1) | O(1) | O(n) | Collision chain / resize |
| get | O(1) | O(1) | O(n) | Scan bucket chain |
| has | O(1) | O(1) | O(n) | Same as get |
| delete | O(1) | O(1) | O(n) | Splice in bucket |
| resize | O(n) | O(n) | O(n) | Rehash all entries |
| keys/values | O(n) | O(n) | O(n) | Visit all buckets |

## What I learned

Hash quality and load factor dominate real performance. Separate chaining keeps correctness simple under collisions. Resizing restores average O(1) after growth. Distinguishing “missing key” from “key mapped to `undefined`” requires an explicit `has`/`_find` path—get alone is ambiguous in JS.
