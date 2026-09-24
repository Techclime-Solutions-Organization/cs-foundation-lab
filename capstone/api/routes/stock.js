import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await query(
    `SELECT s.product_id, p.sku, p.name, s.quantity, s.updated_at
     FROM stock s
     JOIN products p ON p.id = s.product_id
     ORDER BY s.product_id`,
  );
  res.json(rows);
});

router.get('/:productId', async (req, res) => {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId) || productId < 1) {
    return res.status(400).json({ error: 'Invalid product id' });
  }
  const { rows } = await query(
    `SELECT s.product_id, p.sku, p.name, s.quantity, s.updated_at
     FROM stock s
     JOIN products p ON p.id = s.product_id
     WHERE s.product_id = $1`,
    [productId],
  );
  if (!rows.length) return res.status(404).json({ error: 'Stock not found' });
  return res.json(rows[0]);
});

router.patch('/:productId', async (req, res) => {
  const productId = Number(req.params.productId);
  const { quantity, delta } = req.body ?? {};
  if (!Number.isInteger(productId) || productId < 1) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  try {
    let rows;
    if (quantity !== undefined) {
      const qty = Number(quantity);
      if (!Number.isInteger(qty) || qty < 0) {
        return res.status(400).json({ error: 'quantity must be a non-negative integer' });
      }
      ({ rows } = await query(
        `UPDATE stock SET quantity = $1, updated_at = NOW()
         WHERE product_id = $2
         RETURNING product_id, quantity, updated_at`,
        [qty, productId],
      ));
    } else if (delta !== undefined) {
      const d = Number(delta);
      if (!Number.isInteger(d)) {
        return res.status(400).json({ error: 'delta must be an integer' });
      }
      ({ rows } = await query(
        `UPDATE stock SET quantity = quantity + $1, updated_at = NOW()
         WHERE product_id = $2 AND quantity + $1 >= 0
         RETURNING product_id, quantity, updated_at`,
        [d, productId],
      ));
    } else {
      return res.status(400).json({ error: 'Provide quantity or delta' });
    }

    if (!rows.length) {
      return res.status(404).json({ error: 'Stock not found or would go negative' });
    }
    return res.json(rows[0]);
  } catch (err) {
    if (err.code === '23514') {
      return res.status(400).json({ error: 'quantity check constraint violated' });
    }
    throw err;
  }
});

export default router;
