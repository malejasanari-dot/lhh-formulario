const pool = require('../db/connection');

const getLevels = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM levels
      ORDER BY name ASC
    `);

        const levels = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
        }));

        res.json(levels);

    } catch (error) {

        console.error('Error obteniendo niveles laborales:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo niveles laborales'
        });

    }
};

module.exports = {
    getLevels
};