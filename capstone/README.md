# Capstone — Order & Inventory Service

Minimal Express + PostgreSQL service for products, stock, customers, and orders.

## Setup

1. Copy `.env.example` to `.env` and adjust credentials.
2. Create the database: `createdb cs_foundation_lab` (or equivalent).
3. Run migrations: `pnpm migrate`
4. Start API: `pnpm capstone:start`

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Liveness |
| GET/POST | `/products` | List / create product (+ initial stock) |
| GET | `/products/:id` | Product by id |
| GET | `/stock` | All stock rows |
| GET/PATCH | `/stock/:productId` | Get / set `quantity` or apply `delta` |
| GET/POST | `/customers` | List / create customer |
| GET | `/customers/:id` | Customer by id |
| GET/POST | `/orders` | List / create order (decrements stock) |
| GET | `/orders/:id` | Order with items |

## CLI restock

```bash
node capstone/cli/restock.js --product-id 1 --quantity 100
node capstone/cli/restock.js --product-id 1 --delta 25
```

## Docs

- [Architecture](docs/architecture/overview.md)
- [ADR-001: No ORM](docs/decisions/001-no-orm.md)
- [ADR-002: Hand-written SQL migrations](docs/decisions/002-sql-migrations.md)
