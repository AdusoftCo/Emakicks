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

// Middleware
app.use(compression()); // Enable gzip compression for responses
app.use(express.json({ limit: '20mb' }));
app.use(cors());

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

app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// 🧱 SERVIR FRONTEND DESDE /dist
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
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
