const pool = require('../db/connection');

const getOffices = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT id, name
      FROM wwsilh_uat.offices
      ORDER BY name ASC
    `);

        const offices = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
        }));

        res.json(offices);

    } catch (error) {
        console.error('Error obteniendo oficinas:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo oficinas'
        });
    }
};

module.exports = {
    getOffices
};
