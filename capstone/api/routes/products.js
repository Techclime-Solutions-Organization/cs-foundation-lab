import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await query(
    'SELECT id, sku, name, description, unit_price, created_at FROM products ORDER BY id',
  );
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid product id' });
  }
  const { rows } = await query(
    'SELECT id, sku, name, description, unit_price, created_at FROM products WHERE id = $1',
    [id],
  );
  if (!rows.length) return res.status(404).json({ error: 'Product not found' });
  return res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { sku, name, description = null, unit_price, initial_stock = 0 } = req.body ?? {};
  if (!sku || !name || unit_price === undefined) {
    return res.status(400).json({ error: 'sku, name, and unit_price are required' });
  }
  const price = Number(unit_price);
  const stockQty = Number(initial_stock);
  if (!(price >= 0) || !Number.isInteger(stockQty) || stockQty < 0) {
    return res.status(400).json({ error: 'Invalid unit_price or initial_stock' });
  }

  try {
    await query('BEGIN');
    const { rows } = await query(
      `INSERT INTO products (sku, name, description, unit_price)
       VALUES ($1, $2, $3, $4)
       RETURNING id, sku, name, description, unit_price, created_at`,
      [sku, name, description, price],
    );
    await query('INSERT INTO stock (product_id, quantity) VALUES ($1, $2)', [
      rows[0].id,
      stockQty,
    ]);
    await query('COMMIT');
    return res.status(201).json(rows[0]);
  } catch (err) {
    await query('ROLLBACK');
    if (err.code === '23505') {
      return res.status(409).json({ error: 'SKU already exists' });
    }
    throw err;
  }
});

export default router;
