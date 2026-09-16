# Weeks 4–6 — Benchmarks

Runnable timing script comparing searching and sorting algorithms across growing `n`.

## Run

```bash
pnpm benchmark
# or
node data-structures/week4-6-algorithms/benchmarks/run.js
```

## What to look for

- Linear vs binary search: linear scales with `n`; binary stays nearly flat.
- Selection/insertion vs merge: quadratic sorts blow up; merge stays practical.

Numbers vary by machine; relative growth rates illustrate Big-O classes.
