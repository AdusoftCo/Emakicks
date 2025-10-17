// server.js
// To run: node server.js

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { Buffer } from 'buffer';

const app = express();
const PORT = 3001;

// Configuración básica para Express
app.use(express.json());
app.use(cors());

// **AQUÍ VA TU INFORMACIÓN CONFIDENCIAL**
const CORREO_ARGENTINO_USER = 'Emakic';
const CORREO_ARGENTINO_PASSWORD = 'Casino15+';

// La URL base debe ser la que funcione con tus credenciales. 
// Puede ser la de prueba o la de producción.
const BASE_URL = 'https://api.correoargentino.com.ar/micorreo/v1';

const CUSTOMER_ID = '0001681090'; 
const ORIGIN_ZIP_CODE = '1031'; 

app.post('/api/calculate-shipping', async (req, res) => {
    const { zipCode, cartItems } = req.body;

    try {
// PASO 1: OBTENER EL TOKEN DE AUTENTICACIÓN
    const credentials = Buffer.from(`${CORREO_ARGENTINO_USER}:${CORREO_ARGENTINO_PASSWORD}`).toString('base64');
 
    const tokenResponse = await fetch(`${BASE_URL}/token`, {
        method: 'POST',
        headers: {
                'Authorization': `Basic ${credentials}`
        },
            body: null 
    });

    if (!tokenResponse.ok) {
        throw new Error(`Failed to get token: ${tokenResponse.status} ${tokenResponse.statusText}`);
    }
 
    const tokenData = await tokenResponse.json();
    const authToken = tokenData.token;
    console.log("Token obtenido:", authToken);

// PASO 2: PREPARAR Y HACER LA LLAMADA PARA OBTENER LAS TARIFAS
    const ratesEndpoint = '/rates';
 
// Se calculan las dimensiones y el peso totales
    const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight || 100) * item.quantity, 0); 
    const totalHeight = cartItems.reduce((sum, item) => sum + (item.height || 10) * item.quantity, 0); 
    const totalWidth = cartItems.reduce((sum, item) => sum + (item.width || 10) * item.quantity, 0); 
    const totalLength = cartItems.reduce((sum, item) => sum + (item.length || 10) * item.quantity, 0); 

// Se construye el payload con el objeto "dimensions" anidado, como lo indica la documentación
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

    const ratesResponse = await axios.post(
        `${BASE_URL}${ratesEndpoint}`,
        payload,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json' 
            }
        }
    );

// CORREGIDO: Ahora mapeamos todos los campos necesarios, incluyendo los de tiempo de entrega.
    const shippingOptions = ratesResponse.data.rates.map(rate => ({
        company: `Correo Argentino - ${rate.productName}`, 
        price: rate.price,
            deliveryTimeMin: rate.deliveryTimeMin,
            deliveryTimeMax: rate.deliveryTimeMax
    }));

    res.json({ options: shippingOptions });

    } catch (error) {
            console.error('Error calling Correo Argentino API:');
        if (error.response) {
            console.error('  Status:', error.response.status);
            console.error('  Data:', error.response.data);
            } else if (error.request) {
                console.error('  No response received:', error.request);
                } else {
                    console.error('  Error message:', error.message);
                }

            if (error.response && error.response.status === 401) {
                return res.status(401).json({ error: 'Authentication failed. Please check your username and password.' });
            }
            
            res.status(500).json({ error: 'Failed to calculate shipping. Please check the zip code and your data.' });
        }
    });

app.listen(PORT, () => {

console.log(`Backend server running on http://localhost:${PORT}`);

});
