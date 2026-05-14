/**
 * Servidor Principal - Backend LHH
 * 
 * Este archivo inicializa el servidor Express, configura los middlewares
 * necesarios y carga las rutas de la API.
 */

require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middlewares
app.use(cors()); // Permitir peticiones desde otros dominios (como el frontend)
app.use(express.json()); // Permitir el manejo de datos en formato JSON

// Rutas
app.use('/api', apiRoutes); // Prefijo para todas las rutas de la API

// Configuración del Puerto
const PORT = process.env.PORT || 5000;

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  console.log(`📍 Endpoint de salud: http://localhost:${PORT}/api/health`);
  console.log(`==========================================`);
});
