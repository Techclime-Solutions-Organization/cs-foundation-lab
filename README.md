# cs-foundation-lab

A CS-fundamentals-to-systems-design learning repository: implement classic data structures and algorithms with tests and complexity analysis, then apply those ideas in a minimal Order & Inventory service (Express + PostgreSQL).

## Goals & outcomes

- Internalize Big-O trade-offs with real implementations and operation-cost tables.
- Build stacks, queues, trees, graphs, and hash maps from scratch (ESM JavaScript).
- Connect algorithms (search, sort, BFS/DFS) to measurable benchmarks.
- Design a small transactional API with hand-written SQL, migrations, and ADRs—no ORMs.

## Learning path

| Week | Path | Focus |
| --- | --- | --- |
| 1 | [data-structures/week1-complexity](data-structures/week1-complexity/) | Dynamic arrays, amortized analysis |
| 2 | [week2-linked-lists](data-structures/week2-linked-lists/) | Singly linked lists |
| 3 | [week3-doubly-linked-lists](data-structures/week3-doubly-linked-lists/) | Doubly linked lists |
| 4 | [stacks](data-structures/week4-stacks/), [queues](data-structures/week4-queues/) | LIFO / FIFO |
| 5 | [hash-maps](data-structures/week5-hash-maps/), [trees](data-structures/week5-trees/), [graphs](data-structures/week5-graphs/), [recursion](data-structures/week5-recursion/) | Dictionaries, BSTs, adjacency lists, DFS |
| 6–8 | [week6-8-algorithms](data-structures/week6-8-algorithms/) | Searching, sorting, graph traversal, benchmarks |
| Capstone | [capstone](capstone/) | Order & Inventory service |

See also: [data-structures/README.md](data-structures/README.md).

## Stack

- Node.js 20+ (ESM, `"type": "module"`)
- pnpm
- `node:test` / `node:assert`
- ESLint + Prettier
- PostgreSQL 16 + `pg`
- Express (capstone only)

## Local setup

```bash
pnpm install
cp .env.example .env
# edit .env if needed (HOST, PORT, DB_NAME, DB_USER, DB_PASSWORD)
```

Create the database (example):

```bash
createdb cs_foundation_lab
```

Run migrations and tests:

```bash
pnpm migrate
pnpm test
pnpm lint
```

Start the API:

```bash
pnpm capstone:start
```

Restock via CLI:

```bash
node capstone/cli/restock.js --product-id 1 --quantity 100
```

## Branch naming

Use week-scoped branches:

- `week1/complexity-arrays`
- `week2/linked-lists`
- `week3/doubly-linked-lists`
- `week4/stacks`
- `week4/queues`
- `week5/hash-maps`
- `week5/trees`
- `week5/graphs`
- `week5/recursion`
- `week6/searching`
- `week7/sorting`
- `week8/graph-traversal`
- `capstone/inventory-api`

## Progress Log

| Week | Milestone | Key learnings | Outcome |
| --- | --- | --- | --- |
| 1 | Dynamic array + growth | Amortized O(1) append via doubling; mid-array ops cost shifts | Passing tests; complexity README |
| 2 | Singly linked list | Head/tail invariants; pointer vs array trade-offs | Linked list with edge-case suite |
| 3 | Doubly linked list | Bidirectional links; O(1) unlink; nearer-end index walks | DLL with forward/reverse traversal tests |
| 4 | Stack & queue | LIFO vs FIFO; avoid array `shift` for queues | Two structures with edge-case suites |
| 5 | Hash map, BST, graph, recursion | Chaining + load factor; tree shape risk; adj lists; recursive↔iterative DFS | Core dictionary/tree/graph toolkit |
| 6–8 | Search, sort, traversal, benches | Binary search invariants; n² vs n log n; BFS shortest paths | Algorithms + stdout Big-O comparison |
| Capstone | Inventory API | Transactions, CHECK/FK constraints, thin Express, SQL migrations, ADRs | Runnable service + restock CLI |

## License

MIT — see [LICENSE](LICENSE).
