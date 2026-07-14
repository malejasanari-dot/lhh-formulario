const pool = require('../db/connection');

const getEconomicSectors = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT id, name
            FROM economic_sectors
            ORDER BY name ASC
        `);

        const sectors = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
        }));

        res.json(sectors);
    } catch (error) {
        console.error('Error obteniendo sectores económicos:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo sectores económicos'
        });
    }
};

module.exports = {
    getEconomicSectors
};
