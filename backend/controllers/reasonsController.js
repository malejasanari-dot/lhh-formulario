const pool = require('../db/connection');

const getReasons = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM reasons
      ORDER BY name ASC
    `);

        const reasons = rows.map((item) => ({
            label: item.name,
            value: item.name
        }));

        res.json(reasons);

    } catch (error) {

        console.error('Error obteniendo motivos de retiro:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo motivos de retiro'
        });

    }
};

module.exports = {
    getReasons
};