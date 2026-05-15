const pool = require('../db/connection');

const getIdiomas = async (req, res) => {
    try {

        const [rows] = await pool.query(`
      SELECT id, name
      FROM languages
      ORDER BY name ASC
    `);

        const idiomas = rows.map((language) => ({
            label: language.name,
            value: language.name
        }));

        res.json(idiomas);

    } catch (error) {

        console.error('Error obteniendo idiomas:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error obteniendo idiomas'
        });

    }
};

module.exports = {
    getIdiomas
};