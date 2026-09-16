# Architecture Overview — Order & Inventory Service

## Goals

Practice systems design fundamentals: relational modeling, transactional integrity, thin HTTP APIs, and operational scripts—without ORMs or heavy frameworks.

## Layers

```
HTTP (Express routes)
        │
        ▼
  SQL via `pg` (parameterized queries)
        │
        ▼
  PostgreSQL 16 (constraints + FKs)
```

- **api/** — Express routers for products, stock, customers, orders.
- **db/** — Canonical `schema.sql`, versioned migrations, `migrate.js` runner.
- **cli/** — Admin tooling (restock) sharing the same database.

## Key invariants

- Stock quantity never goes negative (`CHECK` + conditional `UPDATE`).
- Creating an order decrements stock and writes `order_items` in one transaction.
- Products always get a matching `stock` row on create.

## Failure modes handled

- Validation → `400`
- Missing resources → `404`
- Unique conflicts (SKU/email) → `409`
- Insufficient stock → `409`
- Unexpected errors → `500`
