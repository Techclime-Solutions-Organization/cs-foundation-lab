import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? '5432'),
  database: process.env.DB_NAME ?? 'cs_foundation_lab',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
});

/**
 * @param {string} text
 * @param {unknown[]} [params]
 */
export function query(text, params) {
  return pool.query(text, params);
}
