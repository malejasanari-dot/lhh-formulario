const { getCiudades } = require('../controllers/ciudadesController');
const { getEducationLevels } = require('../controllers/educationLevelsController');
const { getCompanies } = require('../controllers/companiesController');
const { getOffices } = require('../controllers/officesController');
const { getIdTypes } = require('../controllers/idTypesController');
const { getGenders } = require('../controllers/gendersController');
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const candidatosController = require('../controllers/candidatosController'); // Importar controlador de candidatos
const { findByEmail } = require('../controllers/usersController'); // Importar controlador de usuarios
const db = require('../db/connection'); // Importar el pool de conexión
const { getMaritalStatuses } = require('../controllers/maritalStatusesController');
const { getProfesiones } = require('../controllers/profesionesController');
const { getIdiomas } = require('../controllers/idiomasController');
const { getLanguageLevels } = require('../controllers/languageLevelsController');
const { getTecnologias } = require('../controllers/tecnologiasController');
const { getLevels } = require('../controllers/levelsController');
const { getInterestingAreas } = require('../controllers/interestingAreasController');
const { getReasons } = require('../controllers/reasonsController');
const { getPackageItems } = require('../controllers/packageItemsController');
const { getEconomicSectors } = require('../controllers/economicSectorsController');
const { getSalarialRanges } = require('../controllers/salarialRangesController');
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

// Endpoint de niveles de idioma
router.get('/language-levels', getLanguageLevels);

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

// Endpoint de companies
router.get('/companies', getCompanies);

// Endpoint de sectores economicos
router.get('/economic-sectors', getEconomicSectors);

// Endpoint de tecnologias
router.get('/tecnologias', getTecnologias);

// Endpoint de oficinas
router.get('/offices', getOffices);

// Endpoint de tipos de documento
router.get('/id-types', getIdTypes);

// Endpoint de géneros
router.get('/genders', getGenders);

// Endpoint de rangos salariales
router.get('/salarial-ranges', getSalarialRanges);


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

/**
 * Endpoint para consultar usuario por correo electrónico
 * POST /api/users/find-email
 */
router.post('/users/find-email', findByEmail);

// Configuración de Multer para la subida de fotografías
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/photos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

/**
 * Endpoint para recibir la fotografía del candidato temporalmente
 * POST /api/candidatos/foto
 */
router.post('/candidatos/foto', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'No se envió ninguna foto'
    });
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Foto guardada físicamente',
    filename: req.file.filename,
    path: `/uploads/photos/${req.file.filename}`
  });
});

module.exports = router;
