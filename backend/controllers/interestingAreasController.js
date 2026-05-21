const pool = require('../db/connection');

const getInterestingAreas = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM interesting_areas
      ORDER BY name ASC
    `);

        const areas = rows.map((item) => ({
            label: item.name,
            value: item.name
        }));

        res.json(areas);

    } catch (error) {

        console.error('Error obteniendo áreas de expertiz:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo áreas de expertiz'
        });

    }
};

module.exports = {
    getInterestingAreas
};