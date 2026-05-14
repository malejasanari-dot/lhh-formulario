const { getCiudades } = require('../controllers/ciudadesController')
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const candidatosController = require('../controllers/candidatosController'); // Importar controlador de candidatos
const db = require('../db/connection'); // Importar el pool de conexión

/**
 * Rutas de la API
 * 
 * Aquí definimos los puntos de acceso y los vinculamos a sus controladores.
 */

// Endpoint de prueba de salud
router.get('/health', healthController.getHealth);

// Endpoint de ciudades (Simulado)
router.get('/ciudades', getCiudades)

/**
 * Endpoint temporal para probar la conexión real a MySQL
 * Ejecuta un SELECT 1 para validar conectividad.
 */
router.get('/db-test', async (req, res) => {
  try {
    // Ejecutar consulta de prueba
    const [rows] = await db.query('SELECT 1 AS test');

    res.status(200).json({
      status: "success",
      message: "Conexión MySQL funcionando",
      data: rows[0]
    });
  } catch (error) {
    console.error('Error en /db-test:', error.message);
    res.status(500).json({
      status: "error",
      message: "Error al conectar con MySQL",
      error: error.message
    });
  }
});

/**
 * Endpoint para recibir el formulario completo de candidatos
 * POST /api/candidatos
 */
router.post('/candidatos', candidatosController.createCandidato);

module.exports = router;
