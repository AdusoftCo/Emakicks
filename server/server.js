// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { Buffer } from 'buffer';
import pool from './db.js';
import productsRouter from './routes/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://emakicks-frontend.onrender.com', // your deployed frontend
  'http://localhost:5173'                   // local dev
];
// Middleware
app.use(compression()); // Enable gzip compression for responses
app.use(express.json({ limit: '20mb' }));

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.options('*', cors()); // handle preflight

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (error) {
    console.error('Error connecting to DB:', error.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Rutas
app.use('/api/products', productsRouter);

// app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// POST /api/purchase
app.post("/api/purchase", async (req, res) => {
  const { carrito } = req.body; // array of items

  try {
    await pool.query("BEGIN");

    for (const item of carrito) {
      if (item.color && item.talla) {
        // decrement variation stock
        const result = await pool.query(
          `UPDATE proyecto.variaciones
           SET stock = stock - $1
           WHERE producto_id = $2 AND color = $3 AND talla = $4 AND stock >= $1
           RETURNING *`,
          [item.quantity, item.id, item.color, item.talla]
        );
        if (result.rowCount === 0) throw new Error("Not enough stock in variation");

        // decrement product total stock
        await pool.query(
          `UPDATE proyecto.productos
           SET stock = stock - $1
           WHERE id = $2 AND stock >= $1`,
          [item.quantity, item.id]
        );
      } else {
        // decrement product stock directly
        const result = await pool.query(
          `UPDATE proyecto.productos
           SET stock = stock - $1
           WHERE id = $2 AND stock >= $1
           RETURNING *`,
          [item.quantity, item.id]
        );
        if (result.rowCount === 0) throw new Error("Not enough stock in product");
      }
    }

    await pool.query("COMMIT");
    res.json({ message: "Compra exitosa" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error('Purch error', err);
    
    res.status(400).json({ 
      error: err.message,
      detail: err.stack 
    });
  }
});


// 🔐 CREDENCIALES (usa variables de entorno en producción)
const CORREO_ARGENTINO_USER = process.env.CORREO_ARGENTINO_USER || 'Emakic';
const CORREO_ARGENTINO_PASSWORD = process.env.CORREO_ARGENTINO_PASSWORD || 'Casino15+';
const BASE_URL = 'https://api.correoargentino.com.ar/micorreo/v1';
const CUSTOMER_ID = '0001681090';
const ORIGIN_ZIP_CODE = '1031';

// In-memory cache for shipping rates (key: zipCode, value: { options, timestamp })
const shippingCache = new Map();

// 📦 API DE ENVÍO
app.post('/api/calculate-shipping', async (req, res) => {
  const { zipCode, cartItems } = req.body;

  // Check cache first (TTL: 1 hour)
  const cacheKey = zipCode;
  const cached = shippingCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < 3600000) { // 1 hour
    console.log(`Shipping cache hit for zipCode: ${zipCode}`);
    return res.json({ options: cached.options });
  }

  try {
    const credentials = Buffer.from(`${CORREO_ARGENTINO_USER}:${CORREO_ARGENTINO_PASSWORD}`).toString('base64');
    const tokenResponse = await fetch(`${BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to get token: ${tokenResponse.status} ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const authToken = tokenData.token;

    const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight || 100) * item.quantity, 0);
    const totalHeight = cartItems.reduce((sum, item) => sum + (item.height || 10) * item.quantity, 0);
    const totalWidth = cartItems.reduce((sum, item) => sum + (item.width || 10) * item.quantity, 0);
    const totalLength = cartItems.reduce((sum, item) => sum + (item.length || 10) * item.quantity, 0);

    const payload = {
      customerId: CUSTOMER_ID,
      postalCodeOrigin: ORIGIN_ZIP_CODE,
      postalCodeDestination: zipCode,
      dimensions: {
        weight: totalWeight,
        height: totalHeight,
        width: totalWidth,
        length: totalLength
      }
    };

    const ratesResponse = await axios.post(`${BASE_URL}/rates`, payload, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    const shippingOptions = ratesResponse.data.rates.map(rate => ({
      company: `Correo Argentino - ${rate.productName}`,
      price: rate.price,
      deliveryTimeMin: rate.deliveryTimeMin,
      deliveryTimeMax: rate.deliveryTimeMax
    }));

    // Cache the result
    shippingCache.set(cacheKey, { options: shippingOptions, timestamp: Date.now() });
    console.log(`Shipping cache set for zipCode: ${zipCode}`);

    res.json({ options: shippingOptions });

  } catch (error) {
    console.error('Error calling Correo Argentino API:', error.message);
    res.status(500).json({ error: 'Failed to calculate shipping.' });
  }
});
