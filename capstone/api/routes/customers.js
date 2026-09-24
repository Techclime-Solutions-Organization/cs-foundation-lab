import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await query(
    'SELECT id, email, full_name, created_at FROM customers ORDER BY id',
  );
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid customer id' });
  }
  const { rows } = await query(
    'SELECT id, email, full_name, created_at FROM customers WHERE id = $1',
    [id],
  );
  if (!rows.length) return res.status(404).json({ error: 'Customer not found' });
  return res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { email, full_name } = req.body ?? {};
  if (!email || !full_name) {
    return res.status(400).json({ error: 'email and full_name are required' });
  }
  try {
    const { rows } = await query(
      `INSERT INTO customers (email, full_name)
       VALUES ($1, $2)
       RETURNING id, email, full_name, created_at`,
      [email, full_name],
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    throw err;
  }
});

export default router;
