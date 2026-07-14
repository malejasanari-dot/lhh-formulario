const pool = require('../db/connection');

const getIdTypes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT id, name
      FROM wwsilh_uat.id_types
      ORDER BY name ASC
    `);

        const idTypes = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
        }));

        res.json(idTypes);

    } catch (error) {
        console.error('Error obteniendo tipos de documento:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo tipos de documento'
        });
    }
};

module.exports = {
    getIdTypes
};
