//products.js
import express from 'express';
import fs from 'fs';
import pool from '../db.js';
import { Buffer } from 'buffer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

router.get('/', async (req, res) => {
  const { type, page = 1, limit = 150 } = req.query;
  const offset = (page - 1) * limit;

  try {
    console.log('Fetching products with pagination...');

    // ✅ Optimized single JOIN query for products and variations
    let sql = `
      SELECT p.*, f.nombre AS fabricante_nombre,
             COALESCE(json_agg(
               json_build_object('id', v.id, 'color', v.color, 'talla', v.talla, 'stock', v.stock)
             ) FILTER (WHERE v.id IS NOT NULL), '[]') AS variaciones
      FROM productos p
      LEFT JOIN fabricants f ON p.id_prov = f.id
      LEFT JOIN variaciones v ON p.id = v.producto_id
    `;

    const conditions = [];
    const params = [];

    if (type === 'offers') {
      conditions.push('p.is_on_offer = true');
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

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

    console.log(`Products fetched: ${products.length} (page ${page}, limit ${limit})`);

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

router.post('/', async (req, res) => {
  try {
    const {
      descripcion,
      cod_art,
      precio_doc,
      precio_oferta,
      costo,
      is_on_offer,
      fabricante_id,
      variaciones,
      imagen_base64,
      imagen_nombre,
      category
    } = req.body;

    // Save image to /imagenes folder asynchronously
    if (imagen_base64 && imagen_nombre) {
      const base64Data = imagen_base64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const imagePath = path.join(__dirname, '..', 'imagenes', imagen_nombre);
      await fs.promises.writeFile(imagePath, buffer);
    }

    // Insert product
    const result = await pool.query(
      `INSERT INTO productos (descripcion, cod_art, precio_doc, precio_oferta, costo, is_on_offer, id_prov, imagen, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [descripcion, cod_art, precio_doc, precio_oferta, costo, is_on_offer, fabricante_id, imagen_nombre, category]
    );

    const productoId = result.rows[0].id;

    // Batch insert variations
    if (variaciones && variaciones.length > 0) {
      const values = variaciones.map(v => `(${productoId}, '${v.color}', '${v.talla}', ${v.stock})`).join(', ');
      await pool.query(
        `INSERT INTO variaciones (producto_id, color, talla, stock) VALUES ${values}`
      );
    }

    res.status(201).json({ message: 'Product created successfully', id: productoId });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update
router.put('/', async (req, res) => {
  try {
    const {
      id,
      descripcion,
      cod_art,
      precio_doc,
      precio_oferta,
      costo,
      is_on_offer,
      fabricante_id,
      variaciones,
      imagen_base64,
      imagen_nombre
    } = req.body;
    console.log('Received is_on_offer:', is_on_offer);

    // 🔽 INSERT THIS RIGHT HERE
    let finalImageName = imagen_nombre;

    if (!imagen_nombre) {
      const current = await pool.query('SELECT imagen FROM productos WHERE id = $1', [id]);
      finalImageName = current.rows[0]?.imagen || null;
    }

    // Optional: update image if new one is provided asynchronously
    if (imagen_base64 && imagen_nombre) {
      try {
        const base64Data = imagen_base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const imagePath = path.join(__dirname, '..', 'imagenes', imagen_nombre);
        await fs.promises.writeFile(imagePath, buffer);
        console.log('Image saved to:', imagePath);
      } catch (err) {
        console.error('Image save error:', err.message);
      }
    }

    console.log('Updating product with:', {
      id, fabricante_id, tipo: typeof fabricante_id
    });

    // ✅ Use finalImageName in your UPDATE query
    await pool.query(
      `UPDATE productos SET descripcion=$1, cod_art=$2, precio_doc=$3, precio_oferta=$4, costo=$5, is_on_offer=$6, id_prov=$7, imagen=$8 WHERE id=$9`,
      [descripcion, cod_art, precio_doc, precio_oferta, costo, is_on_offer, fabricante_id, finalImageName, id]
    );

    // ✅ Parse variaciones safely
    const parsedVariaciones = Array.isArray(variaciones)
      ? variaciones
      : JSON.parse(variaciones);

    await pool.query(`DELETE FROM variaciones WHERE producto_id = $1`, [id]);

    if (parsedVariaciones.length > 0) {
      const values = parsedVariaciones.map(v => `(${id}, '${v.color}', '${v.talla}', ${v.stock})`).join(', ');
      await pool.query(
        `INSERT INTO variaciones (producto_id, color, talla, stock) VALUES ${values}`
      );
    }

    res.json({ message: 'Product and variations updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

//Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Delete variations first (if they exist)
    await pool.query('DELETE FROM variaciones WHERE producto_id = $1', [id]);

    // Then delete the product
    await pool.query('DELETE FROM productos WHERE id = $1', [id]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
