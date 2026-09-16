# ADR-001: No ORM

## Status

Accepted

## Context

The capstone should teach SQL, transactions, and HTTP mapping—not framework magic.

## Decision

Use the `pg` driver with hand-written parameterized SQL. No Sequelize/Prisma/Knex query builders.

## Consequences

- Clear visibility into queries and indexes.
- More boilerplate; stronger learning signal.
- Easier to reason about transactions and constraint errors (`23505`, `23514`).
