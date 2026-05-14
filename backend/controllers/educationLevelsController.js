const pool = require('../db/connection');

const getEducationLevels = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM education_levels
      ORDER BY name ASC
    `);

        const niveles = rows.map((level) => ({
            label: level.name,
            value: level.name
        }));

        res.json(niveles);

    } catch (error) {

        console.error('Error obteniendo niveles educativos:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo niveles educativos'
        });

    }
};

module.exports = {
    getEducationLevels
};