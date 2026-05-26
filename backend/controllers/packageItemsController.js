// controllers/packageItemsController.js

const pool = require('../db/connection');

const getPackageItems = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM package_items
      WHERE id != 3
      ORDER BY name ASC
    `);

        const packageItems = rows.map((item) => {
            const unitsItems = [6, 7, 9];
            const type = unitsItems.includes(Number(item.id)) ? 'UNIDADES' : 'MESES';
            return {
                label: item.name,
                value: item.id,
                unitType: type
            };
        });

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