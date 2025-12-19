// products.js
import express from 'express';
import pool from '../db.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', async (req, res) => {
  const { type, page = 1, limit = 150 } = req.query;
  const offset = (page - 1) * limit;

  try {
    let sql = `
      SELECT p.*, f.nombre AS fabricante_nombre,
        COALESCE(json_agg(
          json_build_object('id', v.id, 'color', v.color, 'talla', v.talla, 'stock', v.stock)
        ) FILTER (WHERE v.id IS NOT NULL), '[]') AS variaciones
      FROM proyecto.productos p
      LEFT JOIN proyecto.fabricants f ON p.id_prov = f.id
      LEFT JOIN proyecto.variaciones v ON p.id = v.producto_id
    `;

    const conditions = [];
    const params = [];

    if (type === 'offers') conditions.push('p.is_on_offer = true');

    if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');

    sql += `
      GROUP BY p.id, f.nombre
      ORDER BY p.id
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);

    const result = await pool.query(sql, params);
    const products = result.rows.map(row => ({
      ...row,
      variaciones: row.variaciones || []
    }));

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/fabricants', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre FROM proyecto.fabricants');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching fabricants:', error.message);
    res.status(500).json({ error: 'Failed to fetch fabricants' });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const {
      descripcion,
      cod_art,
      precio_doc,
      precio_oferta,
      costo,
      fecha_alta,
      is_on_offer,
      fabricante_id,
      variaciones,
      imagen_url,
      category
    } = req.body;

    const imageUrl = imagen_url || null; // ✅ just store it

    const result = await pool.query(
      `INSERT INTO proyecto.productos 
      (descripcion, cod_art, precio_doc, precio_oferta, costo, fecha_alta, is_on_offer, id_prov, imagen, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [
        descripcion, cod_art, precio_doc, precio_oferta, costo,
        fecha_alta, is_on_offer, fabricante_id, imageUrl, category
      ]
    );

    const productoId = result.rows[0].id;

    if (variaciones && variaciones.length > 0) {
      const values = variaciones
        .map(v => `(${productoId}, '${v.color}', '${v.talla}', ${v.stock})`)
        .join(', ');
      await pool.query(
        `INSERT INTO proyecto.variaciones (producto_id, color, talla, stock) VALUES ${values}`
      );
    }

    res.status(201).json({
      message: 'Product created successfully',
      id: productoId
    });

  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/', async (req, res) => {
  try {
    const {
      id,
      descripcion,
      cod_art,
      precio_doc,
      precio_oferta,
      costo,
      fecha_alta,
      is_on_offer,
      fabricante_id,
      variaciones,
      imagen_url
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // ✅ 1. Get current image from DB
    const current = await pool.query(
      `SELECT imagen FROM proyecto.productos WHERE id = $1`,
      [id]
    );

    // ✅ 2. Decide which image to store
    const finalImage =
      imagen_url && imagen_url.trim() !== ""
        ? imagen_url
        : current.rows[0].imagen;

    // ✅ 3. Update product safely
    await pool.query(
      `UPDATE proyecto.productos
       SET descripcion=$1, cod_art=$2, precio_doc=$3, precio_oferta=$4,
           costo=$5, fecha_alta=$6, is_on_offer=$7, id_prov=$8, imagen=$9
       WHERE id=$10`,
      [
        descripcion,
        cod_art,
        precio_doc,
        precio_oferta,
        costo,
        fecha_alta,
        is_on_offer,
        fabricante_id,
        finalImage, // 👈 IMPORTANT
        id
      ]
    );

    const parsedVariaciones = Array.isArray(variaciones)
      ? variaciones
      : JSON.parse(variaciones);

    await pool.query(
      `DELETE FROM proyecto.variaciones WHERE producto_id = $1`,
      [id]
    );

    if (parsedVariaciones.length > 0) {
      const values = parsedVariaciones
        .map(v => `(${id}, '${v.color}', '${v.talla}', ${v.stock})`)
        .join(', ');
      await pool.query(
        `INSERT INTO proyecto.variaciones (producto_id, color, talla, stock)
         VALUES ${values}`
      );
    }

    res.json({ message: 'Product and variations updated successfully' });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


export default router;
