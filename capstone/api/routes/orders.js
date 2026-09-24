import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await query(
    `SELECT id, customer_id, status, total_amount, created_at
     FROM orders ORDER BY id`,
  );
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid order id' });
  }
  const { rows: orders } = await query(
    `SELECT id, customer_id, status, total_amount, created_at
     FROM orders WHERE id = $1`,
    [id],
  );
  if (!orders.length) return res.status(404).json({ error: 'Order not found' });

  const { rows: items } = await query(
    `SELECT id, product_id, quantity, unit_price
     FROM order_items WHERE order_id = $1 ORDER BY id`,
    [id],
  );
  return res.json({ ...orders[0], items });
});

router.post('/', async (req, res) => {
  const { customer_id, items } = req.body ?? {};
  const customerId = Number(customer_id);
  if (!Number.isInteger(customerId) || customerId < 1) {
    return res.status(400).json({ error: 'customer_id is required' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items must be a non-empty array' });
  }

  try {
    await query('BEGIN');

    const customer = await query('SELECT id FROM customers WHERE id = $1', [customerId]);
    if (!customer.rows.length) {
      await query('ROLLBACK');
      return res.status(404).json({ error: 'Customer not found' });
    }

    const { rows: orderRows } = await query(
      `INSERT INTO orders (customer_id, status, total_amount)
       VALUES ($1, 'pending', 0)
       RETURNING id, customer_id, status, total_amount, created_at`,
      [customerId],
    );
    const order = orderRows[0];
    let total = 0;

    for (const item of items) {
      const productId = Number(item.product_id);
      const quantity = Number(item.quantity);
      if (!Number.isInteger(productId) || productId < 1 || !Number.isInteger(quantity) || quantity < 1) {
        await query('ROLLBACK');
        return res.status(400).json({ error: 'Each item needs valid product_id and quantity' });
      }

      const product = await query(
        'SELECT id, unit_price FROM products WHERE id = $1',
        [productId],
      );
      if (!product.rows.length) {
        await query('ROLLBACK');
        return res.status(404).json({ error: `Product ${productId} not found` });
      }

      const stock = await query(
        `UPDATE stock SET quantity = quantity - $1, updated_at = NOW()
         WHERE product_id = $2 AND quantity >= $1
         RETURNING quantity`,
        [quantity, productId],
      );
      if (!stock.rows.length) {
        await query('ROLLBACK');
        return res.status(409).json({ error: `Insufficient stock for product ${productId}` });
      }

      const unitPrice = Number(product.rows[0].unit_price);
      total += unitPrice * quantity;
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, productId, quantity, unitPrice],
      );
    }

    const { rows: updated } = await query(
      `UPDATE orders SET total_amount = $1 WHERE id = $2
       RETURNING id, customer_id, status, total_amount, created_at`,
      [total, order.id],
    );

    const { rows: orderItems } = await query(
      'SELECT id, product_id, quantity, unit_price FROM order_items WHERE order_id = $1',
      [order.id],
    );

    await query('COMMIT');
    return res.status(201).json({ ...updated[0], items: orderItems });
  } catch (err) {
    await query('ROLLBACK');
    throw err;
  }
});

export default router;
