const pool = require('../db/connection');

const getReasons = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM reasons
      ORDER BY name ASC
    `);

        const reasons = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
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