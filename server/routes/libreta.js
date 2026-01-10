// routes/libreta.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM libreta ORDER BY fecha DESC, created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching libreta' });
  }
});

router.post('/', async (req, res) => {
  const { novedad, monto, fecha } = req.body;

  if (!novedad || !monto || !fecha) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO libreta (novedad, monto, fecha)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [novedad, monto, fecha]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error inserting libreta' });
  }
});

export default router;
