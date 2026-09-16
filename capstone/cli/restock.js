import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';
import { parseArgs } from './args.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Admin restock CLI.
 * Usage:
 *   node capstone/cli/restock.js --product-id 1 --quantity 50
 *   node capstone/cli/restock.js --product-id 1 --delta 10
 */
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const productId = Number(args['product-id'] ?? args.productId);
  if (!Number.isInteger(productId) || productId < 1) {
    console.error('Usage: node capstone/cli/restock.js --product-id <id> (--quantity <n> | --delta <n>)');
    process.exit(1);
  }

  const client = new pg.Client({
    host: process.env.HOST ?? 'localhost',
    port: Number(process.env.PORT ?? '5432'),
    database: process.env.DB_NAME ?? 'cs_foundation_lab',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
  });

  await client.connect();
  try {
    let result;
    if (args.quantity !== undefined) {
      const quantity = Number(args.quantity);
      if (!Number.isInteger(quantity) || quantity < 0) {
        throw new Error('--quantity must be a non-negative integer');
      }
      result = await client.query(
        `UPDATE stock SET quantity = $1, updated_at = NOW()
         WHERE product_id = $2
         RETURNING product_id, quantity, updated_at`,
        [quantity, productId],
      );
    } else if (args.delta !== undefined) {
      const delta = Number(args.delta);
      if (!Number.isInteger(delta)) {
        throw new Error('--delta must be an integer');
      }
      result = await client.query(
        `UPDATE stock SET quantity = quantity + $1, updated_at = NOW()
         WHERE product_id = $2 AND quantity + $1 >= 0
         RETURNING product_id, quantity, updated_at`,
        [delta, productId],
      );
    } else {
      throw new Error('Provide --quantity or --delta');
    }

    if (!result.rows.length) {
      console.error('No stock row updated (missing product or would go negative).');
      process.exit(1);
    }
    console.log('Restocked:', result.rows[0]);
  } finally {
    await client.end();
  }
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
