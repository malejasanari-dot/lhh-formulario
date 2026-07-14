const pool = require('../db/connection');

const getLanguageLevels = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM language_levels
      ORDER BY id ASC
    `);

        const languageLevels = rows.map((level) => ({
            id: level.id,
            name: level.name,
            label: level.name,
            value: level.id
        }));

        res.json(languageLevels);

    } catch (error) {

        console.error('Error obteniendo niveles de idioma:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo niveles de idioma'
        });

    }
};

module.exports = {
    getLanguageLevels
};
