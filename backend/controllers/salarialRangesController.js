const pool = require('../db/connection');

const getSalarialRanges = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT id, name
            FROM salarial_ranges
            WHERE is_active = 1
            ORDER BY id ASC
        `);

        const ranges = rows.map((item) => ({
            id: item.id,
            name: item.name,
            label: item.name,
            value: item.id
        }));

        res.json(ranges);
    } catch (error) {
        console.error('Error obteniendo rangos salariales:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo rangos salariales'
        });
    }
};

module.exports = {
    getSalarialRanges
};
