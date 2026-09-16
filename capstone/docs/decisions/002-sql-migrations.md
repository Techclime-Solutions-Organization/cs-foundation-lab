# ADR-002: Hand-written SQL migrations

## Status

Accepted

## Context

Schema evolution must be explicit and reviewable in PRs.

## Decision

Store ordered `.sql` files under `db/migrations/` and apply them with a small Node runner (`migrate.js`) that records applied files in `schema_migrations`.

## Consequences

- Full control over DDL; no generated diffs.
- Runner is dependency-light (`pg` + `dotenv`).
- Operators run `pnpm migrate` against local Postgres.
