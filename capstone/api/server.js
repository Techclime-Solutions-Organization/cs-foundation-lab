import path from 'node:path';
import { pathToFileURL } from 'node:url';
import express from 'express';
import products from './routes/products.js';
import stock from './routes/stock.js';
import customers from './routes/customers.js';
import orders from './routes/orders.js';

/**
 * Build the Express app (exported for tests / embedding).
 */
export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/products', products);
  app.use('/stock', stock);
  app.use('/customers', customers);
  app.use('/orders', orders);

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  const port = Number(process.env.API_PORT ?? 3000);
  const app = createApp();
  app.listen(port, () => {
    console.log(`Order & Inventory API listening on http://localhost:${port}`);
  });
}
