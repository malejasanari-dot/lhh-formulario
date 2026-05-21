// controllers/packageItemsController.js

const pool = require('../db/connection');

const getPackageItems = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM package_items
      ORDER BY name ASC
    `);

        const packageItems = rows.map((item) => ({
            label: item.name,
            value: item.name
        }));

        res.json(packageItems);

    } catch (error) {

        console.error('Error obteniendo paquetes de desvinculación:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo paquetes de desvinculación'
        });

    }
};

module.exports = {
    getPackageItems
};