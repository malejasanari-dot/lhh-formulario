const pool = require('../db/connection');

const getGenders = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT id, name
      FROM genders
      ORDER BY name ASC
    `);

        const genders = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
        }));

        res.json(genders);

    } catch (error) {
        console.error('Error obteniendo géneros:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo géneros'
        });
    }
};

module.exports = {
    getGenders
};
