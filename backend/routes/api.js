const { getCiudades } = require('../controllers/ciudadesController');
const { getEducationLevels } = require('../controllers/educationLevelsController');
const { getEmpresas } = require('../controllers/empresasController');
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const candidatosController = require('../controllers/candidatosController'); // Importar controlador de candidatos
const db = require('../db/connection'); // Importar el pool de conexión
const { getMaritalStatuses } = require('../controllers/maritalStatusesController');
const { getProfesiones } = require('../controllers/profesionesController');
const { getIdiomas } = require('../controllers/idiomasController')
const { getTecnologias } = require('../controllers/tecnologiasController');
const { getLevels } = require('../controllers/levelsController');
const { getInterestingAreas } = require('../controllers/interestingAreasController');
const { getReasons } = require('../controllers/reasonsController');
const { getPackageItems } = require('../controllers/packageItemsController');
/* Rutas de la API
 * 
 * Aquí definimos los puntos de acceso y los vinculamos a sus controladores.
 */

// Endpoint de prueba de salud
router.get('/health', healthController.getHealth);

// Endpoint de ciudades (Simulado)
router.get('/ciudades', getCiudades);

// Endpoint de niveles educativos (Base de datos real)
router.get('/niveles-educativos', getEducationLevels);

// Endpoint de profesiones (Base de datos real)
router.get('/profesiones', getProfesiones);

// Endpoint de idiomas
router.get('/idiomas', getIdiomas);

// Endpoint de estados civiles
router.get('/estados-civiles', getMaritalStatuses);

// Endpoint de niveles laborales
router.get('/niveles-laborales', getLevels);

// Endpoint de áreas de expertiz
router.get('/areas-expertiz', getInterestingAreas);

// Endpoint de motivos de retiro
router.get('/motivos-retiro', getReasons);

// Endpoint de paquetes de desvinculación
router.get('/paquetes-desvinculacion', getPackageItems);

// Endpoint de empresas
router.get('/empresas', getEmpresas);

// Endpoint de tecnologias
router.get('/tecnologias', getTecnologias);



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
