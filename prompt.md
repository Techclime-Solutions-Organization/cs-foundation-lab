AI IDE Prompt — cs-foundation-lab
Paste everything below into your AI IDE (Claude Code, Cursor, etc.) as the initial instruction.

Prompt:
You are building a repository called `cs-foundation-lab`. This is a comprehensive CS-fundamentals-to-systems-design learning project. Your job is to fully construct the repository structure, tooling, complete code implementations, test suites, database schema, migration runner, API routes, and thorough documentation including operation-cost tables, "What I learned" analysis sections, and a complete progress log.

Stack
- Language: JavaScript (ESM — `import`/`export` with `"type": "module"` in package.json, Node.js 20+)
- Package manager: pnpm
- Testing: Node.js built-in test runner (`node:test` + `node:assert`)
- Lint/format: ESLint + Prettier
- Database: Local PostgreSQL 16 (configured via `.env` with sensible placeholders: `HOST=localhost`, `PORT=5432`, `DB_NAME=cs_foundation_lab`, `DB_USER=postgres`)
- Database Migrations: Hand-written `.sql` files executed via a custom runner script using the `pg` npm library
- API framework for the capstone: Express (kept minimal — no ORMs or heavy frameworks)
- CI: GitHub Actions (lint + test on every PR)
- Git: Do NOT run `git init` or make any initial commits — leave Git initialization and first commit entirely to me.

Top-level structure
cs-foundation-lab/
├── data-structures/          # Weeks 1-6 deliverables
│   ├── week1-complexity/
│   ├── week2-linked-lists/
│   ├── week2-stacks/
│   ├── week2-queues/
│   ├── week3-hash-maps/
│   ├── week3-trees/
│   ├── week3-graphs/
│   ├── week3-recursion/
│   ├── week4-6-algorithms/
│   │   ├── searching/
│   │   ├── sorting/
│   │   ├── graph-traversal/
│   │   └── benchmarks/       # Runnable Big-O timing benchmark script
│   └── README.md             # Index + guide on running tests
├── capstone/                  # Order & Inventory service
│   ├── api/                   # Express HTTP layer and route handlers
│   ├── db/
│   │   ├── migrations/       # Hand-written .sql files
│   │   ├── migrate.js        # SQL migration runner script
│   │   └── schema.sql
│   ├── cli/                   # Admin CLI scripts (e.g., restock)
│   ├── docs/
│   │   ├── architecture/      # Architecture overview documentation
│   │   └── decisions/         # Architectural Decision Records (ADRs)
│   └── README.md
├── .env.example               # Local Postgres placeholders
├── .github/workflows/ci.yml
├── .eslintrc.cjs / prettier config
└── README.md                   # Complete overview of the learning path

data-structures/ folder conventions
For EVERY subfolder (e.g. week2-linked-lists/), generate exactly this pattern:
1. `src/<name>.js` — FULLY IMPLEMENTED data structure / algorithm logic written clean, efficient JS ESM with JSDoc comments explaining key methods.
2. `src/<name>.test.js` — A FULLY WRITTEN, passing test suite using `node:test` and `node:assert` that exercises correctness, edge cases (empty, single element, duplicates, out-of-bounds, etc.), and standard operations.
3. `README.md` — A fully completed document containing:
   ## What it is
   ## When to use it
   ## When NOT to use it
   ## Operation cost table (fully populated Markdown table with columns: Operation | Best case | Average case | Worst case | Notes)
   ## What I learned (detailed explanations of trade-offs, internal mechanics, and memory/time considerations)

Implement implementations for: dynamic arrays, singly linked lists, stacks, queues, custom hash maps (manual collision handling, no built-in `Map`), binary search trees, graphs (adjacency list), and a recursion folder featuring both recursive DFS and its iterative conversion (iterative DFS using an explicit stack).

For `week4-6-algorithms/`, provide full implementations, tests, and detailed READMEs for: linear search, binary search, selection sort, insertion sort, merge sort, BFS, and DFS. Include a runnable `benchmarks/` script that measures execution time across growing input sizes and prints a clear Big-O runtime comparison to stdout.

capstone/ conventions
Fully implement the Order & Inventory Service logic:
- `db/schema.sql`: Complete table definitions for products, stock, customers, orders, and order_items with primary keys, foreign keys, CHECK constraints, and NOT NULL constraints.
- `db/migrate.js`: A working script using `pg` to connect to local Postgres via `.env` variables and execute `.sql` migration files sequentially.
- `api/routes/`: Fully working Express route handlers for products, stock, customers, and orders with database query execution, validation, and proper HTTP status codes.
- `cli/restock.js`: A fully functional CLI admin script parsing CLI flags (e.g., product ID, quantity) and executing restock database updates.

Git / workflow setup
- Document branch naming conventions in the root README (`week1/complexity-arrays`, `week2/linked-lists`, etc.).
- Add a PR template at `.github/pull_request_template.md` with pre-checked validation tasks.
- Add `.github/workflows/ci.yml` that runs `pnpm lint` and `pnpm test` (using `node --test`) on every PR.

Root README.md
Write an overview README that:
- States the overarching goals and architectural learning outcomes.
- Links to each week's folder.
- Documents local setup steps (`pnpm install`, setting up `.env`, executing migrations, running tests via `pnpm test`).
- Includes a fully populated "Progress Log" detailing key learnings, milestones, and summary outcomes for each week.

What TO do
- Write clean, production-grade JavaScript implementations for all algorithms, data structures, dynamic benchmarks, and API endpoints.
- Fully complete all operation-cost tables, analysis sections, ADRs, and README entries.
- Ensure all tests pass out-of-the-box using `pnpm test`.

Once generated, give me a short summary of everything created along with the exact commands to run the local Postgres migrations and execute the passing test suite.