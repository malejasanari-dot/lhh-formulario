/**
 * Controlador de Ciudades
 * 
 * Este controlador maneja la lógica para obtener la lista de ciudades.
 * 
 */

const pool = require('../db/connection');

const getCiudades = async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT id, name
      FROM cities
      ORDER BY
        CASE
          WHEN id = 149 THEN 1
          WHEN id = 1 THEN 2
          WHEN id = 196 THEN 3
          WHEN id = 126 THEN 4
          WHEN id = 150 THEN 5
          WHEN id = 846 THEN 6
          WHEN id = 716 THEN 7
          WHEN id = 832 THEN 8
          WHEN id = 959 THEN 9
          ELSE 999
        END,
        name ASC
    `);

    const ciudades = rows.map((city) => ({
      label: city.name,
      value: city.name
    }));

    res.json(ciudades);

  } catch (error) {

    console.error('Error al obtener ciudades:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al obtener ciudades'
    });

  }
};

module.exports = {
  getCiudades
}

